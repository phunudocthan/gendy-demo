"use client";
import { motion, AnimatePresence } from "framer-motion";

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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onCancel}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Mở khóa {lessonName}?
                </h2>
                <p className="text-gray-600 mb-6">
                  Bạn có muốn mở khóa bài học này để bắt đầu học không?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Mở khóa
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
