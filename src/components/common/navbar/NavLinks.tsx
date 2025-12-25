import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "../../../hooks/useTranslation";

const links = [
  { to: "/profile", labelKey: "profile" as const },
  { to: "/products", labelKey: "products" as const },
];

export default function NavLinks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="hidden md:flex items-center gap-2">
      {links.map((link) => {
        const isActive = currentPath === link.to;
        return (
          <button
            key={link.to}
            onClick={() => navigate({ to: link.to })}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
              isActive
                ? "bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-300 dark:from-purple-500/30 dark:to-pink-500/30 dark:text-purple-300 dark:border-purple-500/50"
                : "text-gray-700 hover:bg-gray-100/80 border-transparent dark:text-gray-300 dark:hover:bg-gray-800/50"
            }`}
          >
            {t.navigation?.[link.labelKey]}
          </button>
        );
      })}
    </div>
  );
}
