// LaCDIA Tech - Services Catalog
// Technology and Innovation Department of LaCDIA

export interface Service {
  id: string;
  title: string;
  summary: string;
  description: string;
  pole: 'developpement' | 'conseil' | 'formation';
  icon: string;
  useCases: string[];
  targetAudience: string[];
  deliverables: string[];
  valueProposition: string;
  prerequisites?: string[];
  keywords: string[];
}

export interface ServicePole {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Service Poles Definition
export const servicePoles: ServicePole[] = [
  {
    id: 'developpement',
    name: 'Pôle Développement',
    description: 'Conception et développement de solutions technologiques innovantes basées sur l\'IA et la science des données pour transformer les processus métier et créer de nouvelles opportunités commerciales.',
    icon: 'code',
  },
  {
    id: 'conseil',
    name: 'Pôle Conseil',
    description: 'Accompagnement stratégique et études approfondies pour évaluer la maturité numérique, planifier les transformations digitales et optimiser l\'adoption des technologies IA dans les organisations.',
    icon: 'briefcase',
  },
  {
    id: 'formation',
    name: 'Pôle Formation',
    description: 'Programmes éducatifs et ateliers pratiques pour développer les compétences en IA, science des données et technologies numériques auprès des professionnels et des décideurs.',
    icon: 'graduation-cap',
  },
];

// Services across all poles
export const services: Service[] = [
  // Pôle Développement - Services
  {
    id: 'dev-custom-ai',
    title: 'Développement de Solutions IA sur Mesure',
    summary: 'Conception et développement de systèmes IA personnalisés adaptés à vos besoins métier spécifiques, incluant vision par ordinateur, traitement du langage naturel, systèmes de recommandation et bien d\'autres.',
    description: 'Nous développons des solutions IA complètes et sur mesure qui répondent aux défis uniques de votre organisation. De l\'analyse de documents avec vision par ordinateur à la classification de textes en créole haïtien, en passant par les moteurs de recommandation intelligents, nos experts conçoivent et implémentent des systèmes robustes et scalables. Chaque solution est bâtie sur des fondations solides de machine learning et de deep learning, intégrée dans votre infrastructure existante, et accompagnée de mécanismes de monitoring et d\'amélioration continus.',
    pole: 'developpement',
    icon: 'brain',
    useCases: [
      'Système de classification automatique de documents administratifs pour les ministères haïtiens',
      'Moteur de recommandation de produits agricoles pour les coopératives de producteurs',
      'Analyse de qualité des récoltes de cacao par vision par ordinateur',
      'Système de détection des fraudes pour les institutions financières des Caraïbes',
    ],
    targetAudience: [
      'Grandes entreprises en transformation numérique',
      'Institutions gouvernementales',
      'PME/PMI sectorielles',
      'Startups technologiques',
    ],
    deliverables: [
      'Modèles d\'apprentissage machine entraînés et validés',
      'API d\'inférence intégrée dans votre infrastructure',
      'Documentation technique complète et guide d\'utilisation',
      'Plan de monitoring et maintenance',
      'Formation d\'exploitation pour vos équipes',
    ],
    valueProposition: 'Bénéficiez d\'une expertise scientifique de pointe appliquée à vos défis métier, avec des solutions prêtes à la production et respectant les standards internationaux.',
    prerequisites: ['Données d\'entraînement suffisantes', 'Infrastructure cloud ou on-premise'],
    keywords: ['machine learning', 'deep learning', 'IA personnalisée', 'algorithmes avancés', 'production ready'],
  },
  {
    id: 'dev-web-mobile',
    title: 'Applications Mobiles et Web Intelligentes',
    summary: 'Développement d\'applications mobiles et web modernes intégrant l\'IA pour offrir des expériences utilisateur innovantes : chatbots intelligents, tableaux de bord analytiques, outils d\'aide à la décision.',
    description: 'Nous créons des applications web et mobiles qui exploitent pleinement la puissance de l\'IA pour transformer l\'expérience utilisateur. Que ce soit pour déployer des chatbots conversationnels supportant le créole haïtien, des tableaux de bord executives avec prédictions intelligentes, ou des applications mobiles pour agriculteurs avec suggestions d\'optimisation, nous développons des interfaces intuitives et performantes. Nos applications sont conçues pour fonctionner en mode online et offline, avec synchronisation intelligente des données et intégration transparente avec vos systèmes backend.',
    pole: 'developpement',
    icon: 'smartphone',
    useCases: [
      'Application mobile de conseil agricole avec recommandations IA en temps réel',
      'Plateforme web de gestion de projet avec assistant IA intégré',
      'Application de télémédecine avec diagnostic assisté par IA',
      'Tableau de bord commercial avec prédictions de ventes et alertes intelligentes',
    ],
    targetAudience: [
      'Entreprises B2C et B2B',
      'Secteur agricole et agro-alimentaire',
      'Institutions de santé',
      'Organismes de microfinance',
    ],
    deliverables: [
      'Application web responsive (React, Vue ou Angular)',
      'Applications natives iOS et/ou Android',
      'Infrastructure backend scalable (APIs, bases de données)',
      'Interface utilisateur intuitive et accessible',
      'Support en production et maintenance',
    ],
    valueProposition: 'Offrez à vos utilisateurs des applications intelligentes et intuitives qui exploitent la puissance de l\'IA pour créer de la valeur tangible et différencier votre offre.',
    keywords: ['développement web', 'mobile app', 'chatbot', 'UX/UI', 'application intelligente'],
  },
  {
    id: 'dev-saas-sectorielles',
    title: 'Plateformes SaaS Sectorielles',
    summary: 'Création de plateformes cloud multi-tenant spécialisées pour des secteurs d\'activité (agriculture, santé, éducation) intégrant des fonctionnalités IA avancées.',
    description: 'Nous développons des plateformes SaaS complètes, prêtes à l\'emploi et hautement configurables, spécialisées pour des secteurs spécifiques. Ces plateformes cloud offrent une accessibilité maximale, une scalabilité illimitée et une intégration fluide de briques IA sectorialisées. De la gestion des cultures intelligente pour les coopératives agricoles à la gestion des dossiers patients pour les cliniques, nos plateformes combinent user-experience moderne, performance en ligne/offline, et fonctionnalités IA adaptées au contexte local.',
    pole: 'developpement',
    icon: 'cloud',
    useCases: [
      'Plateforme SaaS de gestion agricole avec prédictions de rendement et recommandations de fertilisation',
      'Système de gestion scolaire avec analyse prédictive du décrochage scolaire',
      'Plateforme de télésanté avec consultation assistée par IA pour les zones rurales',
      'Plateforme de suivi des microcrédits avec évaluation de risque automatisée',
    ],
    targetAudience: [
      'Organisations sectorielles (coopératives, associations)',
      'Chaînes de distribution régionales',
      'Institutions publiques et ministères',
      'Réseau d\'entrepreneurs et franchisés',
    ],
    deliverables: [
      'Plateforme SaaS multi-tenant sécurisée',
      'Module de gestion des utilisateurs et des permissions',
      'Tableau de bord analytique et reporting avancé',
      'API pour intégrations tierces',
      'Support et maintenance inclus',
    ],
    valueProposition: 'Lancez rapidement une solution cloud professionnelle sans investissement lourd en infrastructure, avec des fonctionnalités IA intégrées dès le départ et une scalabilité prête pour la croissance.',
    keywords: ['SaaS', 'cloud', 'multi-tenant', 'plateforme numérique', 'sectorialisé'],
  },
  {
    id: 'dev-integration-ia',
    title: 'Intégration IA dans Systèmes Existants',
    summary: 'Augmentation de vos systèmes informatiques existants avec des modules IA sans refonte complète, permettant une transition progressive vers une organisation plus intelligente.',
    description: 'Nous intégrons des capacités IA dans vos systèmes informatiques existants (ERP, CRM, systèmes métier) sans perturbation majeure de vos opérations. Grâce à une approche modulaire et progressive, nous ajoutons des fonctionnalités intelligentes : prédictions de demande dans votre ERP, scoring clients automatisé dans votre CRM, validation documentaire intelligente dans vos processus administratifs. Chaque module IA est développé comme une couche d\'intégration avec vos données existantes et testé en environnement contrôlé avant le déploiement en production.',
    pole: 'developpement',
    icon: 'puzzle',
    useCases: [
      'Intégration d\'IA dans ERP pour optimisation automatique des stocks',
      'Module de scoring de crédit dans système bancaire existant',
      'Détection automatique de fraudes dans plateforme de paiement',
      'Assistant IA pour support client intégré dans votre CRM',
    ],
    targetAudience: [
      'Entreprises avec infrastructure IT existante',
      'Institutions financières',
      'Organismes administratifs',
      'Distributeurs et revendeurs',
    ],
    deliverables: [
      'Audit et analyse de votre infrastructure existante',
      'Architecture d\'intégration modulaire',
      'Module IA implémenté et testé',
      'Plan de migration et de déploiement progressif',
      'Documentation d\'intégration technique',
    ],
    valueProposition: 'Modernisez votre infrastructure informatique progressivement en ajoutant des capacités IA, sans risquer la disruption de vos opérations critiques.',
    prerequisites: ['Accès à l\'infrastructure existante', 'Documentation des systèmes actuels'],
    keywords: ['intégration', 'legacy systems', 'API', 'migration progressive', 'transformation numérique'],
  },
  {
    id: 'dev-chatbots',
    title: 'Chatbots et Assistants Conversationnels',
    summary: 'Développement de chatbots et assistants virtuels intelligents supportant le créole haïtien et d\'autres langues, basés sur la technologie RAG pour accès à vos documents métier.',
    description: 'Nous créons des chatbots et assistants conversationnels sophistiqués qui comprennent et répondent en créole haïtien, français et anglais avec un haut degré de précision contextuelle. Basés sur la technologie de Retrieval-Augmented Generation (RAG), ces assistants peuvent répondre aux questions en puisant dans vos documents internes, procédures, FAQs ou bases de connaissances sans hallucination. Qu\'il s\'agisse de support client 24/7, d\'assistance pour les employés, ou de guidance pour les citoyens, nos assistants améliorent la productivité tout en réduisant les coûts d\'exploitation.',
    pole: 'developpement',
    icon: 'message-circle',
    useCases: [
      'Chatbot de support client en créole haïtien pour banque ou assurance',
      'Assistant IA pour les procédures administratives gouvernementales',
      'Chatbot de sensibilisation agricole pour coopératives paysannes',
      'Assistant RH pour répondre aux questions des employés',
    ],
    targetAudience: [
      'Services client et support',
      'Institutions gouvernementales',
      'Secteur financier et assurance',
      'Grandes organisations multi-site',
    ],
    deliverables: [
      'Chatbot entraîné sur vos données et documents',
      'Interface web et/ou intégration messaging (WhatsApp, Telegram)',
      'Système de monitoring et amélioration continue',
      'Dashboard d\'analyse des conversations',
      'Documentation d\'usage et de paramétrage',
    ],
    valueProposition: 'Fournissez un support client multilingue et disponible 24/7 qui comprend le contexte local et répond avec précision, réduisant la charge sur vos équipes tout en améliorant la satisfaction client.',
    keywords: ['chatbot', 'créole haïtien', 'RAG', 'conversationnel', 'assistant virtuel', 'NLP'],
  },

  // Pôle Conseil - Services
  {
    id: 'conseil-audit-ia',
    title: 'Audit IA et Données',
    summary: 'Évaluation approfondie de votre maturité données et de votre capacité à adopter l\'IA, avec recommandations d\'amélioration et plan d\'action détaillé.',
    description: 'Notre audit exhaustif analyse l\'état actuel de votre gouvernance des données, la qualité et l\'accessibilité de vos données, votre infrastructure technologique, et votre organisation interne pour déterminer votre niveau de préparation à l\'IA. Nous évaluons la conformité avec les standards internationaux (ISO, RGPD), identifions les goulots d\'étranglement et les opportunités, et fournissons un diagnostic clair avec des recommandations priorisées. Chaque audit est contextualisé aux défis spécifiques des organisations opérant en Haïti et dans la région caribéenne.',
    pole: 'conseil',
    icon: 'clipboard-check',
    useCases: [
      'Audit de maturité IA pour ministère en transformation numérique',
      'Évaluation de la qualité des données dans coopérative agricole',
      'Audit de conformité et gouvernance pour institution financière',
      'Évaluation du potentiel IA dans organisation humanitaire',
    ],
    targetAudience: [
      'Institutions publiques et gouvernementales',
      'Grandes entreprises',
      'Institutions financières et bancaires',
      'Organisations internationales et ONGs',
    ],
    deliverables: [
      'Diagnostic détaillé de l\'état actuel',
      'Cadre de maturité IA customisé',
      'Rapport d\'audit complet avec benchmarking',
      'Feuille de route de transformation',
      'Présentation exécutive pour la direction',
    ],
    valueProposition: 'Obtenez une vision claire de votre position actuelle et un chemin structuré vers l\'adoption de l\'IA, minimisant les risques et maximisant le ROI de vos investissements technologiques.',
    keywords: ['audit', 'données', 'maturity', 'gouvernance', 'diagnostic'],
  },
  {
    id: 'conseil-faisabilite',
    title: 'Études de Faisabilité IA',
    summary: 'Études approfondies et analyse coût-bénéfice pour évaluer la viabilité technique et économique de projets de transformation numérique impliquant l\'IA.',
    description: 'Avant d\'investir massivement, nous conduisons des études de faisabilité rigoureuses qui évaluent la viabilité technique, économique et organisationnelle de vos projets numériques. Nous analysons les données disponibles, testons des approches sur des prototypes, identifions les risques et les dépendances, et produisons des estimations réalistes de coûts et de délais. Nos études incluent l\'analyse de projets similaires, la définition claire du périmètre, les hypothèses critiques et les points de décision clés pour votre gouvernance.',
    pole: 'conseil',
    icon: 'trending-up',
    useCases: [
      'Étude de faisabilité pour projet de plateforme SaaS agricole',
      'Évaluation de viabilité d\'un centre de données régional',
      'Analyse coût-bénéfice de transformation numérique ministérielle',
      'Étude de faisabilité technique et économique d\'une solution blockchain',
    ],
    targetAudience: [
      'Organisations planifiant des investissements technologiques majeurs',
      'Startups technologiques en phase de validation',
      'Organisations internationales et bailleurs de fonds',
      'Gouvernements et collectivités territoriales',
    ],
    deliverables: [
      'Rapport d\'étude de faisabilité détaillé',
      'Analyse de risques et plan de mitigation',
      'Estimation de coûts et ROI',
      'Scénarios alternatifs d\'implémentation',
      'Recommandations et plan d\'action',
    ],
    valueProposition: 'Prenez des décisions d\'investissement éclairées basées sur une analyse rigoureuse et réaliste, réduisant l\'incertitude et optimisant l\'allocation de vos ressources.',
    keywords: ['faisabilité', 'ROI', 'analyse coût-bénéfice', 'prototype', 'stratégie'],
  },
  {
    id: 'conseil-strategie',
    title: 'Accompagnement Stratégique Data & IA',
    summary: 'Conseil stratégique de haut niveau pour bâtir votre roadmap IA et data, aligner votre organisation et vos processus avec vos ambitions numériques.',
    description: 'Nous vous accompagnons dans la définition d\'une stratégie IA et data cohérente avec votre vision d\'entreprise et vos objectifs métier. Au-delà de la technologie, nous vous aidons à transformer votre organisation : structure des équipes, compétences requises, culture data-driven, partenariats stratégiques. Nous facilitons les ateliers de co-construction avec votre leadership, analysons votre écosystème concurrentiel et technologique, et définissons des étapes claires et réalistes de transformation. Notre accompagnement s\'étend sur 6 à 18 mois avec des points de contrôle réguliers et des ajustements de trajectoire.',
    pole: 'conseil',
    icon: 'map',
    useCases: [
      'Définition de stratégie IA pour groupe d\'entreprises caribéennes',
      'Roadmap de transformation data pour banque ou assurance',
      'Structuration de département innovation pour grande entreprise',
      'Stratégie d\'adoption de technologies numériques pour ministère',
    ],
    targetAudience: [
      'Direction générale et C-suite',
      'CIO et responsables informatiques',
      'Directeurs métier en transformation',
      'Gouvernements et institutions publiques',
    ],
    deliverables: [
      'Stratégie IA et data customisée',
      'Roadmap d\'implémentation sur 3-5 ans',
      'Plan d\'organisation et de gouvernance',
      'Plan de développement des compétences',
      'Métriques de suivi et KPIs',
    ],
    valueProposition: 'Alignez votre organisation autour d\'une stratégie IA et data claire et ambitieuse, créant une feuille de route réaliste et motivante pour toutes vos équipes.',
    keywords: ['stratégie', 'roadmap', 'transformation', 'gouvernance', 'leadership'],
  },
  {
    id: 'conseil-evaluation-projets',
    title: 'Évaluation de Projets Technologiques',
    summary: 'Évaluation technique indépendante de projets technologiques majeurs impliquant IA, données ou infrastructure cloud, pour vous aider dans vos décisions d\'investissement.',
    description: 'Nous évaluons de manière indépendante et objective des projets technologiques complexes proposés par des prestataires ou développés en interne. Notre analyse couvre l\'architecture technique, la qualité du code et de la conception, la compatibilité avec vos infrastructure existantes, les risques de sécurité et conformité, et le réalisme du planning et du budget. Nous rencontrons les équipes de projet, examinons les documentations techniques et les livrables, et fournissons un rapport d\'évaluation détaillé pour éclairer votre gouvernance des risques.',
    pole: 'conseil',
    icon: 'eye',
    useCases: [
      'Évaluation d\'une solution IA proposée par un fournisseur international',
      'Audit technique d\'une plateforme développée en interne',
      'Évaluation de proposition d\'externalisation informatique',
      'Analyse technique de demande de financement pour projet technologique',
    ],
    targetAudience: [
      'Organisations gérant des projets technologiques majeurs',
      'Comités d\'investissement et gouvernance',
      'Bailleurs de fonds et institutions de financement',
      'Organisations achetant des solutions technologiques',
    ],
    deliverables: [
      'Rapport d\'évaluation technique détaillé',
      'Analyse des risques identifiés',
      'Recommandations d\'amélioration',
      'Benchmark comparatif avec meilleures pratiques',
      'Résumé exécutif pour décision',
    ],
    valueProposition: 'Obtenez une évaluation indépendante et experte de vos projets technologiques critiques, réduisant les risques d\'investissement et vous assurant que vous faites les bons choix.',
    keywords: ['évaluation', 'due diligence', 'audit technique', 'qualité', 'conformité'],
  },

  // Pôle Formation - Services
  {
    id: 'formation-custom',
    title: 'Formations sur Mesure en IA et Data Science',
    summary: 'Programmes de formation professionnels personnalisés en IA, machine learning et data science, adaptés à votre contexte métier et au niveau de vos équipes.',
    description: 'Nous concevons et dispensons des formations hautement personnalisées en IA et data science qui répondent aux besoins spécifiques de votre organisation. Que vos équipes soient des débutants complets ou des développeurs expérimentés, nous créons des programmes adaptés : des bases théoriques aux implémentations pratiques, des cas d\'usage métier aux projets réels. Nos formations combinent théorie et pratique avec des ateliers hands-on, des projets appliqués sur vos données, et du mentorat individuel. Nous formons vos futurs leads techniques, data scientists et IA engineers.',
    pole: 'formation',
    icon: 'book-open',
    useCases: [
      'Formation spécialisée en machine learning pour équipe développement',
      'Bootcamp data science pour jeunes talents haïtiens',
      'Formation NLP et traitement du créole haïtien pour équipe IT',
      'Programme d\'upskilling en IA pour cadres informatiques',
    ],
    targetAudience: [
      'Équipes informatiques et développeurs',
      'Data analysts et business analysts en évolution',
      'Entrepreneurs et innovateurs technologiques',
      'Étudiants et jeunes talents en transition',
    ],
    deliverables: [
      'Curriculum customisé et plan d\'apprentissage',
      'Matériels pédagogiques (cours, slides, notebooks)',
      'Projets pratiques et cas d\'étude réels',
      'Certification de compétences',
      'Support post-formation et communauté d\'apprentissage',
    ],
    valueProposition: 'Développez les compétences IA et data science de votre équipe avec un programme conçu pour votre contexte spécifique, créant une expertise interne durable et autonome.',
    keywords: ['formation', 'upskilling', 'bootcamp', 'machine learning', 'data science'],
  },
  {
    id: 'formation-sensibilisation',
    title: 'Ateliers de Sensibilisation à l\'IA',
    summary: 'Ateliers interactifs de sensibilisation à l\'intelligence artificielle pour dirigeants, managers et décideurs, permettant de comprendre le potentiel et les impacts de l\'IA.',
    description: 'Nous organisons des ateliers dynamiques de sensibilisation qui démystifient l\'IA et permettent aux dirigeants et décideurs de comprendre ses enjeux, opportunités et défis. Ces ateliers combinent explications conceptuelles claires, démonstrations de solutions réelles, exercices pratiques et discussions sur les implications pour votre secteur. Nous couvrons les fondamentaux de l\'IA, les cas d\'usage pertinents pour votre industrie, l\'évaluation des investissements technologiques, et l\'impératif d\'éthique et de responsabilité. Les participants sortent de l\'atelier avec une compréhension concrète et une capacité à converser intelligemment sur l\'IA.',
    pole: 'formation',
    icon: 'lightbulb',
    useCases: [
      'Atelier pour conseil ministériel sur impacts et opportunités de l\'IA',
      'Sensibilisation des cadres bancaires à la transformation IA',
      'Atelier pour association d\'entrepreneurs sur l\'IA et innovation',
      'Formation de gouvernance IA pour comités directeurs',
    ],
    targetAudience: [
      'Dirigeants et C-suite',
      'Managers et responsables de départements',
      'Décideurs publics et gouvernementaux',
      'Conseils d\'administration et boards',
    ],
    deliverables: [
      'Atelier interactif (1-2 jours)',
      'Présentations illustrées et cas d\'étude',
      'Démonstrations de solutions IA concrètes',
      'Ressources pédagogiques et bibliographie',
      'Certification de participation',
    ],
    valueProposition: 'Transformez votre leadership et votre prise de décision en fournissant une compréhension claire et pratique des opportunités et des enjeux de l\'IA pour votre organisation.',
    keywords: ['sensibilisation', 'atelier', 'leadership', 'IA pour décideurs', 'innovation'],
  },
  {
    id: 'formation-montee-competences',
    title: 'Programmes de Montée en Compétences',
    summary: 'Programmes de développement technique intensifs pour acquérir ou approfondir les compétences en technologies modernes, IA, cloud et ingénierie logicielle.',
    description: 'Nous proposons des programmes structurés et intensifs de montée en compétences techniques pour les professionnels IT qui souhaitent se spécialiser ou se réorienter vers les domaines de l\'IA, du cloud et des technologies modernes. Ces programmes combinent apprentissage en ligne, sessions en présentiel, projets d\'application réels, et mentorat individuel. Adaptés pour les développeurs en transition, les architectes souhaitant se moderniser, ou les jeunes talents commençant dans l\'IT, nos programmes couvrent les technologies demandées du marché et créent des professionnels immédiatement opérationnels.',
    pole: 'formation',
    icon: 'zap',
    useCases: [
      'Programme de formation en cloud et DevOps pour équipe IT',
      'Certification en architecture IA pour architectes logiciel',
      'Programme Python/ML pour développeurs Java transitionnant',
      'Formation fullstack développement web/mobile avec IA',
    ],
    targetAudience: [
      'Développeurs et ingénieurs logiciel',
      'Architectes informatiques',
      'Administrateurs systèmes évoluant',
      'Diplômés en informatique en insertion professionnelle',
    ],
    deliverables: [
      'Programme structuré (3-6 mois)',
      'Contenus pédagogiques complets et à jour',
      'Infrastructure lab pour pratique hands-on',
      'Projets d\'application et portfolio',
      'Certification reconnue et support insertion professionnelle',
    ],
    valueProposition: 'Accélérez le développement des talents techniques en offrant des programmes modernes et appliqués qui créent des professionnels immédiatement valorisables sur le marché du travail.',
    keywords: ['upskilling', 'certification', 'technique', 'cloud', 'développement'],
  },
];

// Department Information
export const techDepartmentInfo = {
  name: 'LaCDIA Tech',
  mission: 'Concevoir et développer des solutions technologiques innovantes basées sur la recherche scientifique et les données, transformant la recherche en applications concrètes et à fort impact pour les institutions et les entreprises de la région caribéenne.',
  tagline: 'Transformer la recherche en solutions concrètes pour les institutions et les entreprises',
  pipeline: [
    {
      phase: 1,
      name: 'Recherche',
      description: 'Exploration scientifique et validation d\'hypothèses technologiques',
      icon: 'microscope',
    },
    {
      phase: 2,
      name: 'Maturation',
      description: 'Raffinement des concepts et prototypage des solutions',
      icon: 'flask',
    },
    {
      phase: 3,
      name: 'Développement',
      description: 'Implémentation complète et tests en conditions réelles',
      icon: 'code',
    },
    {
      phase: 4,
      name: 'Déploiement',
      description: 'Mise en production et adoption à grande échelle',
      icon: 'rocket',
    },
  ],
} as const;
