import { getRequestConfig } from "next-intl/server";
import { type Locale, defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Configuration next-intl côté serveur.
 * Charge les messages JSON pour la locale demandée.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
