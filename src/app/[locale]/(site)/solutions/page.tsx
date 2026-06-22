import type { Metadata } from "next";
import Link from "next/link";

import CollaborateCta from "@/components/home/collaborate-cta";
import { ProjectCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { projectListQuery } from "@/lib/sanity/queries";
import type { ProjectListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";
import { getHomeData, getSolutionsPageData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await getSolutionsPageData(locale);

  return await buildMetadata({
    locale,
    title: page.heroTitle,
    description: page.heroDescription,
    seo: page.seo,
    path: localizedPath("/solutions", locale),
    alternates: {
      fr: localizedPath("/solutions", "fr"),
      en: localizedPath("/solutions", "en"),
    },
  });
}

export default async function SolutionsPage() {
  const locale = await getServerLocale();
  const [projects, solutionsPage, homeData] = await Promise.all([
    sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []),
    getSolutionsPageData(locale),
    getHomeData(locale),
  ]);

  const appliedProjects = projects.filter(
    (project) => project.projectType === "applied" || project.projectType === "hybrid",
  );

  const featuredUseCase = solutionsPage.featuredUseCase;
  const collaborate = homeData.home;

  return (
    <main className="section-white">
      {/* Hero Section - Style Tech/IA avec gradient mesh */}
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
        <div
          className="animate-glow" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative'}}>
          {/* Badge Tech */}
          <div className="glass-card" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'1.5rem'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              {solutionsPage.heroBadge}
            </span>
          </div>

          <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            {solutionsPage.heroTitle}
          </h1>
          <p style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            {solutionsPage.heroSubtitle}
          </p>
          <p style={{marginTop:'0.75rem', maxWidth:'42rem', fontSize:'1rem', color:'#cbd5e1'}}>
            {solutionsPage.heroDescription}
          </p>

          {/* CTAs */}
          <div style={{marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'1rem'}}>
            {solutionsPage.heroPrimaryCta ? (
              <Link
                href={solutionsPage.heroPrimaryCta.href}
                className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem'}}
              >
                {solutionsPage.heroPrimaryCta.label}
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
            ) : null}
            {solutionsPage.heroSecondaryCta ? (
              <a
                href={solutionsPage.heroSecondaryCta.href}
                className="btn btn-secondary"
              >
                {solutionsPage.heroSecondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Section Approche */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              {solutionsPage.approachTitle}
            </h2>
            <p className="section-subtitle">
              {solutionsPage.approachIntro}
            </p>
          </div>
          <div className="card-grid card-grid-3">
            {solutionsPage.approachSteps?.map((step, idx) => (
              <article
                key={`${step.title}-${idx}`}
                className="card card-hover gradient-card-bg" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
              >
                <div className="card-accent-top" />
                <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                  <span style={{fontSize:'1.5rem', fontWeight:700}}>{idx + 1}</span>
                </div>
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{step.title}</h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Solutions IA */}
      <section id="solutions" className="section section-light" style={{position:'relative', overflow:'hidden'}}>
        <div className="section-pattern dot-pattern pattern-20" />
        <div className="container" style={{position:'relative'}}>
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              {solutionsPage.solutionsTitle}
            </h2>
            <p className="section-subtitle">
              {solutionsPage.solutionsIntro}
            </p>
          </div>
          <div className="card-grid card-grid-2">
            {solutionsPage.solutions?.map((solution, idx) => (
              <article
                key={solution._id}
                className="card card-hover gradient-card-bg" style={{padding:'2rem', animationDelay: `${idx * 100}ms`}}
              >
                <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
                {solution.icon ? (
                  <span className="badge badge-cyan" style={{marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                    {solution.icon}
                  </span>
                ) : null}
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                  {solution.title}
                </h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>
                  {solution.shortDescription}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Cas d'usage */}
      <section id="cas-usage" className="section section-white">
        <div className="container">
          <div style={{display:'grid', gap:'3rem', gridTemplateColumns:'1fr', alignItems:'center'}} className="card-grid">
            <div>
              <span className="badge badge-teal" style={{marginBottom:'1.5rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                {solutionsPage.useCasesTitle}
              </span>
              <h2 className="section-title" style={{marginBottom:'1.5rem'}}>
                {featuredUseCase?.title}
              </h2>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7, marginBottom:'1rem'}}>
                {featuredUseCase?.context}
              </p>
              <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7, marginBottom:'1.5rem'}}>
                {featuredUseCase?.solution}
              </p>
              {featuredUseCase?.benefits?.length ? (
                <ul style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                  {featuredUseCase.benefits.map((benefit) => (
                    <li key={benefit} style={{display:'flex', alignItems:'flex-start', gap:'0.75rem'}}>
                      <div style={{marginTop:'0.375rem', display:'flex', height:'1.25rem', width:'1.25rem', alignItems:'center', justifyContent:'center', borderRadius:'9999px', background:'rgba(20,184,166,0.1)'}}>
                        <span style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#14b8a6'}} aria-hidden />
                      </div>
                      <span style={{fontSize:'1rem', color:'#334155', lineHeight:1.7}}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="card gradient-card-bg" style={{position:'relative', borderRadius:'1.5rem', padding:'2rem', boxShadow:'var(--shadow-lg)'}}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 20% 20%, rgba(6,182,212,0.08), transparent 55%)'}} />
              <div className="card-accent-top" style={{background:'linear-gradient(to right, #14b8a6, #06b6d4)'}} />
              <div style={{position:'relative'}}>
                <p style={{fontSize:'1rem', fontWeight:700, color:'#0f172a', marginBottom:'1rem'}}>
                  {solutionsPage.flowTitle}
                </p>
                <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7, marginBottom:'2rem'}}>
                  {solutionsPage.flowDescription}
                </p>
                <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                  {solutionsPage.flowSteps?.map((step, idx) => (
                    <div key={`${step}-${idx}`} style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                      <div style={{display:'flex', height:'2rem', width:'2rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2'}}>
                        <span style={{fontSize:'0.875rem', fontWeight:700}}>{idx + 1}</span>
                      </div>
                      <span style={{fontSize:'0.875rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#475569'}}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              {solutionsPage.servicesTitle}
            </h2>
            <p className="section-subtitle">
              {solutionsPage.servicesIntro}
            </p>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:'1rem'}}>
            {solutionsPage.services?.map((service) => (
              <span
                key={service}
                className="btn btn-cta-secondary" style={{borderRadius:'9999px'}}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section Secteurs */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              {solutionsPage.sectorsTitle}
            </h2>
            <p className="section-subtitle">
              {solutionsPage.sectorsIntro}
            </p>
          </div>
          <div className="card-grid card-grid-4" style={{gap:'1rem'}}>
            {solutionsPage.sectors?.map((sector, idx) => (
              <div
                key={sector._id}
                className="card card-hover gradient-card-bg" style={{padding:'1rem 1.5rem', textAlign:'center', fontSize:'1rem', fontWeight:500, color:'#334155', animationDelay: `${idx * 50}ms`}}
              >
                <div className="card-accent-top" style={{height:'2px', background:'linear-gradient(to right, #14b8a6, #06b6d4)', opacity:0, transition:'opacity 0.3s'}} />
                {sector.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets */}
      {appliedProjects.length > 0 && (
        <section id="projets" className="section section-light">
          <div className="container">
            <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
              <h2 className="section-title">
                {solutionsPage.projectsTitle}
              </h2>
              <p className="section-subtitle">
                {solutionsPage.projectsIntro}
              </p>
            </div>

            <div className="card-grid card-grid-2">
              {appliedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CollaborateCta
        title={collaborate.collaborateTitle}
        body={collaborate.collaborateBody}
        actions={collaborate.collaborateActions ?? []}
      />
    </main>
  );
}
