import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Proxy i18n — Gestion du routage multi-langues
 *
 * Langues supportées : FR (défaut), EN
 *
 * Comportement :
 * - / → redirige vers /fr (localePrefix: "always")
 * - /fr/... → contenu en français
 * - /en/... → contenu en anglais
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(fr|en)/:path*",
    "/((?!api|studio|_next|_vercel|.*\\..*|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
