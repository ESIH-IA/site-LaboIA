# LaCDIA Website

Site institutionnel multilingue (FR/EN) pour LaCDIA, construit avec Next.js App Router et un CMS headless Sanity. Le site couvre les pages de recherche, publications, projets, equipe, actualites, ressources, solutions, etc., avec formulaires et newsletter.

## Fonctionnalites

- Routing FR/EN avec prefixe de langue et cookie de preference (`lacdia_locale`).
- SEO complet : metadata, Open Graph, sitemap et robots.
- Contenu hybride : contenu local (`src/content`) + contenu dynamique Sanity.
- Formulaires (collaborer/contact) stockes dans Sanity, notification email optionnelle via Brevo.
- Newsletter (inscription/desinscription) via Brevo si configure.
- Analytics Matomo ou GA4, actives apres consentement cookies.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS (config dans `src/app/globals.css`)
- Sanity (client + queries dans `src/lib/sanity`)

## Structure du projet

- `src/app/(site)` pages du site
- `src/app/api` endpoints (forms, newsletter, preview)
- `src/components` composants UI
- `src/content` contenu local (fallback)
- `src/data` donnees structurees (gouvernance, solutions)
- `src/lib` utilitaires (i18n, SEO, Sanity)
- `public` assets

## Variables d'environnement

Creez un fichier `.env.local` (ou variables d'environnement sur l'hebergeur) :

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity (lecture)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
# Alternatives cote serveur (optionnelles)
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01

# Sanity (ecriture, formulaires)
SANITY_API_TOKEN=your_sanity_write_token

# Preview
SANITY_PREVIEW_SECRET=your_preview_secret

# Brevo (newsletter + notifications)
BREVO_API_KEY=your_brevo_key
BREVO_LIST_ID=123
BREVO_NOTIFY_EMAIL=contact@lacdia.example
BREVO_SENDER_EMAIL=notifications@lacdia.example

# Analytics (choisir Matomo ou GA4)
NEXT_PUBLIC_MATOMO_URL=https://analytics.example.org/
NEXT_PUBLIC_MATOMO_SITE_ID=1
# ou
NEXT_PUBLIC_GA4_ID=G-XXXXXXX
```

## Scripts

```
npm run dev
npm run build
npm run start
npm run lint
npm run check:routes
npm run sanity:seed
```

`check:routes` verifie un ensemble de routes clefs. Il utilise `SITE_URL` ou `NEXT_PUBLIC_SITE_URL` et suppose que l'app tourne deja.

## Sanity Studio & migration

- Le Studio est integre dans l'app : lancer `npm run dev` puis ouvrir `/studio`.
- La commande `npm run sanity:seed` initialise un contenu de base (navigation, home, solutions, gouvernance, etc.). Elle requiert `SANITY_API_TOKEN`.
- Les collections publications, axes, ressources et formations sont a completer dans le Studio si besoin.

## Endpoints API

- `POST /api/forms/submit` : enregistre une demande dans Sanity, envoie un email via Brevo si configure.
- `POST /api/newsletter/subscribe` : inscription newsletter (Brevo si configure).
- `POST /api/newsletter/unsubscribe` : desinscription newsletter (Brevo si configure).
- `GET /api/preview?secret=...` : active le mode preview (Sanity).

## Deploiement

1. Installer les dependances : `npm install`
2. Build : `npm run build`
3. Run : `npm run start`
4. Verifier que les variables d'environnement sont presentes.

Le domaine `cdn.sanity.io` est deja autorise pour `next/image`.
