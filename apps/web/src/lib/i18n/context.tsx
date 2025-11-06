"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getTranslation, defaultLocale, type Locale } from "./index";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: typeof import("./translations/en").en;
  isRTL: boolean;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nbcon-locale") as Locale;
      return stored || initialLocale || defaultLocale;
    }
    return initialLocale || defaultLocale;
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("nbcon-locale", newLocale);
    }
  };

  const translations = getTranslation(locale);
  const isRTL = locale === "ar";

  useEffect(() => {
    // Update document direction and language
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = locale;
    }
  }, [locale, isRTL]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, translations, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

