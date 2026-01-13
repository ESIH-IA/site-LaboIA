import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentBlocks } from "@/components/content/blocks";
import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { getArticles } from "@/lib/content-loader";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { newsBySlugQuery, newsListQuery } from "@/lib/sanity/queries";
import type { NewsListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type NewsDetail = {
  _id: string;
  title: string;
  date?: string;
  category?: string;
  summary?: string;
  content?: PortableTextBlock[];
  mainImageUrl?: string;
  mainImageAlt?: string;
  sourceUrl?: string;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  relatedProjects?: Array<{ _id: string; title: string; slug?: { current: string } }>;
  relatedMembers?: Array<{ _id: string; fullName: string; role?: string; slug?: { current: string } }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const article = await sanityFetch<NewsDetail | null>(
    newsBySlugQuery,
    { slug, locale },
    null,
  );
  const localArticle = getArticles().find((item) => item.slug === slug);

  const frSlug = article?.slugIntl?.fr?.current ?? slug;
  const enSlug = article?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: article?.title ?? localArticle?.title,
    description: article?.summary ?? localArticle?.summary,
    path: localizedPath(`/actualites/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/actualites/${frSlug}`, "fr"),
      en: localizedPath(`/actualites/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const article = await sanityFetch<NewsDetail | null>(
    newsBySlugQuery,
    { slug, locale },
    null,
  );
  const localArticle = getArticles().find((item) => item.slug === slug);

  if (!article && !localArticle) {
    notFound();
  }

  const mainImageUrl = article?.mainImageUrl ?? localArticle?.mainImage?.src;
  const mainImageAlt = article?.mainImageAlt ?? localArticle?.mainImage?.alt ?? localArticle?.title;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        {(article?.category ?? localArticle?.category) ? (
          <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
            {article?.category ?? localArticle?.category}
          </span>
        ) : null}
        {(article?.date ?? localArticle?.date) ? (
          <span>{article?.date ?? localArticle?.date}</span>
        ) : null}
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">
        {article?.title ?? localArticle?.title}
      </h1>
      {(article?.summary ?? localArticle?.summary) ? (
        <p className="mt-3 text-lg text-neutral-700">{article?.summary ?? localArticle?.summary}</p>
      ) : null}

      {mainImageUrl ? (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={mainImageUrl}
            alt={mainImageAlt ?? "Illustration de l'article"}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-8">
        {article?.content ? (
          <PortableTextRenderer value={article.content} />
        ) : localArticle?.blocks ? (
          <ContentBlocks blocks={localArticle.blocks} />
        ) : null}
      </div>

      {article?.relatedProjects?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Projets associ\u00e9s</h2>
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

      {article?.relatedMembers?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Membres cit\u00e9s</h2>
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

      {(article?.sourceUrl ?? localArticle?.sourceUrl) ? (
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-neutral-700">
          <span className="font-semibold text-neutral-900">Source:</span>
          <Link
            href={(article?.sourceUrl ?? localArticle?.sourceUrl) as string}
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
  const localSlugs = getArticles().map((item) => item.slug);
  if (!isSanityConfigured) {
    return localSlugs.map((slug) => ({ slug }));
  }
  const items = await sanityFetch<NewsListItem[]>(newsListQuery, { locale: "fr" }, []);
  const slugs = new Set<string>();
  localSlugs.forEach((slug) => slugs.add(slug));
  items.forEach((item) => {
    if (item.slug?.current) slugs.add(item.slug.current);
    if (item.slugIntl?.fr?.current) slugs.add(item.slugIntl.fr.current);
    if (item.slugIntl?.en?.current) slugs.add(item.slugIntl.en.current);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}
