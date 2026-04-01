import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Middleware i18n — Gestion du routage multi-langues
 *
 * Langues supportées : FR (défaut), EN, ES, HT (créole haïtien)
 *
 * Comportement :
 * - / → redirige vers /fr (localePrefix: "always")
 * - /fr/... → contenu en français
 * - /en/... → contenu en anglais
 * - /es/... → contenu en espagnol
 * - /ht/... → contenu en créole haïtien
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match la racine explicitement
    "/",
    // Match les chemins avec préfixe locale
    "/(fr|en|es|ht)/:path*",
    // Match tous les autres chemins sauf fichiers statiques, API, Studio
    "/((?!api|studio|_next|_vercel|.*\\..*|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
