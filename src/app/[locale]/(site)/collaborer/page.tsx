import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import CollaborateForm from "@/components/forms/collaborate-form";
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
    { slug: "collaborer", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/collaborer", locale),
    alternates: {
      fr: localizedPath("/collaborer", "fr"),
      en: localizedPath("/collaborer", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "collaborer", locale },
    null,
  );

  const collaborationBenefits = [
    {
      title: "Recherche conjointe",
      description: "Associez-vous à nos projets de recherche en IA, données et innovation technologique.",
      icon: "🔬",
    },
    {
      title: "Transfert technologique",
      description: "Accédez à nos innovations et transformez-les en solutions concrètes pour votre organisation.",
      icon: "⚡",
    },
    {
      title: "Formation spécialisée",
      description: "Bénéficiez de programmes de formation adaptés aux besoins de votre équipe.",
      icon: "📚",
    },
    {
      title: "Impact régional",
      description: "Contribuez au développement technologique et scientifique de la région haïtienne.",
      icon: "🌍",
    },
  ];

  const partnershipTypes = [
    {
      title: "Conventions de recherche",
      description: "Collaborations académiques et scientifiques sur des projets définis.",
    },
    {
      title: "Contrats de prestation",
      description: "Services de consulting, développement et expertise en intelligence artificielle.",
    },
    {
      title: "Partenariats académiques",
      description: "Échanges d'étudiants, co-supervision de thèses et formations conjointes.",
    },
    {
      title: "Mécénat & soutien",
      description: "Contribution au financement et au développement de l'écosystème de recherche.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="page-hero page-hero-dark" style={{paddingBottom:'8rem'}}>
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', left:0, top:'25%', height:'20rem', width:'20rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)'}} />
        <div className="animate-glow" style={{position:'absolute', right:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)', animationDelay: "1s"}} />

        <div className="container" style={{position:'relative'}}>
          <div className="glass-card animate-fade-in-up" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'2rem'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              Collaboration & Partenariats
            </span>
          </div>

          <h1 className="animate-fade-in-up" style={{fontSize:'clamp(3rem,6vw,4.5rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem', lineHeight:1.1, animationDelay: "100ms"}}>
            Collaborer avec LaCDIA
          </h1>

          <p className="animate-fade-in-up" style={{marginTop:'1.5rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7, animationDelay: "200ms"}}>
            Rejoignez une communauté de chercheurs, d'innovateurs et de partenaires engagés dans la transformation numérique. Ensemble, créons des solutions d'intelligence artificielle impactantes pour Haïti et la région.
          </p>
        </div>
      </section>

      {/* Page Content */}
      {page?.content && (
        <section className="section section-light">
          <div className="container">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      )}

      {/* Why Collaborate Section */}
      <section className="section section-white">
        <div className="container">
          <div style={{marginBottom:'4rem'}}>
            <h2 className="section-title" style={{marginBottom:'1rem'}}>
              Pourquoi collaborer avec LaCDIA
            </h2>
            <p className="section-subtitle" style={{fontSize:'1.125rem', maxWidth:'42rem'}}>
              Découvrez les avantages d'une collaboration avec notre laboratoire.
            </p>
          </div>

          <div className="card-grid card-grid-2 card-grid-4">
            {collaborationBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="card card-hover animate-fade-in-up" style={{padding:'2rem', background:'var(--surface)', animationDelay: `${idx * 100}ms`}}
              >
                <div style={{fontSize:'2.25rem', marginBottom:'1rem'}}>
                  {benefit.icon}
                </div>
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{benefit.title}</h3>
                <p style={{color:'#475569', fontSize:'0.875rem', lineHeight:1.7}}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="section" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern" style={{background:'var(--gradient-hero)', opacity:0.03}} />

        <div className="container" style={{position:'relative'}}>
          <div style={{marginBottom:'4rem'}}>
            <h2 className="section-title" style={{marginBottom:'1rem'}}>
              Modalités de collaboration
            </h2>
            <p className="section-subtitle" style={{fontSize:'1.125rem', maxWidth:'42rem'}}>
              Plusieurs formes de partenariat adaptées à vos besoins.
            </p>
          </div>

          <div className="card-grid card-grid-2">
            {partnershipTypes.map((type, idx) => (
              <div
                key={idx}
                className="card card-hover animate-fade-in-up" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
              >
                <div style={{display:'flex', alignItems:'flex-start', gap:'1rem'}}>
                  <div style={{flexShrink:0, width:'3rem', height:'3rem', borderRadius:'0.5rem', background:'linear-gradient(to bottom right, #06b6d4, #14b8a6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700}}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div style={{flex:1}}>
                    <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>
                      {type.title}
                    </h3>
                    <p style={{color:'#475569', fontSize:'0.875rem', lineHeight:1.7}}>
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-30" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:'33%', height:'20rem', width:'20rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />

        <div className="container" style={{position:'relative', maxWidth:'48rem'}}>
          <div style={{marginBottom:'3rem'}}>
            <h2 className="section-title section-title-white" style={{marginBottom:'1rem'}}>
              Démarrez une collaboration
            </h2>
            <p style={{fontSize:'1.125rem', color:'#e2e8f0'}}>
              Complétez ce formulaire et notre équipe vous contactera pour discuter de vos besoins.
            </p>
          </div>

          <CollaborateForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-white">
        <div className="container" style={{maxWidth:'56rem', textAlign:'center'}}>
          <h2 className="section-title" style={{marginBottom:'1.5rem'}}>
            D'autres questions ?
          </h2>
          <p className="section-subtitle" style={{fontSize:'1.125rem', marginBottom:'2rem'}}>
            N'hésitez pas à nous contacter directement pour discuter de vos projets.
          </p>
          <a
            href="/contact"
            className="btn btn-cta-primary" style={{padding:'0.75rem 2rem', fontSize:'1rem'}}
          >
            Nous contacter
          </a>
        </div>
      </section>
    </main>
  );
}
