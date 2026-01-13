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
import { aiSolutions, useCases, sectors, heroContent } from "@/data/solutions";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return buildMetadata({
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
  const projects = await sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []);

  const appliedProjects = projects.filter(
    (project) => project.projectType === "applied" || project.projectType === "hybrid",
  );
  const approachSteps = [
    {
      title: "Diagnostic",
      description: "Qualification des données, besoins métier et contraintes terrain.",
    },
    {
      title: "Modélisation",
      description: "Conception IA, prototypage rapide et validation scientifique.",
    },
    {
      title: "Déploiement",
      description: "Intégration, accompagnement et mesure d'impact.",
    },
  ];
  const services = [
    "Conseil scientifique",
    "Développement IA",
    "Data engineering",
    "Systèmes d'aide à la décision",
    "MLOps et déploiement",
  ];
  const featuredUseCase = useCases[0];

  return (
    <main className="bg-white">
      {/* Hero Section - Style Tech/IA avec gradient mesh */}
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-glow" style={{ animationDelay: '1s' }} />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* Badge Tech */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Services & Solutions IA
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {heroContent.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed">
            {heroContent.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            {heroContent.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
            >
              Proposer un projet
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#cas-usage"
              className="rounded-xl glass-card px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Voir les cas d&apos;usage
            </a>
          </div>
        </div>
      </section>

      {/* Section Approche */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Notre approche
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Une démarche scientifique, rigoureuse et orientée impact.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {approachSteps.map((step, idx) => (
              <article
                key={step.title}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <span className="text-2xl font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Solutions IA */}
      <section id="solutions" className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Solutions IA
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Des solutions concrètes pour analyser, automatiser, décider et rendre l&apos;information accessible.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {aiSolutions.map((solution, idx) => (
              <article
                key={solution.id}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
                <span className="inline-block rounded-full border border-cyan-200 bg-cyan-50/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700 mb-4">
                  Solution
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:gradient-text-cyan transition-smooth">
                  {solution.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">{solution.shortDescription}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section Cas d'usage */}
      <section id="cas-usage" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-block rounded-full border border-teal-200 bg-teal-50/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-6">
                Cas d&apos;usage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                Projet Deep Farm
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {featuredUseCase.context}
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {featuredUseCase.solution}
              </p>
              <ul className="space-y-3">
                {featuredUseCase.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="mt-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/10">
                      <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden />
                    </div>
                    <span className="text-base text-slate-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-3xl gradient-card-bg border border-slate-200 p-8 shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.08),transparent_55%)]" />
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />
              <div className="relative">
                <p className="text-base font-bold text-slate-900 mb-4">Flux IA appliqué</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  Données terrain → Connaissances agronomiques → Modèles IA → Décision
                </p>
                <div className="space-y-4">
                  {['Collecte', 'Analyse', 'Recommandation', 'Suivi terrain'].map((step, idx) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                        <span className="text-sm font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-sm font-semibold uppercase tracking-wider text-slate-600">
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
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Services proposés
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Un accompagnement complet, de l&apos;idée au déploiement.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {services.map((service) => (
              <span
                key={service}
                className="group rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm transition-smooth hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section Secteurs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Secteurs d&apos;application
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Des solutions adaptables à tous les secteurs disposant de données et de documents.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {sectors.map((sector, idx) => (
              <div
                key={sector.id}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 px-6 py-4 text-center text-base font-medium text-slate-700 shadow-sm transition-smooth hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                {sector.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets */}
      {appliedProjects.length > 0 && (
        <section id="projets" className="py-20 md:py-28 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Projets en cours
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Nos projets de recherche appliquée et d&apos;innovation.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {appliedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CollaborateCta />
    </main>
  );
}
