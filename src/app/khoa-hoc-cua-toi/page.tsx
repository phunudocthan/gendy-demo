"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useSidebar } from "@/components/SidebarContext";
import { motion } from "framer-motion";
import UnlockModal from "@/components/UnlockModal";

type IslandAsset = {
  src: string;
  locked?: boolean;
};

const FIRST_ISLAND = "/assets/first_lession_island.png";
// const LAST_ISLAND = "/assets/island_locked_last_session_demo.png";

// Demo: bỏ random và danh sách ứng viên, dùng cấu hình tĩnh ở dưới

export default function Home() {
  const { sidebarOpen } = useSidebar();

  // State cho unlocking system
  const [unlockedLessons, setUnlockedLessons] = useState<string[]>([
    "b1",
    "b2",
  ]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Không dùng random cho demo 4 đảo

  // Layout với dịch chuyển - bạn tự chỉnh số dịch chuyển
  const shiftAmount = 8; // Bạn tự chỉnh số này
  const nodes = useMemo(() => {
    return [
      {
        id: "b1",
        label: "BÀI 1",
        x: sidebarOpen ? 10 + shiftAmount : 5,
        y: 50,
        island: { src: FIRST_ISLAND },
        locked: !unlockedLessons.includes("b1"),
        size: "sm" as const,
        checkpoint: unlockedLessons.includes("b1")
          ? "/assets/unlocked_checkpointer.png"
          : "/assets/locked_checkpointer.png",
      },
      {
        id: "b2",
        label: "BÀI 2",
        x: sidebarOpen ? 24 + shiftAmount : 24,
        y: 10,
        island: {
          src: unlockedLessons.includes("b2")
            ? "/assets/island_01_unlocked_session_demo.png"
            : "/assets/island_01_locked_session_demo.png",
        },
        locked: !unlockedLessons.includes("b2"),
        size: "md" as const,
        checkpoint: unlockedLessons.includes("b2")
          ? "/assets/unlocked_checkpointer.png"
          : "/assets/locked_checkpointer.png",
      },
      {
        id: "b3",
        label: "BÀI 3",
        x: sidebarOpen ? 41 + shiftAmount : 43,
        y: 50,
        island: {
          src: unlockedLessons.includes("b3")
            ? "/assets/island_01_unlocked_session_demo.png"
            : "/assets/island_01_locked_session_demo.png",
        },
        locked: !unlockedLessons.includes("b3"),
        size: "md" as const,
        checkpoint: unlockedLessons.includes("b3")
          ? "/assets/unlocked_checkpointer.png"
          : "/assets/locked_checkpointer.png",
      },
      {
        id: "b4",
        label: "BÀI 4",
        x: sidebarOpen ? 61 + shiftAmount : 64,
        y: 10,
        island: {
          src: unlockedLessons.includes("b4")
            ? "/assets/island_02_unlocked_session_demo.png"
            : "/assets/island_02_locked_session_demo.png",
        },
        locked: !unlockedLessons.includes("b4"),
        size: "md" as const,
        checkpoint: unlockedLessons.includes("b4")
          ? "/assets/unlocked_checkpointer.png"
          : "/assets/locked_checkpointer.png",
      },
      {
        id: "final",
        label: "TỔNG KẾT",
        x: sidebarOpen ? 79 + shiftAmount : 82,
        y: 25,
        island: {
          src: "/assets/island_locked_last_session_demo.png", // TỔNG KẾT luôn locked trong demo
        },
        locked: !unlockedLessons.includes("final"),
        size: "lg" as const,
        checkpoint: unlockedLessons.includes("final")
          ? "/assets/unlocked_checkpointer.png"
          : "/assets/locked_checkpointer.png",
      },
    ];
  }, [sidebarOpen, unlockedLessons]);

  // Handlers cho unlock system
  const handleIslandClick = (nodeId: string, isLocked: boolean) => {
    if (isLocked) {
      setSelectedLesson(nodeId);
      setShowUnlockModal(true);
    } else {
      // Đã unlock - có thể navigate đến bài học
      console.log(`Navigating to lesson: ${nodeId}`);
    }
  };

  const handleUnlockConfirm = () => {
    if (selectedLesson) {
      setUnlockedLessons((prev) => [...prev, selectedLesson]);
      setShowUnlockModal(false);
      setSelectedLesson(null);
    }
  };

  const handleUnlockCancel = () => {
    setShowUnlockModal(false);
    setSelectedLesson(null);
  };

  // Anchor points cũng dịch chuyển theo - bạn tự chỉnh
  const anchors = {
    b1: { x: sidebarOpen ? 12 + shiftAmount : 9, y: 34 },
    b2: { x: sidebarOpen ? 27 + shiftAmount : 27, y: 15 },
    b3: { x: sidebarOpen ? 44 + shiftAmount : 45, y: 32 },
    b4: { x: sidebarOpen ? 64 + shiftAmount : 67, y: 14 },
    final: { x: sidebarOpen ? 89 + shiftAmount : 89, y: 26 },
  };

  const anchor = (id: string) => {
    return anchors[id as keyof typeof anchors];
  };

  // Tọa độ đã chuẩn hóa về 0-100, SVG và CSS đồng bộ

  return (
    <div className="relative min-h-[calc(100vh_-_5rem)] overflow-hidden">
      {/* Mây ngẫu nhiên */}
      <Clouds />

      {/* SVG lines với animation đơn giản */}
      <svg
        className="absolute inset-0 z-[2] pointer-events-none svg-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g
          stroke="#9dd0ff"
          strokeWidth={0.3}
          strokeDasharray="1 2"
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
        >
          <motion.line
            x1={anchor("b1").x}
            y1={anchor("b1").y}
            x2={anchor("b2").x}
            y2={anchor("b2").y}
            animate={{
              x1: anchor("b1").x,
              y1: anchor("b1").y,
              x2: anchor("b2").x,
              y2: anchor("b2").y,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.line
            x1={anchor("b2").x}
            y1={anchor("b2").y}
            x2={anchor("b3").x}
            y2={anchor("b3").y}
            animate={{
              x1: anchor("b2").x,
              y1: anchor("b2").y,
              x2: anchor("b3").x,
              y2: anchor("b3").y,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.line
            x1={anchor("b3").x}
            y1={anchor("b3").y}
            x2={anchor("b4").x}
            y2={anchor("b4").y}
            animate={{
              x1: anchor("b3").x,
              y1: anchor("b3").y,
              x2: anchor("b4").x,
              y2: anchor("b4").y,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.line
            x1={anchor("b4").x}
            y1={anchor("b4").y}
            x2={anchor("final").x}
            y2={anchor("final").y}
            animate={{
              x1: anchor("b4").x,
              y1: anchor("b4").y,
              x2: anchor("final").x,
              y2: anchor("final").y,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </g>
      </svg>

      {/* Đảo định vị theo toàn màn hình (không trong container) */}
      {nodes.map((n) => (
        <MapIsland
          key={n.id}
          label={n.label}
          checkpoint={n.checkpoint}
          island={n.island}
          x={n.x}
          y={n.y}
          size={n.size}
          locked={n.locked}
          onClick={() => handleIslandClick(n.id, n.locked)}
        />
      ))}

      {/* Unlock Modal */}
      <UnlockModal
        isOpen={showUnlockModal}
        onConfirm={handleUnlockConfirm}
        onCancel={handleUnlockCancel}
        lessonName={
          selectedLesson
            ? nodes.find((n) => n.id === selectedLesson)?.label || ""
            : ""
        }
      />
    </div>
  );
}

function MapIsland({
  label,
  checkpoint,
  island,
  x,
  y,
  size = "md",
  locked,
  onClick,
}: {
  label: string;
  checkpoint: string;
  island: IslandAsset;
  x: number;
  y: number;
  size?: "sm" | "md" | "lg";
  locked?: boolean;
  onClick?: () => void;
}) {
  // Thu nhỏ kích thước đảo để gọn màn hình (zic-zac)
  const width = size === "lg" ? 220 : size === "sm" ? 80 : 100;
  const height = size === "lg" ? 180 : size === "sm" ? 80 : 100;
  const checkpointSize = size === "lg" ? 80 : size === "sm" ? 70 : 75;

  return (
    <motion.div
      className="absolute text-center z-[5] cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="relative inline-flex items-center justify-center mb-2 z-10 drop-shadow">
        <Image
          src={checkpoint}
          alt="checkpoint"
          width={checkpointSize}
          height={checkpointSize}
        />
        <span
          className={`absolute font-semibold text-[11px] sm:text-xs transform -translate-y-0.5 ${
            locked ? "text-slate-700" : "text-white"
          }`}
        >
          {label}
        </span>
      </div>
      <Image
        src={island.src}
        alt={label}
        width={width}
        height={height}
        className={`drop-shadow-xl ${
          locked || island.locked ? "grayscale" : ""
        }`}
      />
    </motion.div>
  );
}

function Clouds() {
  type Cloud = {
    id: number;
    src: string;
    top: number;
    left: number;
    w: number;
    h: number;
    opacity: number;
  };

  // Tạo mây một lần duy nhất khi mount để không "nhảy múa" khi component re-render
  const [clouds] = useState<Cloud[]>(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const isMedium = Math.random() > 0.55;
      const src = isMedium
        ? "/assets/medium_cloud.png"
        : "/assets/small_cloud.png";
      const bottomBias = Math.random() < 0.65;
      const top = bottomBias
        ? Math.floor(Math.random() * 35) + 55
        : Math.floor(Math.random() * 40) + 5;
      let left = Math.floor(Math.random() * 90) + 2;
      if (left > 35 && left < 60 && Math.random() < 0.8) {
        left = left < 48 ? 25 : 70;
      }
      const w = isMedium ? 120 : 80;
      const h = isMedium ? 70 : 50;
      const opacity = 0.55 + Math.random() * 0.3;
      return { id: i, src, top, left, w, h, opacity };
    });
  });

  return (
    <>
      {clouds.map((c) => (
        <Image
          key={c.id}
          src={c.src}
          alt="cloud"
          width={c.w}
          height={c.h}
          style={{ top: `${c.top}%`, left: `${c.left}%`, opacity: c.opacity }}
          className="absolute z-[1] select-none pointer-events-none"
        />
      ))}
    </>
  );
}
