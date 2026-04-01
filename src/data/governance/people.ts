import type { Person } from "./types";

/**
 * Base de données locale des personnes de LaCDIA
 */

export const patrickAttie: Person = {
  id: "patrick-attie",
  name: "Patrick Attié",
  initials: "PA",
  slug: "patrick-attie",
  photo: "/images/team/patrick-attie.jpg",
  roleTitle: "Directeur institutionnel",
  roleCategory: "gouvernance",
  shortBio:
    "Directeur général de l'ESIH depuis 2004. Assure la gouvernance institutionnelle, l'ancrage académique et le développement stratégique du LaCDIA.",
  affiliation: "ESIH - École Supérieure d'Infotronique d'Haïti",
  longBio: `Patrick Attié est Directeur général de l'École Supérieure d'Infotronique d'Haïti (ESIH) depuis sa création en 2004. Ingénieur de formation, il a développé une vision stratégique axée sur l'innovation pédagogique et la recherche appliquée en technologies de l'information. Sous sa direction, l'ESIH est devenue une institution de référence en Haïti pour la formation en génie informatique et télécommunications. En tant que directeur institutionnel du LaCDIA, il assure la gouvernance du laboratoire, garantissant son ancrage académique, son intégrité scientifique et le développement de partenariats stratégiques avec des institutions internationales. Son engagement pour l'excellence académique et le développement technologique en Haïti en fait un acteur clé du secteur éducatif et de l'innovation dans la région.`,
  expertise: [
    "Gouvernance institutionnelle",
    "Direction stratégique",
    "Innovation pédagogique",
    "Partenariats académiques",
    "Génie informatique",
  ],
  links: {
    email: "p.attie@esih.edu",
  },
  status: "actif",
  order: 1,
};

export const aishaelPicard: Person = {
  id: "aishael-picard",
  name: "Aïshael Donata Laury Picard",
  initials: "AP",
  slug: "aishael-picard",
  photo: "/images/team/aishael-picard.jpg",
  roleTitle: "Directrice scientifique — Apprentissage automatique",
  roleCategory: "direction",
  shortBio:
    "Docteure en sciences des données. Pilote les activités de recherche en apprentissage automatique, la méthodologie scientifique et la qualité des travaux du laboratoire.",
  affiliation: "LaCDIA",
  longBio: `Aïshael Donata Laury Picard est Directrice scientifique du LaCDIA en charge de l'apprentissage automatique. Titulaire d'un doctorat en sciences des données, elle possède une expertise approfondie en machine learning, vision par ordinateur et analyse de données complexes. Elle pilote le développement de modèles ML rigoureux et supervise plusieurs projets de recherche appliquée axés sur les problématiques locales haïtiennes, notamment dans les domaines de l'agriculture de précision et de l'analyse d'images satellites. Aïshael est également engagée dans l'encadrement doctorale et la formation de la prochaine génération de chercheurs haïtiens en intelligence artificielle. Elle promeut activement l'éthique et la transparence dans l'utilisation des technologies d'intelligence artificielle, en veillant à ce que les recherches du laboratoire servent les enjeux de développement durable.`,
  expertise: [
    "Direction scientifique",
    "Machine Learning",
    "Data Science",
    "Vision par ordinateur",
    "Analyse de données",
    "Agriculture de précision",
    "Éthique de l'IA",
  ],
  links: {
    email: "aishael.picard@lacdia.org",
  },
  status: "actif",
  hierarchicalLink: "patrick-attie",
  order: 2,
};

export const livensonNicolas: Person = {
  id: "livenson-nicolas",
  name: "Livenson Nicolas",
  initials: "LN",
  slug: "livenson-nicolas",
  photo: "/images/team/livenson-nicolas.jpg",
  roleTitle: "Directeur scientifique — Intelligence artificielle",
  roleCategory: "direction",
  shortBio:
    "Ingénieur IA spécialisé en deep learning et systèmes multi-agents. Pilote la conception des solutions IA et la supervision des projets de recherche appliquée.",
  affiliation: "LaCDIA - ESTIA",
  longBio: `Livenson Nicolas est Directeur scientifique du LaCDIA en charge de l'intelligence artificielle. Ingénieur spécialisé dans les systèmes multi-agents et l'apprentissage profond, il travaille en collaboration avec l'ESTIA (École Supérieure des Technologies Industrielles Avancées) en France. Ses recherches portent principalement sur le développement de modèles de deep learning pour la vision par ordinateur, avec des applications concrètes et mesurables dans la détection de maladies végétales et l'analyse d'images agricoles. Livenson pilote la conception des solutions IA du laboratoire, supervise les projets de recherche appliquée et contribue activement à l'encadrement des chercheurs et doctorants. Il diffuse activement les connaissances en intelligence artificielle au sein de la communauté scientifique haïtienne. Son expertise technique et son engagement pour l'innovation constituent un pilier du développement des compétences locales en intelligence artificielle.`,
  expertise: [
    "Direction scientifique",
    "Intelligence artificielle",
    "Deep Learning",
    "Computer Vision",
    "Systèmes Multi-Agents",
    "Détection de maladies végétales",
  ],
  links: {
    email: "livenson.nicolas@lacdia.org",
    linkedin: "https://linkedin.com/in/livenson-nicolas",
  },
  status: "actif",
  hierarchicalLink: "patrick-attie",
  order: 3,
};

export const benediquePaul: Person = {
  id: "benedique-paul",
  name: "Dr. Bénédique Paul",
  initials: "BP",
  slug: "benedique-paul",
  photo: "/images/team/benedique-paul.jpg",
  roleTitle: "Chercheur associé",
  roleCategory: "conseil",
  shortBio:
    "Membre du conseil scientifique. Ingénieur-agroéconomiste, PhD, HDR. Professeur à l'Université Quisqueya. Expert reconnu en agronomie tropicale et systèmes agricoles durables. Collabore avec LaCDIA sur des initiatives de recherche appliquée.",
  affiliation: "FSAE/UniQ - Université Quisqueya",
  longBio: `Dr. Bénédique Paul est membre du conseil scientifique du laboratoire LaCDIA. Ingénieur-agroéconomiste, titulaire d'un doctorat (PhD) et d'une Habilitation à Diriger des Recherches (HDR), il est professeur à la Faculté des Sciences de l'Agriculture et de l'Environnement (FSAE) de l'Université Quisqueya en Haïti. Ses travaux de recherche portent sur l'agronomie tropicale, les systèmes agricoles durables et l'économie rurale. Expert reconnu dans son domaine, il a publié de nombreux articles scientifiques et dirigé des projets de développement agricole en Haïti et dans la région Caraïbes. Bénédique Paul collabore étroitement avec LaCDIA sur des initiatives de recherche appliquée visant à améliorer la productivité agricole grâce à des approches basées sur les données et l'intelligence artificielle.`,
  expertise: [
    "Agronomie tropicale",
    "Systèmes agricoles durables",
    "Économie rurale",
    "Développement agricole",
    "Recherche appliquée",
  ],
  links: {
    email: "b.paul@uniq.edu",
  },
  status: "actif",
  order: 4,
};

export const sergeMranda: Person = {
  id: "serge-mranda",
  name: "Serge MRANDA",
  initials: "SM",
  slug: "serge-mranda",
  roleTitle: "Conseiller scientifique international",
  roleCategory: "conseil",
  shortBio:
    "Membre du conseil scientifique. Conseiller scientifique international de haut niveau. Apportera son expertise et ses perspectives stratégiques pour orienter les activités de recherche et d'innovation du laboratoire. Rayonnement international, mise en relation et développement de projets.",
  affiliation: "À déterminer",
  longBio: `Serge MRANDA rejoindra prochainement le laboratoire LaCDIA en tant que Conseiller scientifique international au sein du conseil scientifique. Cette fonction stratégique permettra d'enrichir les orientations de recherche du laboratoire grâce à une expertise de renommée internationale. Le conseiller scientifique participera à l'évaluation des projets de recherche, à l'établissement de partenariats académiques internationaux et à la définition des axes stratégiques du laboratoire. Son rôle comprendra également le rayonnement international du laboratoire, la mise en relation avec des institutions de recherche de premier plan et le développement de collaborations scientifiques stratégiques.`,
  expertise: ["À venir"],
  status: "futur",
  order: 5,
};

/**
 * Exporter toutes les personnes dans un tableau
 */
export const allPeople: Person[] = [
  patrickAttie,
  aishaelPicard,
  livensonNicolas,
  benediquePaul,
  sergeMranda,
];

/**
 * Helper pour récupérer une personne par son ID
 */
export function getPersonById(id: string): Person | undefined {
  return allPeople.find((p) => p.id === id);
}

/**
 * Helper pour récupérer une personne par son slug
 */
export function getPersonBySlug(slug: string): Person | undefined {
  return allPeople.find((p) => p.slug === slug);
}
