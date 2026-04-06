import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import { ProjectCard, PublicationCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import {
  institutionalPageBySlugQuery,
  publicationListQuery,
  projectListQuery,
  researchAxisListQuery,
} from "@/lib/sanity/queries";
import type {
  InstitutionalPage,
  PublicationListItem,
  ProjectListItem,
  ResearchAxisListItem,
} from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";
import { researchAxes } from "@/data/research-axes";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/recherche", locale),
    alternates: {
      fr: localizedPath("/recherche", "fr"),
      en: localizedPath("/recherche", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche", locale },
    null,
  );
  const axes = await sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []);
  const projects = await sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []);
  const publications = await sanityFetch<PublicationListItem[]>(publicationListQuery, { locale }, []);

  const researchProjects = projects.filter((project) => project.projectType === "research");
  const hasPageContent = Boolean(page?.title || page?.summary || page?.content?.length);
  const hasAxes = axes.length > 0;
  const hasResearchProjects = researchProjects.length > 0;
  const hasPublications = publications.length > 0;
  const isReady = hasPageContent && (hasAxes || hasResearchProjects || hasPublications);

  // Fallback axes if no CMS data
  const displayAxes = hasAxes ? axes : researchAxes.slice(0, 6);

  return (
    <main style={{width:'100%'}}>
      {/* Hero Section (always shown) */}
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

          <h1 className="animate-fade-in-up" style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            Recherche en Intelligence Artificielle et Science des Données
          </h1>
          <p className="animate-fade-in-up" style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            Explorez nos axes de recherche scientifique fondamentale et appliquée.
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

      {/* Research Axes Section */}
      <section className="container" style={{paddingTop:'5rem', paddingBottom:'5rem'}}>
        <div style={{marginBottom:'3rem'}}>
          <h2 className="section-title">Axes de recherche</h2>
          <p className="section-subtitle" style={{maxWidth:'42rem'}}>
            Les six axes de recherche du LaCDIA combinant méthodes fondamentales en IA et applications concrètes adaptées au contexte caribéen.
          </p>
        </div>

        <div className="card-grid card-grid-3">
          {displayAxes.map((axis, idx) => {
            const a = axis as Record<string, unknown>;
            const key = (a._id ?? a.id ?? `axis-${idx}`) as string;
            const num = (a.number ?? idx + 1) as number;
            const title = (a.title ?? a.shortTitle ?? `Axe ${idx + 1}`) as string;
            const desc = (a.problematic ?? a.summary ?? "Découvrez cet axe de recherche") as string;
            return (
            <article
              key={key}
              className="card card-hover gradient-card-bg animate-fade-in-up" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
            >
              <div className="card-accent-top" />
              <div style={{marginBottom:'1rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2', fontWeight:700, fontSize:'0.875rem'}}>
                {num}
              </div>
              <h3 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a', marginBottom:'0.5rem'}}>
                {title}
              </h3>
              <p style={{fontSize:'0.875rem', color:'#475569', marginBottom:'1rem', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' as const, overflow:'hidden'}}>
                {desc}
              </p>
              <Link
                href={`/recherche/departement-scientifique`}
                className="btn-link" style={{color:'#0891b2'}}
              >
                Explorer l'axe
              </Link>
            </article>
          );})}
        </div>

        {/* Action Links */}
        <div style={{marginTop:'3rem', display:'flex', flexWrap:'wrap', gap:'1rem'}}>
          <Link
            href="/recherche/departement-scientifique"
            className="btn btn-cta-primary" style={{padding:'0.75rem 2rem', fontSize:'1rem'}}
          >
            Explorer nos recherches
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
            href="/partenariats"
            className="btn btn-cta-secondary"
          >
            Nos collaborations
          </Link>
        </div>
      </section>

      {/* CMS-driven content (if available) */}
      {isReady ? (
        <>
          {hasResearchProjects || hasPublications ? (
            <div className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
              <div className="simple-card" style={{marginTop:'3rem'}}>
                <h2 style={{fontSize:'1.25rem', fontWeight:600, color:'#0f172a'}}>Recherche avancée</h2>
                <p style={{marginTop:'0.5rem', fontSize:'0.875rem', color:'var(--muted)'}}>
                  Explorez les publications, projets et membres avec une recherche plein texte.
                </p>
                <Link
                  href="/recherche/explorer"
                  className="btn-link" style={{marginTop:'1rem'}}
                >
                  Lancer la recherche
                </Link>
              </div>
            </div>
          ) : null}

          {hasResearchProjects ? (
            <div className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
              <h2 className="section-title" style={{fontSize:'1.5rem'}}>Projets de recherche</h2>
              <div className="card-grid card-grid-2" style={{marginTop:'1.5rem'}}>
                {researchProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          ) : null}

          {hasPublications ? (
            <div className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
              <h2 className="section-title" style={{fontSize:'1.5rem'}}>Publications liées</h2>
              <div className="card-grid" style={{marginTop:'1.5rem'}}>
                {publications.slice(0, 4).map((publication) => (
                  <PublicationCard key={publication._id} publication={publication} />
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
