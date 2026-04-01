/**
 * Axes de recherche du LaCDIA
 * Données issues du projet scientifique 2025-2029
 */

export interface ResearchAxis {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  icon: string;
  problematic: string;
  objectives: string[];
  methodologies: string[];
  useCases: string[];
  impact: string;
  keywords: string[];
  relatedAxes: string[];
}

export const researchAxes: ResearchAxis[] = [
  {
    id: "methodes-fondamentales",
    number: 1,
    title: "Méthodes Fondamentales en IA et Apprentissage Automatique",
    shortTitle: "Méthodes Fondamentales",
    icon: "brain",
    problematic:
      "Malgré les progrès récents de l'apprentissage automatique, plusieurs verrous scientifiques demeurent : forte dépendance à des volumes importants de données annotées, vulnérabilité aux changements de distribution, coûts computationnels élevés et généralisation encore limitée hors des contextes d'entraînement. Ces défis sont particulièrement marqués dans les environnements à ressources limitées, caractérisés par des données rares, bruitées, hétérogènes et peu standardisées.",
    objectives: [
      "Développer des méthodes d'apprentissage efficaces avec peu de données (few-shot learning, transfer learning, meta-learning)",
      "Explorer les approches d'apprentissage auto-supervisé, non supervisé et semi-supervisé",
      "Concevoir des architectures neuronales adaptées aux ressources computationnelles limitées (edge AI, modèles compressés)",
      "Étudier la robustesse des modèles face aux données bruitées, manquantes ou adversariales",
      "Améliorer la généralisation des modèles dans de nouveaux contextes d'application",
    ],
    methodologies: [
      "Apprentissage profond et optimisation",
      "Théorie de l'apprentissage statistique",
      "Transfert de connaissances et adaptation de domaine",
      "Auto-supervision et compression de modèles",
      "Évaluation hors distribution",
      "Benchmarks internationaux et jeux de données caribéens",
    ],
    useCases: [
      "Modèles ML performants avec très peu de données annotées",
      "Architectures neuronales déployables sur appareils mobiles et embarqués",
      "Méthodes de transfert entre domaines applicatifs du laboratoire",
    ],
    impact:
      "Contribution aux fondements méthodologiques de l'intelligence artificielle, avec une ambition de publication dans des conférences et revues internationales de premier plan. Développement de méthodes réutilisables par les autres axes applicatifs du laboratoire.",
    keywords: [
      "apprentissage automatique", "deep learning", "transfer learning",
      "few-shot learning", "meta-learning", "edge AI", "compression de modèles",
      "robustesse", "optimisation",
    ],
    relatedAxes: ["vision-donnees-complexes", "ia-robuste-explicable"],
  },
  {
    id: "vision-donnees-complexes",
    number: 2,
    title: "Vision par Ordinateur et Analyse de Données Complexes",
    shortTitle: "Vision par Ordinateur",
    icon: "eye",
    problematic:
      "L'interprétation automatique d'images, de documents et de données multimodales constitue un défi scientifique majeur pour de nombreuses applications, notamment en agriculture, en santé, en analyse documentaire et en suivi environnemental. Les méthodes existantes restent souvent sensibles aux variations de domaine, de qualité d'acquisition, de langue et de contexte d'usage. Ces limites sont particulièrement marquées dans les environnements à ressources limitées.",
    objectives: [
      "Développer des méthodes de détection, segmentation et classification pour les images agricoles tropicales",
      "Concevoir des systèmes d'analyse d'images médicales robustes à la variabilité des équipements",
      "Explorer des stratégies de fusion multimodale (images, textes, capteurs)",
      "Étudier des méthodes de reconnaissance et d'analyse de documents en créole haïtien",
      "Évaluer la capacité de généralisation dans des contextes locaux peu représentés",
    ],
    methodologies: [
      "Réseaux de neurones convolutifs et architectures de détection",
      "Segmentation sémantique et d'instance",
      "Apprentissage multimodal et fusion de données",
      "Adaptation de domaine et transfert",
      "OCR et traitement de documents",
      "Analyse d'images satellitaires",
    ],
    useCases: [
      "Détection automatique de maladies des cultures tropicales à partir d'images terrain",
      "Analyse d'images rétiniennes pour le dépistage de pathologies",
      "Cartographie de l'occupation des sols par images satellitaires",
      "Numérisation et extraction d'information de documents en créole haïtien",
      "Suivi environnemental et détection de déforestation",
    ],
    impact:
      "Contribution aux avancées méthodologiques en vision par ordinateur et apprentissage multimodal pour les contextes à ressources limitées. Développement de méthodes, jeux de données et prototypes réutilisables et valorisables.",
    keywords: [
      "vision par ordinateur", "détection d'objets", "segmentation",
      "imagerie médicale", "images satellitaires", "analyse documentaire",
      "multimodal", "créole haïtien", "agriculture tropicale",
    ],
    relatedAxes: ["methodes-fondamentales", "ia-sante", "agriculture-numerique"],
  },
  {
    id: "ia-robuste-explicable",
    number: 3,
    title: "IA Robuste, Explicable et Responsable",
    shortTitle: "IA Responsable",
    icon: "shield",
    problematic:
      "L'adoption de l'intelligence artificielle dans des domaines sensibles (santé, justice, finance) est freinée par le manque de transparence des systèmes, la difficulté à expliquer les décisions algorithmiques, la présence de biais et la vulnérabilité aux perturbations adversariales. Ces enjeux revêtent une importance particulière dans les contextes à forte dépendance technologique, où les modèles sont souvent conçus hors des réalités locales.",
    objectives: [
      "Développer des mécanismes d'explicabilité (XAI) adaptés à différents profils d'utilisateurs",
      "Mesurer et atténuer les biais dans les systèmes d'IA (linguistiques, culturels, de représentation)",
      "Concevoir des cadres d'évaluation de l'équité algorithmique contextualisés",
      "Renforcer la robustesse face aux perturbations et attaques adversariales",
      "Développer des méthodes d'évaluation complètes (performance, transparence, équité, robustesse)",
    ],
    methodologies: [
      "Interprétabilité intrinsèque et post-hoc",
      "Protocoles d'audit algorithmique",
      "Méthodes d'évaluation des biais et de l'équité",
      "Tests de robustesse empiriques",
      "Méthodes formelles de vérification",
      "Évaluation avec différents profils d'utilisateurs",
    ],
    useCases: [
      "Audit de biais dans les systèmes d'IA déployés en santé",
      "Cadres d'explicabilité pour les outils d'aide à la décision",
      "Évaluation de l'équité des modèles dans les contextes caribéens",
      "Certification et validation de systèmes IA critiques",
    ],
    impact:
      "Contribution aux fondements méthodologiques de l'IA de confiance. Production de cadres d'analyse, protocoles d'audit et bonnes pratiques pour des systèmes plus transparents, équitables et robustes, adaptés aux réalités sociotechniques locales.",
    keywords: [
      "explicabilité", "XAI", "équité algorithmique", "biais",
      "robustesse adversariale", "IA de confiance", "transparence",
      "audit algorithmique", "IA responsable",
    ],
    relatedAxes: ["methodes-fondamentales", "ia-sante", "ia-socio-economique"],
  },
  {
    id: "ia-sante",
    number: 4,
    title: "IA pour la Santé",
    shortTitle: "IA Santé",
    icon: "heart",
    problematic:
      "Les systèmes de santé caribéens, notamment en Haïti, font face à des pénuries de personnels, des disparités d'accès aux soins et des capacités diagnostiques limitées, en particulier dans les zones rurales. L'IA peut offrir des leviers concrets pour appuyer le dépistage, la décision clinique, la production documentaire et la surveillance épidémiologique, à condition que les solutions soient adaptées aux réalités locales.",
    objectives: [
      "Développer des systèmes d'aide au dépistage et à la décision clinique par analyse d'images médicales",
      "Concevoir des assistants documentaires intelligents pour les professionnels de santé",
      "Explorer des modèles de surveillance et de modélisation du risque épidémiologique",
      "Développer des interfaces conversationnelles en créole haïtien pour l'éducation à la santé",
    ],
    methodologies: [
      "Analyse d'images médicales (radiographie, dermatologie, ophtalmologie)",
      "Traitement du langage naturel médical",
      "Modélisation épidémiologique",
      "Systèmes conversationnels multilingues",
      "Validation clinique avec professionnels de santé",
    ],
    useCases: [
      "Outil d'aide au pré-dépistage dermatologique par smartphone",
      "Assistant de génération et structuration de comptes rendus médicaux",
      "Plateforme d'appui à la surveillance épidémiologique",
      "Assistant conversationnel en créole haïtien pour l'information sanitaire",
      "Analyse d'images rétiniennes pour le dépistage du diabète",
    ],
    impact:
      "Outils d'IA concrets répondant aux besoins critiques de santé dans la Caraïbe. Amélioration des capacités diagnostiques, de la gestion des patients et de la surveillance épidémiologique, dans le respect des réalités culturelles et linguistiques.",
    keywords: [
      "IA santé", "imagerie médicale", "diagnostic assisté",
      "épidémiologie", "créole haïtien", "chatbot santé",
      "dépistage", "télémédecine", "aide à la décision clinique",
    ],
    relatedAxes: ["vision-donnees-complexes", "ia-robuste-explicable", "ia-socio-economique"],
  },
  {
    id: "agriculture-numerique",
    number: 5,
    title: "IA pour l'Agriculture Numérique et la Résilience Environnementale",
    shortTitle: "Agriculture Numérique",
    icon: "leaf",
    problematic:
      "L'agriculture haïtienne, qui représente une part majeure de l'emploi rural, est confrontée à des défis structurels et environnementaux majeurs : dégradation des sols, variabilité climatique, ravageurs et maladies des cultures, faible productivité. La transformation numérique du secteur agricole constitue un levier important pour améliorer la productivité, la résilience et la durabilité, à condition de concevoir des solutions accessibles et frugales.",
    objectives: [
      "Développer des méthodes de détection et classification des maladies des cultures tropicales",
      "Concevoir des systèmes d'aide à la décision agronomique personnalisés",
      "Explorer des modèles agroclimatiques et systèmes d'alerte précoce",
      "Développer des approches d'analyse d'images satellitaires pour le suivi des parcelles",
    ],
    methodologies: [
      "Vision par ordinateur pour la détection de maladies",
      "Analyse de séries temporelles climatiques",
      "Modélisation spatio-temporelle",
      "Traitement d'images satellitaires",
      "Systèmes d'aide à la décision",
      "Applications mobiles pour agriculteurs",
      "Recherche participative et co-développement",
    ],
    useCases: [
      "Détection de maladies des cultures par images smartphone",
      "Recommandations d'irrigation et fertilisation personnalisées",
      "Modèles agroclimatiques et prévisions saisonnières",
      "Suivi des cultures et estimation des rendements par satellite",
      "Système d'alerte précoce pour événements météorologiques extrêmes",
      "Surveillance de la dégradation des sols",
    ],
    impact:
      "Contribution à l'émergence de méthodes, jeux de données et prototypes pour l'agriculture numérique en contexte tropical. Développement d'outils d'aide à la décision transférables vers les acteurs agricoles et les partenaires du développement rural.",
    keywords: [
      "agriculture numérique", "agriculture de précision", "détection de maladies",
      "résilience climatique", "images satellitaires", "agroclimatique",
      "alerte précoce", "DEEP FARM", "agriculture tropicale",
    ],
    relatedAxes: ["vision-donnees-complexes", "methodes-fondamentales", "ia-robuste-explicable"],
  },
  {
    id: "ia-socio-economique",
    number: 6,
    title: "IA pour les Systèmes Socio-Économiques, Éducatifs et Institutionnels",
    shortTitle: "IA Socio-Économique",
    icon: "building",
    problematic:
      "Dans les contextes économiques, éducatifs et institutionnels de la Caraïbe, la prise de décision reste contrainte par des données incomplètes, des processus peu numérisés, des capacités analytiques inégalement réparties et des barrières linguistiques. Les spécificités des économies insulaires requièrent des approches d'IA capables de fonctionner malgré l'hétérogénéité des données et les réalités multilingues locales.",
    objectives: [
      "Développer des modèles d'analyse économique adaptés aux économies insulaires",
      "Explorer l'automatisation raisonnée des processus administratifs (e-gouvernement)",
      "Développer des méthodes d'analyse de données textuelles en créole haïtien",
    ],
    methodologies: [
      "Traitement du langage naturel pour le créole haïtien",
      "Classification de textes et analyse de sentiments",
      "Apprentissage automatique pour données structurées",
      "Prévision de séries temporelles économiques",
      "Automatisation de processus et optimisation de workflows",
      "Intégration et fédération de données",
    ],
    useCases: [
      "Analyse économique et prospective pour décideurs publics",
      "Automatisation du traitement documentaire administratif",
      "Analyse de textes en créole haïtien pour l'éducation",
      "Portails e-gouvernement et services aux citoyens",
      "Systèmes de gestion des connaissances institutionnelles",
      "Planification et allocation optimisée des ressources publiques",
    ],
    impact:
      "Développement d'outils d'aide à la décision, d'automatisation documentaire et de services intelligents pour les acteurs publics, éducatifs et économiques. Contribution à la transformation numérique des institutions haïtiennes.",
    keywords: [
      "NLP", "créole haïtien", "e-gouvernement",
      "analyse économique", "aide à la décision", "éducation",
      "systèmes institutionnels", "automatisation", "transformation numérique",
    ],
    relatedAxes: ["ia-robuste-explicable", "ia-sante", "methodes-fondamentales"],
  },
];

/** Obtenir un axe par son identifiant */
export function getAxisById(id: string): ResearchAxis | undefined {
  return researchAxes.find((a) => a.id === id);
}

/** Obtenir un axe par son numéro */
export function getAxisByNumber(n: number): ResearchAxis | undefined {
  return researchAxes.find((a) => a.number === n);
}

/** Tous les mots-clés uniques */
export function getAllKeywords(): string[] {
  const set = new Set<string>();
  researchAxes.forEach((a) => a.keywords.forEach((k) => set.add(k)));
  return Array.from(set).sort();
}
