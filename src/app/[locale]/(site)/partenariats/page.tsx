import type { Metadata } from "next";
import Link from "next/link";

import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "Partenariats",
    description:
      "Découvrez le réseau de collaborations de LaCDIA : partenaires nationaux, régionaux et internationaux pour la recherche et l'innovation en intelligence artificielle.",
    path: localizedPath("/partenariats", locale),
    alternates: {
      fr: localizedPath("/partenariats", "fr"),
      en: localizedPath("/partenariats", "en"),
    },
  });
}

export default async function PartenariatsPage() {
  const locale = await getServerLocale();

  return (
    <main className="section-white">
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
              Partenariats
            </span>
          </div>

          <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            Un réseau de collaborations au service de la recherche et de l'innovation
          </h1>
          <p style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            LaCDIA s'inscrit dans une stratégie de partenariats triple : national, régional et international.
          </p>
          <p style={{marginTop:'0.75rem', maxWidth:'42rem', fontSize:'1rem', color:'#cbd5e1'}}>
            Ces collaborations créent un écosystème dynamique favorisant l'échange de savoirs, la mobilité académique et la création de solutions d'IA au service des défis haïtiens et caribéens.
          </p>

          {/* CTAs */}
          <div style={{marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'1rem'}}>
            <Link
              href={localizedPath("/collaborer", locale)}
              className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem'}}
            >
              Devenir partenaire
              <svg
                style={{height:'1.25rem', width:'1.25rem'}}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href={localizedPath("/contact", locale)}
              className="btn btn-secondary"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Contacter le laboratoire
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Partenariale */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Stratégie de partenariats inclusifs
            </h2>
            <p className="section-subtitle">
              LaCDIA adopte une vision ouverte et inclusive des partenariats, basée sur la complémentarité des forces, l'échange mutuel et la création de valeur partagée.
            </p>
          </div>
          <div className="card-grid card-grid-3">
            {[
              {
                title: "Cercle National",
                description: "Institutions académiques, publiques et privées haïtiennes partenaires de la recherche et de l'innovation technologique.",
                icon: "🇭🇹",
              },
              {
                title: "Cercle Caribéen",
                description: "Universités et institutions des Caraïbes francophone, hispanophone et anglophone pour une vision régionale.",
                icon: "🏝️",
              },
              {
                title: "Cercle International",
                description: "Universités européennes, nord-américaines et organismes mondiaux favorisant une présence scientifique globale.",
                icon: "🌍",
              },
            ].map((circle, idx) => (
              <article
                key={`${circle.title}-${idx}`}
                className="card card-hover gradient-card-bg" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
              >
                <div className="card-accent-top" />
                <div style={{marginBottom:'1rem', fontSize:'2.25rem'}}>{circle.icon}</div>
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{circle.title}</h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>{circle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires Nationaux */}
      <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Partenaires Nationaux (Haïti)
            </h2>
            <p className="section-subtitle">
              Au cœur du système d'innovation haïtien, LaCDIA collaborate avec des institutions académiques, publiques et privées pour renforcer l'écosystème local.
            </p>
          </div>

          {/* Institutions Académiques */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <span style={{display:'inline-flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#cffafe', color:'#0e7490', fontWeight:600}}>
                📚
              </span>
              Institutions Académiques
            </h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "ESIH",
                  detail: "Rattachement institutionnel",
                  desc: "École Supérieure d'Informatique d'Haïti - héberge LaCDIA",
                },
                {
                  name: "Université d'État d'Haïti",
                  detail: "Recherche conjointe",
                  desc: "Collaboration académique et projets de recherche multidisciplinaires",
                },
                {
                  name: "Université Quisqueya",
                  detail: "Mobilités académiques",
                  desc: "Échange d'étudiants et doctorants, formations conjointes",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#0e7490', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutions Publiques */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <span style={{display:'inline-flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ccfbf1', color:'#0f766e', fontWeight:600}}>
                🏛️
              </span>
              Institutions Publiques
            </h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "Ministère de l'Éducation",
                  detail: "Politiques numériques",
                  desc: "Conseil et accompagnement pour l'intégration de l'IA dans l'éducation haïtienne",
                },
                {
                  name: "Ministère de la Santé (MSPP)",
                  detail: "Santé numérique",
                  desc: "Projets de diagnostic assisté et systèmes d'information sanitaire",
                },
                {
                  name: "Ministère de l'Agriculture",
                  detail: "Agriculture intelligente",
                  desc: "Solutions IA pour la productivité agricole et la résilience climatique",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #6366f1)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#0f766e', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secteur Privé */}
          <div>
            <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <span style={{display:'inline-flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#e0e7ff', color:'#4338ca', fontWeight:600}}>
                💼
              </span>
              Secteur Privé
            </h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "Entreprises Technologiques",
                  detail: "Transfert technologique",
                  desc: "Collaborations pour l'innovation et le déploiement de solutions IA",
                },
                {
                  name: "Secteur Bancaire",
                  detail: "Fintech et sécurité",
                  desc: "Projets autour de la fraude, du crédit scoring et de l'inclusion financière",
                },
                {
                  name: "Secteur Agroalimentaire",
                  detail: "AgriTech",
                  desc: "Solutions pour la qualité, la traçabilité et l'optimisation de la production",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#4338ca', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Régionaux Caribéens */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Partenaires Régionaux Caribéens
            </h2>
            <p className="section-subtitle">
              Renforcer les liens scientifiques et académiques au sein de la Caraïbe pour créer un espace d'innovation régional.
            </p>
          </div>

          {/* Caraïbe Francophone */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0e7490', marginBottom:'1.5rem'}}>
              Caraïbe Francophone
            </h3>
            <div className="card-grid card-grid-2">
              {[
                {
                  name: "Université des Antilles",
                  location: "Martinique, Guadeloupe",
                  desc: "Formation doctorale, recherche conjointe et mobilités étudiantes",
                },
                {
                  name: "Université de Guyane",
                  location: "Guyane française",
                  desc: "Collaborations en biodiversité numérique et écosystèmes amazo­niens",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.25rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.875rem', fontWeight:600, color:'#0e7490', marginBottom:'0.75rem'}}>{partner.location}</p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Caraïbe Hispanophone */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f766e', marginBottom:'1.5rem'}}>
              Caraïbe Hispanophone
            </h3>
            <div className="card-grid card-grid-2">
              {[
                {
                  name: "Universidad Autónoma de Santo Domingo",
                  location: "République Dominicaine",
                  desc: "Projets de recherche multidisciplinaires et échanges académiques",
                },
                {
                  name: "Universidad de Puerto Rico",
                  location: "Porto Rico",
                  desc: "Collaboration en informatique et transformation numérique caribéenne",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.25rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.875rem', fontWeight:600, color:'#0f766e', marginBottom:'0.75rem'}}>{partner.location}</p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Caraïbe Anglophone */}
          <div>
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#4338ca', marginBottom:'1.5rem'}}>
              Caraïbe Anglophone
            </h3>
            <div className="card-grid card-grid-2">
              {[
                {
                  name: "University of the West Indies",
                  location: "Jamaïque, Trinité-et-Tobago, Barbade",
                  desc: "Réseau académique majeur pour l'IA et la transformation numérique régionale",
                },
                {
                  name: "Caribbean Programmes",
                  location: "Caraïbe anglophone",
                  desc: "Partenariats en développement durable et innovation technologique",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.25rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.875rem', fontWeight:600, color:'#4338ca', marginBottom:'0.75rem'}}>{partner.location}</p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Internationaux */}
      <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Partenaires Internationaux
            </h2>
            <p className="section-subtitle">
              Une présence scientifique globale via des collaborations avec des universités de prestige et des organismes internationaux.
            </p>
          </div>

          {/* Europe */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <span style={{display:'inline-flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#cffafe', color:'#0e7490', fontWeight:600}}>
                🇪🇺
              </span>
              Europe
            </h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "Université Côte d'Azur",
                  detail: "Nice, France",
                  desc: "Via Pr. Miranda - recherche en IA et partenariat académique fort",
                },
                {
                  name: "ESTIA",
                  detail: "France",
                  desc: "Formation d'ingénieurs et innovation technologique",
                },
                {
                  name: "Réseau AUF",
                  detail: "Agence Universitaire de la Francophonie",
                  desc: "Mobilités académiques, financements et projets francophones",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#0e7490', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Amérique du Nord */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <span style={{display:'inline-flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ccfbf1', color:'#0f766e', fontWeight:600}}>
                🇨🇦
              </span>
              Amérique du Nord
            </h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "Universités Québécoises",
                  detail: "Québec, Canada",
                  desc: "Échanges d'étudiants, cotutelles de thèse et recherche conjointe",
                },
                {
                  name: "Universités Ontariennes",
                  detail: "Ontario, Canada",
                  desc: "Programmes de mobilité et collaborations en informatique",
                },
                {
                  name: "Universités Américaines",
                  detail: "États-Unis",
                  desc: "Partenariats académiques et échanges scientifiques",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #6366f1)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#0f766e', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organismes Internationaux */}
          <div>
            <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <span style={{display:'inline-flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#e0e7ff', color:'#4338ca', fontWeight:600}}>
                🌐
              </span>
              Organismes Internationaux
            </h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "AUF",
                  detail: "Agence Universitaire de la Francophonie",
                  desc: "Accès aux programmes de mobilité et financements pour la recherche",
                },
                {
                  name: "Campus France",
                  detail: "France",
                  desc: "Facilitation des mobilités académiques et échanges franco-haïtiens",
                },
                {
                  name: "ERASMUS+",
                  detail: "Programme Européen",
                  desc: "Bourse pour mobilités d'études et de formation en Europe",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#4338ca', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires Industriels et Institutionnels */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Partenaires Industriels et Institutionnels Mondiaux
            </h2>
            <p className="section-subtitle">
              Des collaborations avec les leaders mondiaux pour apporter technologies et expertise au service de l'innovation.
            </p>
          </div>

          {/* Tech Companies */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'1.5rem'}}>Géants Technologiques</h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "Microsoft",
                  detail: "Academic Programs",
                  desc: "Accès à Azure, formations en cloud computing et IA",
                },
                {
                  name: "Google",
                  detail: "Edu & Research",
                  desc: "Outils cloud, formations en machine learning et développement",
                },
                {
                  name: "IBM",
                  detail: "Academic Partnerships",
                  desc: "Technologie Watson, certification et programmes éducatifs",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#0e7490', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* International Organizations */}
          <div style={{marginBottom:'4rem'}}>
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'1.5rem'}}>Organismes Internationaux</h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "BID",
                  detail: "Banque Inter-Américaine de Développement",
                  desc: "Financements et expertise pour projets de développement technologique",
                },
                {
                  name: "Banque Mondiale",
                  detail: "World Bank",
                  desc: "Projets de résilience et adaptation climatique via l'IA",
                },
                {
                  name: "PNUD",
                  detail: "Programme des Nations Unies pour le Développement",
                  desc: "Alignement avec ODD et projets de développement durable",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #6366f1)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#0f766e', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Agencies */}
          <div>
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'1.5rem'}}>Organismes Spécialisés</h3>
            <div className="card-grid card-grid-3">
              {[
                {
                  name: "FAO",
                  detail: "Organisation des Nations Unies pour l'Alimentation",
                  desc: "Solutions IA pour l'agriculture durable et sécurité alimentaire",
                },
                {
                  name: "OMS",
                  detail: "Organisation Mondiale de la Santé",
                  desc: "Projets de diagnostic assisté et systèmes de santé numériques",
                },
                {
                  name: "ONG Haïtiennes",
                  detail: "Secteur Humanitaire",
                  desc: "Collaborations pour impact social et développement communautaire",
                },
              ].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="card card-hover gradient-card-bg"
                  style={{padding:'1.5rem', animationDelay: `${idx * 50}ms`}}
                >
                  <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
                  <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{partner.name}</h4>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#4338ca', marginBottom:'0.75rem'}}>
                    {partner.detail}
                  </p>
                  <p style={{fontSize:'0.875rem', color:'#475569'}}>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modalités de Collaboration */}
      <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Modalités de Collaboration
            </h2>
            <p className="section-subtitle">
              LaCDIA offre diverses formes de collaborations adaptées aux besoins et ambitions de ses partenaires.
            </p>
          </div>
          <div className="card-grid card-grid-2">
            {[
              {
                title: "Projets de Recherche Conjoints",
                icon: "🔬",
                description: "Développement collaboratif de projets de recherche multidisciplinaires avec publication conjointe.",
              },
              {
                title: "Cotutelles de Thèse",
                icon: "🎓",
                description: "Encadrement conjoint de doctorants par plusieurs universités pour une formation enrichie.",
              },
              {
                title: "Mobilités de Chercheurs",
                icon: "✈️",
                description: "Échanges temporaires de chercheurs et enseignants pour collaborations intensives.",
              },
              {
                title: "Formations Conjointes",
                icon: "📖",
                description: "Programmes d'enseignement communs, séminaires et ateliers thématiques.",
              },
              {
                title: "Prestations et Conseil",
                icon: "💡",
                description: "Via LaCDIA Tech - Services de consultation et développement technologique pour partenaires.",
              },
              {
                title: "Événements Scientifiques",
                icon: "🎤",
                description: "Conférences, workshops et séminaires co-organisés avec partenaires académiques.",
              },
            ].map((modality, idx) => (
              <article
                key={`${modality.title}-${idx}`}
                className="card card-hover gradient-card-bg" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
              >
                <div className="card-accent-top" />
                <div style={{marginBottom:'1rem', fontSize:'2.25rem'}}>{modality.icon}</div>
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{modality.title}</h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>{modality.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ODD - Sustainable Development Goals */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Alignement avec les Objectifs de Développement Durable (ODD)
            </h2>
            <p className="section-subtitle">
              Les partenariats de LaCDIA s'inscrivent dans une vision d'impact social et environnemental, alignée avec l'agenda 2030 des Nations Unies.
            </p>
          </div>
          <div className="card-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(12rem, 1fr))'}}>

            {[
              {
                odd: "ODD 2",
                title: "Faim Zéro",
                description: "Agriculture intelligente et systèmes de production durables",
                color: "from-amber-500 to-orange-500",
              },
              {
                odd: "ODD 3",
                title: "Santé et Bien-être",
                description: "Diagnostic médical assisté par IA et systèmes informatiques de santé",
                color: "from-red-500 to-pink-500",
              },
              {
                odd: "ODD 4",
                title: "Éducation de Qualité",
                description: "Formation doctorale de haut niveau et programmes éducatifs innovants",
                color: "from-blue-500 to-cyan-500",
              },
              {
                odd: "ODD 9",
                title: "Innovation",
                description: "Infrastructures numériques résilientes et innovation technologique",
                color: "from-yellow-500 to-amber-500",
              },
              {
                odd: "ODD 13",
                title: "Action Climatique",
                description: "Solutions IA pour adaptation et atténuation du changement climatique",
                color: "from-green-500 to-emerald-500",
              },
            ].map((odd, idx) => (
              <article
                key={`${odd.odd}-${idx}`}
                className="card card-hover"
                style={{
                  animationDelay: `${idx * 50}ms`,
                  background: `linear-gradient(135deg, ${
                    odd.color === "from-amber-500 to-orange-500"
                      ? "rgb(217, 119, 6) 0%, rgb(234, 88, 12) 100%"
                      : odd.color === "from-red-500 to-pink-500"
                        ? "rgb(239, 68, 68) 0%, rgb(236, 72, 153) 100%"
                        : odd.color === "from-blue-500 to-cyan-500"
                          ? "rgb(59, 130, 246) 0%, rgb(6, 182, 212) 100%"
                          : odd.color === "from-yellow-500 to-amber-500"
                            ? "rgb(234, 179, 8) 0%, rgb(217, 119, 6) 100%"
                            : "rgb(34, 197, 94) 0%, rgb(5, 150, 105) 100%"
                  })`,
                }}
              >
                <div style={{position:'relative'}}>
                  <p style={{fontSize:'0.875rem', fontWeight:700, color:'rgba(255,255,255,0.9)', marginBottom:'0.5rem'}}>{odd.odd}</p>
                  <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem'}}>{odd.title}</h3>
                  <p style={{fontSize:'0.875rem', color:'rgba(255,255,255,0.8)', lineHeight:1.7}}>{odd.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.2)', filter:'blur(48px)'}} />
        <div
          className="animate-glow" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(20,184,166,0.2)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative', textAlign:'center'}}>
          <h2 className="section-title section-title-white" style={{marginBottom:'1.5rem'}}>
            Rejoignez Notre Écosystème de Collaboration
          </h2>
          <p style={{margin:'0 auto', maxWidth:'48rem', fontSize:'1.125rem', color:'#e2e8f0', lineHeight:1.7, marginBottom:'2rem'}}>
            Que vous soyez une institution académique, une organisation publique ou une entreprise privée, LaCDIA vous invite à explorer des opportunités de collaboration.
          </p>

          {/* CTAs */}
          <div style={{display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'center'}}>
            <Link
              href={localizedPath("/collaborer", locale)}
              className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem'}}
            >
              Devenir Partenaire
              <svg
                style={{height:'1.25rem', width:'1.25rem'}}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href={localizedPath("/contact", locale)}
              className="btn btn-secondary"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Contacter le Laboratoire
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
