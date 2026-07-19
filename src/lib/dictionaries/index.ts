import bn from "./bn";
import en from "./en";
import type { Dictionary } from "./bn";

export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bn";

const dictionaries: Record<Locale, Dictionary> = { bn, en };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries[defaultLocale];
}

export function asLocale(locale: string): Locale {
  return (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : defaultLocale;
}

export type { Dictionary };
