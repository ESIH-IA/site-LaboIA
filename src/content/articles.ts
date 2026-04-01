export type ArticleCategory =
  | "Partenariat"
  | "Projet"
  | "Publication"
  | "Soutenance"
  | "Actualité";

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
    }
  | {
      readonly type: "linkList";
      readonly items: readonly { readonly text: string; readonly href: string }[];
    }
  | {
      readonly type: "gallery";
      readonly images: readonly {
        readonly src: string;
        readonly alt: string;
        readonly caption?: string;
      }[];
    };

export const articles = [
  {
    id: "infosnation-espace-sciences-societe",
    title:
      "InfosNation lance \"Espace Sciences et Société\" : rapprocher la science des enjeux sociétaux",
    category: "Partenariat" as ArticleCategory,
    date: "2025-10-30",
    authorName: "Aishael Picard",
    mainImage: undefined,
    summary:
      "Avec \"Espace Sciences et Société\", InfosNation structure un espace éditorial dédié à la médiation scientifique, au dialogue science-société et à la décision publique éclairée.",
    sourceUrl:
      "https://infosnation.com/lancement-de-la-rubrique-espace-sciences-et-societe-dinfosnation/",
    blocks: [
      {
        type: "paragraph",
        text:
          "Dans un contexte marqué par des défis environnementaux, économiques, technologiques et sociaux, l'accès à une information scientifique fiable, contextualisée et intelligible devient un enjeu stratégique. C'est dans cette perspective qu'InfosNation annonce le lancement de sa rubrique \"Espace Sciences et Société\", dédiée à la valorisation des savoirs scientifiques et à leur mise en dialogue avec les réalités sociétales.",
      },
      {
        type: "heading",
        level: 2,
        text: "Une plateforme engagée pour une information responsable",
      },
      {
        type: "paragraph",
        text:
          "Plateforme médiatique indépendante, InfosNation met en avant une approche axée sur la rigueur éditoriale et l'intérêt général. La nouvelle rubrique renforce cette orientation en intégrant la médiation scientifique au cœur du projet éditorial, en donnant la parole aux chercheurs, universitaires, professionnels, décideurs et acteurs de la société civile.",
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
        text: "Un rôle structurant dans l'écosystème scientifique et citoyen",
      },
      {
        type: "paragraph",
        text:
          "En facilitant la circulation des connaissances et leur appropriation, \"Espace Sciences et Société\" agit comme un pont entre recherche, société civile et décision publique. L'ambition : renforcer la littératie scientifique, soutenir le débat public éclairé et encourager des choix fondés sur des preuves.",
      },
      {
        type: "heading",
        level: 2,
        text: "Un partenariat éditorial au service de la connaissance",
      },
      {
        type: "paragraph",
        text:
          "Pour un laboratoire de recherche et d'innovation, ce type de partenariat constitue un levier concret : diffuser des contenus scientifiques, relayer des projets, publier des analyses d'experts et stimuler des collaborations entre institutions et acteurs socio-économiques.",
      },
      {
        type: "callout",
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
    mainImage: undefined,
    summary:
      "Présentation d'un tuteur numérique fondé sur une architecture RAG multi-agents, visant des recommandations agronomiques contextualisées et traçables pour la culture de la mangue en Haïti.",
    sourceUrl:
      "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/",
    blocks: [
      {
        type: "paragraph",
        text:
          "Cette publication présente un système de tuteur numérique basé sur une approche RAG multi-agents, combinant diagnostic, connaissances agronomiques et contextualisation (notamment via données pertinentes) afin d'assister la prise de décision en agriculture.",
      },
      {
        type: "callout",
        text: "Lire l'article sur InfosNation",
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
      "Quand l'intelligence artificielle vient au secours des manguiers haïtiens",
    category: "Publication" as ArticleCategory,
    date: "2025-12-25",
    authorName: "Aishael Donata Laury Picard",
    mainImage: undefined,
    summary:
      "Développement de modèles de vision par ordinateur pour détecter des pathologies sur feuilles et fruits de manguier, et intégration dans un système d'aide à la décision.",
    sourceUrl:
      "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/",
    blocks: [
      {
        type: "paragraph",
        text:
          "Cette publication décrit une approche modulaire fondée sur plusieurs modèles CNN (filtrage d'images hors contexte, classification foliaire et classification des fruits), afin de rendre le diagnostic plus rapide, fiable et accessible.",
      },
      {
        type: "callout",
        text: "Lire l'article sur InfosNation",
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
  {
    id: "soutenance-master-2-ia-decembre-2025",
    title: "Soutenance de Master 2 en Intelligence Artificielle – Décembre 2025",
    category: "Soutenance" as ArticleCategory,
    date: "2025-12-23",
    authorName: "LaCDIA",
    summary:
      "Le 23 décembre 2025 s'est tenue, en ligne, la soutenance de Master 2 en Intelligence Artificielle portant sur des travaux de recherche appliquée menés dans le cadre du projet Deep Farm. Ces travaux s'inscrivent dans une démarche combinant science des données, intelligence artificielle et systèmes intelligents, avec un focus particulier sur l'agriculture numérique et l'aide à la décision.",
    sourceUrl: undefined,
    mainImage: {
      src: "/news/soutenance.jpg",
      alt:
        "Photo officielle de la soutenance en ligne réunissant Livenson NICOLAS, Aishael D. L. PICARD et le Directeur Général de l'ESIH.",
    },
    blocks: [
      {
        type: "paragraph",
        text:
          "Le 23 décembre 2025 s'est tenue, en ligne, la soutenance de Master 2 en Intelligence Artificielle portant sur des travaux de recherche appliquée menés dans le cadre du projet Deep Farm. Ces travaux s'inscrivent dans une démarche combinant science des données, intelligence artificielle et systèmes intelligents, avec un focus particulier sur l'agriculture numérique et l'aide à la décision.",
      },
      {
        type: "paragraph",
        text:
          "Cet événement académique illustre une collaboration internationale entre institutions de formation et acteurs engagés dans le développement de solutions d'intelligence artificielle à impact concret.",
      },
      {
        type: "paragraph",
        text:
          "La soutenance s'est déroulée le 23 décembre 2025, sous la forme d'une session organisée à distance, dans le cadre du diplôme Master of Science – Big Data & Intelligence Artificielle (eBIHAR), porté par Datum Academy en partenariat avec ESTIA TECH (France). Le projet de référence des travaux présentés est le projet Deep Farm, relevant des domaines de l'intelligence artificielle, de la science des données, des systèmes intelligents et de l'agriculture numérique.",
      },
      {
        type: "paragraph",
        text:
          "Les travaux présentés lors de cette soutenance ont été conduits par Livenson NICOLAS et Aishael D. L. PICARD. Ils ont été réalisés dans le cadre du projet Deep Farm, un projet de recherche appliquée visant à mobiliser l'intelligence artificielle pour accompagner les acteurs du secteur agricole, notamment à travers des systèmes intelligents d'aide à la décision et d'assistance technique.",
      },
      {
        type: "paragraph",
        text:
          "La soutenance s'inscrit dans le cadre du Master eBIHAR (Big Data Intelligence for Human Augmented Reality), un programme international dédié à la formation d'experts en intelligence artificielle et en architectures avancées de systèmes intelligents. Les travaux ont bénéficié de l'encadrement et de l'implication académique de Serge MIRANDA, Professeur émérite et porteur du Master eBIHAR au sein de Datum Academy, ainsi que d'autres membres de l'équipe pédagogique et scientifique associés au programme.",
      },
      {
        type: "paragraph",
        text:
          "Bien que la soutenance ait été organisée en ligne, l'événement a été marqué par la présence du Directeur Général de l'ESIH, témoignant de l'intérêt institutionnel porté au projet Deep Farm et à la valorisation de travaux de recherche appliquée en intelligence artificielle. Une photo officielle réunissant les deux candidats et le Directeur Général de l'ESIH est mise en avant.",
      },
      {
        type: "paragraph",
        text:
          "Les travaux soutenus portaient sur la conception et la mise en œuvre de systèmes intelligents appliqués à l'agriculture, combinant l'analyse de données agricoles, l'exploitation de connaissances scientifiques et techniques, l'utilisation de modèles d'intelligence artificielle et la mise en place de mécanismes d'aide à la décision. L'objectif principal était de démontrer comment l'intelligence artificielle peut être mobilisée pour accompagner les producteurs agricoles, améliorer la prévention des maladies des cultures et faciliter l'accès à une expertise technique, y compris dans des contextes à ressources limitées.",
      },
      {
        type: "paragraph",
        text:
          "Les principales contributions issues de ces travaux incluent le développement de systèmes intelligents d'accompagnement des producteurs agricoles intégrés au projet Deep Farm, l'utilisation de modèles d'intelligence artificielle pour la détection de maladies sur feuilles et fruits en appui au diagnostic agricole, la mise en place d'architectures modulaires et évolutives réutilisables dans d'autres domaines d'application, ainsi qu'une approche orientée impact prenant en compte les réalités locales. Les aspects techniques détaillés sont documentés dans les rapports académiques associés.",
      },
      {
        type: "paragraph",
        text:
          "Une partie des résultats issus des travaux menés dans le cadre du projet Deep Farm a fait l'objet de publications de vulgarisation scientifique contribuant à la diffusion des résultats auprès d'un public élargi, notamment à travers les publications intitulées \"Un tuteur numérique intelligent pour accompagner les producteurs de mangues en Haïti\" et \"Quand l'intelligence artificielle vient au secours des manguiers haïtiens\". Ces publications illustrent le lien entre recherche académique, innovation technologique et impact sociétal porté par le projet Deep Farm.",
      },
      {
        type: "paragraph",
        text:
          "Le projet Deep Farm s'inscrit pleinement dans les axes de recherche du laboratoire, en particulier dans les domaines de l'intelligence artificielle appliquée, des systèmes intelligents et multi-agents, de l'exploitation des données pour l'aide à la décision et du développement de solutions adaptées aux contextes locaux. Les travaux présentés constituent une démonstration concrète de la capacité du laboratoire à mener des projets de recherche appliquée, depuis la conception scientifique jusqu'à la valorisation académique et sociétale.",
      },
      {
        type: "paragraph",
        text:
          "Cette soutenance marque une étape importante dans la valorisation des travaux menés dans le cadre du projet Deep Farm et illustre l'engagement du laboratoire en faveur d'une intelligence artificielle rigoureuse, utile et orientée vers des problématiques réelles. Elle ouvre la voie à de futures collaborations académiques, institutionnelles et scientifiques autour de l'intelligence artificielle appliquée à l'agriculture et au développement.",
      },
      {
        type: "linkList",
        items: [
          {
            text: "Un tuteur numérique intelligent pour accompagner les producteurs de mangues en Haïti",
            href:
              "https://infosnation.com/un-tuteur-numerique-intelligent-pour-accompagner-les-producteurs-de-mangues-en-haiti/",
          },
          {
            text: "Quand l'intelligence artificielle vient au secours des manguiers haïtiens",
            href:
              "https://infosnation.com/quand-lintelligence-artificielle-vient-au-secours-des-manguiers-haitiens/",
          },
        ],
      },
    ],
    related: {
      partners: [],
      projects: ["deep-farm"],
      people: ["livenson-nicolas", "aishael-picard"],
      documents: [],
    },
    featured: false,
  },
] as const;
