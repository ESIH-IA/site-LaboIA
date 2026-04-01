import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

/**
 * Middleware i18n — Gestion du routage multi-langues
 *
 * Langues supportées : FR (défaut), EN, ES, HT (créole haïtien)
 *
 * Comportement :
 * - / → contenu en français (pas de préfixe)
 * - /en/... → contenu en anglais
 * - /es/... → contenu en espagnol
 * - /ht/... → contenu en créole haïtien
 *
 * La détection de langue utilise :
 * 1. Le préfixe dans l'URL
 * 2. Le cookie de préférence
 * 3. L'en-tête Accept-Language du navigateur
 * 4. La langue par défaut (français)
 */
export default createMiddleware(routing);

export const config = {
  // Exclure les fichiers statiques, API, Studio Sanity, etc.
  matcher: [
    // Match toutes les routes sauf celles listées
    "/((?!api|studio|_next|_vercel|.*\\..*|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
