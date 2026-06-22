import type { Metadata } from "next";

import { PublicationCard } from "@/components/cards/cards";
import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { researchAxisBySlugQuery } from "@/lib/sanity/queries";
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
    return null;
  }

  return (
    <section className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <h1 className="section-title" style={{marginTop:'1rem'}}>{axis.title}</h1>
      {axis.summary ? <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{axis.summary}</p> : null}

      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={axis.content} />
      </div>

      <div style={{marginTop:'2.5rem'}}>
        {axis.publications?.length ? (
          <div className="card-grid" style={{marginTop:'1.5rem'}}>
            {axis.publications.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
