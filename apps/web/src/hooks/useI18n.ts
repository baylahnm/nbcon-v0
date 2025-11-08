import { useContext } from "react";
import { I18nContext } from "../lib/i18n/context";

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  const { locale, setLocale, translations, isRTL } = context;

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback || key;
      }
    }

    return typeof value === "string" ? value : fallback || key;
  };

  return {
    locale,
    setLocale,
    t,
    isRTL,
    translations,
  };
}

