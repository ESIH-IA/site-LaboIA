export type ArticleCategory =
  | "Partenariat"
  | "Projet"
  | "Publication"
  | "Soutenance"
  | "Actualité";

// export type ContentBlock =
//   | { type: "paragraph"; text: string }
//   | { type: "heading"; level: 2 | 3 | 4; text: string }
//   | { type: "list"; items: string[] }
//   | { type: "callout"; variant: "link"; text: string; href: string };

export type ContentBlock =
  | {
      readonly type: "paragraph";
      readonly text: string;
    }
  | {
      readonly type: "heading";
      readonly level: 1 | 2 | 3 | 4 | 5 | 6;
      readonly text: string;
    }
  | {
      readonly type: "list";
      readonly items: readonly string[];
    }
  | {
      readonly type: "callout";
      readonly text: string;
      readonly href: string;
    };


export const articles = [
  {
    id: "infosnation-espace-sciences-societe",
    title:
      "InfosNation lance « Espace Sciences et Société » : rapprocher la science des enjeux sociétaux",
    category: "Partenariat" as ArticleCategory,
    date: "2025-10-30",
    authorName: "Aïshael Picard",
    summary:
      "Avec « Espace Sciences et Société », InfosNation structure un espace éditorial dédié à la médiation scientifique, au dialogue science–société et à la décision publique éclairée.",
    sourceUrl:
      "https://infosnation.com/lancement-de-la-rubrique-espace-sciences-et-societe-dinfosnation/",
    blocks: [
      {
        type: "paragraph",
        text:
          "Dans un contexte marqué par des défis environnementaux, économiques, technologiques et sociaux, l’accès à une information scientifique fiable, contextualisée et intelligible devient un enjeu stratégique. C’est dans cette perspective qu’InfosNation annonce le lancement de sa rubrique « Espace Sciences et Société », dédiée à la valorisation des savoirs scientifiques et à leur mise en dialogue avec les réalités sociétales.",
      },
      {
        type: "heading",
        level: 2,
        text: "Une plateforme engagée pour une information responsable",
      },
      {
        type: "paragraph",
        text:
          "Plateforme médiatique indépendante, InfosNation met en avant une approche axée sur la rigueur éditoriale et l’intérêt général. La nouvelle rubrique renforce cette orientation en intégrant la médiation scientifique au cœur du projet éditorial, en donnant la parole aux chercheurs, universitaires, professionnels, décideurs et acteurs de la société civile.",
      },
      {
        type: "heading",
        level: 2,
        text: "Objectifs et lignes éditoriales",
      },
      {
        type: "list",
        items: [
          "Rendre la science accessible, sans en réduire la rigueur.",
          "Valoriser la recherche haïtienne, locale et diaspora, souvent insuffisamment visible.",
          "Relier la science aux enjeux sociétaux : climat, agriculture, santé publique, innovation, gouvernance fondée sur les données, éducation et transformation sociale.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Un rôle structurant dans l’écosystème scientifique et citoyen",
      },
      {
        type: "paragraph",
        text:
          "En facilitant la circulation des connaissances et leur appropriation, « Espace Sciences et Société » agit comme un pont entre recherche, société civile et décision publique. L’ambition : renforcer la littératie scientifique, soutenir le débat public éclairé et encourager des choix fondés sur des preuves.",
      },
      {
        type: "heading",
        level: 2,
        text: "Un partenariat éditorial au service de la connaissance",
      },
      {
        type: "paragraph",
        text:
          "Pour un laboratoire de recherche et d’innovation, ce type de partenariat constitue un levier concret : diffuser des contenus scientifiques, relayer des projets, publier des analyses d’experts et stimuler des collaborations entre institutions et acteurs socio-économiques.",
      },
      {
        type: "callout",
        variant: "link",
        text: "Découvrir la rubrique",
        href:
          "https://infosnation.com/lancement-de-la-rubrique-espace-sciences-et-societe-dinfosnation/",
      },
    ],
    related: {
      partners: ["infosnation"],
      projects: [],
      people: [],
      documents: [],
    },
    featured: true,
  },
  {
    id: "livenson-tuteur-numerique-rag",
    title:
      "Un tuteur numérique intelligent pour accompagner les producteurs de mangues en Haïti",
    category: "Publication" as ArticleCategory,
    date: "2025-12-25",
    authorName: "Livenson Nicolas",
    summary:
      "Présentation d’un tuteur numérique fondé sur une architecture RAG multi-agents, visant des recommandations agronomiques contextualisées et traçables pour la culture de la mangue en Haïti.",
    sourceUrl:
      "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/",
    blocks: [
      {
        type: "paragraph",
        text:
          "Cette publication présente un système de tuteur numérique basé sur une approche RAG multi-agents, combinant diagnostic, connaissances agronomiques et contextualisation (notamment via données pertinentes) afin d’assister la prise de décision en agriculture.",
      },
      {
        type: "callout",
        variant: "link",
        text: "Lire l’article sur InfosNation",
        href:
          "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/",
      },
    ],
    related: {
      partners: ["infosnation"],
      projects: ["deep-farm"],
      people: ["livenson-nicolas"],
      documents: ["certificat-publications-infosnation-2025"],
    },
    featured: true,
  },
  {
    id: "aishael-ia-manguiers",
    title:
      "Quand l’intelligence artificielle vient au secours des manguiers haïtiens",
    category: "Publication" as ArticleCategory,
    date: "2025-12-25",
    authorName: "Aïshael Donata Laury Picard",
    summary:
      "Développement de modèles de vision par ordinateur pour détecter des pathologies sur feuilles et fruits de manguier, et intégration dans un système d’aide à la décision.",
    sourceUrl:
      "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/",
    blocks: [
      {
        type: "paragraph",
        text:
          "Cette publication décrit une approche modulaire fondée sur plusieurs modèles CNN (filtrage d’images hors contexte, classification foliaire et classification des fruits), afin de rendre le diagnostic plus rapide, fiable et accessible.",
      },
      {
        type: "callout",
        variant: "link",
        text: "Lire l’article sur InfosNation",
        href:
          "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/",
      },
    ],
    related: {
      partners: ["infosnation"],
      projects: ["deep-farm"],
      people: ["aishael-picard"],
      documents: ["certificat-publications-infosnation-2025"],
    },
    featured: true,
  },
] as const;
