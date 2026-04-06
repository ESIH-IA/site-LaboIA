import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { ProjectCard, PublicationCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { researchAxisBySlugQuery, researchAxisListQuery } from "@/lib/sanity/queries";
import type { ResearchAxisListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

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
    notFound();
  }

  return (
    <article className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <Link
        href="/recherche/axes"
        className="btn-link"
      >
        Retour aux axes
      </Link>
      <h1 className="section-title" style={{marginTop:'1rem'}}>{axis.title}</h1>
      {axis.summary ? <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{axis.summary}</p> : null}

      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={axis.content} />
      </div>

      <div style={{marginTop:'3rem'}}>
        <h2 className="section-title" style={{fontSize:'1.5rem'}}>Projets associés</h2>
        {!axis.projects?.length ? (
          <div className="empty-state">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="card-grid card-grid-2" style={{marginTop:'1.5rem'}}>
            {axis.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      <div style={{marginTop:'3rem'}}>
        <h2 className="section-title" style={{fontSize:'1.5rem'}}>Publications associées</h2>
        {!axis.publications?.length ? (
          <div className="empty-state">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="card-grid" style={{marginTop:'1.5rem'}}>
            {axis.publications.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

