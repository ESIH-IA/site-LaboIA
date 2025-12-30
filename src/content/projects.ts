export type ProjectType = "Recherche" | "Client" | "Hybride";
export type ProjectStatus = "En cours" | "Terminé" | "À venir";

export type ProjectBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "list"; items: string[] };

export const projects = [
  {
    id: "deep-farm",
    title: "DEEP FARM : Intelligence Artificielle et Agriculture Durable",
    type: "Hybride" as ProjectType,
    status: "En cours" as ProjectStatus,
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
      {
        type: "heading",
        level: 2,
        text: "Pourquoi ce projet",
      },
      {
        type: "paragraph",
        text:
          "Face aux enjeux de sécurité alimentaire, de résilience climatique et de productivité, la digitalisation de l’agriculture peut devenir un levier d’impact. Deep Farm répond à ce besoin en combinant formation, co-création et expérimentation terrain.",
      },
      {
        type: "heading",
        level: 2,
        text: "Rôle de l’ESIH",
      },
      {
        type: "list",
        items: [
          "Contribution technopédagogique : formations, sensibilisation, restitution.",
          "Mobilités académiques et renforcement de compétences (France, Italie).",
          "Implication d’un groupe d’étudiants dans la conception et la dissémination.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Cas d’usage (Haïti)",
      },
      {
        type: "paragraph",
        text:
          "Le projet inclut des activités liées à l’agriculture de précision et à des cas concrets, notamment autour des cultures fruitières, avec une orientation vers l’amélioration de la prise de décision via données, outils numériques et IA.",
      },
    ],
    related: {
      partners: ["infosnation"],
      people: ["livenson-nicolas", "aishael-picard"],
      documents: [],
      articles: [],
    },
    featured: true,
  },
] as const;
