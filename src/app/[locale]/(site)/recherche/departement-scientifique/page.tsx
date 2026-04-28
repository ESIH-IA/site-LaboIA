import type { Metadata } from "next";
import Link from "next/link";

import { researchAxes } from "@/data/research-axes";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "Département Scientifique - LaCDIA",
    description:
      "Découvrez le département scientifique de LaCDIA, ses axes de recherche en intelligence artificielle, ses méthodologies et ses objectifs scientifiques pour la région caribéenne.",
    path: localizedPath("/recherche/departement-scientifique", locale),
    alternates: {
      fr: localizedPath("/recherche/departement-scientifique", "fr"),
      en: localizedPath("/recherche/departement-scientifique", "en"),
    },
  });
}

export default async function DepartementScientifiquePage() {
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
              Département Scientifique
            </span>
          </div>

          <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            Recherche en Intelligence Artificielle et Science des Données
          </h1>
          <p style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            Produire des connaissances scientifiques originales et adaptées aux contextes caribéens
          </p>
          <p style={{marginTop:'0.75rem', maxWidth:'42rem', fontSize:'1rem', color:'#cbd5e1'}}>
            Le département scientifique structure et anime les activités de recherche du laboratoire, en propulsant l'excellence scientifique et l'innovation méthodologique.
          </p>

          {/* CTAs */}
          <div style={{marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'1rem'}}>
            <Link
              href="/recherche/projets"
              className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem'}}
            >
              Nos projets de recherche
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
            <a
              href="#axes"
              className="btn btn-secondary"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Explorer les axes
            </a>
          </div>
        </div>
      </section>

      {/* Section Rôle et Objectifs */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Rôle et Objectifs
            </h2>
            <p className="section-subtitle">
              Le département scientifique structure et anime les activités de recherche du laboratoire. Son rôle est de coordonner les efforts de recherche, de garantir l'excellence scientifique et de promouvoir l'innovation méthodologique dans les domaines de l'intelligence artificielle et de la science des données.
            </p>
          </div>
          <div className="card-grid card-grid-2">
            {[
              {
                title: "Produire des connaissances scientifiques",
                description:
                  "Générer des savoirs originaux dans les domaines de l'IA, du machine learning et de l'analyse de données, avec une perspective adaptée aux contextes caribéens.",
              },
              {
                title: "Développer des méthodes adaptées",
                description:
                  "Concevoir et valider des approches méthodologiques robustes pour les contextes à ressources limitées et les environnements tropicaux.",
              },
              {
                title: "Former des chercheurs de haut niveau",
                description:
                  "Encadrer des doctorants et des jeunes chercheurs, en développant les compétences scientifiques et les capacités de recherche de la prochaine génération.",
              },
              {
                title: "Contribuer au débat scientifique international",
                description:
                  "Publier dans les plus prestigieuses revues et conférences, en propulsant la visibilité de la recherche caribéenne sur la scène mondiale.",
              },
            ].map((objective, idx) => (
              <article
                key={`${objective.title}-${idx}`}
                className="card card-hover gradient-card-bg" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
              >
                <div className="card-accent-top" />
                <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                  <span style={{fontSize:'1.5rem', fontWeight:700}}>{idx + 1}</span>
                </div>
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                  {objective.title}
                </h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                  {objective.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Axes de Recherche */}
      <section id="axes" className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Axes de Recherche
            </h2>
            <p className="section-subtitle">
              Nos six axes de recherche structurent l'ensemble des activités scientifiques du laboratoire, en couvrant les domaines fondamentaux et appliqués de l'intelligence artificielle et de la science des données.
            </p>
          </div>
          <div className="card-grid card-grid-2">
            {researchAxes.map((axis, idx) => (
              <article
                key={axis.id}
                className="card card-hover gradient-card-bg"
                style={{ animationDelay: `${idx * 100}ms`, padding:'2rem' }}
              >
                <div className="card-accent-top" />

                {/* Header with number and title */}
                <div style={{marginBottom:'1.5rem'}}>
                  <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1rem'}}>
                    <div style={{display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2'}}>
                      <span style={{fontSize:'1.125rem', fontWeight:700}}>{axis.number}</span>
                    </div>
                  </div>
                  <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>
                    {axis.title}
                  </h3>
                </div>

                {/* Problematic */}
                <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7, marginBottom:'1.25rem'}}>
                  {axis.problematic}
                </p>

                {/* Objectives */}
                <div style={{marginBottom:'1.5rem'}}>
                  <p style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#334155', marginBottom:'0.75rem'}}>
                    Objectifs clés
                  </p>
                  <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    {axis.objectives.slice(0, 3).map((objective) => (
                      <li key={objective} style={{display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                        <div style={{marginTop:'0.375rem', display:'flex', height:'1rem', width:'1rem', alignItems:'center', justifyContent:'center', borderRadius:'9999px', background:'rgba(20,184,166,0.1)'}}>
                          <span style={{height:'0.375rem', width:'0.375rem', borderRadius:'9999px', background:'#14b8a6'}} />
                        </div>
                        <span style={{fontSize:'0.875rem', color:'#475569'}}>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keywords */}
                <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem'}}>
                  {axis.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      style={{display:'inline-block', borderRadius:'9999px', border:'1px solid #a5f3fc', background:'rgba(207,250,254,0.5)', padding:'0.25rem 0.75rem', fontSize:'0.75rem', fontWeight:600, color:'#0e7490'}}
                    >
                      {keyword}
                    </span>
                  ))}
                  {axis.keywords.length > 4 && (
                    <span style={{display:'inline-block', borderRadius:'9999px', border:'1px solid #cbd5e1', background:'#f8fafc', padding:'0.25rem 0.75rem', fontSize:'0.75rem', fontWeight:600, color:'#475569'}}>
                      +{axis.keywords.length - 4}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Approches Méthodologiques */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Approches Méthodologiques
            </h2>
            <p className="section-subtitle">
              Nos approches combinent les meilleures pratiques scientifiques avec une adaptation aux contextes spécifiques de la région caribéenne.
            </p>
          </div>
          <div className="card-grid card-grid-2">
            {[
              {
                title: "Apprentissage Profond et Optimisation",
                description:
                  "Développement d'architectures de réseaux de neurones profonds et d'algorithmes d'optimisation robustes pour les contextes de ressources limitées.",
              },
              {
                title: "Vision par Ordinateur et Analyse Multimodale",
                description:
                  "Traitement et interprétation automatique des données visuelles issues d'images, de documents et de sources multimodales dans les domaines agricole et médical.",
              },
              {
                title: "IA Explicable et Audit Algorithmique",
                description:
                  "Conception de systèmes d'IA transparents, équitables et responsables avec des mécanismes de traçabilité et d'accountability.",
              },
              {
                title: "Traitement du Langage Naturel",
                description:
                  "Traitement spécialisé du créole haïtien et des langues caribéennes avec adaptation aux spécificités linguistiques et culturelles régionales.",
              },
              {
                title: "Analyse de Données en Contexte de Rareté",
                description:
                  "Développement de techniques efficaces fonctionnant avec peu de données, sources hétérogènes et bruitées, typiques des contextes en développement.",
              },
              {
                title: "Transfert et Adaptation de Domaine",
                description:
                  "Exploitation des connaissances acquises dans des contextes riches pour résoudre des problèmes dans des contextes différents et contraints.",
              },
            ].map((approach, idx) => (
              <article
                key={`${approach.title}-${idx}`}
                className="card card-hover gradient-card-bg"
                style={{ animationDelay: `${idx * 50}ms`, padding:'2rem' }}
              >
                <div className="card-accent-top" />
                <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                  {approach.title}
                </h3>
                <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
                  {approach.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Domaines d'Expertise */}
      <section className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Domaines d'Expertise
            </h2>
            <p className="section-subtitle">
              Nos expertise couvrent un large spectre des technologies et applications de l'intelligence artificielle.
            </p>
          </div>
          <div className="card-grid card-grid-3 card-grid-4">
            {[
              "Machine Learning & Deep Learning",
              "Vision par Ordinateur",
              "Traitement du Langage Naturel",
              "IA Explicable (XAI)",
              "Systèmes Multi-Agents",
              "Analyse de Données Complexes",
              "IA pour la Santé",
              "Agriculture Numérique",
              "Edge AI & Modèles Compressés",
            ].map((domain, idx) => (
              <div
                key={domain}
                className="card card-hover gradient-card-bg"
                style={{ animationDelay: `${idx * 50}ms`, padding:'1rem 1.5rem', textAlign:'center', fontSize:'1rem', fontWeight:500, color:'#334155' }}
              >
                <div className="card-accent-top" style={{height:'2px', background:'linear-gradient(to right, #14b8a6, #06b6d4)', opacity:0, transition:'opacity 0.3s'}} />
                {domain}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Politique de Publication */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Politique de Publication
            </h2>
            <p className="section-subtitle">
              Notre stratégie de publication vise l'excellence scientifique avec une visibilité maximale sur la scène internationale.
            </p>
          </div>

          <div className="card-grid card-grid-2" style={{marginBottom:'3rem'}}>
            {[
              {
                title: "Revues Scientifiques",
                description:
                  "Publications dans les revues de haut rang indexées dans Scopus et Web of Science, notamment dans les domaines du machine learning, de la vision par ordinateur et de l'IA responsable.",
              },
              {
                title: "Conférences Internationales",
                description:
                  "Communications dans les principaux forums scientifiques: NeurIPS, ICML, CVPR, IJCAI, ICCV, et autres conférences de premier rang.",
              },
              {
                title: "Open Science",
                description:
                  "Dépôt des prépublications sur arXiv pour assurer une diffusion rapide des résultats à la communauté scientifique mondiale.",
              },
              {
                title: "Partenariats Éditoriaux",
                description:
                  "Collaboration avec la Revue Infos Nations pour la vulgarisation scientifique et la dissémination auprès des décideurs régionaux.",
              },
            ].map((publication, idx) => (
              <article
                key={`${publication.title}-${idx}`}
                className="card card-hover gradient-card-bg" style={{padding:'2rem'}}
              >
                <div className="card-accent-top" />
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                  {publication.title}
                </h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                  {publication.description}
                </p>
              </article>
            ))}
          </div>

          {/* Publication Targets Table */}
          <div className="card gradient-card-bg" style={{position:'relative', padding:'2rem'}}>
            <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'1.5rem'}}>
              Indicateurs de Performance Scientifique
            </h3>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', fontSize:'0.875rem'}}>
                <thead>
                  <tr style={{borderBottom:'1px solid #cbd5e1'}}>
                    <th style={{textAlign:'left', padding:'0.75rem 1rem', fontWeight:600, color:'#0f172a'}}>
                      Indicateur
                    </th>
                    <th style={{textAlign:'center', padding:'0.75rem 1rem', fontWeight:600, color:'#0f172a'}}>
                      2025
                    </th>
                    <th style={{textAlign:'center', padding:'0.75rem 1rem', fontWeight:600, color:'#0f172a'}}>
                      2027
                    </th>
                    <th style={{textAlign:'center', padding:'0.75rem 1rem', fontWeight:600, color:'#0f172a'}}>
                      2029
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid #e2e8f0'}}>
                    <td style={{padding:'0.75rem 1rem', color:'#334155'}}>
                      Articles dans revues Scopus/WoS
                    </td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>12</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>24</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>36</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid #e2e8f0'}}>
                    <td style={{padding:'0.75rem 1rem', color:'#334155'}}>
                      Communications en conférences de rang A
                    </td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>8</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>16</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>24</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid #e2e8f0'}}>
                    <td style={{padding:'0.75rem 1rem', color:'#334155'}}>
                      Prépublications sur arXiv
                    </td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>15</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>30</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>45</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid #e2e8f0'}}>
                    <td style={{padding:'0.75rem 1rem', color:'#334155'}}>
                      Brevets et propriété intellectuelle
                    </td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>2</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>5</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>8</td>
                  </tr>
                  <tr>
                    <td style={{padding:'0.75rem 1rem', color:'#334155'}}>
                      Indice H moyen du laboratoire
                    </td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>5</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>12</td>
                    <td style={{textAlign:'center', padding:'0.75rem 1rem', color:'#475569'}}>20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section Encadrement Doctoral */}
      <section className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Encadrement Doctoral
            </h2>
            <p className="section-subtitle">
              Le laboratoire s'engage dans la formation de la prochaine génération de chercheurs à travers un accompagnement rigoureux et personnalisé.
            </p>
          </div>

          <div className="card-grid card-grid-2" style={{marginBottom:'3rem'}}>
            {[
              {
                title: "Direction et Co-direction",
                description:
                  "Thèses encadrées par des chercheurs titulaires de l'Habilitation à Diriger des Recherches (HDR). Co-direction avec des partenaires internationaux pour une expertise complète.",
              },
              {
                title: "Suivi et Monitoring",
                description:
                  "Comités de suivi annuels avec experts externes, évaluations régulières et ajustements de trajectoire pour assurer la qualité des travaux.",
              },
              {
                title: "Séminaires Doctoraux",
                description:
                  "Séminaires mensuels réunissant tous les doctorants pour partager les avancées, discuter des défis méthodologiques et renforcer la cohésion du collectif.",
              },
              {
                title: "Mobilité Internationale",
                description:
                  "Séjours de recherche à l'étranger, participations à écoles doctorales internationales et présentations dans des conférences majeures.",
              },
            ].map((item, idx) => (
              <article
                key={`${item.title}-${idx}`}
                className="card card-hover gradient-card-bg"
                style={{padding:'2rem'}}
              >
                <div className="card-accent-top" />
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                  {item.title}
                </h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          {/* Partnerships */}
          <div className="card gradient-card-bg" style={{position:'relative', padding:'2rem'}}>
            <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
            <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'1.5rem'}}>
              Partenariats Doctoraux
            </h3>
            <div className="card-grid card-grid-2" style={{gap:'1rem'}}>
              {[
                "Centre du Droit de la Haïti (CDH)",
                "Cotutelles internationales",
                "Agence Universitaire de la Francophonie (AUF)",
                "Campus France",
              ].map((partner) => (
                <div key={partner} style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                  <div style={{display:'flex', height:'1.5rem', width:'1.5rem', alignItems:'center', justifyContent:'center', borderRadius:'9999px', background:'rgba(20,184,166,0.1)'}}>
                    <span style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#14b8a6'}} />
                  </div>
                  <span style={{fontSize:'1rem', fontWeight:500, color:'#334155'}}>
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Animation Scientifique */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Animation Scientifique
            </h2>
            <p className="section-subtitle">
              Le département organise un ensemble d'activités scientifiques régulières pour stimuler les échanges, favoriser la collaboration et maintenir une dynamique de recherche active.
            </p>
          </div>

          <div className="card-grid card-grid-2">
            {[
              {
                title: "Séminaires Hebdomadaires",
                description:
                  "Présentations de recherche tous les jeudis réunissant membres du laboratoire et visiteurs. Plateforme d'échange sur les avancées scientifiques et les défis méthodologiques.",
                frequency: "Toutes les semaines",
              },
              {
                title: "Journal Club Mensuel",
                description:
                  "Discussion critique des publications récentes dans les domaines clés du laboratoire. Entraînement à la revue de littérature et aux débats scientifiques.",
                frequency: "Chaque mois",
              },
              {
                title: "Hackathons Biannuels",
                description:
                  "Compétitions de coding et d'innovation scientifique. Opportunités de travail collaboratif intensif, de prototypage rapide et d'exploration de nouvelles idées.",
                frequency: "Deux fois par an",
              },
              {
                title: "Conférence Annuelle",
                description:
                  "Événement majeur rassemblant la communauté scientifique caribéenne. Keynotes de chercheurs internationaux, présentations de résultats et table ronde sur les enjeux régionaux.",
                frequency: "Une fois par an",
              },
            ].map((activity, idx) => (
              <article
                key={`${activity.title}-${idx}`}
                className="card card-hover gradient-card-bg" style={{padding:'2rem'}}
              >
                <div className="card-accent-top" />
                <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1rem'}}>
                  <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a'}}>
                    {activity.title}
                  </h3>
                  <span style={{display:'inline-block', borderRadius:'9999px', background:'#f0fdfa', padding:'0.25rem 0.75rem', fontSize:'0.75rem', fontWeight:600, color:'#0f766e'}}>
                    {activity.frequency}
                  </span>
                </div>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Collaborations et Partenariats */}
      <section className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Collaborations et Partenariats
            </h2>
            <p className="section-subtitle">
              Le département s'inscrit dans un réseau de collaborations nationales et internationales pour renforcer la capacité de recherche et accélérer l'innovation scientifique.
            </p>
          </div>

          <div className="card-grid card-grid-3" style={{marginBottom:'3rem'}}>
            {[
              "Université Côte d'Azur (France)",
              "ESTIA - École Supérieure des Technologies Innovantes en Aquitaine",
              "Agence Universitaire de la Francophonie (AUF)",
              "Université des Antilles",
              "Université des Indes Occidentales (UWI)",
              "Réseaux de recherche internationaux",
            ].map((partner, idx) => (
              <div
                key={partner}
                className="card card-hover gradient-card-bg"
                style={{padding:'1.5rem'}}
              >
                <div className="card-accent-top" style={{height:'2px', background:'linear-gradient(to right, #14b8a6, #06b6d4)', opacity:0, transition:'opacity 0.3s'}} />
                <p style={{fontSize:'1rem', fontWeight:600, color:'#0f172a'}}>{partner}</p>
              </div>
            ))}
          </div>

          <Link
            href="/collaborations"
            className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem'}}
          >
            Explorez nos collaborations complètes
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(20,184,166,0.1)', filter:'blur(48px)'}} />
        <div
          className="animate-glow" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative'}}>
          <div style={{textAlign:'center'}}>
            <h2 className="section-title section-title-white" style={{marginBottom:'1.5rem'}}>
              Rejoignez nos Activités de Recherche
            </h2>
            <p style={{margin:'0 auto', maxWidth:'42rem', fontSize:'1.125rem', color:'#e2e8f0', lineHeight:1.7, marginBottom:'2rem'}}>
              Explorez nos projets en cours, participez à notre débat scientifique et collaborez avec nos équipes.
            </p>

            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem'}}>
              <Link
                href="/recherche/projets"
                className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem', background:'#fff', color:'#0f172a'}}
              >
                Nos projets de recherche
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
                href="/recherche/explorer"
                className="btn btn-secondary"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                Nos publications
              </Link>
              <Link
                href="/collaborer"
                className="btn btn-secondary"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                Collaborer avec nous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
