import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { ProjectCard, PublicationCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { researchAxisBySlugQuery } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";
import { getAxisById } from "@/data/research-axes";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

type ResearchAxisDetail = {
  _id: string;
  title: string;
  summary?: string;
  content?: PortableTextBlock[];
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  projects?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    summary?: string;
    projectType?: string;
  }>;
  publications?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    date?: string;
    publicationType?: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const axis = await sanityFetch<ResearchAxisDetail | null>(
    researchAxisBySlugQuery,
    { slug, locale },
    null,
  );

  const frSlug = axis?.slugIntl?.fr?.current ?? slug;
  const enSlug = axis?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: axis?.title,
    description: axis?.summary,
    path: localizedPath(`/recherche/axes/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/recherche/axes/${frSlug}`, "fr"),
      en: localizedPath(`/recherche/axes/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const axis = await sanityFetch<ResearchAxisDetail | null>(
    researchAxisBySlugQuery,
    { slug, locale },
    null,
  );

  if (!axis) {
    const staticAxis = getAxisById(slug);
    if (!staticAxis) notFound();

    return (
      <article className="container" style={{ maxWidth: "64rem", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <h1 className="section-title" style={{ marginTop: "1rem" }}>{staticAxis.title}</h1>
        <p className="section-subtitle" style={{ fontSize: "1.125rem" }}>{staticAxis.problematic}</p>

        {staticAxis.objectives.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
              Objectifs
            </h2>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {staticAxis.objectives.map((obj, i) => (
                <li key={i} style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6 }}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {staticAxis.useCases.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "1rem" }}>
              Cas d&apos;usage
            </h2>
            <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {staticAxis.useCases.map((uc, i) => (
                <li key={i} style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6 }}>{uc}</li>
              ))}
            </ul>
          </div>
        )}

        {staticAxis.keywords.length > 0 && (
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {staticAxis.keywords.map((kw) => (
              <span key={kw} className="tag">{kw}</span>
            ))}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className="container" style={{ maxWidth: "64rem", paddingTop: "3rem", paddingBottom: "3rem" }}>
      <h1 className="section-title" style={{ marginTop: "1rem" }}>{axis.title}</h1>
      {axis.summary ? <p className="section-subtitle" style={{ fontSize: "1.125rem" }}>{axis.summary}</p> : null}

      <div style={{ marginTop: "1.5rem" }}>
        <PortableTextRenderer value={axis.content} />
      </div>

      <div style={{ marginTop: "3rem" }}>
        {axis.projects?.length ? (
          <div className="card-grid card-grid-2" style={{ marginTop: "1.5rem" }}>
            {axis.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: "3rem" }}>
        {axis.publications?.length ? (
          <div className="card-grid" style={{ marginTop: "1.5rem" }}>
            {axis.publications.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
