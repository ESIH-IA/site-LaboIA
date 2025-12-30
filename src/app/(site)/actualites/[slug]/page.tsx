import Link from "next/link";

import { ContentBlocks } from "@/components/content/blocks";
import { getArticleBySlug, getArticles } from "@/lib/content-loader";

type Params = { params: { slug: string } };

export default function ArticlePage({ params }: Params) {
  const article = getArticleBySlug(params.slug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
          {article.category}
        </span>
        <span>{article.date}</span>
        <span aria-hidden="true">•</span>
        <span>{article.authorName}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{article.title}</h1>
      <p className="mt-3 text-lg text-neutral-700">{article.summary}</p>

      <div className="mt-8 space-y-8">
        <ContentBlocks blocks={article.blocks} />
      </div>

      {article.sourceUrl ? (
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-neutral-700">
          <span className="font-semibold text-neutral-900">Source :</span>
          <Link
            href={article.sourceUrl}
            className="inline-flex items-center gap-2 text-neutral-900 underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Consulter l’article original
            <span aria-hidden>↗</span>
          </Link>
        </div>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}
