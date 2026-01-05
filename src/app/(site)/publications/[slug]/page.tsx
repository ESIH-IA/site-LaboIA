import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { publicationBySlugQuery, publicationListQuery } from "@/lib/sanity/queries";
import type { PublicationListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: { slug: string } };

type PublicationDetail = {
  _id: string;
  title: string;
  publicationType?: string;
  date?: string;
  summary?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  bibtex?: string;
  externalAuthors?: string;
  authors?: Array<{ _id: string; fullName: string; slug?: { current: string } }>;
  projects?: Array<{ _id: string; title: string; slug?: { current: string } }>;
  axes?: Array<{ _id: string; title: string; slug?: { current: string } }>;
  resources?: Array<{ _id: string; title: string; resourceType?: string; fileUrl?: string; url?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getServerLocale();
  const publication = await sanityFetch<PublicationDetail | null>(
    publicationBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = publication?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = publication?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: publication?.title,
    description: publication?.summary,
    path: localizedPath(`/publications/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/publications/${frSlug}`, "fr"),
      en: localizedPath(`/publications/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const publication = await sanityFetch<PublicationDetail | null>(
    publicationBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!publication) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        {publication.publicationType ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            {publication.publicationType}
          </span>
        ) : null}
        {publication.date ? <span>{publication.date}</span> : null}
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{publication.title}</h1>
      {publication.summary ? (
        <p className="mt-3 text-lg text-neutral-700">{publication.summary}</p>
      ) : null}

      {publication.authors?.length || publication.externalAuthors ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Auteurs</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {publication.authors?.map((author) => (
              <li key={author._id}>
                {author.slug?.current ? (
                  <Link
                    href={`/equipe/${author.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {author.fullName}
                  </Link>
                ) : (
                  <span className="font-medium">{author.fullName}</span>
                )}
              </li>
            ))}
            {publication.externalAuthors ? <li>{publication.externalAuthors}</li> : null}
          </ul>
        </div>
      ) : null}

      {publication.doi || publication.url || publication.pdfUrl ? (
        <div className="mt-8 text-sm text-neutral-800">
          {publication.doi ? <div>DOI: {publication.doi}</div> : null}
          {publication.url ? (
            <Link
              href={publication.url}
              className="inline-flex text-neutral-900 underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Consulter la publication
            </Link>
          ) : null}
          {publication.pdfUrl ? (
            <div className="mt-2">
              <Link
                href={publication.pdfUrl}
                className="inline-flex text-neutral-900 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Telecharger le PDF
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}

      {publication.projects?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Projets lies</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {publication.projects.map((project) => (
              <li key={project._id}>
                {project.slug?.current ? (
                  <Link
                    href={`/projets/${project.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <span className="font-medium">{project.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.axes?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Axes de recherche</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {publication.axes.map((axis) => (
              <li key={axis._id}>
                {axis.slug?.current ? (
                  <Link
                    href={`/publications/axes/${axis.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {axis.title}
                  </Link>
                ) : (
                  <span className="font-medium">{axis.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.resources?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Ressources associees</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {publication.resources.map((resource) => (
              <li key={resource._id} className="flex flex-wrap items-center gap-3">
                <span className="font-medium">{resource.title}</span>
                {resource.resourceType ? (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] uppercase tracking-wide text-neutral-600">
                    {resource.resourceType}
                  </span>
                ) : null}
                {resource.fileUrl ? (
                  <Link
                    href={resource.fileUrl}
                    className="text-neutral-900 underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telecharger
                  </Link>
                ) : null}
                {resource.url ? (
                  <Link
                    href={resource.url}
                    className="text-neutral-900 underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lien externe
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.bibtex ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">BibTeX</h2>
          <pre className="mt-3 overflow-auto rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-800">
            {publication.bibtex}
          </pre>
        </div>
      ) : null}
    </article>
  );
}

export async function generateStaticParams() {
  const publications = await sanityFetch<PublicationListItem[]>(
    publicationListQuery,
    { locale: "fr" },
    [],
  );
  const slugs = new Set<string>();
  publications.forEach((publication) => {
    if (publication.slug?.current) slugs.add(publication.slug.current);
    if (publication.slugIntl?.fr?.current) slugs.add(publication.slugIntl.fr.current);
    if (publication.slugIntl?.en?.current) slugs.add(publication.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
