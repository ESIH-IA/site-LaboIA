# /equipe (Team) — Sanity editorial workflow

La page **Équipe** est distincte de **Gouvernance** :
- **Équipe** filtre uniquement via `person.teamGroup` (`research` / `associate`)
- **Gouvernance** filtre uniquement via `person.governanceGroup` (ne pas mélanger)

## 1) Créer / mettre à jour les personnes (`person`)

Champs clés pour `/equipe` :
- `teamGroup` (**obligatoire**) :
  - `research` : membres actifs de l’équipe de recherche
  - `associate` : chercheurs associés / contributeurs externes
- `roleTitle` (**obligatoire**), `photo` (**obligatoire**), `expertise` (**min 1**)
- `longBio` (**obligatoire**, max 3000 caractères) : affiché en extrait + modal “Read more”
- `affiliation` (optionnel), `links` (ORCID / Scholar / LinkedIn / Website)
- `order` (optionnel) : tri en premier si renseigné (sinon alphabétique)

Règle : Patrick Attié doit avoir un rôle institutionnel (gouvernance) et **ne pas** être `teamGroup = research`.

## 2) Créer la page (`teamPage`)

Créer 1 document `teamPage` :
- `slug`: `equipe`
- `status`: `published`
- Section 1 (intro) :
  - `title` (H1)
  - `intro` (Portable Text)
- Section 2 :
  - `researchSectionTitle`
  - `emptyResearchText` (si aucun membre `research`)
- Section 3 :
  - `associatesSectionTitle`
  - `associateBadgeLabel` (badge sur les cartes “associate”)
  - `emptyAssociatesText`
- UI :
  - `readMoreLabel` (libellé du bouton)

## 3) Résultat

- `/en/equipe` affiche exactement 3 sections : Intro, Research Team, Associate Researchers & Contributors.
- Aucun organigramme n’est affiché sur cette page.

