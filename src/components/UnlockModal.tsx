"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface UnlockModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  lessonName: string;
}

export default function UnlockModal({
  isOpen,
  onConfirm,
  onCancel,
  lessonName,
}: UnlockModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 260 }}
            className="relative w-full max-w-xl rounded-[32px] border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-6 px-6 pb-8 pt-10 md:px-10 md:pt-12">
              <div className="relative flex h-32 w-32 items-center justify-center md:h-36 md:w-36">
                <Image
                  src="/assets/confused_pango.png"
                  alt="Confused Pango"
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 9rem, 8rem"
                  priority
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#2c2c2c] md:text-[28px]">
                  Mở Khóa Bài Học Mới?
                </h2>
                <p className="mt-3 text-base text-[#505050] md:text-lg">
                  Bạn có muốn mở khóa bài học <span className="font-semibold text-[#2c2c2c]">{lessonName}</span> để bắt đầu học không?
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 md:flex-row">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 rounded-[18px] bg-[#dedede] px-5 py-3 text-base font-semibold text-[#595959] transition hover:bg-[#d0d0d0]"
                >
                  Chờ xíu! Để tui ôn lại bài cũ!
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex-1 rounded-[18px] bg-[#1463ff] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#0d4cdb]"
                >
                  Chiến luôn!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
