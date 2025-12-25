import { useNavigate } from "@tanstack/react-router";
import { useSnapshot } from "valtio";
import { AuthStore } from "../../../stores/authStore";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "../../../hooks/useTranslation";
import { LogoutIcon } from "../../icons/NavbarIcons";

export default function UserMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const authState = useSnapshot(AuthStore);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  if (!authState.isAuthenticated || !authState.user) {
    return null;
  }

  return (
    <div
      className="flex items-center gap-3 ml-3 pl-3 border-l transition-colors border-gray-300/50 dark:border-gray-700/50"
    >
      <button
        onClick={() => navigate({ to: "/profile" })}
        className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
      >
        <div className="relative">
          <img
            src={authState.user.image}
            alt={authState.user.username}
            className="w-9 h-9 rounded-full ring-2 ring-offset-2 transition-all duration-300 group-hover:ring-4 group-hover:scale-105 ring-blue-500 ring-offset-white dark:ring-purple-500 dark:ring-offset-gray-900"
          />
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 bg-emerald-500 border-white dark:bg-emerald-400 dark:border-gray-900"
          />
        </div>
        <span
          className="text-sm font-semibold hidden sm:block transition-colors text-gray-700 dark:text-gray-200"
        >
          {authState.user.firstName}
        </span>
      </button>
      <button
        onClick={handleLogout}
        className="group relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden bg-linear-to-r from-red-50 to-rose-50 text-red-600 hover:from-red-100 hover:to-rose-100 border border-red-200 hover:shadow-lg hover:shadow-red-500/20 dark:from-red-500/20 dark:to-pink-500/20 dark:text-red-300 dark:hover:from-red-500/30 dark:hover:to-pink-500/30 dark:border-red-500/30"
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <LogoutIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="hidden sm:inline">{t.profile.logout}</span>
        </span>
      </button>
    </div>
  );
}
