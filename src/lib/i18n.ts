/**
 * Configuration i18n — Langues supportées par LaCDIA
 *
 * fr : Français (langue par défaut)
 * en : English
 * es : Español
 * ht : Kreyòl ayisyen (Haitian Creole)
 */
export const locales = ["fr", "en", "es", "ht"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Noms lisibles des langues (dans leur propre langue) */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  ht: "Kreyòl",
};

/** Drapeaux emoji pour affichage */
export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
  ht: "🇭🇹",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (isLocale(first)) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

export function localizedPath(path: string, locale: Locale) {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}
