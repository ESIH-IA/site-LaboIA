/**
 * Données locales pour les solutions d'intelligence artificielle
 * CMS local - Toutes les données sont ici
 */

export interface AISolution {
  id: string;
  title: string;
  shortDescription: string;
  benefits: string[];
  examples: string[];
  icon: string;
}

export interface UseCase {
  id: string;
  title: string;
  context: string;
  solution: string;
  benefits: string[];
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
}

export const aiSolutions: AISolution[] = [
  {
    id: "analyse-prediction",
    title: "Analyse et Prédiction",
    shortDescription:
      "Analyse les données passées pour détecter des tendances, prévoir des situations futures et identifier des anomalies.",
    benefits: [
      "Anticipation des événements et des besoins",
      "Réduction des risques et des pertes",
      "Décisions basées sur des données réelles",
    ],
    examples: [
      "Agriculture : détection de maladies sur plantes, feuilles et fruits",
      "Commerce : prévision des ventes et planification des promotions",
      "Banque : détection de fraudes et transactions anormales",
    ],
    icon: "chart",
  },
  {
    id: "chatbots",
    title: "Chatbots intelligents",
    shortDescription:
      "Permet aux utilisateurs de poser des questions en langage naturel et d'obtenir des réponses immédiates, sans naviguer entre plusieurs pages ou documents.",
    benefits: ["Gain de temps immédiat", "Amélioration de l'expérience utilisateur", "Support continu, 24/7"],
    examples: ["Sites web institutionnels ou commerciaux", "Service client", "Orientation des usagers ou clients"],
    icon: "chat",
  },
  {
    id: "rag",
    title: "Accès intelligent aux documents",
    shortDescription:
      "Utilise l'intelligence artificielle pour interroger des documents internes ou privés comme si l'on discutait avec un expert.",
    benefits: [
      "Fin des recherches longues et manuelles",
      "Démocratisation de l'accès à l'information",
      "Valorisation de la connaissance interne",
    ],
    examples: [
      "Banques et administrations : circulaires, règlements, procédures",
      "ONG : rapports, directives, archives",
      "Cabinets juridiques : lois, jurisprudence, dossiers",
    ],
    icon: "document",
  },
  {
    id: "multi-agents",
    title: "Coordination d'assistants intelligents",
    shortDescription:
      "Coordonne plusieurs assistants intelligents, chacun spécialisé, pour résoudre des problèmes complexes ou accomplir des tâches coordonnées.",
    benefits: ["Vision multi-expertise", "Meilleure gestion de la complexité", "Recommandations plus fiables"],
    examples: ["Analyse financière ou juridique", "Aide à la décision stratégique", "Coordination de processus complexes"],
    icon: "network",
  },
  {
    id: "automation",
    title: "Automatisation intelligente",
    shortDescription:
      "Automatise des tâches répétitives ou chronophages tout en intégrant un contrôle humain pour les actions critiques.",
    benefits: ["Gain de temps opérationnel", "Réduction des erreurs humaines", "Processus plus rapides et plus fiables"],
    examples: ["Traitement automatique de demandes", "Génération de rapports", "Validation assistée de processus"],
    icon: "automation",
  },
  {
    id: "fine-tuning",
    title: "IA personnalisée",
    shortDescription:
      "Adapte l'intelligence artificielle à vos documents, votre vocabulaire et votre contexte métier.",
    benefits: ["Réponses plus précises", "Meilleure compréhension du langage métier", "Moins d'erreurs et de réponses génériques"],
    examples: [],
    icon: "settings",
  },
];

export const useCases: UseCase[] = [
  {
    id: "multi-agents-agriculture",
    title: "Coordination d'assistants intelligents pour l'agriculture",
    context: "Aide à la prise de décision agricole dans des conditions réelles.",
    solution:
      "Équipe d'assistants analysant les données terrain et les observations pour proposer des recommandations.",
    benefits: ["Meilleures décisions agricoles", "Réduction des pertes", "Adaptation au contexte local"],
  },
  {
    id: "detection-maladies",
    title: "Détection de maladies sur feuilles et fruits",
    context: "Identification rapide des maladies pour agir avant la propagation.",
    solution: "Outil d'analyse d'images intégré dans une application dédiée.",
    benefits: ["Diagnostic rapide", "Prévention", "Support aux producteurs"],
  },
  {
    id: "generation-rapports",
    title: "Génération automatique de rapports",
    context: "Production de rapports structurés à partir de notes de consultation simples.",
    solution: "Système intelligent transformant des notes libres en rapports standardisés.",
    benefits: ["Gain de temps", "Qualité homogène", "Moins d'erreurs"],
  },
];

export const sectors: Sector[] = [
  { id: "finance", name: "Banques et institutions financières", icon: "bank" },
  { id: "commerce", name: "Commerce et retail", icon: "shop" },
  { id: "agriculture", name: "Agriculture", icon: "plant" },
  { id: "ngo", name: "ONG et organisations internationales", icon: "globe" },
  { id: "health", name: "Santé", icon: "health" },
  { id: "public", name: "Secteur public", icon: "government" },
  { id: "industry", name: "Industrie", icon: "factory" },
  { id: "education", name: "Éducation", icon: "book" },
];

export const heroContent = {
  title: "Recherche appliquée et transfert en intelligence artificielle",
  subtitle:
    "Le LaCDIA développe des méthodes et prototypes IA, puis les transfère vers des cas d'usage réels en collaboration avec ses partenaires.",
  description:
    "Nos solutions s'appuient sur des axes de recherche, des projets interdisciplinaires et une validation scientifique rigoureuse.",
};

export const trustMessage =
  "Nos solutions sont conçues et testées dans des contextes réels. Nous combinons expertise en intelligence artificielle et compréhension métier pour livrer des systèmes utiles, fiables et accessibles.";
