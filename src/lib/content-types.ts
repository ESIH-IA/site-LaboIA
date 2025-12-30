import { articles } from "@/content/articles";
import { documents } from "@/content/documents";
import { kpis, kpiMeta } from "@/content/kpis";
import { newsletter } from "@/content/newsletter";
import { partners } from "@/content/partners";
import { people } from "@/content/people";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export type SiteSettings = typeof site;
export type NewsletterSettings = typeof newsletter;
export type Kpi = (typeof kpis)[number];
export type KpiMeta = typeof kpiMeta;
export type Partner = (typeof partners)[number];
export type Project = (typeof projects)[number];
export type Person = (typeof people)[number];
export type Document = (typeof documents)[number];
export type Article = (typeof articles)[number];

export type WithSlug<T> = T & { slug: string };

export const contentSource = {
  site,
  newsletter,
  kpis,
  kpiMeta,
  partners,
  projects,
  people,
  documents,
  articles,
};
