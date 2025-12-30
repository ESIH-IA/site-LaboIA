# CMS headless (Sanity) – Architecture proposée

## Pourquoi Sanity
- Page builder riche (Portable Text) pour les pages éditoriales sans code.
- Brouillons natifs + flux de relecture/publication.
- API de preview (draftMode) déjà supportée côté Next.js.

## Schémas à créer dans Sanity Studio
- `siteSettings` : identité, banner, logo, coordonnées.
- `newsletterSettings` : provider, endpoints, consentText.
- `kpi` : key, label, value, status (draft/confirmed), note.
- `partner` : type (partner/client/media/academic), tags, featured.
- `project` : type, status, overviewBlocks (Portable Text), portals[], related{partners,people,articles,documents}.
- `person` : role, bio, longBioBlocks (Portable Text), links[], related{projects,articles,documents}.
- `article` : category, date, summary, blocks (Portable Text), related{partners,projects,people,documents}, featured.
- `document` : type, file, related{people,projects,articles,partners}, notes.
- `page` : builder blocks pour les pages statiques.

## Rôles & workflow
- Admin : accès complet.
- Editor : crée/édite, passe en review.
- Publisher/Reviewer : valide et publie.
- Brouillon → review → publication. La preview des brouillons passe par `/api/preview` + secret.

## Variables d’environnement attendues
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION` (ex: `2024-01-01`)
- `SANITY_PREVIEW_SECRET`
- `SANITY_READ_TOKEN` (optionnel pour prévisualiser les brouillons côté serveur)

## Branchement côté Next.js
- Le code utilise un loader unique (`src/lib/content-loader.ts`) prêt à être relié aux requêtes Sanity.
- Ajouter `next-sanity` et configurer un client qui lit les schémas ci-dessus.
- Activer la preview Next.js via `/api/preview` pour afficher les documents en `draft`.

## Fallback si le CMS est vide
- Toutes les pages consomment une source de vérité unique (`src/content/*`).
- Si le CMS n’est pas disponible, les contenus statiques restent affichés (pas de blocage build).

## Instructions éditeur
1. Créer l’entrée (article, projet, membre…).
2. Renseigner les relations (related) pour faire remonter les contenus sur les pages liées.
3. Laisser `value` des KPI à `"—"` et `status` à `draft` tant qu’aucune validation n’a eu lieu.
4. Utiliser la preview pour vérifier la page avant publication.
5. Publier uniquement après relecture.
