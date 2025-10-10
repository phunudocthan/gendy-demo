"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarProvider, useSidebar } from "./SidebarContext";

const primaryNav = [
  {
    label: "Tổng Quan",
    href: "/",
    icon: "/assets/tong_quan.png",
  },
  {
    label: "Kế Hoạch Học Tập",
    href: "/ke-hoach-hoc-tap",
    icon: "/assets/ke_hoach_hoc_tap.png",
  },
  {
    label: "Khóa Học Của Tôi",
    href: "/khoa-hoc-cua-toi",
    icon: "/assets/khoa_hoc_cua_toi.png",
  },
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, selectedCourse, setSelectedCourse } =
    useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Global background layers */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/assets/post_background.png"
          alt="post background"
          fill
          className="object-cover"
          priority
        />
      </div>

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
        {/* Sidebar */}
        <aside
          className={`fixed top-20 z-20 flex h-[calc(100vh-5rem)] w-64 shrink-0 flex-col gap-4 p-4 text-white/90 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-4">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                aria-label="Chọn khóa học"
                className="h-10 w-full rounded border border-white/30 bg-white/20 px-3 text-sm text-white transition-colors hover:bg-white/30 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="Tuổi dậy thì cũng bình thường thôi!" className="bg-white text-black">
                  Tuổi dậy thì cũng bình thường thôi!
                </option>
                <option value="Ngày đầu tiên đến trường" className="bg-white text-black">
                  Ngày đầu tiên đến trường
                </option>
              </select>
            </div>

            <nav className="flex-1 space-y-4">
              {primaryNav.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex h-9 items-center gap-2 rounded px-3 text-sm transition-colors ${
                      isActive
                        ? "bg-white text-black hover:bg-white/90 font-medium"
                        : "bg-white/10 text-white/90 hover:bg-white/20"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={18}
                      height={18}
                      className={isActive ? "" : "opacity-90"}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                type="button"
                className="flex h-9 w-full items-center gap-2 rounded bg-white/10 px-3 text-left text-sm text-white/90 transition-colors hover:bg-white/20"
              >
                <Image
                  src="/assets/cua_hang.png"
                  alt="Cửa Hàng"
                  width={18}
                  height={18}
                />
                <span>Cửa Hàng</span>
              </button>
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2 rounded bg-white/10 px-3 text-left text-sm text-white/90 transition-colors hover:bg-white/20"
              >
                <Image
                  src="/assets/cai_dat.png"
                  alt="Cài Đặt"
                  width={18}
                  height={18}
                />
                <span>Cài Đặt</span>
              </button>
            </nav>

            <div className="mt-4 border-t border-white/20 pt-3">
              <button
                type="button"
                className="h-9 w-full rounded bg-white/20 px-3 text-left text-sm text-white/90 transition-colors hover:bg-white/30"
              >
                Đổi về trang chủ
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between bg-transparent px-4 text-white md:h-20 md:px-6">
            <div className="flex items-center gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded p-1 text-2xl hover:bg-white/10"
                aria-label="Đóng/mở menu"
              >
                ☰
              </button>
              <Image
                src="/assets/page_name.png"
                alt="Gendy Land"
                width={120}
                height={30}
                className="object-contain"
                priority
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

          <main className="relative min-h-0 flex-1">
            <div className="absolute inset-0 z-0" />
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
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



