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

export const dynamic = "force-dynamic";

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
    <main className="bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh-bg py-24 md:py-40">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-glow" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-1/2 -bottom-32 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl animate-glow" style={{ animationDelay: "0.75s" }} />

        {/* Decorative SVG Pattern */}
        <div className="absolute top-20 right-0 opacity-20 pointer-events-none">
          <svg width="400" height="300" viewBox="0 0 400 300" className="text-cyan-400">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-8 animate-fade-in-up">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Actualités & Innovation
            </span>
          </div>

          {page?.title ? (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in-up leading-tight" style={{ animationDelay: "100ms" }}>
              {page.title}
            </h1>
          ) : (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in-up leading-tight" style={{ animationDelay: "100ms" }}>
              Actualit\u00e9s & Innovation
            </h1>
          )}

          {page?.summary ? (
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              {page.summary}
            </p>
          ) : (
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              Suivez les derni\u00e8res avanc\u00e9es en intelligence artificielle, science des donn\u00e9es et innovation technologique au LaCDIA.
            </p>
          )}
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="relative z-10 -mt-12 mb-8 md:mb-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass-card rounded-2xl backdrop-blur-lg border border-white/20 p-8 text-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                {news.length}+
              </div>
              <p className="text-slate-300 text-sm md:text-base">Articles & Actualités</p>
            </div>
            <div className="glass-card rounded-2xl backdrop-blur-lg border border-white/20 p-8 text-center animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                2025
              </div>
              <p className="text-slate-300 text-sm md:text-base">Projets actifs</p>
            </div>
            <div className="glass-card rounded-2xl backdrop-blur-lg border border-white/20 p-8 text-center animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-slate-300 text-sm md:text-base">Innovation & Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {page?.content && (
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-4">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Derni\u00e8res actualit\u00e9s
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              D\u00e9couvrez nos derni\u00e8res publications et actualit\u00e9s.
            </p>
          </div>

          {news.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-12 text-center">
              <div className="mx-auto max-w-md">
                <p className="text-base text-slate-600 dark:text-slate-400">Contenu en cours de publication.</p>
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
