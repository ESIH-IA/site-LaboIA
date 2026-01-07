import type { PortableTextBlock } from "@portabletext/types";
import { groq } from "next-sanity";

import { getTeamMockData } from "@/content/team.mock";
import { sanityFetch } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

export type OrgNode = {
  id: string;
  parentId?: string | null;
  name: string;
  role: string;
  photoUrl?: string;
  group?: "governance" | "research" | "associate";
};

export type PersonCard = {
  id: string;
  fullName: string;
  roleTitle: string;
  photoUrl?: string;
  expertise: string[];
  longBio: string;
  affiliation?: string;
  links?: { linkedin?: string; scholar?: string; orcid?: string; website?: string };
  order?: number;
  teamGroup: "research" | "associate";
};

export type TeamPageData = {
  source: "sanity" | "mock";
  locale: "en" | "fr";
  page: {
    title: string;
    intro?: PortableTextBlock[] | string;
    researchSectionTitle: string;
    associatesSectionTitle: string;
    associateBadgeLabel: string;
    readMoreLabel: string;
    emptyResearchText: string;
    emptyAssociatesText: string;
  };
  orgChartNodes: OrgNode[];
  researchMembers: PersonCard[];
  associateMembers: PersonCard[];
};

type SanityTeamPage = {
  title: string;
  intro?: PortableTextBlock[];
  researchSectionTitle?: string;
  associatesSectionTitle?: string;
  associateBadgeLabel?: string;
  readMoreLabel?: string;
  emptyResearchText?: string;
  emptyAssociatesText?: string;
};

type SanityPerson = {
  _id: string;
  name: string;
  roleTitle: string;
  photo?: unknown;
  expertise?: string[];
  longBio?: string;
  affiliation?: string;
  links?: { linkedin?: string; scholar?: string; orcid?: string; website?: string };
  order?: number;
  teamGroup?: "research" | "associate";
  governanceGroup?: "direction" | "gouvernance" | "comite_scientifique";
};

const teamPageQuery = groq`
  *[
    _type == "teamPage"
    && status == "published"
    && slug.current == "equipe"
  ][0]{
    "title": coalesce(titleIntl[$locale], title),
    "intro": coalesce(introIntl[$locale], intro),
    "researchSectionTitle": coalesce(researchSectionTitleIntl[$locale], researchSectionTitle),
    "associatesSectionTitle": coalesce(associatesSectionTitleIntl[$locale], associatesSectionTitle),
    "readMoreLabel": coalesce(readMoreLabelIntl[$locale], readMoreLabel),
    "associateBadgeLabel": coalesce(associateBadgeLabelIntl[$locale], associateBadgeLabel),
    "emptyResearchText": coalesce(emptyResearchTextIntl[$locale], emptyResearchText),
    "emptyAssociatesText": coalesce(emptyAssociatesTextIntl[$locale], emptyAssociatesText)
  }
`;

const teamMembersQuery = groq`
  *[_type == "person" && teamGroup == $group]
    | order(coalesce(order, 999999) asc, name asc){
      _id,
      name,
      roleTitle,
      photo,
      expertise,
      longBio,
      affiliation,
      links,
      order,
      teamGroup
    }
`;

const orgChartPeopleQuery = groq`
  *[
    _type == "person"
    && name in $names
  ]{
    _id,
    name,
    roleTitle,
    photo,
    governanceGroup,
    teamGroup,
    affiliation
  }
`;

function toPersonCard(person: SanityPerson): PersonCard {
  const photoUrl =
    person.photo && isSanityConfigured
      ? urlForImage(person.photo).width(512).height(512).fit("crop").url()
      : undefined;

  return {
    id: person._id,
    fullName: person.name,
    roleTitle: person.roleTitle ?? "",
    photoUrl,
    expertise: Array.isArray(person.expertise) ? person.expertise : [],
    longBio: person.longBio ?? "",
    affiliation: person.affiliation,
    links: person.links,
    order: person.order,
    teamGroup: person.teamGroup ?? "research",
  };
}

function getOrgChartFromPeople(locale: "en" | "fr", people: SanityPerson[]): OrgNode[] {
  const byName = new Map<string, SanityPerson>();
  for (const person of people) byName.set(person.name, person);

  const patrick = byName.get("Patrick Attié");
  const livenson = byName.get("Livenson Nicolas");
  const aishael = byName.get("Aïshael Picard");

  const patrickPhoto =
    patrick?.photo && isSanityConfigured
      ? urlForImage(patrick.photo).width(256).height(256).fit("crop").url()
      : undefined;
  const livensonPhoto =
    livenson?.photo && isSanityConfigured
      ? urlForImage(livenson.photo).width(256).height(256).fit("crop").url()
      : undefined;
  const aishaelPhoto =
    aishael?.photo && isSanityConfigured
      ? urlForImage(aishael.photo).width(256).height(256).fit("crop").url()
      : undefined;

  const directionLabel = "Direction scientifique";
  const directionRole = "Pilotage des activités";
  const associatesName = "Chercheurs associés";
  const associatesRole = "Chercheurs associés & contributeurs";

  return [
    {
      id: "patrick-attie",
      parentId: null,
      name: patrick?.name ?? "Patrick Attié",
      role: patrick?.roleTitle
        ? patrick.roleTitle + (patrick.affiliation ? ` (${patrick.affiliation})` : "")
        : "Fondateur institutionnel — Directeur général (ESIH)",
      photoUrl: patrickPhoto,
      group: "governance",
    },
    { id: "direction-scientifique", parentId: "patrick-attie", name: directionLabel, role: directionRole, group: "research" },
    {
      id: "livenson-nicolas",
      parentId: "direction-scientifique",
      name: livenson?.name ?? "Livenson Nicolas",
      role: livenson?.roleTitle ?? "Co-fondateur — Ingénieur IA (SMA)",
      photoUrl: livensonPhoto,
      group: "research",
    },
    {
      id: "aishael-picard",
      parentId: "direction-scientifique",
      name: aishael?.name ?? "Aïshael Picard",
      role:
        aishael?.roleTitle ??
        "Co-fondatrice — Responsable scientifique (IA & Data Science)",
      photoUrl: aishaelPhoto,
      group: "research",
    },
    { id: "associates-group", parentId: "direction-scientifique", name: associatesName, role: associatesRole, group: "associate" },
  ];
}

export async function getTeamPageData(locale: "en" | "fr"): Promise<TeamPageData> {
  if (!isSanityConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[team] Team page source=mock (sanity not configured)");
    }
    const mock = getTeamMockData(locale);
    return { source: "mock", locale, ...mock };
  }

  const [page, researchMembers, associateMembers, orgPeople] = await Promise.all([
    sanityFetch<SanityTeamPage | null>(teamPageQuery, { locale }, null),
    sanityFetch<SanityPerson[]>(teamMembersQuery, { group: "research" }, []),
    sanityFetch<SanityPerson[]>(teamMembersQuery, { group: "associate" }, []),
    sanityFetch<SanityPerson[]>(orgChartPeopleQuery, { names: ["Patrick Attié", "Livenson Nicolas", "Aïshael Picard"] }, []),
  ]);

  const derivedOrg = getOrgChartFromPeople(locale, orgPeople);

  return {
    source: "sanity",
    locale,
    page: {
      title: page?.title ?? "Équipe de recherche",
      intro: page?.intro,
      researchSectionTitle: page?.researchSectionTitle ?? "Équipe de recherche",
      associatesSectionTitle:
        page?.associatesSectionTitle ?? "Chercheurs associés & contributeurs",
      associateBadgeLabel: page?.associateBadgeLabel ?? "Associé",
      readMoreLabel: page?.readMoreLabel ?? "Lire la suite",
      emptyResearchText:
        page?.emptyResearchText ?? "L’équipe de recherche est en cours de structuration.",
      emptyAssociatesText:
        page?.emptyAssociatesText ?? "La liste des chercheurs associés est en cours de structuration.",
    },
    orgChartNodes: derivedOrg,
    researchMembers: researchMembers.map(toPersonCard),
    associateMembers: associateMembers.map(toPersonCard),
  };
}
