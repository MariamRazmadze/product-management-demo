import { proxy } from "valtio";

type Language = "ka" | "en";

type AppState = {
  language: Language;
};

const initialState: AppState = {
  language: "ka",
};

export const appStore = proxy<AppState>(initialState);

export const AppActions = {
  toggleLanguage: () => {
    appStore.language = appStore.language === "ka" ? "en" : "ka";
  },

  setLanguage: (language: Language) => {
    appStore.language = language;
  },
};
