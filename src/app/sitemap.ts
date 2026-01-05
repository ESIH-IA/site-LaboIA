import type { MetadataRoute } from "next";

import { locales, localizedPath } from "@/lib/i18n";
import { sanityFetch } from "@/lib/sanity/client";
import {
  eventListQuery,
  memberListQuery,
  newsListQuery,
  programListQuery,
  projectListQuery,
  publicationListQuery,
  researchAxisListQuery,
} from "@/lib/sanity/queries";
import type {
  EventListItem,
  MemberListItem,
  NewsListItem,
  ProgramListItem,
  ProjectListItem,
  PublicationListItem,
  ResearchAxisListItem,
} from "@/lib/sanity/types";
import { siteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/recherche",
  "/recherche/axes",
  "/recherche/explorer",
  "/innovation",
  "/formation",
  "/projets",
  "/publications",
  "/publications/axes",
  "/ressources",
  "/equipe",
  "/actualites",
  "/collaborer",
  "/contact",
  "/gouvernance",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
  "/newsletter",
];

function buildUrl(path: string, locale: (typeof locales)[number]) {
  return new URL(localizedPath(path, locale), siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localeParam = { locale: "fr" };
  const [projects, publications, members, news, events, programs, axes] = await Promise.all([
    sanityFetch<ProjectListItem[]>(projectListQuery, localeParam, []),
    sanityFetch<PublicationListItem[]>(publicationListQuery, localeParam, []),
    sanityFetch<MemberListItem[]>(memberListQuery, localeParam, []),
    sanityFetch<NewsListItem[]>(newsListQuery, localeParam, []),
    sanityFetch<EventListItem[]>(eventListQuery, localeParam, []),
    sanityFetch<ProgramListItem[]>(programListQuery, localeParam, []),
    sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, localeParam, []),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  staticPaths.forEach((path) => {
    locales.forEach((locale) => {
      entries.push({ url: buildUrl(path, locale) });
    });
  });

  projects.forEach((project) => {
    const frSlug = project.slugIntl?.fr?.current ?? project.slug.current;
    const enSlug = project.slugIntl?.en?.current ?? project.slug.current;
    entries.push({ url: buildUrl(`/projets/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/projets/${enSlug}`, "en") });
  });

  publications.forEach((publication) => {
    const frSlug = publication.slugIntl?.fr?.current ?? publication.slug.current;
    const enSlug = publication.slugIntl?.en?.current ?? publication.slug.current;
    entries.push({ url: buildUrl(`/publications/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/publications/${enSlug}`, "en") });
  });

  members.forEach((member) => {
    const frSlug = member.slugIntl?.fr?.current ?? member.slug.current;
    const enSlug = member.slugIntl?.en?.current ?? member.slug.current;
    entries.push({ url: buildUrl(`/equipe/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/equipe/${enSlug}`, "en") });
  });

  news.forEach((article) => {
    const frSlug = article.slugIntl?.fr?.current ?? article.slug.current;
    const enSlug = article.slugIntl?.en?.current ?? article.slug.current;
    entries.push({ url: buildUrl(`/actualites/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/actualites/${enSlug}`, "en") });
  });

  events.forEach((event) => {
    const frSlug = event.slugIntl?.fr?.current ?? event.slug.current;
    const enSlug = event.slugIntl?.en?.current ?? event.slug.current;
    entries.push({ url: buildUrl(`/actualites/evenements/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/actualites/evenements/${enSlug}`, "en") });
  });

  programs.forEach((program) => {
    const frSlug = program.slugIntl?.fr?.current ?? program.slug.current;
    const enSlug = program.slugIntl?.en?.current ?? program.slug.current;
    entries.push({ url: buildUrl(`/formation/programmes/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/formation/programmes/${enSlug}`, "en") });
  });

  axes.forEach((axis) => {
    const frSlug = axis.slugIntl?.fr?.current ?? axis.slug.current;
    const enSlug = axis.slugIntl?.en?.current ?? axis.slug.current;
    entries.push({ url: buildUrl(`/recherche/axes/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/recherche/axes/${enSlug}`, "en") });
    entries.push({ url: buildUrl(`/publications/axes/${frSlug}`, "fr") });
    entries.push({ url: buildUrl(`/publications/axes/${enSlug}`, "en") });
  });

  return entries;
}
