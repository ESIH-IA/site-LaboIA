# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Site institutionnel multilingue (FR/EN) pour LaCDIA (labo de recherche IA), construit avec Next.js App Router et le CMS headless Sanity. Le contenu est hybride : Sanity CMS en source principale avec repli sur du contenu local statique quand Sanity n'est pas configuré.

## Commands

```bash
npm run dev              # Serveur de dev (Next.js)
npm run build            # Build de prod — utilise --webpack (pas Turbopack, malgré la config turbopack.root dans next.config.ts)
npm run start             # Lance le build de prod
npm run lint              # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npm run check:routes      # Ping un ensemble de routes clefs (nécessite que le serveur tourne ; utilise SITE_URL/NEXT_PUBLIC_SITE_URL)
npm run sanity:seed       # Seed initial du contenu Sanity (nav, home, solutions, gouvernance...) — nécessite SANITY_API_TOKEN
npm run translate         # Traduction auto FR→EN (scripts/auto-translate.mjs) — seul EN est supporté (ES/HT retirés)
npm run translate:en      # Idem, cible explicite
```

Il n'y a pas de suite de tests configurée dans ce repo.

Sanity Studio est embarqué dans l'app Next.js : `npm run dev` puis ouvrir `/studio`.

## Architecture

### i18n — attention aux pièges

- Le fichier middleware s'appelle **`src/proxy.ts`** (pas `middleware.ts`) et enregistre `next-intl`'s `createMiddleware`.
- Les locales actives sont `fr` (défaut) et `en`, définies dans `src/lib/i18n.ts` (`locales`). ES et HT ont été retirés (fichiers de messages, scripts `translate:*`, matcher du proxy) — ne pas les réintroduire sans décision produit explicite.
- Toute copie UI statique sans backing CMS (labels, aria-labels, contenu de repli des composants) doit passer par `next-intl` (`src/messages/{fr,en}.json` + `useTranslations`/`getTranslations`) — un seul système de traduction, pas de dictionnaire ad-hoc par composant. Le contenu éditorial (pages, axes, actualités...) reste piloté par Sanity (`localeString`/`localeText`).
- `localePrefix: "always"` — toute URL est préfixée (`/fr/...`, `/en/...`), `/` redirige vers `/fr`.
- Helpers de routing : `src/i18n/routing.ts`, `src/i18n/navigation.ts` (Link/redirect localisés), `src/i18n/request.ts` (config next-intl). `src/lib/i18n-server.ts` expose `getServerLocale()` pour les Server Components/Route Handlers.

### Routing — `src/app/[locale]/(site)/...` est la seule arborescence active

- L'ancienne arborescence dupliquée sans `[locale]` (`src/app/(site)/...`) a été supprimée (newsletter, solutions, actualites). Il ne reste que `src/app/(site)/equipe/page.tsx`, un stub qui ne fait que `redirect("/")` — gardé volontairement comme trace du pattern de masquage temporaire (voir ci-dessous), pas du code mort à nettoyer par erreur.
- `src/app/[locale]/(site)/[...slug]/page.tsx` est le catch-all générique : il résout un `genericPage` Sanity par slug et le rend via `PageBuilder` (`src/components/page-builder.tsx`), un renderer de blocs (`heroBlock`, `textImageBlock`, `featuresBlock`, `kpisBlock`, `ctaBlock`, `latestNewsBlock`...). Ce catch-all exclut explicitement `studio` et `api` en premier segment.
- **`/actualites` (listing) est retiré définitivement** : `next.config.ts` redirige `/actualites`, `/fr/actualites`, `/en/actualites` vers l'accueil, où les actualités sont affichées directement (`ActualitesSection`). Les pages de détail (`/actualites/[slug]`, `/actualites/evenements/[slug]`) restent actives.
- **`/equipe` est temporairement masqué** (redirection dans `next.config.ts`, 3 lignes réversibles), en attendant une consolidation du contenu équipe — décision produit, pas un bug. Ne pas la lever sans confirmation. Les fiches individuelles `/equipe/[slug]` restent actives (liens d'attribution depuis publications/projets/événements/formations) et ne sont pas concernées par cette redirection.

### Contenu hybride (Sanity + fallback local)

- `src/lib/sanity/client.ts` expose `isSanityConfigured` (vrai seulement si `NEXT_PUBLIC_SANITY_PROJECT_ID`/`SANITY_PROJECT_ID`, dataset et version d'API sont tous présents) et `sanityFetch(query, params, fallback)` qui **retourne `fallback` silencieusement si Sanity n'est pas configuré** — l'app doit donc rester fonctionnelle sans Sanity connecté.
- `src/lib/cms.ts` est le point d'entrée principal pour les pages : agrège les requêtes GROQ (`src/lib/sanity/queries.ts`) par page (`getSiteSettings`, `getNavigation`, `getHomeData`, `getSolutionsPageData`, `getGovernancePageData`, ...) et retourne des objets « empty » typés quand Sanity est absent, jamais `null`/`undefined`.
- `src/lib/content-loader.ts` + `src/lib/content-types.ts` fournissent un contenu **local statique** (`src/content/*`) utilisé en repli/complément. `getArticles()` et consorts sont partiellement orphelins depuis la suppression de la page listing actualités — à vérifier avant de s'appuyer dessus.
- Il existe **deux clients Sanity distincts** : `src/lib/sanity/client.ts` (lecture, utilisé par `cms.ts`/les pages) et `src/sanity/lib/client.ts` (utilisé par le Studio / live preview sous `src/sanity/`). `src/lib/sanity/write-client.ts` gère les écritures (soumissions de formulaires).
- Le schéma Sanity complet est dans un seul fichier : `src/sanity/schemaTypes/index.ts` (~47 `defineType`). Les champs multilingues utilisent des objets `localeString`/`localeText`/`localeBlockContent` avec des clés `fr`/`en`.

### API routes

- `POST /api/forms/submit` — enregistre dans Sanity, notifie par email via Brevo si configuré.
- `POST /api/newsletter/subscribe` / `POST /api/newsletter/unsubscribe` — via Brevo si configuré. Le formulaire de désinscription (`NewsletterUnsubscribeForm`) est rendu **inconditionnellement** sur `/newsletter` (pas seulement si un éditeur configure une section CMS `formType: "unsubscribe"`) — fonctionnalité compliance-sensible, ne doit pas dépendre d'une config Sanity oubliée.
- `GET /api/preview` — active le mode preview Sanity (`secret`).

### Déploiement

- **Vercel est l'unique cible de déploiement** (Netlify a été abandonné — `netlify.toml` supprimé — décision explicite pour ne plus avoir deux datasets Sanity divergents à maintenir).
- **Un seul projet Sanity canonique : `fghn7rpw`** (dataset `production`), configuré dans `vercel.json`, `.env.local` et le dashboard Vercel (Project Settings → Environment Variables — c'est le dashboard qui fait foi en cas de divergence avec `vercel.json`). L'ancien projet `3rg8hwul` ("LaCDIA") existe toujours dans l'organisation Sanity mais n'est plus utilisé — ne pas y écrire, son contenu a divergé (nav, etc.) et il sera supprimé/archivé séparément.
- `next.config.ts` autorise déjà `cdn.sanity.io` pour `next/image` et transpile les packages `sanity`/`@sanity/ui`/`@sanity/icons`.

### Styling

Tailwind CSS v4, configuré via `src/app/globals.css` (pas de `tailwind.config` séparé attendu — vérifier ce fichier pour les tokens/thème avant d'ajouter des classes custom).
