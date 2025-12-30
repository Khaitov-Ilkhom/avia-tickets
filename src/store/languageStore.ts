import { create } from "zustand";
import i18next from "i18next";

interface LanguageStore {
  lang: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: typeof window !== 'undefined' ? localStorage.getItem("lang") || "uz" : "uz",
  setLanguage: (lang) => {
    i18next.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    set({ lang: lang });
  },
}));