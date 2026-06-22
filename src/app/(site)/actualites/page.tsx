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

  const featured = news[0];
  const rest = news.slice(1);

  return (
    <main style={{ background: "var(--labo-bg)" }}>
      {/* Hero editorial */}
      <section className="relative overflow-hidden section-padding-sm">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="container-site relative z-10">
          <div className="badge-teal inline-flex mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
            Actualites &amp; Innovation
          </div>
          <h1 className="text-display-xl text-[#f0f4ff] max-w-3xl">
            {page?.title ?? "Actualites du laboratoire"}
          </h1>
          {page?.summary && (
            <p className="mt-6 text-lg text-[#8892b0] max-w-2xl leading-relaxed">{page.summary}</p>
          )}
        </div>
      </section>

      {page?.content && (
        <section className="section-labo-surface section-padding-sm">
          <div className="container-site">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      {/* Article a la une */}
      {featured && (
        <section className="section-labo-surface section-padding-sm">
          <div className="container-site">
            <div className="label-eyebrow text-[#00d4aa] mb-6">A la une</div>
            <div className="glass-labo-hover rounded-2xl p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {featured.category && <span className="badge-teal">{featured.category}</span>}
                {featured.date && <span className="label-mono text-[#8892b0]">{featured.date}</span>}
              </div>
              <h2 className="text-display-md text-[#f0f4ff] max-w-2xl">{featured.title}</h2>
              {featured.summary && (
                <p className="mt-5 text-[#8892b0] text-lg leading-relaxed max-w-2xl">{featured.summary}</p>
              )}
              {featured.sourceUrl && (
                <a
                  href={featured.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-[#00d4aa] hover:text-[#00f0c0] transition-colors"
                >
                  Lire l&apos;article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Liste des articles */}
      <section className="section-labo section-padding">
        <div className="container-site">
          <div className="divider-labo mb-12" />
          {news.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#8892b0]">
              Contenu en cours de publication.
            </div>
          ) : (
            <div className="grid gap-6">
              {rest.map((item, idx) => (
                <div
                  key={item._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
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