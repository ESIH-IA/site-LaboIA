export type PersonRole =
  | "Étudiant·e stagiaire"
  | "Chercheur"
  | "Enseignant-chercheur"
  | "Coordination"
  | "Direction";

export const people = [
  {
    id: "livenson-nicolas",
    fullName: "Livenson Nicolas",
    role: "Étudiant·e stagiaire" as PersonRole,
    bio:
      "Travaux sur un tuteur numérique intelligent basé sur une architecture RAG multi-agents, appliquée à l’accompagnement des producteurs de mangues en Haïti.",
    links: [
      {
        label: "Article InfosNation (25 déc. 2025)",
        url:
          "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/",
      },
    ],
    featured: true,
  },
  {
    id: "aishael-picard",
    fullName: "Aïshael Donata Laury Picard",
    role: "Étudiant·e stagiaire" as PersonRole,
    bio:
      "Travaux sur la vision par ordinateur pour la détection de maladies du manguier (feuilles et fruits), intégrés à un système d’aide à la décision dans le cadre de Deep Farm.",
    links: [
      {
        label: "Article InfosNation (25 déc. 2025)",
        url:
          "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/",
      },
    ],
    featured: true,
  },
] as const;
