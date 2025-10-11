"use client";

import Image from "next/image";
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Xin chào! Tôi là Pango, hướng dẫn viên của bạn ở Gendy Land. Bạn đang quan tâm điều gì?",
  },
];

const MAX_MESSAGE_LENGTH = 200;
const MAX_CONTEXT_MESSAGES = 6;

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function PangoChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking]);

  const sendMessage = useCallback(
    async (value: string) => {
      const trimmedMessage = value.trim();
      if (isThinking) {
        return;
      }

      if (trimmedMessage.length === 0) {
        setError("Hãy nhập nội dung trước khi gửi nhé!");
        return;
      }

      if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
        setError(`Tin nhắn tối đa ${MAX_MESSAGE_LENGTH} ký tự.`);
        return;
      }

      const userMessage: ChatMessage = {
        id: createId("user"),
        role: "user",
        text: trimmedMessage,
      };

      const updatedMessages = [...messages, userMessage];
      const limitedMessages = updatedMessages.slice(-MAX_CONTEXT_MESSAGES);

      setMessages(updatedMessages);
      setInputValue("");
      setError(null);
      setIsThinking(true);

      try {
        const response = await fetch("/api/pango-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: limitedMessages.map(({ role, text }) => ({
              role,
              text,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`Máy chủ phản hồi lỗi (${response.status})`);
        }

        const data: { reply?: string } = await response.json();
        const replyText =
          data.reply ??
          "Có vẻ như mình đang bận một chút, bạn có thể thử hỏi lại sau nhé!";

        setMessages((prev) => [
          ...prev,
          {
            id: createId("assistant"),
            role: "assistant",
            text: replyText,
          },
        ]);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Không thể gửi tin nhắn ngay lúc này.";
        setError(message);
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, messages],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void sendMessage(inputValue);
    },
    [inputValue, sendMessage],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        void sendMessage(inputValue);
      }
    },
    [inputValue, sendMessage],
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-xl backdrop-blur">
      <h2 className="text-xl font-semibold text-white">Trò chuyện cùng Pango</h2>
      <div className="mt-4 inline-flex max-w-xs rounded-3xl border border-white/40 bg-white px-4 py-3 text-sm text-slate-700">
        Gendy Land có hệ thống bài giảng phân chia theo nhiều độ tuổi! Hãy để mình gợi ý các khóa
        học phù hợp nhé!
      </div>
      <div className="mt-6 flex flex-col items-center">
        <Image
          src="/assets/pango.png"
          alt="Linh vật Pango"
          width={220}
          height={240}
          className="drop-shadow-xl"
          priority
        />
      </div>
      <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
        {messages.map((entry) => (
          <p key={entry.id} className="leading-relaxed">
            <span className="font-semibold text-white">
              {entry.role === "assistant" ? "Pango" : "Bạn"}:
            </span>{" "}
            <span className="text-white/80">{entry.text}</span>
          </p>
        ))}
        {isThinking ? (
          <p className="animate-pulse leading-relaxed text-white/60">Pango đang suy nghĩ...</p>
        ) : null}
        <div ref={scrollAnchorRef} />
      </div>
      {error ? <p className="mt-3 text-xs text-red-300">{error}</p> : null}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2"
      >
        <input
          type="text"
          placeholder="Nhập câu hỏi bạn muốn hỏi..."
          maxLength={MAX_MESSAGE_LENGTH}
          className="flex-1 bg-transparent text-sm text-white placeholder-white/50 outline-none"
          value={inputValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (error && nextValue.trim().length <= MAX_MESSAGE_LENGTH) {
              setError(null);
            }
            setInputValue(nextValue);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Ô nhập câu hỏi"
        />
        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-base font-semibold text-slate-900 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-orange-400/50"
          aria-label="Gửi câu hỏi"
          disabled={isThinking || inputValue.trim().length === 0}
        >
          ➜
        </button>
      </form>
    </section>
  );
}
