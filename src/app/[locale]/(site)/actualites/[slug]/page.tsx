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

export const dynamic = "force-dynamic";

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
    <article className="container" style={{maxWidth:'56rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div className="simple-card-meta">
        {(article?.category ?? localArticle?.category) ? (
          <span className="badge badge-primary">
            {article?.category ?? localArticle?.category}
          </span>
        ) : null}
        {(article?.date ?? localArticle?.date) ? (
          <span>{article?.date ?? localArticle?.date}</span>
        ) : null}
      </div>

      <h1 className="section-title" style={{marginTop:'1rem'}}>
        {article?.title ?? localArticle?.title}
      </h1>
      {(article?.summary ?? localArticle?.summary) ? (
        <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{article?.summary ?? localArticle?.summary}</p>
      ) : null}

      {mainImageUrl ? (
        <div style={{position:'relative', marginTop:'1.5rem', aspectRatio:'16/9', width:'100%', overflow:'hidden', borderRadius:'1rem'}}>
          <Image
            src={mainImageUrl}
            alt={mainImageAlt ?? "Illustration de l'article"}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            style={{objectFit:'cover'}}
          />
        </div>
      ) : null}

      <div style={{marginTop:'2rem'}}>
        {article?.content ? (
          <PortableTextRenderer value={article.content} />
        ) : localArticle?.blocks ? (
          <ContentBlocks blocks={localArticle.blocks} />
        ) : null}
      </div>

      {article?.relatedProjects?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Projets associés</h2>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {article.relatedProjects.map((project) => (
              <li key={project._id}>
                {project.slug?.current ? (
                  <Link
                    href={`/projets/${project.slug.current}`}
                    className="btn-link"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{project.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {article?.relatedMembers?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Membres cités</h2>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {article.relatedMembers.map((member) => (
              <li key={member._id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem'}}>
                {member.slug?.current ? (
                  <Link
                    href={`/equipe/${member.slug.current}`}
                    className="btn-link"
                  >
                    {member.fullName}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{member.fullName}</span>
                )}
                {member.role ? <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--muted)'}}>{member.role}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {(article?.sourceUrl ?? localArticle?.sourceUrl) ? (
        <div style={{marginTop:'2.5rem', display:'flex', flexWrap:'wrap', gap:'0.75rem', fontSize:'0.875rem', color:'#334155'}}>
          <span style={{fontWeight:600, color:'#0f172a'}}>Source:</span>
          <Link
            href={(article?.sourceUrl ?? localArticle?.sourceUrl) as string}
            className="btn-link"
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

