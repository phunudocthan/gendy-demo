import Image from "next/image";
import Link from "next/link";
import { PangoChat } from "@/components/PangoChat";

const streakDays = [
  { label: "Mon", active: true },
  { label: "Tue", active: true },
  { label: "Wed", active: false },
  { label: "Thu", active: true },
  { label: "Fri", active: true },
  { label: "Sat", active: true },
  { label: "Sun", active: false },
  { label: "Mon", active: true },
  { label: "Tue", active: true },
  { label: "Wed", active: true },
];

const courses = [
  {
    id: "c1",
    progress: 85,
    title: "Độ tuổi 7-10: Tuổi dậy thì cũng bình thường thôi!",
    pendingLessons: 2,
    pendingQuestions: 10,
    rating: [true, true, true, true, false],
  },
  {
    id: "c2",
    progress: 35,
    title: "Độ tuổi 7-10: Nam với nữ khác nhau ư?",
    pendingLessons: 6,
    pendingQuestions: 18,
    rating: [true, true, false, false, false],
  },
  {
    id: "c3",
    progress: 100,
    title: "Độ tuổi 7-10: Áo giáp phòng thủ?",
    pendingLessons: 0,
    pendingQuestions: 6,
    rating: [true, true, true, true, true],
  },
];

export default function OverviewPage() {
  return (
    <div className="px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,_2.2fr)_minmax(0,_1fr)] md:items-start">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-full bg-white/15" />
                  <Image
                    src="/assets/demo_avatar.png"
                    alt="Ảnh đại diện của Pango"
                    fill
                    className="rounded-full object-cover p-3"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="text-sm text-white/70">Xin chào,</p>
                  <h1 className="text-2xl font-semibold text-white">Pango Nek</h1>
                  <p className="mt-1 text-sm text-white/70">
                    Hôm nay bạn đã sẵn sàng tiếp tục hành trình khám phá bản thân chưa?
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm text-white/75">
                <p className="font-medium text-white">Lộ trình hiện tại</p>
                <p className="mt-1 text-white/60">Khóa học: 7-10 tuổi - Tìm hiểu bản thân</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Chuỗi hoạt động</h2>
              <span className="text-sm text-white/60">Giữ lửa 10 ngày liên tục!</span>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-4 sm:grid-cols-10">
              {streakDays.map((day, index) => (
                <div
                  key={`${day.label}-${index}`}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                >
                  <span className="text-xs font-medium text-white/60">{day.label}</span>
                  <Image
                    src={
                      day.active
                        ? "/assets/streak_fire_on.png"
                        : "/assets/streak_fire_off.png"
                    }
                    alt={day.active ? "Đã hoàn thành" : "Chưa hoàn thành"}
                    width={36}
                    height={36}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="px-2 text-lg font-semibold text-white">Khóa học gần nhất</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <PangoChat />
        </aside>
      </div>
    </div>
  );
}

function CourseCard({
  course,
}: {
  course: {
    id: string;
    title: string;
    progress: number;
    pendingLessons: number;
    pendingQuestions: number;
    rating: boolean[];
  };
}) {
  const progressStyle = {
    background: `conic-gradient(#45c9ff ${course.progress}%, rgba(255,255,255,0.08) ${course.progress}% 100%)`,
  };

  return (
    <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/10 bg-black/25 p-5 shadow-lg backdrop-blur md:flex-row md:items-center">
      <div className="flex items-center gap-5">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/15 bg-white/5" />
          <div
            className="absolute inset-1 rounded-full border border-white/15"
            style={progressStyle}
          />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-xl font-semibold">
            {course.progress}%
          </div>
        </div>
        <div className="space-y-2 text-sm text-white/80">
          <h3 className="text-base font-semibold text-white">{course.title}</h3>
          <p>Số bài giảng chưa xem: {course.pendingLessons} bài giảng</p>
          <p>Số câu hỏi chưa trả lời: {course.pendingQuestions} câu hỏi</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Đánh giá hiện tại:</span>
            <div className="flex items-center gap-1">
              {course.rating.map((isActive, idx) => (
                <Image
                  key={idx}
                  src={
                    isActive
                      ? "/assets/streak_fire_on.png"
                      : "/assets/streak_fire_off.png"
                  }
                  alt={isActive ? "Đánh giá tích cực" : "Đánh giá đang cải thiện"}
                  width={24}
                  height={24}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link
        href="/khoa-hoc-cua-toi"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
      >
        Tiếp tục học
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
