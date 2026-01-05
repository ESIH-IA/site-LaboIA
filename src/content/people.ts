export type PersonRole =
  | "Étudiant·e stagiaire"
  | "Chercheur"
  | "Enseignant-chercheur"
  | "Coordination"
  | "Direction";

export type PersonLink = {
  readonly label: string;
  readonly url: string;
};

export type PersonRelated = {
  readonly projects: readonly string[];
  readonly articles: readonly string[];
  readonly documents: readonly string[];
  readonly partners: readonly string[];
};

export type Person = {
  readonly id: string;
  readonly slug: string;
  readonly fullName: string;
  readonly role: PersonRole;
  readonly bio: string;
  readonly links: readonly PersonLink[];
  readonly related: PersonRelated;
  readonly featured?: boolean;
};

export const people: readonly Person[] = [
  {
    id: "livenson-nicolas",
    slug: "livenson-nicolas",
    fullName: "Livenson Nicolas",
    role: "Étudiant·e stagiaire",
    bio:
      "Travaux sur un tuteur numérique intelligent basé sur une architecture RAG multi-agents, appliquée à l’accompagnement des producteurs de mangues en Haïti.",
    links: [
      {
        label: "Article InfosNation (25 déc. 2025)",
        url: "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/?amp=1",
      },
    ],
    related: {
      projects: ["deep-farm"],
      articles: ["livenson-tuteur-numerique-rag"],
      documents: ["certificat-publications-infosnation-2025"],
      partners: ["infosnation"],
    },
    featured: true,
  },
  {
    id: "aishael-picard",
    slug: "aishael-picard",
    fullName: "Aïshael Donata Laury Picard",
    role: "Étudiant·e stagiaire",
    bio:
      "Travaux sur la vision par ordinateur pour la détection de maladies du manguier (feuilles et fruits), intégrés à un système d’aide à la décision dans le cadre de Deep Farm.",
    links: [
      {
        label: "Article InfosNation (25 déc. 2025)",
        url: "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/?amp=1",
      },
    ],
    related: {
      projects: ["deep-farm"],
      articles: ["aishael-ia-manguiers"],
      documents: ["certificat-publications-infosnation-2025"],
      partners: ["infosnation"],
    },
    featured: true,
  },
] as const;
