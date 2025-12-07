import { useSnapshot } from "valtio";
import { themeStore } from "../../stores/themeStore";
import { useTranslation } from "../../hooks/useTranslation";

export default function Logo() {
  const { theme } = useSnapshot(themeStore);
  const { t } = useTranslation();

  return (
    <div className="flex items-center group cursor-pointer">
      <div
        className={`mr-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
          theme === "dark"
            ? "bg-linear-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
            : "bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50"
        }`}
      >
        <span className="text-white font-bold text-lg">M</span>
      </div>
      <h1
        className={`text-xl font-bold bg-linears-to-r bg-clip-text text-transparent transition-all duration-300 ${
          theme === "dark"
            ? "from-purple-400 via-pink-400 to-purple-400"
            : "from-blue-600 via-cyan-600 to-blue-600"
        }`}
      >
        {t.theme?.title || "My App"}
      </h1>
    </div>
  );
}
