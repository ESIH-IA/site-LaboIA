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

type PageProps = { params: { slug: string } };

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
  const locale = await getServerLocale();
  const axis = await sanityFetch<AxisDetail | null>(
    researchAxisBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = axis?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = axis?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: axis?.title,
    description: axis?.summary,
    path: localizedPath(`/publications/axes/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/publications/axes/${frSlug}`, "fr"),
      en: localizedPath(`/publications/axes/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const axis = await sanityFetch<AxisDetail | null>(
    researchAxisBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!axis) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
          Contenu en cours de publication.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/publications/axes"
        className="text-sm font-semibold text-neutral-900 underline underline-offset-4"
      >
        Retour aux axes
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{axis.title}</h1>
      {axis.summary ? <p className="mt-3 text-lg text-neutral-700">{axis.summary}</p> : null}

      <div className="mt-6">
        <PortableTextRenderer value={axis.content} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-900">Publications associees</h2>
        {axis.publications?.length ? (
          <div className="mt-6 grid gap-6">
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

export async function generateStaticParams() {
  const axes = await sanityFetch<ResearchAxisListItem[]>(
    researchAxisListQuery,
    { locale: "fr" },
    [],
  );
  const slugs = new Set<string>();
  axes.forEach((axis) => {
    if (axis.slug?.current) slugs.add(axis.slug.current);
    if (axis.slugIntl?.fr?.current) slugs.add(axis.slugIntl.fr.current);
    if (axis.slugIntl?.en?.current) slugs.add(axis.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
