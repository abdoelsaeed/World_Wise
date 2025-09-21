import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import ar from "./ar/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: localStorage.getItem("lang") || "en", // اللغة الافتراضية
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
