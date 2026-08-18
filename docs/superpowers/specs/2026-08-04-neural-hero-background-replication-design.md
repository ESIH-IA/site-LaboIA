# Réplication du fond réseau neuronal sur les heroes des autres pages

## Contexte

Le hero de la page d'accueil (`src/components/home/hero.tsx`) affiche un canvas animé
("réseau neuronal" : particules connectées, réactives au curseur, dégradé teal/violet)
en fond plein écran. Les heroes des autres pages (institutionnelles via
`EditableSection` dans `editable-page-view.tsx`, et la page `/solutions`) utilisent
à la place un fond sombre uni avec un simple motif de grille statique
(`.section-pattern.grid-pattern.pattern-40`).

Demande : répliquer le fond animé de l'accueil sur la première section (hero) de
toutes les autres pages, **sauf `/contact`**, pour une identité visuelle cohérente.

## Design approuvé

**Composant partagé** : extraire `NeuralCanvas` et `GrainOverlay` de `hero.tsx` vers
`src/components/shared/neural-hero-background.tsx`, exporté comme un composant
`NeuralHeroBackground` sans dépendance au contexte de la page d'accueil (badge,
titre, CTA restent propres à chaque page/section).

**Points d'intégration** :
1. `EditableSection` (`editable-page-view.tsx`) — quand `section.variant === "heroDark"`,
   rendre `NeuralHeroBackground` en fond à la place du `grid-pattern` statique. Couvre
   automatiquement toutes les pages institutionnelles (à propos, département
   scientifique, LaCDIA Tech, collaborer, axes de recherche, formation, publications,
   ressources, newsletter, mentions légales, confidentialité, cookies, conditions
   d'utilisation).
2. Page `/solutions` (`src/app/[locale]/(site)/solutions/page.tsx`) — même composant
   sur sa section hero custom.

**Exclusion** : la page `/contact` n'affiche pas le canvas — un prop
`excludeSlug`/condition sur le slug de page (ou simplement ne pas passer le composant
pour ce cas précis dans `EditablePageView`) évite la distraction visuelle derrière le
formulaire de contact.

**Comportement** : identique et interactif partout (canvas animé, réactif au
curseur, respect de `prefers-reduced-motion`) — pas de version allégée. La densité de
particules est déjà calculée depuis la surface réelle du parent (`W × H`), donc elle
s'adapte naturellement aux heroes plus compacts sans configuration par page.

## Vérification

- `npm run lint` et `npm run build`.
- Captures d'écran (via l'outil navigateur) d'au moins 3 pages représentatives :
  une page institutionnelle (ex. à propos), `/solutions`, et `/contact` pour
  confirmer l'exclusion — vérifier la lisibilité du texte sur les titres plus courts.
