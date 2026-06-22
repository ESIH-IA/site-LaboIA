export type GovernanceProfileCategory =
  | "gouvernance"
  | "direction"
  | "recherche"
  | "conseil";

export type GovernanceProfileStatus = "actif" | "futur";

export type GovernanceProfile = {
  id: string;
  slug?: string;
  name: string;
  photoUrl?: string;
  roleTitle: string;
  category: GovernanceProfileCategory;
  shortBio?: string;
  longBio?: string;
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
  order?: number;
  status?: GovernanceProfileStatus;
};
