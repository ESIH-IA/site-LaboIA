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

export type SeoData = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImageUrl?: string;
  openGraphImageAlt?: string;
  openGraphImageWidth?: number;
  openGraphImageHeight?: number;
  noIndex?: boolean;
  noFollow?: boolean;
};

export type PageCard = {
  _key?: string;
  icon?: string;
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  items?: string[];
};

export type PageSection = {
  _key?: string;
  _type: "pageSection";
  variant?: "heroDark" | "white" | "light" | "ctaDark";
  layout?: "content" | "cards" | "pills" | "table" | "form";
  anchor?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  body?: PortableTextBlock[];
  actions?: Array<{ label?: string; href?: string; variant?: string }>;
  cards?: PageCard[];
  tableHeaders?: string[];
  tableRows?: Array<{ cells?: string[] }>;
  formType?: "contact" | "collaborate" | "newsletter";
};

export type ProjectListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  slugIntl?: LocalizedSlug;
  projectType?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  shortDescription?: string;
  statusLabel?: string;
  tags?: string[];
  featured?: boolean;
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
  mainImageUrl?: string;
  mainImageAlt?: string;
  sourceUrl?: string;
  featured?: boolean;
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
  tags?: string[];
  featured?: boolean;
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
  heroBadge?: string;
  summary?: string;
  content?: PortableTextBlock[];
  sections?: PageSection[];
  ctaLabel?: string;
  ctaHref?: string;
  seo?: SeoData;
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
    email?: string;
    linkedin?: string;
    scholar?: string;
    orcid?: string;
    website?: string;
  };
  contribution?: string;
  order?: number;
};

export type GovernanceChartStrict = {
  _id: string;
  title: string;
  slug?: SanitySlug;
  slugIntl?: LocalizedSlug;
  status: "draft" | "published";
  orgSectionTitle?: string;
  orgSectionIntro?: PortableTextBlock[];
  topPerson: Person;
  scientificDirectors: [Person, Person];
  associateResearchers?: Person[];
  membersSectionTitle?: string;
  membersSectionIntro?: PortableTextBlock[];
  membersToShow?: Person[];
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
  governanceChartStrict?: GovernanceChartStrict | null;
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

export type SiteAsset = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type SiteSettings = {
  _id: string;
  name: string;
  shortName: string;
  description?: string;
  tagline?: string;
  footerContactTitle?: string;
  footerContactText?: string;
  footerContactCtaLabel?: string;
  footerContactCtaHref?: string;
  footerLanguageNote?: string;
  footerNavTitle?: string;
  footerCopyrightText?: string;
  cookieTitle?: string;
  cookieMessage?: string;
  cookiePolicyLabel?: string;
  cookiePolicyHref?: string;
  cookieAcceptLabel?: string;
  cookieRejectLabel?: string;
  logo?: SiteAsset;
  banner?: SiteAsset;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Navigation = {
  _id: string;
  mainNav: NavItem[];
  footerNav: NavItem[];
};

export type HomePageData = {
  _id: string;
  seo?: SeoData;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroActions?: Array<{ label: string; href: string; variant?: string }>;
  introEyebrow?: string;
  introTitle?: string;
  introBody?: string;
  introActions?: Array<{ label: string; href: string; variant?: string }>;
  highlightsTitle?: string;
  highlightsIntro?: string;
  highlights?: Array<{ title: string; description: string }>;
  kpisTitle?: string;
  kpisIntro?: string;
  featuredProjectsTitle?: string;
  featuredProjectsIntro?: string;
  featuredProjectsCtaLabel?: string;
  featuredProjectsCtaHref?: string;
  publicationsTitle?: string;
  publicationsIntro?: string;
  partnersTitle?: string;
  partnersIntro?: string;
  partnersBadge?: string;
  collaborateTitle?: string;
  collaborateBody?: string;
  collaborateActions?: Array<{ label: string; href: string; variant?: string }>;
  eventBanner?: {
    enabled?: boolean;
    label?: string;
    title?: string;
    date?: string;
    location?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
};

export type KpiSettings = {
  _id: string;
  lastUpdated?: string;
  disclaimer?: string;
};

export type AiSolution = {
  _id: string;
  title: string;
  shortDescription?: string;
  benefits?: string[];
  examples?: string[];
  icon?: string;
  order?: number;
};

export type UseCase = {
  _id: string;
  title: string;
  context?: string;
  solution?: string;
  benefits?: string[];
  order?: number;
};

export type Sector = {
  _id: string;
  name: string;
  icon?: string;
  order?: number;
};

export type SolutionsPage = {
  _id: string;
  seo?: SeoData;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroPrimaryCta?: { label: string; href: string; variant?: string };
  heroSecondaryCta?: { label: string; href: string; variant?: string };
  approachTitle?: string;
  approachIntro?: string;
  approachSteps?: Array<{ title: string; description: string }>;
  solutionsTitle?: string;
  solutionsIntro?: string;
  solutions?: AiSolution[];
  useCasesTitle?: string;
  useCasesIntro?: string;
  featuredUseCase?: UseCase | null;
  flowTitle?: string;
  flowDescription?: string;
  flowSteps?: string[];
  servicesTitle?: string;
  servicesIntro?: string;
  services?: string[];
  sectorsTitle?: string;
  sectorsIntro?: string;
  sectors?: Sector[];
  projectsTitle?: string;
  projectsIntro?: string;
};

export type FormCopy = {
  title?: string;
  subtitle?: string;
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  organizationLabel?: string;
  organizationPlaceholder?: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  consentText?: string;
  privacyLabel?: string;
  privacyHref?: string;
  submitLabel?: string;
  loadingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
};

export type FormSettings = {
  _id: string;
  contact?: FormCopy;
  collaborate?: FormCopy;
  newsletter?: FormCopy;
};
