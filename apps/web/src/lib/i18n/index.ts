import { en } from "./translations/en";
import { ar } from "./translations/ar";

export type Locale = "en" | "ar";
export type TranslationKey = keyof typeof en;

export const translations = {
  en,
  ar,
} as const;

export const defaultLocale: Locale = "en";

export const supportedLocales: Locale[] = ["en", "ar"];

export function getTranslation(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale];
}

export function getNestedTranslation(
  locale: Locale,
  path: string
): string | undefined {
  const keys = path.split(".");
  let value: unknown = translations[locale];

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return typeof value === "string" ? value : undefined;
}

