"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale, TranslationType } from "@/locales/translations";

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("talecraft_lang") as Locale | null;
      if (saved && (saved === "es" || saved === "en")) {
        setLocaleState(saved);
        return;
      }

      if (typeof navigator !== "undefined" && navigator.language) {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("en")) {
          setLocaleState("en");
          localStorage.setItem("talecraft_lang", "en");
          return;
        }
      }

      setLocaleState("es");
      localStorage.setItem("talecraft_lang", "es");
    } catch {
      // Fallback a español silenciosamente
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("talecraft_lang", newLocale);
    } catch {}
  };

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    setLocale(next);
  };

  const t: TranslationType = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}
