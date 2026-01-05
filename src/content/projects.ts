export type ProjectType = "Recherche" | "Client" | "Hybride";
export type ProjectStatus = "En cours" | "Terminé" | "À venir";

export type ProjectPortal = {
  readonly label: string;
  readonly url: string;
};

export type ProjectBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading"; readonly level: 2 | 3 | 4; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] };

export type ProjectRelated = {
  readonly partners: readonly string[];   // partenaires du projet (institutionnels/clients), pas médias
  readonly people: readonly string[];     // personnes du labo liées au projet
  readonly documents: readonly string[];
  readonly articles: readonly string[];   // retombées / articles liés (ex: InfosNation)
};

export type Project = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly type: ProjectType;
  readonly status: ProjectStatus;
  readonly yearStart: number;
  readonly tags: readonly string[];
  readonly shortDescription: string;
  readonly portals: readonly ProjectPortal[];
  readonly overviewBlocks: readonly ProjectBlock[];
  readonly related: ProjectRelated;
  readonly featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    id: "deep-farm",
    slug: "deep-farm",
    title: "DEEP FARM : Intelligence Artificielle et Agriculture Durable",
    type: "Hybride",
    status: "En cours",
    yearStart: 2023,
    tags: ["Agriculture numérique", "IA", "Big Data", "Erasmus+", "CBHE"],
    shortDescription:
      "Projet international visant à renforcer les compétences en agriculture numérique (IA & Big Data) via une approche “learning by doing” et des cas d’usage terrain, dont la mangue en Haïti.",
    portals: [
      { label: "Portail DeepFarm", url: "https://deepfarm.eu" },
      {
        label: "Page ESIH (Deep Farm)",
        url:
          "https://www.esih.edu/recent-project/deep-farm-intelligence-artificielle-et-agriculture-durable-une-mobilit-internationale-pour-la-promotion-de-lagriculture-numrique-en-hati",
      },
    ],
    overviewBlocks: [
      {
        type: "paragraph",
        text:
          "Deep Farm est une initiative internationale structurée autour de la transformation numérique de l’agriculture, avec un accent sur l’IA et la donnée. Le projet réunit un consortium multi-pays et s’appuie sur des formations, des expérimentations et des cas d’usage spécifiques par territoire, afin de renforcer durablement les compétences et la capacité d’innovation dans des contextes contraints.",
      },
      { type: "heading", level: 2, text: "Pourquoi ce projet" },
      {
        type: "paragraph",
        text:
          "Face aux enjeux de sécurité alimentaire, de résilience climatique et de productivité, la digitalisation de l’agriculture peut devenir un levier d’impact. Deep Farm répond à ce besoin en combinant formation, co-création et expérimentation terrain.",
      },
      { type: "heading", level: 2, text: "Rôle de l’ESIH" },
      {
        type: "list",
        items: [
          "Contribution technopédagogique : formations, sensibilisation, restitution.",
          "Mobilités académiques et renforcement de compétences (France, Italie).",
          "Implication d’un groupe d’étudiants dans la conception et la dissémination.",
        ],
      },
      { type: "heading", level: 2, text: "Cas d’usage (Haïti)" },
      {
        type: "paragraph",
        text:
          "Le projet inclut des activités liées à l’agriculture de précision et à des cas concrets, notamment autour des cultures fruitières, avec une orientation vers l’amélioration de la prise de décision via données, outils numériques et IA.",
      },
    ],
    related: {
      partners: [], // ✅ ne pas mettre InfosNation ici
      people: ["livenson-nicolas", "aishael-picard"],
      documents: [],
      // ✅ ici tu peux lier les retombées (articles) si tu les as dans articles.ts
      // sinon laisse [] et tu ajouteras plus tard
      articles: ["livenson-tuteur-numerique-rag", "aishael-ia-manguiers"],
    },
    featured: true,
  },
] as const;
