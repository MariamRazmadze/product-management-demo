import { useSnapshot } from "valtio";
import { appStore } from "../stores/appStore";
import { translations } from "../locales/translations";

export function useTranslation() {
  const { language } = useSnapshot(appStore);

  const t = translations[language];

  return { t, language, toggleLanguage: appStore.toggleLanguage };
}
