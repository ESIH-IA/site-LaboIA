import { getLocale } from "next-intl/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  try {
    const locale = await getLocale();
    if (isLocale(locale)) return locale;
  } catch {
    // Fallback if called outside of next-intl context
  }
  return defaultLocale;
}
