# Refonte visuelle homepage — alternance de tons cohérente

Date : 2026-08-04
Statut : validé pour implémentation (writing-plans)

## Contexte

Audit visuel de la homepage (`src/app/[locale]/(site)/page.tsx`) mené en direct via
`chrome-devtools` (captures à 1440×900, page complète + détail par section) sur le
serveur de dev. Constat : le fond reste identique (`--labo-bg` #0a0f1c) du hero au
footer, sans respiration entre sections, et trois sections consécutives (KPIs, Axes
de recherche, Équipe) réutilisent la même recette de carte (carte sombre arrondie,
badge icône, mini-tag mono, bordure gradient), ce qui donne une impression de
répétition plutôt que de progression en scrollant.

**Découverte pendant l'audit du code** : `src/app/globals.css` documente déjà un
système « LaCDIA Dual Identity » complet et nommé — palette LABO (sombre,
`--labo-*`) et palette TECH (crème `#F8F7F4`, `--tech-*`), avec des classes de
section prêtes à l'emploi (`.section-labo`, `.section-labo-surface`,
`.section-tech`, `.section-tech-surface`). Ce système est quasiment inutilisé en
pratique : seul `Intro` (`src/components/home/intro.tsx`) référence `--tech-bg`/
`--tech-text`, en inline style, pour une carte flottante isolée — pas via les
classes `.section-tech*` prévues, et pas en pleine largeur. `.section-labo-surface`
est actuellement un doublon strict de `.section-labo` (même background), donc ne
crée aucune différenciation malgré son nom.

La refonte ci-dessous **active et complète ce système existant** plutôt que d'en
inventer un nouveau — moins de code, cohérence avec l'intention déjà posée dans la
base de code.

## Objectif

Faire alterner les sections de la homepage selon 3 tons établis, avec une seule
rupture claire forte (signature), et différencier structurellement la section
Équipe des grilles de cartes KPIs/Axes qui l'entourent.

## Cadence retenue

| Ordre | Section | Composant | Ton | Classe/fond |
|---|---|---|---|---|
| 1 | Hero | `hero.tsx` | Vide (inchangé) | `--labo-bg` |
| 2 | Ticker | `ticker.tsx` | connecteur (inchangé) | — |
| 3 | Intro | `intro.tsx` | **Élevé** | `.section-labo-surface` → `--labo-surface` |
| 4 | KPIs | `kpis.tsx` | Vide | `.section-labo` |
| 5 | Axes de recherche | `highlights.tsx` | **Élevé** | `.section-labo-surface` |
| 6 | Équipe | `team.tsx` | **Clair (signature)** | `.section-tech` |
| 7 | Actualités | `actualites-section.tsx` | Vide (inchangé) | `.section-labo` |
| 8 | Partenaires | `partners.tsx` | **Élevé** | `.section-labo-surface` |
| 9 | CTA collaboration | `collaborate-cta.tsx` | Vide (inchangé) | `.section-labo` |
| 10 | Footer | `footer.tsx` | inchangé | — |

Rythme obtenu : `Vide → Élevé → Vide → Élevé → CLAIR → Vide → Élevé → Vide`.

**Décision** : la palette crème (TECH) reste réservée exclusivement à la section
Équipe. Elle est retirée d'Intro (qui passe en panneau élevé sombre) pour
concentrer la rupture de ton en un seul endroit fort plutôt que de la diluer à
deux moments — cohérent avec le principe « dépenser son audace à un seul endroit ».

## Détail par section

### Intro (`src/components/home/intro.tsx`)
- Retirer la carte flottante `rounded-3xl` + inline `--tech-bg`/`--tech-text`.
- Passer la `<section>` en `.section-labo-surface` pleine largeur (au lieu de
  `.section-labo`), avec le contenu (eyebrow, titre, corps, CTA) directement dans
  le conteneur, sans carte imbriquée.
- Garder le liseré gradient teal→violet en haut de section (repris de l'actuel
  `absolute h-px` du haut de carte) comme signature de transition entre le hero et
  ce premier palier.

### KPIs (`src/components/home/kpis.tsx`)
- Remplacer la grille bento 6 colonnes (`SLOTS`) par un **bandeau horizontal**
  unique : items alignés en ligne (flex), séparés par des séparateurs verticaux
  fins (`border-right: 1px solid var(--labo-border)`), qui s'empile en colonne sur
  mobile. Ce format absorbe n'importe quel nombre d'items sans ligne orpheline —
  corrige le bug actuel où le 4ᵉ KPI (sur une grille à 3 colonnes) se retrouvait
  seul, étiré pleine largeur.
- Retirer `ArcRing` (anneaux de progression décoratifs sans valeur affichée) au
  profit d'un simple soulignement dégradé teal→violet sous chaque chiffre.
- Garder `useCounter` (animation de comptage) et l'`IntersectionObserver` de
  déclenchement, inchangés.
- Le compteur `Projets en cours: 0` est un problème de contenu (CMS), pas de
  design — hors scope.

### Axes de recherche (`src/components/home/highlights.tsx`)
- Structure inchangée : grille 3×2 de `AxeCard` numérotées 01–06. La numérotation
  reste justifiée ici (catalogue réel de 6 axes de recherche, l'ordre a un sens de
  référence), donc pas de refonte structurelle — seul le fond de section change
  (`.section-labo-surface` au lieu de `.section-labo`), ce qui suffit à la
  distinguer visuellement du bandeau KPI juste au-dessus.
- `card-premium`/`card-spotlight` : le style de carte (`rgba(255,255,255,0.03)`
  translucide) doit rester lisible sur le nouveau fond `--labo-surface` (plus
  clair que `--labo-bg`) — vérifier le contraste des bordures/texte pendant
  l'implémentation, ajuster `--card-accent` si besoin.

### Équipe (`src/components/home/team.tsx`) — refonte structurelle
- Section passe en `.section-tech` (fond crème `--tech-bg` #f8f7f4, texte
  `--tech-text` #0a0f1c) — seule occurrence de la palette claire sur la homepage.
- Remplacer la grille uniforme 3 colonnes de `TeamCard` par une **disposition en
  chaîne de nœuds reliés** (écho du champ de particules/constellation du hero,
  mais inversé : traits/nœuds sombres sur fond clair) :
  - Les 6 catégories (`categories` depuis `home.team.categories`) deviennent des
    nœuds positionnés en zigzag (alternance haut/bas), reliés par un tracé fin
    (SVG `path` ou bordure pointillée), taille du nœud proportionnelle au badge
    numérique de la catégorie.
  - Pas de numérotation (01/02/03) sur ces nœuds : ce n'est pas une séquence, à
    la différence des axes de recherche.
  - En dessous (ou intégré), garder le bandeau de stats existant (`stats`), adapté
    aux couleurs du fond clair.
  - Mobile : le zigzag se linéarise en tracé vertical simple (nœuds empilés, trait
    vertical), pas de réinvention du contenu.
- Icônes (`CATEGORY_META`) et couleurs d'accent teal/violet conservées, mais les
  usages de couleur d'accent comme **texte** sur fond clair doivent utiliser une
  variante assombrie pour le contraste AA (`--tech-accent-teal: #00b894` existe
  déjà dans le système ; vérifier/ajouter l'équivalent violet assombri si utilisé
  en texte). Les couleurs vives actuelles restent utilisables telles quelles pour
  les éléments graphiques (nœuds, traits, icônes) qui n'ont pas de contrainte de
  contraste texte.

### Partenaires (`src/components/home/partners.tsx`)
- Remplacer `.partner-tile-grid` (CSS grid `repeat(auto-fit, minmax(180px,200px))`,
  qui laisse un grand vide dès qu'il y a peu d'items) par une **rangée centrée en
  flex-wrap** (`justify-content: center`), tuiles de taille fixe cohérente.
- Ajouter une tuile finale « fantôme » en pointillés (`border: 1px dashed
  var(--labo-border)`) avec le texte du CTA existant (`badge`/lien de contact) —
  agit comme un slot « devenez partenaire » toujours présent, qui rend la rangée
  volontaire à 1 logo comme à 10.
- Section passe en `.section-labo-surface` (ton Élevé) au lieu de `.section-labo`.

### CSS (`src/app/globals.css`)
- Corriger `.section-labo-surface` pour qu'elle utilise réellement
  `background-color: var(--labo-surface)` (actuellement dupliquée sur
  `--labo-bg`, donc sans effet).
- Vérifier/compléter les tokens `--tech-accent-*` nécessaires au contraste texte
  dans la section Équipe (voir ci-dessus).
- `prefers-reduced-motion` : le tracé de connexion de la section Équipe doit avoir
  un état statique équivalent (pas d'animation de dessin de trait) quand la
  préférence est active — dans la continuité de ce qui existe déjà pour
  `card-premium`.

## Hors scope
- Hero, Ticker, Actualités, CTA finale, Footer : inchangés (déjà satisfaisants ou
  hors du problème identifié).
- Contenu CMS (valeurs KPI à 0, nombre de partenaires) : problème de contenu, pas
  de design.
- Pages hors homepage (gouvernance, axes de recherche, actualités détail) : hors
  scope de cet audit.

## Points à vérifier en implémentation
- Contraste AA des couleurs d'accent teal/violet utilisées en texte sur le fond
  crème de la section Équipe (mesurer, assombrir si besoin — pas de valeur figée
  ici, à valider visuellement).
- Le tracé de connexion en zigzag pour l'Équipe est décrit conceptuellement ci-
  dessus (nœuds + tracé, pas de grille) ; le détail d'implémentation (SVG path vs
  bordures/pseudo-éléments positionnés) est laissé à l'étape de plan.
