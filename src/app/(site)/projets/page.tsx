import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity/client";
import { projectListQuery } from "@/lib/sanity/queries";
import type { ProjectListItem } from "@/lib/sanity/types";
import { projects as localProjects } from "@/content/projects";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: "Projets de recherche",
    description:
      "Découvrez les projets de recherche appliquée portés par le laboratoire LaCDIA en intelligence artificielle, agriculture numérique et science des données.",
    path: localizedPath("/projets", locale),
    alternates: {
      fr: localizedPath("/projets", "fr"),
      en: localizedPath("/projets", "en"),
    },
  });
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    "En cours": { bg: "rgba(0,212,170,0.12)", text: "#00d4aa" },
    "Terminé":  { bg: "rgba(108,99,255,0.12)", text: "#a78bfa" },
    "À venir":  { bg: "rgba(251,191,36,0.12)", text: "#fbbf24" },
  };
  const colors = colorMap[status] ?? { bg: "rgba(136,146,176,0.12)", text: "#8892b0" };

  return (
    <span
      className="text-xs font-semibold px-3 py-1 rounded-full"
      style={{ background: colors.bg, color: colors.text }}
    >
      {status}
    </span>
  );
}

type LocalProjectCard = {
  id: string;
  slug: string;
  title: string;
  type: string;
  status: string;
  yearStart: number;
  tags: readonly string[];
  shortDescription: string;
};

function ProjectCardLocal({ project }: { project: LocalProjectCard }) {
  return (
    <article
      className="rounded-2xl flex flex-col gap-4 p-7 transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
      }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <StatusBadge status={project.status} />
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: "rgba(136,146,176,0.08)", color: "var(--labo-text-muted)" }}
        >
          {project.type}
        </span>
      </div>

      <div>
        <h2
          className="text-lg font-semibold mb-2 leading-snug"
          style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
        >
          {project.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
          {project.shortDescription}
        </p>
      </div>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(0,212,170,0.07)",
                color: "#00d4aa",
                border: "1px solid rgba(0,212,170,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid var(--labo-border)" }}>
        <span
          className="text-xs"
          style={{ color: "var(--labo-text-muted)", fontFamily: "var(--font-jetbrains, monospace)" }}
        >
          Depuis {project.yearStart}
        </span>
        <Link
          href={`/projets/${project.slug}`}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: "#00d4aa" }}
        >
          Voir le projet
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

function SanityProjectCard({ project }: { project: ProjectListItem }) {
  const href = project.slug?.current ? `/projets/${project.slug.current}` : null;

  return (
    <article
      className="rounded-2xl flex flex-col gap-4 p-7 transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
      }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        {project.statusLabel && <StatusBadge status={project.statusLabel} />}
        {project.projectType && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: "rgba(136,146,176,0.08)", color: "var(--labo-text-muted)" }}
          >
            {project.projectType}
          </span>
        )}
      </div>

      <div>
        <h2
          className="text-lg font-semibold mb-2 leading-snug"
          style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
        >
          {project.title}
        </h2>
        {project.shortDescription && (
          <p className="text-sm leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
            {project.shortDescription}
          </p>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(0,212,170,0.07)",
                color: "#00d4aa",
                border: "1px solid rgba(0,212,170,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {href && (
        <div className="flex items-center justify-end mt-auto pt-2" style={{ borderTop: "1px solid var(--labo-border)" }}>
          <Link
            href={href}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: "#00d4aa" }}
          >
            Voir le projet
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      )}
    </article>
  );
}

export default async function ProjetsPage() {
  const locale = await getServerLocale();

  if (isSanityConfigured) {
    const sanityProjects = await sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []);

    return (
      <main style={{ background: "var(--labo-bg)" }}>
        <section className="section-padding">
          <div className="container-site">
            <div className="mb-14">
              <div className="label-eyebrow mb-4" style={{ color: "var(--labo-text-muted)" }}>
                Recherche appliquée
              </div>
              <h1
                className="text-display-xl"
                style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                Projets
              </h1>
              <p className="mt-5 text-lg max-w-2xl leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
                Des initiatives concrètes à l'intersection de la recherche fondamentale et de l'impact terrain.
              </p>
            </div>

            {sanityProjects.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{ border: "1px dashed var(--labo-border)", background: "var(--labo-surface)" }}
              >
                <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
                  Le catalogue détaillé des projets est en cours de publication. Découvrez prochainement les initiatives de recherche appliquée portées par LaCDIA.
                </p>
                <Link href="/solutions" className="btn btn-primary-labo mt-8 inline-flex">
                  Voir nos solutions
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sanityProjects.map((project) => (
                  <SanityProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ background: "var(--labo-bg)" }}>
      <section className="section-padding">
        <div className="container-site">
          <div className="mb-14">
            <div className="label-eyebrow mb-4" style={{ color: "var(--labo-text-muted)" }}>
              Recherche appliquée
            </div>
            <h1
              className="text-display-xl"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              Projets
            </h1>
            <p className="mt-5 text-lg max-w-2xl leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
              Des initiatives concrètes à l'intersection de la recherche fondamentale et de l'impact terrain.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {localProjects.map((project) => (
              <ProjectCardLocal key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}