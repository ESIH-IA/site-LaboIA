import { notFound } from "next/navigation";

import { contentSource, type Article, type Partner, type Person, type Project, type WithSlug } from "./content-types";

function withSlugs<T extends { id: string }>(items: readonly T[]): WithSlug<T>[] {
  return items.map((item) => ({ ...item, slug: item.id }));
}

export function getSiteSettings() {
  return contentSource.site;
}

export function getNewsletterSettings() {
  return contentSource.newsletter;
}

export function getKpis() {
  return { list: contentSource.kpis, meta: contentSource.kpiMeta };
}

export function getPartners(): WithSlug<Partner>[] {
  return withSlugs(contentSource.partners);
}

export function getProjects(): WithSlug<Project>[] {
  return withSlugs(contentSource.projects);
}

export function getPeople(): WithSlug<Person>[] {
  return withSlugs(contentSource.people);
}

export function getArticles(): WithSlug<Article>[] {
  const articles = withSlugs(contentSource.articles);
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticles(limit = 3) {
  return getArticles()
    .filter((article) => article.featured)
    .slice(0, limit);
}

export function getFeaturedProject() {
  return getProjects().find((project) => project.featured) ?? null;
}

export function getFeaturedPartner() {
  return getPartners().find((partner) => partner.featured) ?? null;
}

export function getArticleBySlug(slug: string) {
  const article = getArticles().find((item) => item.slug === slug);
  if (!article) return notFound();
  return article;
}

export function getProjectBySlug(slug: string) {
  const project = getProjects().find((item) => item.slug === slug);
  if (!project) return notFound();
  return project;
}

export function getPersonBySlug(slug: string) {
  const person = getPeople().find((item) => item.slug === slug);
  if (!person) return notFound();
  return person;
}
