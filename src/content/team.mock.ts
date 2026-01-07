export type TeamMockLocale = "fr" | "en";

export type OrgNode = {
  id: string;
  parentId?: string | null;
  name: string;
  role: string;
  photoUrl?: string;
  group?: "governance" | "research" | "associate";
};

export type PersonCard = {
  id: string;
  fullName: string;
  roleTitle: string;
  photoUrl?: string;
  expertise: string[];
  longBio: string;
  affiliation?: string;
  links?: {
    linkedin?: string;
    orcid?: string;
    scholar?: string;
    website?: string;
  };
  order?: number;
  teamGroup: "research" | "associate";
};

export type TeamMockPage = {
  title: string;
  intro: string;
  researchSectionTitle: string;
  associatesSectionTitle: string;
  associateBadgeLabel: string;
  readMoreLabel: string;
  emptyResearchText: string;
  emptyAssociatesText: string;
};

export type TeamMockData = {
  page: TeamMockPage;
  orgChartNodes: OrgNode[];
  researchMembers: PersonCard[];
  associateMembers: PersonCard[];
};

const base: TeamMockData = {
  page: {
    title: "Équipe de recherche",
    intro:
      "L’équipe de recherche de LaCDIA développe des approches rigoureuses et des solutions appliquées en science des données et intelligence artificielle. Nous produisons des résultats scientifiques, collaborons avec des institutions partenaires et accueillons chercheurs, ingénieurs et étudiants.",
    researchSectionTitle: "Équipe de recherche",
    associatesSectionTitle: "Chercheurs associés & contributeurs",
    associateBadgeLabel: "Associé",
    readMoreLabel: "Lire la suite",
    emptyResearchText: "L’équipe de recherche est en cours de structuration.",
    emptyAssociatesText: "La liste des chercheurs associés est en cours de structuration.",
  },
  orgChartNodes: [
    {
      id: "patrick-attie",
      parentId: null,
      name: "Patrick Attié",
      role: "Fondateur institutionnel — Directeur général (ESIH)",
      group: "governance",
    },
    {
      id: "direction-scientifique",
      parentId: "patrick-attie",
      name: "Direction scientifique",
      role: "Pilotage des activités",
      group: "research",
    },
    {
      id: "livenson-nicolas",
      parentId: "direction-scientifique",
      name: "Livenson Nicolas",
      role: "Co-fondateur — Ingénieur en Intelligence Artificielle (SMA)",
      group: "research",
    },
    {
      id: "aishael-picard",
      parentId: "direction-scientifique",
      name: "Aïshael Picard",
      role: "Co-fondatrice — Responsable scientifique (IA & Data Science)",
      group: "research",
    },
    {
      id: "associates-group",
      parentId: "direction-scientifique",
      name: "Chercheurs associés",
      role: "Chercheurs associés & contributeurs",
      group: "associate",
    },
    {
      id: "benedique-paul",
      parentId: "associates-group",
      name: "Bénédique Paul",
      role: "Chercheur associé, PhD, HDR (FSAE / Université Quisqueya)",
      group: "associate",
    },
  ],
  researchMembers: [
    {
      id: "aishael-picard",
      fullName: "Aïshael Picard",
      roleTitle: "Chercheuse en IA",
      expertise: ["Vision par ordinateur", "Data Science", "Apprentissage automatique"],
      affiliation: "LaCDIA",
      longBio:
        "Aïshael Picard mène des travaux de recherche en intelligence artificielle, avec un accent sur la vision par ordinateur et la science des données. Ses contributions portent sur des méthodes robustes d’apprentissage, des protocoles d’évaluation et des déploiements adaptés aux contraintes du terrain. Elle participe aux productions scientifiques et au pilotage d’activités de recherche appliquée.",
      teamGroup: "research",
    },
    {
      id: "livenson-nicolas",
      fullName: "Livenson Nicolas",
      roleTitle: "Ingénieur en intelligence artificielle",
      expertise: ["Systèmes multi-agents", "Systèmes intelligents", "Ingénierie IA"],
      affiliation: "LaCDIA",
      longBio:
        "Livenson Nicolas conçoit et implémente des systèmes intelligents, avec une spécialisation en approches multi-agents et en ingénierie IA appliquée. Il intervient sur la modélisation, le prototypage et l’intégration de composants IA dans les projets et activités de recherche de LaCDIA, en veillant à la reproductibilité des expérimentations.",
      teamGroup: "research",
    },
  ],
  associateMembers: [
    {
      id: "benedique-paul",
      fullName: "Bénédique Paul",
      roleTitle: "Chercheur associé, PhD, HDR",
      expertise: ["Recherche appliquée", "Encadrement scientifique"],
      affiliation: "FSAE / Université Quisqueya",
      longBio:
        "Bénédique Paul intervient comme chercheur associé et contributeur externe. Il apporte un appui à l’orientation scientifique, contribue sur les aspects méthodologiques et participe aux activités de collaboration en cohérence avec les projets et partenariats académiques de LaCDIA.",
      teamGroup: "associate",
    },
  ],
};

export function getTeamMockData(locale: TeamMockLocale): TeamMockData {
  void locale;
  return base;
}
