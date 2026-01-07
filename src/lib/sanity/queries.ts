import { groq } from "next-sanity";
import type { Locale } from "@/lib/i18n";
import { sanityFetch } from "@/lib/sanity/client";
import type { GovernancePage, OrgChart, OrgNode, OrgUnit, Person, TeamPage } from "@/lib/sanity/types";

export const projectListQuery = groq`
  *[_type == "project" && status == "published"] | order(startDate desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    projectType,
    startDate,
    endDate,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    projectType,
    startDate,
    endDate,
    "summary": coalesce(summaryIntl[$locale], summary),
    "objectives": coalesce(objectivesIntl[$locale], objectives),
    "methods": coalesce(methodsIntl[$locale], methods),
    "results": coalesce(resultsIntl[$locale], results),
    "members": members[]->{ _id, fullName, role, slug },
    "partners": partners[]->{ _id, name, partnerType, slug },
    "publications": publications[]->{ _id, title, slug, date }
  }
`;

export const publicationListQuery = groq`
  *[_type == "publication" && status == "published"] | order(date desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    publicationType,
    date,
    "summary": coalesce(summaryIntl[$locale], summary),
    doi,
    url,
    "pdfUrl": pdf.asset->url,
    "axes": axes[]->{ _id, title },
    "projects": projects[]->{ _id, title, "partners": partners[]->{ _id, name } }
  }
`;

export const publicationBySlugQuery = groq`
  *[_type == "publication" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    publicationType,
    date,
    "summary": coalesce(summaryIntl[$locale], summary),
    doi,
    url,
    "pdfUrl": pdf.asset->url,
    bibtex,
    "authors": authors[]->{ _id, fullName, role, slug },
    externalAuthors,
    "projects": projects[]->{ _id, title, slug },
    "axes": axes[]->{ _id, title, slug },
    "resources": resources[]->{ _id, title, resourceType, "fileUrl": file.asset->url, url }
  }
`;

export const memberListQuery = groq`
  *[_type == "member" && status == "published"] | order(fullName asc){
    _id,
    fullName,
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    role,
    affiliation,
    "bio": coalesce(bioIntl[$locale], bio)
  }
`;

export const memberBySlugQuery = groq`
  *[_type == "member" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    fullName,
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    role,
    affiliation,
    "bio": coalesce(bioIntl[$locale], bio),
    expertise,
    links,
    "projects": projects[]->{ _id, title, slug, summary },
    "publications": publications[]->{ _id, title, slug, date }
  }
`;

export const newsListQuery = groq`
  *[_type == "news" && status == "published"] | order(date desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    date,
    category,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "news" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    date,
    category,
    "summary": coalesce(summaryIntl[$locale], summary),
    "content": coalesce(contentIntl[$locale], content),
    sourceUrl,
    "relatedProjects": relatedProjects[]->{ _id, title, slug },
    "relatedMembers": relatedMembers[]->{ _id, fullName, slug, role }
  }
`;

export const eventListQuery = groq`
  *[_type == "event" && status == "published"] | order(startDate desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    eventType,
    startDate,
    location,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    eventType,
    startDate,
    endDate,
    location,
    "summary": coalesce(summaryIntl[$locale], summary),
    "content": coalesce(contentIntl[$locale], content),
    registrationUrl,
    "speakers": speakers[]->{ _id, fullName, role, slug }
  }
`;

export const partnerListQuery = groq`
  *[_type == "partner" && status == "published"] | order(name asc){
    _id,
    name,
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    partnerType,
    "shortDescription": coalesce(shortDescriptionIntl[$locale], shortDescription),
    website
  }
`;

export const offerListQuery = groq`
  *[_type == "offer" && status == "published"] | order(openDate desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    offerType,
    openDate,
    closeDate,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const programListQuery = groq`
  *[_type == "program" && status == "published"] | order(startDate desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    programType,
    startDate,
    endDate,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const programBySlugQuery = groq`
  *[_type == "program" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    programType,
    startDate,
    endDate,
    "summary": coalesce(summaryIntl[$locale], summary),
    "content": coalesce(contentIntl[$locale], content),
    "members": members[]->{ _id, fullName, role, slug }
  }
`;

export const researchAxisListQuery = groq`
  *[_type == "researchAxis" && status == "published"] | order(title asc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const researchAxisBySlugQuery = groq`
  *[_type == "researchAxis" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    "summary": coalesce(summaryIntl[$locale], summary),
    "content": coalesce(contentIntl[$locale], content),
    "projects": projects[]->{ _id, title, slug, summary, projectType, startDate },
    "publications": publications[]->{ _id, title, slug, date, publicationType }
  }
`;

export const institutionalPageBySlugQuery = groq`
  *[_type == "institutionalPage" && status == "published" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    "summary": coalesce(summaryIntl[$locale], summary),
    "content": coalesce(contentIntl[$locale], content)
  }
`;

export const resourceListQuery = groq`
  *[_type == "resource" && status == "published"] | order(date desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    resourceType,
    date,
    "summary": coalesce(summaryIntl[$locale], summary),
    "fileUrl": file.asset->url,
    url,
    "publications": publications[]->{ _id, title, slug },
    "projects": projects[]->{ _id, title, slug }
  }
`;

export const kpiListQuery = groq`
  *[_type == "kpi"] | order(label asc){
    _id,
    key,
    label,
    value,
    note,
    status
  }
`;

export const labReportListQuery = groq`
  *[_type == "labReport" && status == "published"] | order(year desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    year,
    "summary": coalesce(summaryIntl[$locale], summary),
    "fileUrl": file.asset->url,
    url
  }
`;

export const internalEventListQuery = groq`
  *[_type == "event" && status == "published" && visibility == "internal"] | order(startDate desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    eventType,
    startDate,
    location,
    "summary": coalesce(summaryIntl[$locale], summary)
  }
`;

export const searchQuery = groq`
  *[
    _type in ["publication", "project", "member"]
    && status == "published"
    && (
      title match $term
      || fullName match $term
      || summary match $term
      || bio match $term
    )
    && ($type == null || _type == $type)
  ] | order(_updatedAt desc)[0...50]{
    _id,
    _type,
    "title": coalesce(titleIntl[$locale], title, fullName),
    "slug": coalesce(slugIntl[$locale], slug),
    "summary": coalesce(summaryIntl[$locale], summary, bioIntl[$locale], bio)
  }
`;

const personProjection = `
  _id,
  name,
  slug,
  photo,
  roleTitle,
  roleCategory,
  shortBio,
  longBio,
  affiliation,
  teamGroup,
  governanceGroup,
  expertise,
  links,
  order
`;

const orgUnitProjection = `
  _id,
  title,
  slug,
  description,
  colorKey,
  order,
  "lead": lead->{${personProjection}},
  "members": members[]->{${personProjection}} | order(order asc, name asc)
`;

const orgNodeProjection = `
  _id,
  label,
  subtitle,
  theme,
  order,
  "person": person->{${personProjection}},
  "orgUnit": orgUnit->{${orgUnitProjection}}
`;

export const governancePageBySlugQuery = groq`
  *[
    _type == "governancePage"
    && status == "published"
    && (slug.current == $slug || slugIntl[$locale].current == $slug)
  ][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    "intro": coalesce(introIntl[$locale], intro),
    showOrgChart,
    orgChartSectionTitle,
    "orgChartSectionIntro": coalesce(orgChartSectionIntroIntl[$locale], orgChartSectionIntro),
    showMembers,
    membersSectionTitle,
    "membersSectionIntro": coalesce(membersSectionIntroIntl[$locale], membersSectionIntro),
    membersGroupsToShow,
    membersOrder,
    "orgChart": orgChart->{
      _id,
      title,
      slug,
      "rootNodeId": rootNode->_id
    }
  }
`;

export const orgChartBySlugQuery = groq`
  *[_type == "orgChart" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "rootNodeId": rootNode->_id
  }
`;

export const orgUnitWithMembersQuery = groq`
  *[_type == "orgUnit" && _id == $id][0]{${orgUnitProjection}}
`;

export const orgNodeTreeQuery = groq`
  *[_type == "orgNode" && _id == $id][0]{
    ${orgNodeProjection},
    "children": children[]-> | order(order asc){
      ${orgNodeProjection},
      "children": children[]-> | order(order asc){
        ${orgNodeProjection},
        "children": children[]-> | order(order asc){
          ${orgNodeProjection},
          "children": children[]-> | order(order asc){
            ${orgNodeProjection},
            "children": children[]-> | order(order asc){
              ${orgNodeProjection}
            }
          }
        }
      }
    }
  }
`;

export async function getGovernancePage(locale: Locale) {
  return sanityFetch<GovernancePage | null>(
    governancePageBySlugQuery,
    { slug: "gouvernance", locale },
    null,
  );
}

export async function getOrgChartBySlug(slug: string) {
  return sanityFetch<OrgChart | null>(orgChartBySlugQuery, { slug }, null);
}

export async function getOrgNodeTree(rootId: string) {
  return sanityFetch<OrgNode | null>(orgNodeTreeQuery, { id: rootId }, null);
}

export async function getOrgUnitWithMembers(unitId: string) {
  return sanityFetch<OrgUnit | null>(orgUnitWithMembersQuery, { id: unitId }, null);
}

export const governanceMembersByNameQuery = groq`
  *[_type == "person" && governanceGroup in $groups]
    | order(name asc){
      ${personProjection}
    }
`;

export const governanceMembersByOrderQuery = groq`
  *[_type == "person" && governanceGroup in $groups]
    | order(order asc, name asc){
      ${personProjection}
    }
`;

export async function getGovernanceMembers(
  groups: Array<"direction" | "gouvernance" | "comite_scientifique">,
  order: "nameAsc" | "orderAsc",
) {
  const query = order === "orderAsc" ? governanceMembersByOrderQuery : governanceMembersByNameQuery;
  return sanityFetch<Person[]>(query, { groups }, []);
}

export const teamPageBySlugQuery = groq`
  *[
    _type == "teamPage"
    && status == "published"
    && slug.current == $slug
  ][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    "intro": coalesce(introIntl[$locale], intro),
    "researchSectionTitle": coalesce(researchSectionTitleIntl[$locale], researchSectionTitle),
    "associatesSectionTitle": coalesce(associatesSectionTitleIntl[$locale], associatesSectionTitle),
    "readMoreLabel": coalesce(readMoreLabelIntl[$locale], readMoreLabel),
    "associateBadgeLabel": coalesce(associateBadgeLabelIntl[$locale], associateBadgeLabel),
    "emptyResearchText": coalesce(emptyResearchTextIntl[$locale], emptyResearchText),
    "emptyAssociatesText": coalesce(emptyAssociatesTextIntl[$locale], emptyAssociatesText)
  }
`;

export const teamMembersByGroupQuery = groq`
  *[_type == "person" && teamGroup == $group]
    | order(coalesce(order, 999999) asc, name asc){
      ${personProjection}
    }
`;

export async function getTeamPage(locale: Locale) {
  return sanityFetch<TeamPage | null>(teamPageBySlugQuery, { slug: "equipe", locale }, null);
}

export async function getTeamMembersByGroup(group: "research" | "associate") {
  return sanityFetch<Person[]>(teamMembersByGroupQuery, { group }, []);
}
