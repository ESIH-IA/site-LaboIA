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

type PageProps = { params: { slug: string } };

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
  const locale = await getServerLocale();
  const axis = await sanityFetch<ResearchAxisDetail | null>(
    researchAxisBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = axis?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = axis?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: axis?.title,
    description: axis?.summary,
    path: localizedPath(`/recherche/axes/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/recherche/axes/${frSlug}`, "fr"),
      en: localizedPath(`/recherche/axes/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const axis = await sanityFetch<ResearchAxisDetail | null>(
    researchAxisBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!axis) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/recherche/axes"
        className="text-sm font-semibold text-neutral-900 underline underline-offset-4"
      >
        Retour aux axes
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{axis.title}</h1>
      {axis.summary ? <p className="mt-3 text-lg text-neutral-700">{axis.summary}</p> : null}

      <div className="mt-6">
        <PortableTextRenderer value={axis.content} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Projets associes</h2>
        {!axis.projects?.length ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {axis.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Publications associees</h2>
        {!axis.publications?.length ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6">
            {axis.publications.map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        )}
      </div>
    </article>
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
