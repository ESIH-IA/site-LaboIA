import { groq } from "next-sanity";

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
