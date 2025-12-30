import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const Languages: string[] = ["uz", "ru", "en"];

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "uz",
      debug: false,
      supportedLngs: Languages,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["cookie", "localStorage"],
        lookupCookie: "lang",
        lookupLocalStorage: "lang",
        caches: ["cookie", "localStorage"],
      },
      backend: {
        loadPath: "/locales/{{lng}}/translation.json",
      },
    })
    .catch((err) => console.error("i18n init error:", err));

export default i18n;
