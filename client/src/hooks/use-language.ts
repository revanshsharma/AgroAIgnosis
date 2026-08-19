import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Language, TRANSLATIONS, Translations, REGION_LANGUAGE_MAP, LANGUAGE_NAMES } from "@/i18n/translations";

const LANGUAGE_KEY = "krishimitra_language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languageName: string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: TRANSLATIONS.en,
  languageName: "English",
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLanguageState(region?: string) {
  const getInitialLanguage = (): Language => {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (stored && TRANSLATIONS[stored]) return stored;
    if (region && REGION_LANGUAGE_MAP[region]) return REGION_LANGUAGE_MAP[region];
    return "en";
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (region && !localStorage.getItem(LANGUAGE_KEY)) {
      const mapped = REGION_LANGUAGE_MAP[region];
      if (mapped) setLanguageState(mapped);
    }
  }, [region]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  }, []);

  return {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
    languageName: LANGUAGE_NAMES[language],
    LANGUAGE_NAMES,
  };
}
