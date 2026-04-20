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
    <main className="section-white">
      {/* Hero Section */}
      <section className="page-hero page-hero-dark" style={{paddingTop:'6rem', paddingBottom:'10rem'}}>
        {/* Background effects */}
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', left:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)'}} />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'20rem', width:'20rem', borderRadius:'9999px', background:'rgba(6,182,212,0.15)', filter:'blur(48px)', animationDelay: "1.5s"}} />
        <div className="animate-glow" style={{position:'absolute', left:'50%', bottom:'-8rem', height:'24rem', width:'24rem', transform:'translateX(-50%)', borderRadius:'9999px', background:'rgba(20,184,166,0.1)', filter:'blur(48px)', animationDelay: "0.75s"}} />

        {/* Decorative SVG Pattern */}
        <div style={{position:'absolute', top:'5rem', right:0, opacity:0.2, pointerEvents:'none'}}>
          <svg width="400" height="300" viewBox="0 0 400 300" style={{color:'#22d3ee'}}>
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container" style={{position:'relative'}}>
          <div className="glass-card animate-fade-in-up" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'2rem'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              Actualités & Innovation
            </span>
          </div>

          {page?.title ? (
            <h1 className="animate-fade-in-up" style={{fontSize:'clamp(3rem,6vw,4.5rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'2rem', lineHeight:1.1, animationDelay: "100ms"}}>
              {page.title}
            </h1>
          ) : (
            <h1 className="animate-fade-in-up" style={{fontSize:'clamp(3rem,6vw,4.5rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'2rem', lineHeight:1.1, animationDelay: "100ms"}}>
              Actualités & Innovation
            </h1>
          )}

          {page?.summary ? (
            <p className="animate-fade-in-up" style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7, animationDelay: "200ms"}}>
              {page.summary}
            </p>
          ) : (
            <p className="animate-fade-in-up" style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7, animationDelay: "200ms"}}>
              Suivez les dernières avancées en intelligence artificielle, science des données et innovation technologique au LaCDIA.
            </p>
          )}
        </div>
      </section>

      {/* Statistics Strip */}
      <section style={{position:'relative', zIndex:10, marginTop:'-3rem', marginBottom:'2rem'}}>
        <div className="container">
          <div className="card-grid card-grid-3" style={{gap:'1rem'}}>
            <div className="glass-card animate-fade-in-up" style={{borderRadius:'1rem', padding:'2rem', textAlign:'center', animationDelay: "300ms"}}>
              <div className="gradient-text-cyan" style={{fontSize:'clamp(2.25rem,4vw,3rem)', fontWeight:700, marginBottom:'0.5rem'}}>
                {news.length}+
              </div>
              <p style={{color:'#cbd5e1', fontSize:'0.875rem'}}>Articles et Actualités</p>
            </div>
            <div className="glass-card animate-fade-in-up" style={{borderRadius:'1rem', padding:'2rem', textAlign:'center', animationDelay: "400ms"}}>
              <div className="gradient-text-accent" style={{fontSize:'clamp(2.25rem,4vw,3rem)', fontWeight:700, marginBottom:'0.5rem'}}>
                2025
              </div>
              <p style={{color:'#cbd5e1', fontSize:'0.875rem'}}>Projets actifs</p>
            </div>
            <div className="glass-card animate-fade-in-up" style={{borderRadius:'1rem', padding:'2rem', textAlign:'center', animationDelay: "500ms"}}>
              <div className="gradient-text-cyan" style={{fontSize:'clamp(2.25rem,4vw,3rem)', fontWeight:700, marginBottom:'0.5rem'}}>
                100%
              </div>
              <p style={{color:'#cbd5e1', fontSize:'0.875rem'}}>Innovation et Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {page?.content && (
        <section className="section section-light">
          <div className="container">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      <section className="section section-white">
        <div className="container">
          <div style={{marginBottom:'4rem'}}>
            <h2 className="section-title" style={{marginBottom:'1rem'}}>
              Dernières actualités
            </h2>
            <p className="section-subtitle" style={{fontSize:'1.125rem'}}>
              Découvrez nos dernières publications et actualités.
            </p>
          </div>

          {news.length === 0 ? (
            <div className="empty-state" style={{padding:'3rem', textAlign:'center'}}>
              <div style={{maxWidth:'28rem', margin:'0 auto'}}>
                <p className="section-subtitle">Contenu en cours de publication.</p>
              </div>
            </div>
          ) : (
            <div className="card-grid">
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
