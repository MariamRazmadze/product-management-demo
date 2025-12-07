import { proxy } from "valtio";
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  return (saved as "light" | "dark") || "dark";
};

const applyTheme = (theme: "light" | "dark") => {
  if (typeof window === "undefined") return;

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
};

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const themeStore = proxy({
  theme: initialTheme,
  toggleTheme: () => {
    themeStore.theme = themeStore.theme === "light" ? "dark" : "light";
    applyTheme(themeStore.theme);
  },
});
