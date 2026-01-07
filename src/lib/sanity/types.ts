import type { PortableTextBlock } from "@portabletext/types";

export type SanitySlug = {
  current: string;
};

export type LocalizedSlug = {
  fr?: SanitySlug;
  en?: SanitySlug;
};

export type SanityImage = {
  _type: "image";
  asset?: { _ref: string; _type?: "reference" };
} & Record<string, unknown>;

export type ProjectListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  projectType?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
};

export type PublicationListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  publicationType?: string;
  date?: string;
  summary?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  axes?: Array<{ _id: string; title: string }>;
  projects?: Array<{ _id: string; title: string; partners?: Array<{ _id: string; name: string }> }>;
};

export type ResourceListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  resourceType?: string;
  date?: string;
  summary?: string;
  fileUrl?: string;
  url?: string;
  publications?: Array<{ _id: string; title: string; slug?: SanitySlug }>;
  projects?: Array<{ _id: string; title: string; slug?: SanitySlug }>;
};

export type KpiItem = {
  _id: string;
  key: string;
  label: string;
  value: string;
  note?: string;
  status: "draft" | "confirmed";
};

export type LabReportItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  year?: number;
  summary?: string;
  fileUrl?: string;
  url?: string;
};
export type MemberListItem = {
  _id: string;
  fullName: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  role?: string;
  affiliation?: string;
  bio?: string;
};

export type NewsListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  date?: string;
  category?: string;
  summary?: string;
};

export type EventListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  eventType?: string;
  startDate?: string;
  location?: string;
  summary?: string;
};

export type PartnerListItem = {
  _id: string;
  name: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  partnerType?: string;
  shortDescription?: string;
  website?: string;
};

export type OfferListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  offerType?: string;
  openDate?: string;
  closeDate?: string;
  summary?: string;
};

export type ProgramListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  programType?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
};

export type ResearchAxisListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  summary?: string;
};

export type InstitutionalPage = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  summary?: string;
  content?: PortableTextBlock[];
};

export type Person = {
  _id: string;
  name: string;
  slug?: SanitySlug;
  photo?: SanityImage;
  roleTitle?: string;
  roleCategory?: string;
  shortBio?: string;
  longBio?: string;
  affiliation?: string;
  governanceGroup?: "direction" | "gouvernance" | "comite_scientifique";
  teamGroup?: "research" | "associate";
  expertise?: string[];
  links?: {
    linkedin?: string;
    scholar?: string;
    orcid?: string;
    website?: string;
  };
  order?: number;
};

export type OrgUnit = {
  _id: string;
  title: string;
  slug?: SanitySlug;
  description?: string;
  colorKey?: string;
  order?: number;
  lead?: Person | null;
  members?: Person[];
};

export type OrgNode = {
  _id: string;
  label: string;
  subtitle?: string;
  theme?: string;
  order?: number;
  person?: Person | null;
  orgUnit?: OrgUnit | null;
  children?: OrgNode[];
};

export type OrgChart = {
  _id: string;
  title: string;
  slug?: SanitySlug;
  rootNodeId?: string | null;
};

export type GovernancePage = {
  _id: string;
  title: string;
  slug: SanitySlug;
  intro?: PortableTextBlock[];
  showOrgChart?: boolean;
  orgChartSectionTitle?: string;
  orgChartSectionIntro?: PortableTextBlock[];
  showMembers?: boolean;
  membersSectionTitle?: string;
  membersSectionIntro?: PortableTextBlock[];
  membersGroupsToShow?: Array<"direction" | "gouvernance" | "comite_scientifique">;
  membersOrder?: "nameAsc" | "orderAsc";
  orgChart?: OrgChart | null;
};

export type TeamPage = {
  _id: string;
  title: string;
  slug: SanitySlug;
  intro?: PortableTextBlock[];
  researchSectionTitle?: string;
  associatesSectionTitle?: string;
  readMoreLabel?: string;
  associateBadgeLabel?: string;
  emptyResearchText?: string;
  emptyAssociatesText?: string;
};
