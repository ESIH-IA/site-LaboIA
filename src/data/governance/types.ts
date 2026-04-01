/**
 * Types pour le système CMS local de gouvernance
 */

export type PersonCategory =
  | "gouvernance"
  | "direction"
  | "recherche"
  | "conseil";

export type PersonStatus = "actif" | "futur";

export interface Person {
  id: string;
  name: string;
  initials: string; // Initiales pour l'organigramme (ex: LN, AP, BP)
  slug: string;
  photo?: string; // Path relatif depuis /public
  roleTitle: string;
  roleCategory: PersonCategory; // Catégorie obligatoire
  shortBio?: string; // Bio courte pour les profils (3-5 lignes)
  longBio: string;
  affiliation?: string;
  expertise: string[];
  links?: {
    email?: string;
    linkedin?: string;
    scholar?: string;
    orcid?: string;
    website?: string;
  };
  contribution?: string;
  status: PersonStatus; // Statut obligatoire
  order?: number;
  hierarchicalLink?: string; // ID de la personne à laquelle cette personne est liée hiérarchiquement
}

export interface GovernanceData {
  title: string;
  intro?: string;
  orgChart: {
    sectionTitle: string;
    sectionIntro?: string;
    topPerson: Person;
    coFounders: [Person, Person];
    associateResearchers: Person[];
  };
  members: {
    sectionTitle: string;
    sectionIntro?: string;
    people: Person[];
  };
}
