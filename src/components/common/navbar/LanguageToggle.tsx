import { useSnapshot } from "valtio";
import { themeStore } from "../../../stores/themeStore";
import { useTranslation } from "../../../hooks/useTranslation";
import { LanguageIcon } from "../../icons/NavbarIcons";

export default function LanguageToggle() {
  const { theme } = useSnapshot(themeStore);
  const { toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className={`group relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
        theme === "dark"
          ? "bg-linear-to-r from-sky-500/20 to-cyan-500/20 text-sky-300 hover:from-sky-500/30 hover:to-cyan-500/30 border border-sky-500/30"
          : "bg-linear-to-r from-sky-50 to-cyan-50 text-sky-700 hover:from-sky-100 hover:to-cyan-100 border border-sky-200"
      }`}
      aria-label="Toggle language"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <LanguageIcon />
        <span className="hidden sm:inline">KA / EN</span>
      </span>
    </button>
  );
}
