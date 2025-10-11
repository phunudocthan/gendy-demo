import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  text: string;
};

const GEMINI_MODEL = process.env.GEMINI_MODEL_ID ?? "gemini-2.5-flash";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";
const MAX_CHAT_HISTORY = 6;

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Thiếu cấu hình GEMINI_API_KEY trong môi trường." },
      { status: 500 },
    );
  }

  let body: { messages?: IncomingMessage[] } = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const messages = body.messages ?? [];

  if (messages.length === 0) {
    return NextResponse.json({ error: "Chưa có nội dung trò chuyện." }, { status: 400 });
  }

  const limitedMessages = messages.slice(-MAX_CHAT_HISTORY);

  const contents = [
    {
      role: "user" as const,
      parts: [
        {
          text: [
            "Bạn là Pango, hướng dẫn viên thân thiện của Gendy Land.",
            "Hãy trả lời bằng tiếng Việt, ngắn gọn nhưng giàu khích lệ.",
            "Khi phù hợp, gợi ý hoạt động hoặc bài học trong Gendy Land.",
          ].join(" "),
        },
      ],
    },
    ...limitedMessages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.text }],
    })),
  ];

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
        }),
      },
    );

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      const message =
        typeof errorPayload?.error?.message === "string"
          ? errorPayload.error.message
          : "Không thể gọi tới Gemini API.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const payload = await response.json();
    const reply =
      payload?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text)
        .filter(Boolean)
        .join("\n")
        .trim() ?? null;

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini không trả về nội dung phù hợp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const fallbackMessage =
      error instanceof Error ? error.message : "Không thể kết nối tới Gemini.";
    return NextResponse.json({ error: fallbackMessage }, { status: 500 });
  }
}
