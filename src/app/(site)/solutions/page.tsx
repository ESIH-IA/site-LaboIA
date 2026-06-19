import type { Metadata } from "next";
import Link from "next/link";

import CollaborateCta from "@/components/home/collaborate-cta";
import { ProjectCard } from "@/components/cards/cards";
import { SolutionIcon, SectorIcon } from "@/components/icons/solution-icons";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { projectListQuery } from "@/lib/sanity/queries";
import type { ProjectListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";
import { getHomeData, getSolutionsPageData } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: "Services et Solutions IA",
    description:
      "Découvrez nos services et solutions d'intelligence artificielle concrètes. Des solutions testées et éprouvées, avec des projets déjà réalisés.",
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
    <main style={{ background: "var(--tech-bg)", color: "var(--tech-text)" }}>

      {/* Hero creme - De la recherche au deploiement */}
      <section className="relative overflow-hidden section-padding gradient-tech-hero">
        <div className="container-site">
          <div className="badge-dark inline-flex mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
            {solutionsPage.heroBadge ?? "Services & Solutions IA"}
          </div>
          <h1
            className="text-display-xl max-w-4xl"
            style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
          >
            {solutionsPage.heroTitle ?? "De la recherche au deploiement."}
          </h1>
          {solutionsPage.heroDescription && (
            <p className="mt-6 text-lg max-w-2xl leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
              {solutionsPage.heroDescription}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            {solutionsPage.heroPrimaryCta && (
              <Link
                href={solutionsPage.heroPrimaryCta.href}
                className="btn btn-primary-tech"
              >
                {solutionsPage.heroPrimaryCta.label}
              </Link>
            )}
            {solutionsPage.heroSecondaryCta && (
              <Link
                href={solutionsPage.heroSecondaryCta.href}
                className="btn btn-secondary-tech"
              >
                {solutionsPage.heroSecondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Notre approche - 3 etapes horizontales */}
      {solutionsPage.approachSteps?.length ? (
        <section className="section-tech-surface section-padding">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-dark inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                Approche
              </div>
              <h2
                className="text-display-md"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {solutionsPage.approachTitle ?? "Notre approche"}
              </h2>
              {solutionsPage.approachIntro && (
                <p className="mt-4 leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                  {solutionsPage.approachIntro}
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {solutionsPage.approachSteps.map((step, idx) => (
                <div key={step.title} className="card-tech rounded-2xl p-6 relative">
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg, #00b894, transparent)" }}
                    aria-hidden="true"
                  />
                  <div className="label-eyebrow mb-3" style={{ color: "var(--tech-accent-teal)" }}>
                    0{idx + 1}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Solutions IA - feature grid */}
      {solutionsPage.solutions?.length ? (
        <section className="section-tech section-padding" id="solutions">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-dark inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                Solutions
              </div>
              <h2
                className="text-display-md"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {solutionsPage.solutionsTitle ?? "Solutions IA"}
              </h2>
              {solutionsPage.solutionsIntro && (
                <p className="mt-4 leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                  {solutionsPage.solutionsIntro}
                </p>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {solutionsPage.solutions.map((solution) => (
                <div key={solution._id} className="card-tech-hover rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    {solution.icon && (
                      <div
                        className="shrink-0 h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(0,184,148,0.1)", border: "1px solid rgba(0,184,148,0.2)" }}
                      >
                        <SolutionIcon name={solution.icon} size={20} color="#00b894" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3
                        className="font-semibold text-lg mb-2"
                        style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
                      >
                        {solution.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--tech-text-muted)" }}>
                        {solution.shortDescription}
                      </p>
                      {solution.benefits?.length ? (
                        <ul className="flex flex-col gap-1">
                          {solution.benefits.slice(0, 3).map((b) => (
                            <li key={b} className="flex items-center gap-2 text-xs" style={{ color: "var(--tech-text-muted)" }}>
                              <span className="h-1 w-1 rounded-full shrink-0" style={{ background: "var(--tech-accent-teal)" }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Cas d usage */}
      {featuredUseCase && (
        <section className="section-tech-surface section-padding" id="cas-usage">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-dark inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                Impact
              </div>
              <h2
                className="text-display-md"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {solutionsPage.useCasesTitle ?? "Cas d usage"}
              </h2>
            </div>

            <div className="card-tech rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #00b894, transparent)" }}
                aria-hidden="true"
              />
              <h3
                className="text-display-md mb-6"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {featuredUseCase.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="label-eyebrow mb-2" style={{ color: "var(--tech-text-muted)" }}>Contexte</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>{featuredUseCase.context}</p>
                </div>
                <div>
                  <div className="label-eyebrow mb-2" style={{ color: "var(--tech-text-muted)" }}>Solution</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>{featuredUseCase.solution}</p>
                </div>
              </div>
              {featuredUseCase.benefits?.length ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredUseCase.benefits.map((b) => (
                    <span key={b} className="tag-tech">{b}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Flux IA - timeline horizontale */}
      {solutionsPage.flowSteps?.length ? (
        <section className="section-labo section-padding" style={{ background: "var(--labo-bg)" }}>
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-teal inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
                Processus
              </div>
              <h2 className="text-display-md text-[#f0f4ff]">
                {solutionsPage.flowTitle ?? "Flux IA applique"}
              </h2>
              {solutionsPage.flowDescription && (
                <p className="mt-4 text-[#8892b0] leading-relaxed">{solutionsPage.flowDescription}</p>
              )}
            </div>

            <div className="timeline-track">
              {(solutionsPage.flowSteps ?? []).map((step, idx) => (
                <div key={step} className="flex items-center gap-4 shrink-0">
                  <div className="glass-labo rounded-xl px-6 py-4 flex items-center gap-3">
                    <span className="label-eyebrow text-[#00d4aa]">0{idx + 1}</span>
                    <span className="text-[#f0f4ff] font-medium text-sm">{step}</span>
                  </div>
                  {idx < (solutionsPage.flowSteps ?? []).length - 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00d4aa]/40 shrink-0" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Services */}
      {solutionsPage.services?.length ? (
        <section className="section-tech section-padding">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-dark inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                Offre
              </div>
              <h2
                className="text-display-md"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {solutionsPage.servicesTitle ?? "Services proposes"}
              </h2>
              {solutionsPage.servicesIntro && (
                <p className="mt-4 leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                  {solutionsPage.servicesIntro}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {solutionsPage.services.map((service) => (
                <div
                  key={service}
                  className="card-tech rounded-xl px-5 py-3 text-sm font-medium"
                  style={{ color: "var(--tech-text)" }}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Secteurs - tags animes */}
      {solutionsPage.sectors?.length ? (
        <section className="section-tech-surface section-padding">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-dark inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                Secteurs
              </div>
              <h2
                className="text-display-md"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {solutionsPage.sectorsTitle ?? "Secteurs d application"}
              </h2>
              {solutionsPage.sectorsIntro && (
                <p className="mt-4 leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                  {solutionsPage.sectorsIntro}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {solutionsPage.sectors.map((sector) => (
                <div
                  key={sector._id}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(0,184,148,0.08)",
                    border: "1px solid rgba(0,184,148,0.15)",
                    color: "var(--tech-text)",
                  }}
                >
                  {sector.icon && <SectorIcon name={sector.icon} size={16} color="var(--tech-accent-teal)" strokeWidth={1.5} />}
                  {sector.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Projets appliques */}
      {appliedProjects.length > 0 && (
        <section className="section-labo section-padding" style={{ background: "var(--labo-bg)" }}>
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <div className="badge-teal inline-flex mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
                Projets
              </div>
              <h2 className="text-display-md text-[#f0f4ff]">
                {solutionsPage.projectsTitle ?? "Projets en cours"}
              </h2>
              {solutionsPage.projectsIntro && (
                <p className="mt-4 text-[#8892b0] leading-relaxed">{solutionsPage.projectsIntro}</p>
              )}
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {appliedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Collaborer */}
      <CollaborateCta
        title={collaborate.collaborateTitle}
        body={collaborate.collaborateBody}
        actions={collaborate.collaborateActions}
      />
    </main>
  );
}