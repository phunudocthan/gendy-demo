"use client";
import Image from "next/image";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, selectedCourse, setSelectedCourse } =
    useSidebar();

  return (
    <>
      {/* Background lớn (có mặt trời) phủ toàn trang */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/assets/post_background.png"
          alt="post background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Body background phủ từ dưới header xuống - toàn màn hình */}
      <div className="fixed left-0 right-0 bottom-0 top-20 -z-10">
        <Image
          src="/assets/body_background.png"
          alt="body background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar - chỉ từ phần body xuống, không đè header */}
        <aside
          className={`
            flex w-64 shrink-0 flex-col gap-4 text-white/90 p-4 z-20
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            fixed h-[calc(100vh-5rem)] top-20
        `}
        >
          {/* Background cho sidebar body - trong suốt hơn */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col h-full">
            {/* Course Selection Dropdown */}
            <div className="mb-4">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                aria-label="Chọn khóa học"
                className="w-full h-10 px-3 rounded bg-white/20 hover:bg-white/30 transition-colors text-sm text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              >
                <option
                  value="Tuổi dậy thì có đáng sợ?"
                  className="text-black bg-white"
                >
                  Tuổi dậy thì có đáng sợ?
                </option>
                <option value="Ngày đèn đỏ" className="text-black bg-white">
                  Ngày đèn đỏ
                </option>
              </select>
            </div>

            {/* Navigation - tất cả dùng button để đồng nhất */}
            <nav className="space-y-4 flex-1">
              <button className="w-full h-9 px-3 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm text-left flex items-center gap-2">
                <Image
                  src="/assets/tong_quan.png"
                  alt="Tổng Quan"
                  width={18}
                  height={18}
                />
                <span>Tổng Quan</span>
              </button>
              <button className="w-full h-9 px-3 rounded bg-white text-black hover:bg-white/90 transition-colors text-sm text-left font-medium flex items-center gap-2">
                <Image
                  src="/assets/ke_hoach_hoc_tap.png"
                  alt="Kế Hoạch Học Tập"
                  width={18}
                  height={18}
                />
                <span>Kế Hoạch Học Tập</span>
              </button>
              <button className="w-full h-9 px-3 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm text-left flex items-center gap-2">
                <Image
                  src="/assets/khoa_hoc_cua_toi.png"
                  alt="Khóa Học Của Tôi"
                  width={18}
                  height={18}
                />
                <span>Khóa Học Của Tôi</span>
              </button>
              <button className="w-full h-9 px-3 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm text-left flex items-center gap-2">
                <Image
                  src="/assets/cua_hang.png"
                  alt="Cửa Hàng"
                  width={18}
                  height={18}
                />
                <span>Cửa Hàng</span>
              </button>
              <button className="w-full h-9 px-3 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm text-left flex items-center gap-2">
                <Image
                  src="/assets/cai_dat.png"
                  alt="Cài Đặt"
                  width={18}
                  height={18}
                />
                <span>Cài Đặt</span>
              </button>
            </nav>

            {/* Nút về trang chủ ở dưới cùng */}
            <div className="mt-4 pt-3 border-t border-white/20">
              <button className="w-full h-9 px-3 rounded bg-white/20 hover:bg-white/30 transition-colors text-sm text-left">
                ← Về trang chủ
              </button>
            </div>
          </div>
        </aside>

        {/* Main content - không cần dịch chuyển vì sidebar đã fixed */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar - chỉ có stack, chuông, user */}
          <header className="h-16 md:h-20 bg-transparent text-white flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Nút stack luôn hiện */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-2xl hover:bg-white/10 p-1 rounded"
              >
                ☰
              </button>
              {/* Logo luôn hiện ở header */}
              <Image
                src="/assets/page_name.png"
                alt="Gendy Land"
                width={120}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-4 text-xl">
              <Image
                src="/assets/notification_icon.png"
                alt="Thông báo"
                width={24}
                height={24}
              />
              <Image
                src="/assets/profile_icon.png"
                alt="Tài khoản"
                width={24}
                height={24}
              />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 min-h-0 relative">
            {/* đảm bảo lớp nội dung trên post background */}
            <div className="absolute inset-0 z-0" />
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>

      {/* Overlay để đóng sidebar trên mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
