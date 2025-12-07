import { proxy } from "valtio";

export const appStore = proxy({
  language: "ka" as "ka" | "en",
  toggleLanguage: () => {
    appStore.language = appStore.language === "ka" ? "en" : "ka";
  },
});
