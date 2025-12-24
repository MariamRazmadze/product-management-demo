import { proxy, subscribe } from "valtio";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
};

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  return (saved as Theme) || "dark";
};

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

applyTheme(initialState.theme);

export const themeStore = proxy<ThemeState>(initialState);

export const ThemeActions = {
  toggleTheme: () => {
    themeStore.theme = themeStore.theme === "light" ? "dark" : "light";
  },

  setTheme: (theme: Theme) => {
    themeStore.theme = theme;
  },
};

subscribe(themeStore, () => {
  applyTheme(themeStore.theme);
});
