import { groq } from "next-sanity";
import type { Locale } from "@/lib/i18n";
import { sanityFetch } from "@/lib/sanity/client";
import type { GovernancePage, GovernanceChartStrict, Person, TeamPage } from "@/lib/sanity/types";

const seoProjection = `
  "seo": {
    "title": coalesce(seo.title[$locale], seo.title.fr, seo.title.en),
    "description": coalesce(seo.description[$locale], seo.description.fr, seo.description.en),
    "openGraphTitle": coalesce(seo.openGraphTitle[$locale], seo.openGraphTitle.fr, seo.openGraphTitle.en),
    "openGraphDescription": coalesce(seo.openGraphDescription[$locale], seo.openGraphDescription.fr, seo.openGraphDescription.en),
    "openGraphImageUrl": seo.openGraphImage.asset->url,
    "openGraphImageAlt": seo.openGraphImage.alt,
    "openGraphImageWidth": seo.openGraphImage.asset->metadata.dimensions.width,
    "openGraphImageHeight": seo.openGraphImage.asset->metadata.dimensions.height,
    "keywords": seo.keywords,
    "canonicalUrl": seo.canonicalUrl,
    "noIndex": seo.noIndex,
    "noFollow": seo.noFollow
  }
`;

const pageSectionProjection = `
  _key,
  _type,
  variant,
  layout,
  anchor,
  formType,
  "eyebrow": coalesce(eyebrow[$locale], eyebrow.fr, eyebrow.en),
  "title": coalesce(title[$locale], title.fr, title.en),
  "intro": coalesce(intro[$locale], intro.fr, intro.en),
  "body": coalesce(bodyIntl[$locale], body),
  "actions": actions[]{
    "label": coalesce(labelIntl[$locale], label),
    href,
    variant
  },
  "cards": cards[]{
    _key,
    icon,
    "title": coalesce(titleIntl[$locale], title),
    "description": coalesce(descriptionIntl[$locale], description),
    "label": coalesce(labelIntl[$locale], label),
    href,
    items
  },
  tableHeaders,
  "tableRows": tableRows[]{ cells }
`;

export const genericPageBySlugQuery = groq`
  *[_type == "genericPage" && (slug.current == $slug || slugIntl[$locale].current == $slug)][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    ${seoProjection},
    blocks[]{
      ...,
      _type == "textImageBlock" => {
        ...,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt
      },
      _type == "kpisBlock" => {
        ...,
        "kpisList": kpis[]->{
          key,
          label,
          labelIntl,
          value,
          note,
          noteIntl
        }
      }
    }
  }
`;

export const projectListQuery = groq`
  *[_type == "project" && status == "published"] | order(startDate desc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    projectType,
    startDate,
    endDate,
    "summary": coalesce(summaryIntl[$locale], summary),
    "shortDescription": coalesce(shortDescriptionIntl[$locale], shortDescription),
    statusLabel,
    tags,
    featured
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
    "summary": coalesce(summaryIntl[$locale], summary),
    sourceUrl,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    featured
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
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
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
    "name": coalesce(nameIntl[$locale], name),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    partnerType,
    "shortDescription": coalesce(shortDescriptionIntl[$locale], shortDescription),
    website,
    tags,
    featured,
    "logo": select(defined(logo.image) => { "url": logo.image.asset->url, "alt": logo.alt }, null)
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
    "heroBadge": coalesce(heroBadgeIntl[$locale], heroBadge),
    "summary": coalesce(summaryIntl[$locale], summary),
    "content": coalesce(contentIntl[$locale], content),
    "sections": sections[]{ ${pageSectionProjection} },
    "ctaLabel": coalesce(ctaLabelIntl[$locale], ctaLabel),
    ctaHref,
    ${seoProjection}
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
  *[_type == "kpi" && status == "published"] | order(label asc){
    _id,
    key,
    "label": coalesce(labelIntl[$locale], label),
    value,
    "note": coalesce(noteIntl[$locale], note),
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

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    _id,
    name,
    shortName,
    description,
    "tagline": coalesce(taglineIntl[$locale], tagline),
    "footerContactTitle": coalesce(footerContactTitleIntl[$locale], footerContactTitle),
    "footerContactText": coalesce(footerContactTextIntl[$locale], footerContactText),
    "footerContactCtaLabel": coalesce(footerContactCtaLabelIntl[$locale], footerContactCtaLabel),
    footerContactCtaHref,
    "footerLanguageNote": coalesce(footerLanguageNoteIntl[$locale], footerLanguageNote),
    "footerNavTitle": coalesce(footerNavTitleIntl[$locale], footerNavTitle),
    "footerCopyrightText": coalesce(footerCopyrightTextIntl[$locale], footerCopyrightText),
    "cookieTitle": coalesce(cookieTitleIntl[$locale], cookieTitle),
    "cookieMessage": coalesce(cookieMessageIntl[$locale], cookieMessage),
    "cookiePolicyLabel": coalesce(cookiePolicyLabelIntl[$locale], cookiePolicyLabel),
    cookiePolicyHref,
    "cookieAcceptLabel": coalesce(cookieAcceptLabelIntl[$locale], cookieAcceptLabel),
    "cookieRejectLabel": coalesce(cookieRejectLabelIntl[$locale], cookieRejectLabel),
    "logo": {
      "url": logo.image.asset->url,
      "alt": logo.alt,
      "width": logo.image.asset->metadata.dimensions.width,
      "height": logo.image.asset->metadata.dimensions.height
    },
    "banner": {
      "url": banner.image.asset->url,
      "alt": banner.alt,
      "width": banner.image.asset->metadata.dimensions.width,
      "height": banner.image.asset->metadata.dimensions.height
    }
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0]{
    _id,
    "mainNav": mainNav[]{
      "label": coalesce(labelIntl[$locale], label),
      href
    },
    "footerNav": footerNav[]{
      "label": coalesce(labelIntl[$locale], label),
      href
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    _id,
    ${seoProjection},
    "heroBadge": coalesce(heroBadge[$locale], heroBadge.fr, heroBadge.en),
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.fr, heroTitle.en),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.fr, heroSubtitle.en),
    "heroDescription": coalesce(heroDescription[$locale], heroDescription.fr, heroDescription.en),
    "heroActions": heroActions[]{
      "label": coalesce(labelIntl[$locale], label),
      href,
      variant
    },
    "introEyebrow": coalesce(introEyebrow[$locale], introEyebrow.fr, introEyebrow.en),
    "introTitle": coalesce(introTitle[$locale], introTitle.fr, introTitle.en),
    "introBody": coalesce(introBody[$locale], introBody.fr, introBody.en),
    "introActions": introActions[]{
      "label": coalesce(labelIntl[$locale], label),
      href,
      variant
    },
    "highlightsTitle": coalesce(highlightsTitle[$locale], highlightsTitle.fr, highlightsTitle.en),
    "highlightsIntro": coalesce(highlightsIntro[$locale], highlightsIntro.fr, highlightsIntro.en),
    "highlights": highlights[]{
      "title": coalesce(titleIntl[$locale], title),
      "description": coalesce(descriptionIntl[$locale], description)
    },
    "kpisTitle": coalesce(kpisTitle[$locale], kpisTitle.fr, kpisTitle.en),
    "kpisIntro": coalesce(kpisIntro[$locale], kpisIntro.fr, kpisIntro.en),
    "featuredProjectsTitle": coalesce(featuredProjectsTitle[$locale], featuredProjectsTitle.fr, featuredProjectsTitle.en),
    "featuredProjectsIntro": coalesce(featuredProjectsIntro[$locale], featuredProjectsIntro.fr, featuredProjectsIntro.en),
    "featuredProjectsCtaLabel": coalesce(featuredProjectsCtaLabel[$locale], featuredProjectsCtaLabel.fr, featuredProjectsCtaLabel.en),
    featuredProjectsCtaHref,
    "publicationsTitle": coalesce(publicationsTitle[$locale], publicationsTitle.fr, publicationsTitle.en),
    "publicationsIntro": coalesce(publicationsIntro[$locale], publicationsIntro.fr, publicationsIntro.en),
    "partnersTitle": coalesce(partnersTitle[$locale], partnersTitle.fr, partnersTitle.en),
    "partnersIntro": coalesce(partnersIntro[$locale], partnersIntro.fr, partnersIntro.en),
    "partnersBadge": coalesce(partnersBadge[$locale], partnersBadge.fr, partnersBadge.en),
    "collaborateTitle": coalesce(collaborateTitle[$locale], collaborateTitle.fr, collaborateTitle.en),
    "collaborateBody": coalesce(collaborateBody[$locale], collaborateBody.fr, collaborateBody.en),
    "collaborateActions": collaborateActions[]{
      "label": coalesce(labelIntl[$locale], label),
      href,
      variant
    }
  }
`;

export const kpiSettingsQuery = groq`
  *[_type == "kpiSettings"][0]{
    _id,
    "lastUpdated": coalesce(lastUpdatedIntl[$locale], lastUpdated),
    "disclaimer": coalesce(disclaimerIntl[$locale], disclaimer)
  }
`;

export const aiSolutionListQuery = groq`
  *[_type == "aiSolution"] | order(order asc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "shortDescription": coalesce(shortDescriptionIntl[$locale], shortDescription),
    benefits,
    examples,
    icon,
    order
  }
`;

export const useCaseListQuery = groq`
  *[_type == "useCase"] | order(order asc){
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "context": coalesce(contextIntl[$locale], context),
    "solution": coalesce(solutionIntl[$locale], solution),
    benefits,
    order
  }
`;

export const sectorListQuery = groq`
  *[_type == "sector"] | order(order asc){
    _id,
    "name": coalesce(nameIntl[$locale], name),
    icon,
    order
  }
`;

export const solutionsPageQuery = groq`
  *[_type == "solutionsPage"][0]{
    _id,
    ${seoProjection},
    "heroBadge": coalesce(heroBadge[$locale], heroBadge.fr, heroBadge.en),
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.fr, heroTitle.en),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.fr, heroSubtitle.en),
    "heroDescription": coalesce(heroDescription[$locale], heroDescription.fr, heroDescription.en),
    "heroPrimaryCta": {
      "label": coalesce(heroPrimaryCta.labelIntl[$locale], heroPrimaryCta.label),
      "href": heroPrimaryCta.href,
      "variant": heroPrimaryCta.variant
    },
    "heroSecondaryCta": {
      "label": coalesce(heroSecondaryCta.labelIntl[$locale], heroSecondaryCta.label),
      "href": heroSecondaryCta.href,
      "variant": heroSecondaryCta.variant
    },
    "approachTitle": coalesce(approachTitle[$locale], approachTitle.fr, approachTitle.en),
    "approachIntro": coalesce(approachIntro[$locale], approachIntro.fr, approachIntro.en),
    "approachSteps": approachSteps[]{
      "title": coalesce(titleIntl[$locale], title),
      "description": coalesce(descriptionIntl[$locale], description)
    },
    "solutionsTitle": coalesce(solutionsTitle[$locale], solutionsTitle.fr, solutionsTitle.en),
    "solutionsIntro": coalesce(solutionsIntro[$locale], solutionsIntro.fr, solutionsIntro.en),
    "solutions": solutions[]->{
      _id,
      "title": coalesce(titleIntl[$locale], title),
      "shortDescription": coalesce(shortDescriptionIntl[$locale], shortDescription),
      benefits,
      examples,
      icon,
      order
    },
    "useCasesTitle": coalesce(useCasesTitle[$locale], useCasesTitle.fr, useCasesTitle.en),
    "useCasesIntro": coalesce(useCasesIntro[$locale], useCasesIntro.fr, useCasesIntro.en),
    "featuredUseCase": featuredUseCase->{
      _id,
      "title": coalesce(titleIntl[$locale], title),
      "context": coalesce(contextIntl[$locale], context),
      "solution": coalesce(solutionIntl[$locale], solution),
      benefits,
      order
    },
    "flowTitle": coalesce(flowTitle[$locale], flowTitle.fr, flowTitle.en),
    "flowDescription": coalesce(flowDescription[$locale], flowDescription.fr, flowDescription.en),
    flowSteps,
    "servicesTitle": coalesce(servicesTitle[$locale], servicesTitle.fr, servicesTitle.en),
    "servicesIntro": coalesce(servicesIntro[$locale], servicesIntro.fr, servicesIntro.en),
    services,
    "sectorsTitle": coalesce(sectorsTitle[$locale], sectorsTitle.fr, sectorsTitle.en),
    "sectorsIntro": coalesce(sectorsIntro[$locale], sectorsIntro.fr, sectorsIntro.en),
    "sectors": sectors[]->{
      _id,
      "name": coalesce(nameIntl[$locale], name),
      icon,
      order
    },
    "projectsTitle": coalesce(projectsTitle[$locale], projectsTitle.fr, projectsTitle.en),
    "projectsIntro": coalesce(projectsIntro[$locale], projectsIntro.fr, projectsIntro.en)
  }
`;

export const formSettingsQuery = groq`
  *[_type == "formSettings"][0]{
    _id,
    "contact": {
      "title": coalesce(contact.title[$locale], contact.title.fr, contact.title.en),
      "subtitle": coalesce(contact.subtitle[$locale], contact.subtitle.fr, contact.subtitle.en),
      "fullNameLabel": coalesce(contact.fullNameLabel[$locale], contact.fullNameLabel.fr, contact.fullNameLabel.en),
      "fullNamePlaceholder": coalesce(contact.fullNamePlaceholder[$locale], contact.fullNamePlaceholder.fr, contact.fullNamePlaceholder.en),
      "emailLabel": coalesce(contact.emailLabel[$locale], contact.emailLabel.fr, contact.emailLabel.en),
      "emailPlaceholder": coalesce(contact.emailPlaceholder[$locale], contact.emailPlaceholder.fr, contact.emailPlaceholder.en),
      "organizationLabel": coalesce(contact.organizationLabel[$locale], contact.organizationLabel.fr, contact.organizationLabel.en),
      "organizationPlaceholder": coalesce(contact.organizationPlaceholder[$locale], contact.organizationPlaceholder.fr, contact.organizationPlaceholder.en),
      "subjectLabel": coalesce(contact.subjectLabel[$locale], contact.subjectLabel.fr, contact.subjectLabel.en),
      "subjectPlaceholder": coalesce(contact.subjectPlaceholder[$locale], contact.subjectPlaceholder.fr, contact.subjectPlaceholder.en),
      "messageLabel": coalesce(contact.messageLabel[$locale], contact.messageLabel.fr, contact.messageLabel.en),
      "messagePlaceholder": coalesce(contact.messagePlaceholder[$locale], contact.messagePlaceholder.fr, contact.messagePlaceholder.en),
      "consentText": coalesce(contact.consentText[$locale], contact.consentText.fr, contact.consentText.en),
      "privacyLabel": coalesce(contact.privacyLabel[$locale], contact.privacyLabel.fr, contact.privacyLabel.en),
      "privacyHref": contact.privacyHref,
      "submitLabel": coalesce(contact.submitLabel[$locale], contact.submitLabel.fr, contact.submitLabel.en),
      "loadingLabel": coalesce(contact.loadingLabel[$locale], contact.loadingLabel.fr, contact.loadingLabel.en),
      "successMessage": coalesce(contact.successMessage[$locale], contact.successMessage.fr, contact.successMessage.en),
      "errorMessage": coalesce(contact.errorMessage[$locale], contact.errorMessage.fr, contact.errorMessage.en)
    },
    "collaborate": {
      "title": coalesce(collaborate.title[$locale], collaborate.title.fr, collaborate.title.en),
      "subtitle": coalesce(collaborate.subtitle[$locale], collaborate.subtitle.fr, collaborate.subtitle.en),
      "fullNameLabel": coalesce(collaborate.fullNameLabel[$locale], collaborate.fullNameLabel.fr, collaborate.fullNameLabel.en),
      "fullNamePlaceholder": coalesce(collaborate.fullNamePlaceholder[$locale], collaborate.fullNamePlaceholder.fr, collaborate.fullNamePlaceholder.en),
      "emailLabel": coalesce(collaborate.emailLabel[$locale], collaborate.emailLabel.fr, collaborate.emailLabel.en),
      "emailPlaceholder": coalesce(collaborate.emailPlaceholder[$locale], collaborate.emailPlaceholder.fr, collaborate.emailPlaceholder.en),
      "organizationLabel": coalesce(collaborate.organizationLabel[$locale], collaborate.organizationLabel.fr, collaborate.organizationLabel.en),
      "organizationPlaceholder": coalesce(collaborate.organizationPlaceholder[$locale], collaborate.organizationPlaceholder.fr, collaborate.organizationPlaceholder.en),
      "subjectLabel": coalesce(collaborate.subjectLabel[$locale], collaborate.subjectLabel.fr, collaborate.subjectLabel.en),
      "subjectPlaceholder": coalesce(collaborate.subjectPlaceholder[$locale], collaborate.subjectPlaceholder.fr, collaborate.subjectPlaceholder.en),
      "messageLabel": coalesce(collaborate.messageLabel[$locale], collaborate.messageLabel.fr, collaborate.messageLabel.en),
      "messagePlaceholder": coalesce(collaborate.messagePlaceholder[$locale], collaborate.messagePlaceholder.fr, collaborate.messagePlaceholder.en),
      "consentText": coalesce(collaborate.consentText[$locale], collaborate.consentText.fr, collaborate.consentText.en),
      "privacyLabel": coalesce(collaborate.privacyLabel[$locale], collaborate.privacyLabel.fr, collaborate.privacyLabel.en),
      "privacyHref": collaborate.privacyHref,
      "submitLabel": coalesce(collaborate.submitLabel[$locale], collaborate.submitLabel.fr, collaborate.submitLabel.en),
      "loadingLabel": coalesce(collaborate.loadingLabel[$locale], collaborate.loadingLabel.fr, collaborate.loadingLabel.en),
      "successMessage": coalesce(collaborate.successMessage[$locale], collaborate.successMessage.fr, collaborate.successMessage.en),
      "errorMessage": coalesce(collaborate.errorMessage[$locale], collaborate.errorMessage.fr, collaborate.errorMessage.en)
    },
    "newsletter": {
      "title": coalesce(newsletter.title[$locale], newsletter.title.fr, newsletter.title.en),
      "subtitle": coalesce(newsletter.subtitle[$locale], newsletter.subtitle.fr, newsletter.subtitle.en),
      "emailLabel": coalesce(newsletter.emailLabel[$locale], newsletter.emailLabel.fr, newsletter.emailLabel.en),
      "emailPlaceholder": coalesce(newsletter.emailPlaceholder[$locale], newsletter.emailPlaceholder.fr, newsletter.emailPlaceholder.en),
      "consentText": coalesce(newsletter.consentText[$locale], newsletter.consentText.fr, newsletter.consentText.en),
      "privacyLabel": coalesce(newsletter.privacyLabel[$locale], newsletter.privacyLabel.fr, newsletter.privacyLabel.en),
      "privacyHref": newsletter.privacyHref,
      "submitLabel": coalesce(newsletter.submitLabel[$locale], newsletter.submitLabel.fr, newsletter.submitLabel.en),
      "loadingLabel": coalesce(newsletter.loadingLabel[$locale], newsletter.loadingLabel.fr, newsletter.loadingLabel.en),
      "successMessage": coalesce(newsletter.successMessage[$locale], newsletter.successMessage.fr, newsletter.successMessage.en),
      "errorMessage": coalesce(newsletter.errorMessage[$locale], newsletter.errorMessage.fr, newsletter.errorMessage.en)
    },
    "unsubscribe": {
      "title": coalesce(unsubscribe.title[$locale], unsubscribe.title.fr, unsubscribe.title.en),
      "subtitle": coalesce(unsubscribe.subtitle[$locale], unsubscribe.subtitle.fr, unsubscribe.subtitle.en),
      "emailLabel": coalesce(unsubscribe.emailLabel[$locale], unsubscribe.emailLabel.fr, unsubscribe.emailLabel.en),
      "emailPlaceholder": coalesce(unsubscribe.emailPlaceholder[$locale], unsubscribe.emailPlaceholder.fr, unsubscribe.emailPlaceholder.en),
      "submitLabel": coalesce(unsubscribe.submitLabel[$locale], unsubscribe.submitLabel.fr, unsubscribe.submitLabel.en),
      "loadingLabel": coalesce(unsubscribe.loadingLabel[$locale], unsubscribe.loadingLabel.fr, unsubscribe.loadingLabel.en),
      "successMessage": coalesce(unsubscribe.successMessage[$locale], unsubscribe.successMessage.fr, unsubscribe.successMessage.en),
      "errorMessage": coalesce(unsubscribe.errorMessage[$locale], unsubscribe.errorMessage.fr, unsubscribe.errorMessage.en)
    }
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
  contribution,
  order
`;

export const governanceChartStrictBySlugQuery = groq`
  *[
    _type == "governanceChartStrict"
    && status == "published"
    && (slug.current == $slug || slugIntl[$locale].current == $slug)
  ][0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    status,
    "orgSectionTitle": coalesce(orgSectionTitleIntl[$locale], orgSectionTitle),
    "orgSectionIntro": coalesce(orgSectionIntroIntl[$locale], orgSectionIntro),
    "topPerson": topPerson->{${personProjection}},
    "scientificDirectors": coFounders[]->{${personProjection}},
    "associateResearchers": associateResearchers[]->{${personProjection}},
    "membersSectionTitle": coalesce(membersSectionTitleIntl[$locale], membersSectionTitle),
    "membersSectionIntro": coalesce(membersSectionIntroIntl[$locale], membersSectionIntro),
    "membersToShow": membersToShow[]->{${personProjection}}
  }
`;

export const defaultGovernanceChartStrictQuery = groq`
  *[_type == "governanceChartStrict" && status == "published"] | order(_updatedAt desc)[0]{
    _id,
    "title": coalesce(titleIntl[$locale], title),
    "slug": coalesce(slugIntl[$locale], slug),
    slugIntl,
    status,
    "orgSectionTitle": coalesce(orgSectionTitleIntl[$locale], orgSectionTitle),
    "orgSectionIntro": coalesce(orgSectionIntroIntl[$locale], orgSectionIntro),
    "topPerson": topPerson->{${personProjection}},
    "scientificDirectors": coFounders[]->{${personProjection}},
    "associateResearchers": associateResearchers[]->{${personProjection}},
    "membersSectionTitle": coalesce(membersSectionTitleIntl[$locale], membersSectionTitle),
    "membersSectionIntro": coalesce(membersSectionIntroIntl[$locale], membersSectionIntro),
    "membersToShow": membersToShow[]->{${personProjection}}
  }
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
    "orgChartSectionTitle": coalesce(orgChartSectionTitleIntl[$locale], orgChartSectionTitle),
    "orgChartSectionIntro": coalesce(orgChartSectionIntroIntl[$locale], orgChartSectionIntro),
    showMembers,
    "membersSectionTitle": coalesce(membersSectionTitleIntl[$locale], membersSectionTitle),
    "membersSectionIntro": coalesce(membersSectionIntroIntl[$locale], membersSectionIntro),
    membersGroupsToShow,
    membersOrder,
    "governanceChartStrictId": governanceChartStrict->_id
  }
`;

export async function getGovernancePage(locale: Locale) {
  return sanityFetch<GovernancePage | null>(
    governancePageBySlugQuery,
    { slug: "gouvernance", locale },
    null,
  );
}

export async function getGovernanceChartStrict(slug: string, locale: Locale) {
  return sanityFetch<GovernanceChartStrict | null>(
    governanceChartStrictBySlugQuery,
    { slug, locale },
    null,
  );
}

export async function getDefaultGovernanceChartStrict(locale: Locale) {
  return sanityFetch<GovernanceChartStrict | null>(
    defaultGovernanceChartStrictQuery,
    { locale },
    null,
  );
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
