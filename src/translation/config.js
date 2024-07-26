// config.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en";
import es from "./es";

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  detection: DETECTION_OPTIONS,
  resources,
});

export default i18n;
