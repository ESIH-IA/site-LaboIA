import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import NewsCard from "@/components/news/news-card";
import { getArticles } from "@/lib/content-loader";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery, newsListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, NewsListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "actualites", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/actualites", locale),
    alternates: {
      fr: localizedPath("/actualites", "fr"),
      en: localizedPath("/actualites", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "actualites", locale },
    null,
  );
  const localNews = getArticles().map((article) => ({
    _id: article.id,
    title: article.title,
    slug: { current: article.slug },
    date: article.date,
    category: article.category,
    summary: article.summary,
    mainImageUrl: article.mainImage?.src,
    mainImageAlt: article.mainImage?.alt,
    sourceUrl: article.sourceUrl,
    blocks: article.blocks,
  }));
  const sanityNews = isSanityConfigured
    ? await sanityFetch<NewsListItem[]>(newsListQuery, { locale }, [])
    : [];
  const sanitySlugs = new Set(sanityNews.map((item) => item.slug?.current).filter(Boolean));
  const news = [...sanityNews, ...localNews.filter((item) => !sanitySlugs.has(item.slug.current))].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Actualit\u00e9s & Innovation
            </span>
          </div>

          {page?.title ? (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              {page.title}
            </h1>
          ) : null}

          {page?.summary ? (
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed">
              {page.summary}
            </p>
          ) : null}
        </div>
      </section>

      {page?.content && (
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Dernières actualités
            </h2>
          </div>

          {news.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <div className="mx-auto max-w-md">
                <p className="text-base text-slate-600">Contenu en cours de publication.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {news.map((item, idx) => (
                <div
                  key={item._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
