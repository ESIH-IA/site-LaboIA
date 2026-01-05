# LaCDIA Website

Phase 1 established the technical foundation. Phase 2 adds CMS-driven rich pages and user journeys. Phase 3 adds SEO, i18n structure, compliance, analytics, and newsletter. Phase 4 completes multilingual content support, advanced search/navigation, enriched scientific resources, institutional workflows, governance, and quality monitoring.

Design polish completed: institutional palette, redesigned header/footer, improved hero readability, and unified card/UI styling.

## Architecture

- Next.js App Router in `src/app/(site)`
- Sanity Studio at `/studio`
- Sanity schemas in `sanity/schemaTypes`
- Data access in `src/lib/sanity`
- Reusable UI cards in `src/components/cards`
- Portable text rendering in `src/components/content/portable-text.tsx`

## Environment variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_TOKEN=your_sanity_write_token
BREVO_API_KEY=your_brevo_key
BREVO_LIST_ID=123
BREVO_NOTIFY_EMAIL=contact@lacdia.example
BREVO_SENDER_EMAIL=notifications@lacdia.example
NEXT_PUBLIC_MATOMO_URL=https://analytics.example.org/
NEXT_PUBLIC_MATOMO_SITE_ID=1
# or
NEXT_PUBLIC_GA4_ID=G-XXXXXXX
```

## CMS setup (Sanity)

1. Create a Sanity project and dataset.
2. Set the environment variables.
3. Run the app and open `http://localhost:3000/studio` to manage content.

## Routes (Phase 4)

Core routes are implemented with placeholders and Sanity-backed lists:

- `/recherche`
- `/recherche/axes` and `/recherche/axes/[slug]`
- `/recherche/explorer`
- `/innovation`
- `/formation`
- `/formation/programmes/[slug]`
- `/projets` and `/projets/[slug]`
- `/publications` and `/publications/[slug]`
- `/publications/axes` and `/publications/axes/[slug]`
- `/equipe` and `/equipe/[slug]`
- `/actualites` and `/actualites/[slug]`
- `/actualites/evenements/[slug]`
- `/ressources`
- `/gouvernance`
- `/collaborer`
- `/contact`
- `/mentions-legales`
- `/confidentialite`
- `/cookies`
- `/newsletter`

## Content models (Sanity)

- project
- publication
- member
- partner
- event
- news
- offer
- program
- researchAxis
- institutionalPage
- resource
- formSubmission
- kpi
- labReport

## Phase 3 scope

- Institutional SEO metadata (title/description/OpenGraph/Twitter)
- Sitemap and robots (`/sitemap.xml`, `/robots.txt`)
- i18n structure with `/fr` and `/en` routes (cookie-based locale)
- Compliance pages (legal, privacy, cookies)
- Cookie consent banner + analytics gated by consent
- Newsletter subscribe/unsubscribe with Brevo (if configured)

Recommended institutionalPage slugs:

- recherche
- axes-recherche
- projets
- publications
- equipe
- innovation
- formation
- actualites
- collaborer
- contact
- mentions-legales
- confidentialite
- cookies
- newsletter
- ressources
- gouvernance

## Phase 2 scope

- Research landing + axes list/detail from CMS
- Publications list with filters + rich detail
- Team grouped by roles + member profiles
- Innovation and training pages with applied projects, partners, offers, programs
- News and events separated, with related projects/members
- Collaborer/Contact pages with simple institutional forms

## Phase 4 scope

- Multilingual-ready content with localized slugs and hreflang.
- Advanced search and scientific navigation (full-text search, filters, collections by axis).
- Enriched scientific resources (BibTeX, datasets, DOI, resources hub).
- Institutional forms with workflow (storage, statuses, notifications, history).
- Governance and lab life (internal seminars, annual reports, KPIs).
- Long-term quality (web-vitals monitoring hook, operational checklists).

Quality checklist: `docs/quality-checklist.md`.

## Design system (polish)

- Base: `bg-background` (off-white) and `text-foreground` (ink).
- Primary: `primary` (deep indigo) for institutional CTAs/links.
- Accent: `accent` (teal) and `accent-2` (subtle violet) for scientific/data highlights.
- Footer: `bg-footer` (night blue) with structured columns.

## Development

```bash
npm run dev
```

Route checks (server must be running):

```bash
npm run check:routes
```
