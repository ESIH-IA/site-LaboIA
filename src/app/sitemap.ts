import type { MetadataRoute } from "next";

import { locales, localizedPath } from "@/lib/i18n";
import { sanityFetch } from "@/lib/sanity/client";
import { eventListQuery, memberListQuery, newsListQuery, projectListQuery } from "@/lib/sanity/queries";
import type { EventListItem, MemberListItem, NewsListItem, ProjectListItem } from "@/lib/sanity/types";
import { siteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/a-propos",
  "/recherche/departement-scientifique",
  "/lacdia-tech",
  "/solutions",
  "/ressources",
  "/actualites",
  "/formation",
  "/collaborer",
  "/contact",
];

function buildUrl(path: string, locale: (typeof locales)[number]) {
  return new URL(localizedPath(path, locale), siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localeParam = { locale: "fr" };
  const [projects, members, news, events] = await Promise.all([
    sanityFetch<ProjectListItem[]>(projectListQuery, localeParam, []),
    sanityFetch<MemberListItem[]>(memberListQuery, localeParam, []),
    sanityFetch<NewsListItem[]>(newsListQuery, localeParam, []),
    sanityFetch<EventListItem[]>(eventListQuery, localeParam, []),
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

  return entries;
}
