import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "À propos - LaCDIA",
    description:
      "Découvrez le Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle, pôle de référence en IA et sciences des données dans la Caraïbe.",
    path: localizedPath("/a-propos", locale),
    alternates: {
      fr: localizedPath("/a-propos", "fr"),
      en: localizedPath("/a-propos", "en"),
    },
  });
}

export default async function AboutPage() {
  const locale = await getServerLocale();

  return (
    <main>
      {/* ============================================
          SECTION 1: HERO
          ============================================ */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
        <div
          className="animate-glow"
          style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative'}}>
          {/* Badge */}
          <div className="glass-card" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'1.5rem'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              Laboratoire de recherche
            </span>
          </div>

          {/* Titre Principal */}
          <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle
          </h1>

          {/* Sous-titre */}
          <p style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            Le pôle de référence en intelligence artificielle et sciences des données dans la Caraïbe,
            dédié à l'excellence scientifique, l'innovation responsable et l'impact régional.
          </p>
        </div>

        {/* Gradient fade bottom */}
        <div className="hero-fade-bottom" />
      </section>

      {/* ============================================
          SECTION 2: IDENTITÉ INSTITUTIONNELLE
          ============================================ */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title" style={{marginBottom:'3rem'}}>
            Identité Institutionnelle
          </h2>

          <div className="card-grid card-grid-sm-2 card-grid-4">
            {/* Nom Complet */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                <span style={{fontSize:'1.5rem'}}>🏛️</span>
              </div>
              <h3 style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569', marginBottom:'0.5rem'}}>
                Nom Complet
              </h3>
              <p style={{fontSize:'1rem', fontWeight:700, color:'#0f172a'}}>
                Laboratoire Caribéen des Sciences de Données et de l'Intelligence Artificielle
              </p>
            </article>

            {/* Acronyme */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#f0fdfa', color:'#0d9488'}}>
                <span style={{fontSize:'1.5rem'}}>📝</span>
              </div>
              <h3 style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569', marginBottom:'0.5rem'}}>
                Acronyme
              </h3>
              <p style={{fontSize:'1rem', fontWeight:700, color:'#0f172a'}}>LaCDIA</p>
            </article>

            {/* Affiliation */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#eef2ff', color:'#4f46e5'}}>
                <span style={{fontSize:'1.5rem'}}>🎓</span>
              </div>
              <h3 style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569', marginBottom:'0.5rem'}}>
                Affiliation
              </h3>
              <p style={{fontSize:'1rem', fontWeight:700, color:'#0f172a'}}>ESIH</p>
              <p style={{fontSize:'0.75rem', color:'#475569', marginTop:'0.25rem'}}>
                École Supérieure d'Informatique d'Haïti
              </p>
            </article>

            {/* Localisation & Fondation */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                <span style={{fontSize:'1.5rem'}}>📍</span>
              </div>
              <h3 style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569', marginBottom:'0.5rem'}}>
                Localisation
              </h3>
              <p style={{fontSize:'1rem', fontWeight:700, color:'#0f172a'}}>Port-au-Prince, Haïti</p>
              <p style={{fontSize:'0.75rem', color:'#475569', marginTop:'0.25rem'}}>Fondé en 2025</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: VISION
          ============================================ */}
      <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <h2 className="section-title" style={{marginBottom:'3rem'}}>
            Notre Vision
          </h2>

          {/* Vision Quote */}
          <div className="card gradient-card-bg" style={{borderRadius:'1.5rem', padding:'3rem', boxShadow:'var(--shadow-lg)', marginBottom:'3rem'}}>
            <div className="card-accent-top" style={{background:'linear-gradient(to right, #06b6d4, #14b8a6, #6366f1)'}} />
            <blockquote style={{fontSize:'clamp(1.5rem,3vw,1.875rem)', fontWeight:700, color:'#0f172a', lineHeight:1.5}}>
              "Devenir le pôle de référence en intelligence artificielle et sciences des données dans
              la Caraïbe"
            </blockquote>
            <p style={{marginTop:'1.5rem', fontSize:'1rem', color:'#475569'}}>
              Cet engagement guide notre recherche, notre formation et nos innovations au service du
              développement régional et international.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="card-grid card-grid-3">
            {/* Pilier 1 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                <span style={{fontSize:'1.5rem'}}>⭐</span>
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Excellence Scientifique</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Produire des connaissances originales, pertinentes et reconnues internationalement dans
                l'IA et les sciences des données.
              </p>
            </article>

            {/* Pilier 2 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#f0fdfa', color:'#0d9488'}}>
                <span style={{fontSize:'1.5rem'}}>🌍</span>
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Pertinence Sociétale</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Répondre aux enjeux caribéens et haïtiens par des solutions responsables, inclusives et
                durables.
              </p>
            </article>

            {/* Pilier 3 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#eef2ff', color:'#4f46e5'}}>
                <span style={{fontSize:'1.5rem'}}>🚀</span>
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Rayonnement Régional</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Établir le LaCDIA comme partenaire clé de l'écosystème d'innovation caribéen et mondial.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: MISSION
          ============================================ */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title" style={{marginBottom:'3rem'}}>
            Notre Mission
          </h2>

          <p className="section-subtitle" style={{maxWidth:'48rem', marginBottom:'3rem', fontSize:'1.125rem'}}>
            Nous poursuivons quatre piliers stratégiques pour réaliser notre vision :
          </p>

          <div className="card-grid card-grid-2">
            {/* Pilier 1 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2', fontWeight:700}}>
                1
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Produire des Connaissances</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Développer une intelligence artificielle robuste, explicable et responsable, avec des
                recherches fondamentales et appliquées de haut niveau.
              </p>
            </article>

            {/* Pilier 2 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#f0fdfa', color:'#0d9488', fontWeight:700}}>
                2
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Former la Prochaine Génération</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Développer le capital humain caribéen en formant des doctorants et ingénieurs chercheurs
                en IA et sciences des données.
              </p>
            </article>

            {/* Pilier 3 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#eef2ff', color:'#4f46e5', fontWeight:700}}>
                3
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Transférer les Innovations</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Diffuser nos résultats de recherche via LaCDIA Tech, transformant les innovations en
                solutions concrètes et impacts économiques mesurables.
              </p>
            </article>

            {/* Pilier 4 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2', fontWeight:700}}>
                4
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Débat Scientifique International</h3>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                Contribuer au débat scientifique mondial tout en répondant aux besoins spécifiques de la
                Caraïbe et du contexte socio-économique régional.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: VALEURS
          ============================================ */}
      <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <h2 className="section-title" style={{marginBottom:'3rem'}}>
            Nos Valeurs
          </h2>

          <div className="card-grid card-grid-sm-2" style={{gridTemplateColumns:'repeat(auto-fit, minmax(12rem, 1fr))'}}>
            {/* Valeur 1 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'1.5rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'0.75rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2'}}>
                <span style={{fontSize:'1.125rem'}}>✨</span>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>Excellence Scientifique</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
                Rigueur, qualité et reconnaissance internationale de nos travaux.
              </p>
            </article>

            {/* Valeur 2 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'1.5rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'0.75rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#f0fdfa', color:'#0d9488'}}>
                <span style={{fontSize:'1.125rem'}}>🤝</span>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>Innovation Responsable</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
                Éthique, impact social mesurable et durabilité.
              </p>
            </article>

            {/* Valeur 3 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'1.5rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
              <div style={{marginBottom:'0.75rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#eef2ff', color:'#4f46e5'}}>
                <span style={{fontSize:'1.125rem'}}>🌈</span>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>Inclusivité</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
                Accès équitable à la formation et l'innovation pour tous.
              </p>
            </article>

            {/* Valeur 4 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'1.5rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'0.75rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2'}}>
                <span style={{fontSize:'1.125rem'}}>🔗</span>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>Interdisciplinarité</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
                Collaboration entre disciplines et expertise.
              </p>
            </article>

            {/* Valeur 5 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'1.5rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'0.75rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#f0fdfa', color:'#0d9488'}}>
                <span style={{fontSize:'1.125rem'}}>🌐</span>
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>Ouverture</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
                Partenariats régionaux et internationaux.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: POSITIONNEMENT STRATÉGIQUE
          ============================================ */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title" style={{marginBottom:'3rem'}}>
            Positionnement Stratégique
          </h2>

          <p className="section-subtitle" style={{maxWidth:'48rem', marginBottom:'3rem', fontSize:'1.125rem'}}>
            Le LaCDIA s'inscrit dans une triple articulation : académique international, régional caribéen,
            et socio-économique local.
          </p>

          <div className="card-grid card-grid-3">
            {/* Pilier Académique */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                <span style={{fontSize:'1.5rem'}}>🎓</span>
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Académique International</h3>
              <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'1rem', color:'#475569'}}>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#06b6d4', flexShrink:0}} />
                  <span>Partenariats avec universités mondiales</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#06b6d4', flexShrink:0}} />
                  <span>Publications dans journaux et conférences de prestige</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#06b6d4', flexShrink:0}} />
                  <span>Mobilité de chercheurs et doctorants</span>
                </li>
              </ul>
            </article>

            {/* Pilier Régional */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#f0fdfa', color:'#0d9488'}}>
                <span style={{fontSize:'1.5rem'}}>🌴</span>
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Régional Caribéen</h3>
              <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'1rem', color:'#475569'}}>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#14b8a6', flexShrink:0}} />
                  <span>Hub IA et data science pour la Caraïbe</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#14b8a6', flexShrink:0}} />
                  <span>Formation de talents caribéens</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#14b8a6', flexShrink:0}} />
                  <span>Collaboration avec institutions régionales</span>
                </li>
              </ul>
            </article>

            {/* Pilier Socio-économique */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#eef2ff', color:'#4f46e5'}}>
                <span style={{fontSize:'1.5rem'}}>🚀</span>
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>Socio-économique Local</h3>
              <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'1rem', color:'#475569'}}>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#6366f1', flexShrink:0}} />
                  <span>Solutions IA adaptées à Haïti et la Caraïbe</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#6366f1', flexShrink:0}} />
                  <span>Création de valeur économique et emplois</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{marginTop:'0.25rem', height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#6366f1', flexShrink:0}} />
                  <span>Impact sur développement durable</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: CONTEXTE ET ENJEUX
          ============================================ */}
      <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <h2 className="section-title" style={{marginBottom:'2rem'}}>
            Contexte et Enjeux
          </h2>

          <div className="card-grid card-grid-2" style={{alignItems:'center'}}>
            <div>
              <p style={{fontSize:'1.125rem', color:'#475569', lineHeight:1.7, marginBottom:'1.5rem'}}>
                Haïti et la Caraïbe font face à une transformation numérique accélérée. Alors que
                l'intelligence artificielle devient un moteur stratégique de développement économique et
                social, la région souffre d'un déficit majeur : <strong>l'absence de capacités endogènes
                de recherche en IA</strong>.
              </p>

              <p style={{fontSize:'1.125rem', color:'#475569', lineHeight:1.7, marginBottom:'1.5rem'}}>
                Le LaCDIA est le <strong>premier laboratoire de recherche en IA d'Haïti</strong>. Cette
                première permet à notre pays de contribuer au débat scientifique international, tout en
                développant des solutions adaptées aux réalités caribéennes : agriculture, santé, éducation,
                gouvernance.
              </p>

              <p style={{fontSize:'1.125rem', color:'#475569', lineHeight:1.7}}>
                En bridging le gap académique tout en créant une filière IA locale, le LaCDIA catalyse
                une transformation que les écosystèmes régionaux réclament depuis des années.
              </p>
            </div>

            <div className="card gradient-card-bg" style={{position:'relative', borderRadius:'1.5rem', padding:'2rem'}}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 20% 20%, rgba(6,182,212,0.08), transparent 55%)'}} />
              <div className="card-accent-top" />

              <div style={{position:'relative', display:'flex', flexDirection:'column', gap:'2rem'}}>
                {/* Stat 1 */}
                <div>
                  <p style={{fontSize:'2.25rem', fontWeight:700, color:'#0891b2', marginBottom:'0.5rem'}}>1er</p>
                  <p style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569'}}>
                    Laboratoire en IA en Haïti
                  </p>
                </div>

                {/* Stat 2 */}
                <div>
                  <p style={{fontSize:'2.25rem', fontWeight:700, color:'#0d9488', marginBottom:'0.5rem'}}>6</p>
                  <p style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569'}}>
                    Axes de recherche stratégiques
                  </p>
                </div>

                {/* Stat 3 */}
                <div>
                  <p style={{fontSize:'2.25rem', fontWeight:700, color:'#4f46e5', marginBottom:'0.5rem'}}>∞</p>
                  <p style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569'}}>
                    Potentiel d'impact régional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8: PLAN DE DÉVELOPPEMENT 2025-2029
          ============================================ */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title" style={{marginBottom:'3rem'}}>
            Plan de Développement 2025-2029
          </h2>

          <div className="card-grid card-grid-3" style={{marginBottom:'3rem'}}>
            {/* Phase 1 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2', fontWeight:700}}>
                I
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>2025 — Fondation</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', marginBottom:'1rem'}}>Consolidation des fondations institutionnelles</p>
              <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#475569'}}>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#06b6d4', fontWeight:700}}>•</span>
                  <span>Équipe de 5-7 chercheurs permanents</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#06b6d4', fontWeight:700}}>•</span>
                  <span>Infrastructure technique et administrative</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#06b6d4', fontWeight:700}}>•</span>
                  <span>Lancement LaCDIA Tech</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#06b6d4', fontWeight:700}}>•</span>
                  <span>Premiers projets de recherche</span>
                </li>
              </ul>
            </article>

            {/* Phase 2 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#f0fdfa', color:'#0d9488', fontWeight:700}}>
                II
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>2026-2027 — Consolidation</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', marginBottom:'1rem'}}>Renforcement des capacités et visibilité</p>
              <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#475569'}}>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#14b8a6', fontWeight:700}}>•</span>
                  <span>Équipe de 8-10 chercheurs</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#14b8a6', fontWeight:700}}>•</span>
                  <span>Publications internationales</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#14b8a6', fontWeight:700}}>•</span>
                  <span>Premiers doctorants</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#14b8a6', fontWeight:700}}>•</span>
                  <span>Croissance LaCDIA Tech</span>
                </li>
              </ul>
            </article>

            {/* Phase 3 */}
            <article className="card card-hover gradient-card-bg" style={{padding:'2rem'}}>
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #6366f1, #06b6d4)'}} />
              <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#eef2ff', color:'#4f46e5', fontWeight:700}}>
                III
              </div>
              <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>2028-2029 — Rayonnement</h3>
              <p style={{fontSize:'0.875rem', color:'#475569', marginBottom:'1rem'}}>Reconnaissance et impact régional</p>
              <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#475569'}}>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#6366f1', fontWeight:700}}>•</span>
                  <span>Équipe de 12+ chercheurs</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#6366f1', fontWeight:700}}>•</span>
                  <span>Reconnaissance internationale établie</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#6366f1', fontWeight:700}}>•</span>
                  <span>Pipeline doctorants stable</span>
                </li>
                <li style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                  <span style={{color:'#6366f1', fontWeight:700}}>•</span>
                  <span>LaCDIA Tech leader régional</span>
                </li>
              </ul>
            </article>
          </div>

          {/* Key Indicators Table */}
          <div className="card gradient-card-bg" style={{position:'relative'}}>
            <div className="card-accent-top" style={{background:'linear-gradient(to right, #06b6d4, #14b8a6, #6366f1)'}} />

            <div style={{padding:'2rem'}}>
              <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'1.5rem'}}>Indicateurs Clés de Succès</h3>

              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%', fontSize:'0.875rem'}}>
                  <thead>
                    <tr style={{borderBottom:'1px solid #e2e8f0'}}>
                      <th style={{textAlign:'left', padding:'0.75rem 1rem', fontWeight:600, color:'#334155'}}>Indicateur</th>
                      <th style={{textAlign:'center', padding:'0.75rem 1rem', fontWeight:600, color:'#334155'}}>2025</th>
                      <th style={{textAlign:'center', padding:'0.75rem 1rem', fontWeight:600, color:'#334155'}}>
                        2026-2027
                      </th>
                      <th style={{textAlign:'center', padding:'0.75rem 1rem', fontWeight:600, color:'#334155'}}>
                        2028-2029
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{borderCollapse:'collapse'}}>
                    <tr>
                      <td style={{padding:'0.75rem 1rem', color:'#334155'}}>Chercheurs permanents</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>5-7</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>8-10</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>12+</td>
                    </tr>
                    <tr>
                      <td style={{padding:'0.75rem 1rem', color:'#334155'}}>Publications/an</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>5-10</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>15-20</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>25+</td>
                    </tr>
                    <tr>
                      <td style={{padding:'0.75rem 1rem', color:'#334155'}}>Doctorants en cours</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>0-2</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>5-8</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>10+</td>
                    </tr>
                    <tr>
                      <td style={{padding:'0.75rem 1rem', color:'#334155'}}>Projets LaCDIA Tech</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>2-5</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>10-15</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>20+</td>
                    </tr>
                    <tr>
                      <td style={{padding:'0.75rem 1rem', color:'#334155'}}>Partenaires internationaux</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>3-5</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>8-12</td>
                      <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>15+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 9: CALL-TO-ACTION
          ============================================ */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
        <div
          className="animate-glow"
          style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative'}}>
          <h2 className="section-title section-title-white" style={{marginBottom:'1.5rem', textAlign:'center'}}>
            Découvrez Notre Impact
          </h2>
          <p style={{marginTop:'1rem', maxWidth:'42rem', margin:'0 auto', textAlign:'center', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7, marginBottom:'3rem'}}>
            Explorez nos axes de recherche, nos services, et nos opportunités de collaboration.
          </p>

          {/* CTAs */}
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem'}}>
            <Link
              href={localizedPath("/recherche/departement-scientifique", locale)}
              className="btn btn-cta-primary"
              style={{padding:'0.875rem 2rem', fontSize:'1rem'}}
            >
              Explorer la Recherche
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
              href={localizedPath("/lacdia-tech", locale)}
              className="btn btn-secondary"
            >
              Découvrir LaCDIA Tech
            </Link>

            <Link
              href={localizedPath("/collaborer", locale)}
              className="btn btn-secondary"
            >
              Nous Contacter
            </Link>
          </div>
        </div>

        {/* Gradient fade bottom */}
        <div className="hero-fade-bottom" />
      </section>
    </main>
  );
}
