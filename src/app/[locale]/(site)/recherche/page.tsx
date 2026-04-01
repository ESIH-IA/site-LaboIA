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
    <main className="w-full">
      {/* Hero Section (always shown) */}
      <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
        <div
          className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Département Scientifique
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in-up">
            Recherche en Intelligence Artificielle et Science des Données
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-slate-200 leading-relaxed animate-fade-in-up">
            Explorez nos axes de recherche scientifique fondamentale et appliquée.
          </p>
        </div>
      </section>

      {/* CMS Content Section (if available) */}
      {page && (page.title || page.summary || page.content?.length) ? (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="max-w-3xl">
            {page.title ? <h2 className="text-3xl font-semibold text-slate-900">{page.title}</h2> : null}
            {page.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
          </div>

          <div className="mt-6">
            <PortableTextRenderer value={page.content} />
          </div>
        </section>
      ) : null}

      {/* Research Axes Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Axes de recherche</h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl">
            Les six axes de recherche du LaCDIA combinant méthodes fondamentales en IA et applications concrètes adaptées au contexte caribéen.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayAxes.map((axis, idx) => {
            const a = axis as Record<string, unknown>;
            const key = (a._id ?? a.id ?? `axis-${idx}`) as string;
            const num = (a.number ?? idx + 1) as number;
            const title = (a.title ?? a.shortTitle ?? `Axe ${idx + 1}`) as string;
            const desc = (a.problematic ?? a.summary ?? "Découvrez cet axe de recherche") as string;
            return (
            <article
              key={key}
              className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-8 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 font-bold text-sm">
                {num}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                {desc}
              </p>
              <Link
                href={`/recherche/departement-scientifique`}
                className="inline-flex text-sm font-semibold text-cyan-600 hover:text-cyan-700 underline underline-offset-2 transition-colors"
              >
                Explorer l'axe
              </Link>
            </article>
          );})}
        </div>

        {/* Action Links */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/recherche/departement-scientifique"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
          >
            Explorer nos recherches
            <svg
              className="h-5 w-5"
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
            className="inline-flex items-center gap-2 rounded-xl glass-card px-8 py-3 text-base font-semibold text-slate-900 border border-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            Nos collaborations
          </Link>
        </div>
      </section>

      {/* CMS-driven content (if available) */}
      {isReady ? (
        <>
          {hasResearchProjects || hasPublications ? (
            <div className="mx-auto max-w-6xl px-4 py-12">
              <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h2 className="text-xl font-semibold text-neutral-900">Recherche avancée</h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Explorez les publications, projets et membres avec une recherche plein texte.
                </p>
                <Link
                  href="/recherche/explorer"
                  className="mt-4 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
                >
                  Lancer la recherche
                </Link>
              </div>
            </div>
          ) : null}

          {hasResearchProjects ? (
            <div className="mx-auto max-w-6xl px-4 py-12">
              <h2 className="text-2xl font-semibold text-neutral-900">Projets de recherche</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {researchProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          ) : null}

          {hasPublications ? (
            <div className="mx-auto max-w-6xl px-4 py-12">
              <h2 className="text-2xl font-semibold text-neutral-900">Publications liées</h2>
              <div className="mt-6 grid gap-6">
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
