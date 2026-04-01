import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/lib/i18n";

/**
 * Configuration du routage i18n.
 * Utilisé par le middleware et les composants de navigation.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  // La locale par défaut n'est PAS préfixée dans l'URL
  // / = français, /en = english, /es = español, /ht = kreyòl
  localePrefix: "as-needed",
});
