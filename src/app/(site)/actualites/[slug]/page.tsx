import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { newsBySlugQuery, newsListQuery } from "@/lib/sanity/queries";
import type { NewsListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string;
  };
};

type NewsDetail = {
  _id: string;
  title: string;
  date?: string;
  category?: string;
  summary?: string;
  content?: PortableTextBlock[];
  sourceUrl?: string;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  relatedProjects?: Array<{ _id: string; title: string; slug?: { current: string } }>;
  relatedMembers?: Array<{ _id: string; fullName: string; role?: string; slug?: { current: string } }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getServerLocale();
  const article = await sanityFetch<NewsDetail | null>(
    newsBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  const frSlug = article?.slugIntl?.fr?.current ?? params.slug;
  const enSlug = article?.slugIntl?.en?.current ?? params.slug;

  return buildMetadata({
    title: article?.title,
    description: article?.summary,
    path: localizedPath(`/actualites/${params.slug}`, locale),
    alternates: {
      fr: localizedPath(`/actualites/${frSlug}`, "fr"),
      en: localizedPath(`/actualites/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const locale = await getServerLocale();
  const article = await sanityFetch<NewsDetail | null>(
    newsBySlugQuery,
    { slug: params.slug, locale },
    null,
  );

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        {article.category ? (
          <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
            {article.category}
          </span>
        ) : null}
        {article.date ? <span>{article.date}</span> : null}
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{article.title}</h1>
      {article.summary ? <p className="mt-3 text-lg text-neutral-700">{article.summary}</p> : null}

      <div className="mt-8">
        <PortableTextRenderer value={article.content} />
      </div>

      {article.relatedProjects?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Projets associes</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {article.relatedProjects.map((project) => (
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

      {article.relatedMembers?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Membres cites</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {article.relatedMembers.map((member) => (
              <li key={member._id} className="flex items-center justify-between gap-3">
                {member.slug?.current ? (
                  <Link
                    href={`/equipe/${member.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {member.fullName}
                  </Link>
                ) : (
                  <span className="font-medium">{member.fullName}</span>
                )}
                {member.role ? <span className="text-xs uppercase text-neutral-500">{member.role}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {article.sourceUrl ? (
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-neutral-700">
          <span className="font-semibold text-neutral-900">Source:</span>
          <Link
            href={article.sourceUrl}
            className="inline-flex items-center gap-2 text-neutral-900 underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Consulter la source
          </Link>
        </div>
      ) : null}
    </article>
  );
}

export async function generateStaticParams() {
  const items = await sanityFetch<NewsListItem[]>(newsListQuery, { locale: "fr" }, []);
  const slugs = new Set<string>();
  items.forEach((item) => {
    if (item.slug?.current) slugs.add(item.slug.current);
    if (item.slugIntl?.fr?.current) slugs.add(item.slugIntl.fr.current);
    if (item.slugIntl?.en?.current) slugs.add(item.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
