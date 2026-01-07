# Configuration "Direction & Gouvernance" (Sanity)

Ce guide correspond \u00e0 la nouvelle structure stricte de la page `/gouvernance` :
- Section 1 : **Organigramme** (org chart)
- Section 2 : **Membres** (grille de profils filtr\u00e9e via `person.governanceGroup`)

## 1) Cr\u00e9er les personnes (documents `person`)

Cr\u00e9er 4 documents `person` :

- **Patrick ATTIE**
  - `roleTitle`: Directeur g\u00e9n\u00e9ral
  - `governanceGroup`: direction
  - `affiliation`: ESIH
- **Livenson NICOLAS**
  - `roleTitle`: Ing\u00e9nieur IA (Syst\u00e8mes Multi-Agents)
  - `governanceGroup`: gouvernance
- **A\u00efshael PICARD**
  - `roleTitle`: Responsable scientifique (IA & Data Science)
  - `governanceGroup`: direction
- **B\u00e9n\u00e9dique PAUL**
  - `roleTitle`: Ing.-agro\u00e9conomiste, PhD, HDR
  - `governanceGroup`: comite_scientifique
  - `affiliation`: FSAE/UniQ

Optionnel :
- `photo`, `expertise`, `links`
- `longBio` (jusqu\u2019\u00e0 3000 caract\u00e8res) : affich\u00e9 avec \u201cLire la suite\u201d dans la grille.
- `order` : utilis\u00e9 si `governancePage.membersOrder = orderAsc`.

## 2) Cr\u00e9er les unit\u00e9s (documents `orgUnit`)

Cr\u00e9er 3 documents `orgUnit` :

- **Coll\u00e8ge des fondateurs**
  - `members`: Patrick, Livenson, A\u00efshael
  - `colorKey`: indigo (ex.)
- **Comit\u00e9 scientifique**
  - `members`: B\u00e9n\u00e9dique (et futurs membres)
  - `colorKey`: slate (ex.)
- **\u00c9quipe de recherche**
  - `members`: A\u00efshael, Livenson
  - `colorKey`: teal (ex.)

Optionnel : `lead` pour mettre en avant un responsable d\u2019unit\u00e9, et `order` pour l\u2019ordre global.

## 3) Cr\u00e9er les n\u0153uds (documents `orgNode`)

Cr\u00e9er les n\u0153uds (exemple de hi\u00e9rarchie) :

1. **Root node**
   - `label`: Fondation / Institution porteuse (ESIH)
   - `orgUnit`: cr\u00e9er une unit\u00e9 d\u00e9di\u00e9e (ex. \u201cInstitution porteuse (ESIH)\u201d) m\u00eame sans membres
2. **Coll\u00e8ge des fondateurs**
   - `label`: Coll\u00e8ge des fondateurs
   - `orgUnit`: r\u00e9f\u00e9rence vers l\u2019unit\u00e9 \u201cColl\u00e8ge des fondateurs\u201d
3. **Direction scientifique**
   - `label`: Direction scientifique
   - `person`: r\u00e9f\u00e9rence vers A\u00efshael PICARD
4. **Comit\u00e9 scientifique**
   - `label`: Comit\u00e9 scientifique
   - `orgUnit`: r\u00e9f\u00e9rence vers l\u2019unit\u00e9 \u201cComit\u00e9 scientifique\u201d
5. **\u00c9quipe de recherche**
   - `label`: \u00c9quipe de recherche
   - `orgUnit`: r\u00e9f\u00e9rence vers l\u2019unit\u00e9 \u201c\u00c9quipe de recherche\u201d

Renseigner `children` pour former l\u2019arbre :

- Root node `children`: [Coll\u00e8ge des fondateurs]
- Coll\u00e8ge des fondateurs `children`: [Direction scientifique]
- Direction scientifique `children`: [Comit\u00e9 scientifique, \u00c9quipe de recherche]

Pour l\u2019ordre horizontal \u00e0 un m\u00eame niveau, utiliser le champ `order` sur les `orgNode` enfants.

## 4) Cr\u00e9er le graphe (document `orgChart`)

- `title`: Organigramme LaCDIA
- `slug`: organigramme-lacdia (ex.)
- `rootNode`: r\u00e9f\u00e9rence vers le Root node cr\u00e9\u00e9 ci-dessus

## 5) Cr\u00e9er la page (document `governancePage`)

- `title`: Direction & Gouvernance
- `slug`: gouvernance
- `status`: published
- `intro`: contenu d\u2019introduction
- Section **Organigramme** :
  - `showOrgChart`: true
  - `orgChart`: r\u00e9f\u00e9rence vers le document `orgChart`
  - `orgChartSectionTitle`: Organigramme (ou autre)
  - `orgChartSectionIntro`: (optionnel)
- Section **Membres** :
  - `showMembers`: true
  - `membersSectionTitle`: Membres (ou autre)
  - `membersSectionIntro`: (optionnel)
  - `membersGroupsToShow`: direction / gouvernance / comite_scientifique (par d\u00e9faut : les 3)
  - `membersOrder`: nameAsc ou orderAsc

Note : la grille **Membres** affiche les `person` dont `governanceGroup` est dans `membersGroupsToShow`.
