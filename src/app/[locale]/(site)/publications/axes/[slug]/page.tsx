import type { Metadata } from "next";
import Link from "next/link";

import { PublicationCard } from "@/components/cards/cards";
import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { researchAxisBySlugQuery, researchAxisListQuery } from "@/lib/sanity/queries";
import type { ResearchAxisListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

type AxisDetail = {
  _id: string;
  title: string;
  summary?: string;
  content?: PortableTextBlock[];
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  publications?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    publicationType?: string;
    date?: string;
    summary?: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const axis = await sanityFetch<AxisDetail | null>(
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
    path: localizedPath(`/publications/axes/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/publications/axes/${frSlug}`, "fr"),
      en: localizedPath(`/publications/axes/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const axis = await sanityFetch<AxisDetail | null>(
    researchAxisBySlugQuery,
    { slug, locale },
    null,
  );

  if (!axis) {
    return (
      <section className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
        <div className="empty-state">
          Contenu en cours de publication.
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <Link
        href="/publications/axes"
        className="btn-link"
      >
        Retour aux axes
      </Link>
      <h1 className="section-title" style={{marginTop:'1rem'}}>{axis.title}</h1>
      {axis.summary ? <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{axis.summary}</p> : null}

      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={axis.content} />
      </div>

      <div style={{marginTop:'2.5rem'}}>
        <h2 className="section-title" style={{fontSize:'1.25rem'}}>Publications associées</h2>
        {axis.publications?.length ? (
          <div className="card-grid" style={{marginTop:'1.5rem'}}>
            {axis.publications.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        )}
      </div>
    </section>
  );
}

