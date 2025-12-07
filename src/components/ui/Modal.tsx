import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "default" | "large";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "default",
}: ModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm transition-colors bg-gray-900/50 dark:bg-gray-900/80"
      />
      <div
        className={`relative w-full ${size === "large" ? "max-w-6xl" : "max-w-2xl"} max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border transition-all bg-white/95 border-gray-200/50 shadow-2xl shadow-blue-500/20 dark:bg-gray-800/95 dark:border-gray-700/50 dark:shadow-purple-500/20`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-0">
          <h2
            className="text-2xl font-bold transition-colors text-gray-900 dark:bg-linear-to-r dark:from-purple-400 dark:to-pink-400 dark:bg-clip-text dark:text-transparent"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 pt-6">{children}</div>
      </div>
    </div>
  );
}
