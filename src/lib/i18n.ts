export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

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
