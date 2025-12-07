import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const links = [
  { to: "/profile", label: "Profile" },
  { to: "/products", label: "Products" },
];

export default function MobileMenu() {
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigate = (to: string) => {
    navigate({ to });
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={handleToggle}
        className="md:hidden p-2 rounded-xl transition-all duration-300 relative z-110 text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-800/50"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-90 md:hidden" onClick={handleClose}>
          <div
            className="absolute inset-0 backdrop-blur-sm transition-colors bg-gray-900/50 dark:bg-gray-900/80"
          />
          <div
            className="absolute top-16 left-0 right-0 mx-4 mt-2 rounded-2xl backdrop-blur-xl border transition-all p-4 bg-white/95 border-gray-200/50 shadow-2xl shadow-blue-500/20 dark:bg-gray-900/95 dark:border-gray-700/50 dark:shadow-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              {links.map((link) => {
                const isActive = currentPath === link.to;
                return (
                  <button
                    key={link.to}
                    onClick={() => handleNavigate(link.to)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                      isActive
                        ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-300 dark:from-purple-500/30 dark:to-pink-500/30 dark:text-purple-300 dark:border-purple-500/50"
                        : "text-gray-700 hover:bg-gray-100/80 border-transparent dark:text-gray-300 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
