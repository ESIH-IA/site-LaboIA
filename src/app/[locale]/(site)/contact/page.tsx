import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import ContactForm from "@/components/forms/contact-form";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title || "Nous Contacter",
    description: page?.summary || "Contactez le LaCDIA pour vos demandes de collaboration et d'information.",
    path: localizedPath("/contact", locale),
    alternates: {
      fr: localizedPath("/contact", "fr"),
      en: localizedPath("/contact", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );

  return (
    <main style={{width:'100%'}}>
      {/* Hero Section */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
        <div
          className="animate-glow" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative'}}>
          {/* Badge */}
          <div className="glass-card" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'1.5rem'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              Contact
            </span>
          </div>

          <h1 className="animate-fade-in-up" style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            Nous Contacter
          </h1>
          <p className="animate-fade-in-up" style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            Vous avez une question, un projet ou une opportunité de collaboration ?
          </p>
          <p className="animate-fade-in-up" style={{marginTop:'0.75rem', maxWidth:'42rem', fontSize:'1rem', color:'#cbd5e1'}}>
            Contactez l'équipe du LaCDIA pour discuter de vos besoins en intelligence artificielle et science des données.
          </p>
        </div>
      </section>

      {/* CMS Content Section (if available) */}
      {page && (page.title || page.summary || page.content?.length) ? (
        <section className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
          <div style={{maxWidth:'48rem'}}>
            {page.title ? <h2 className="section-title">{page.title}</h2> : null}
            {page.summary ? <p className="section-subtitle">{page.summary}</p> : null}
          </div>

          <div style={{marginTop:'1.5rem'}}>
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      ) : null}

      {/* Contact Info & Form Section */}
      <section className="section section-white" style={{position:'relative'}}>
        <div className="container">
          {/* Contact Info Cards */}
          <div className="card-grid card-grid-3" style={{marginBottom:'4rem'}}>
            {/* Email Card */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                <svg
                  style={{height:'1.5rem', width:'1.5rem'}}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a', marginBottom:'0.5rem'}}>Email</h3>
              <p style={{fontSize:'1rem', color:'#475569'}}>contact@lacdia.org</p>
            </article>

            {/* Address Card */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#f0fdfa', color:'#0d9488'}}>
                <svg
                  style={{height:'1.5rem', width:'1.5rem'}}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a', marginBottom:'0.5rem'}}>Adresse</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>Campus ESIH, Route de Frères, Pétion-Ville, Haïti</p>
            </article>

            {/* Hours Card */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #8b5cf6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#f5f3ff', color:'#7c3aed'}}>
                <svg
                  style={{height:'1.5rem', width:'1.5rem'}}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a', marginBottom:'0.5rem'}}>Horaires</h3>
              <p style={{fontSize:'1rem', color:'#475569'}}>Lundi-Vendredi, 8h-17h</p>
            </article>
          </div>

          {/* Contact Form */}
          <div style={{maxWidth:'48rem', margin:'0 auto'}}>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
