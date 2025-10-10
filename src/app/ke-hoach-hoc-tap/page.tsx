import Image from "next/image";

export default function StudyPlanEmptyState() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-12 px-4 py-10 text-white md:px-8">
      <Image
        src="/assets/pango_and_board.png"
        alt="Pango tren bang"
        width={420}
        height={360}
        className="drop-shadow-2xl"
        priority
      />

      <div className="flex max-w-3xl flex-col items-center gap-6 text-center text-white">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">
            Bạn chưa lên kế hoạch học tập
          </h1>
          <p className="mt-3 text-sm text-white/75 md:text-base">
            Hãy tìm hiểu và đánh dấu các khóa học để thành lập lộ trình riêng cho bản thân nhé
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <button
            type="button"
            className="w-full rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90 sm:w-auto"
            >
            Lên kế hoạch thủ công
            </button>
            <button
            type="button"
            className="w-full rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-400 sm:w-auto"
            >
            Pango tư vấn kế hoạch
            </button>
        </div>
      </div>
    </div>
  );
}
