import Link from "next/link";

import type { ProjectListItem } from "@/lib/sanity/types";

type FeaturedProjectsProps = {
  title?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  projects: ProjectListItem[];
};

export default function FeaturedProjects({
  title,
  intro,
  ctaLabel,
  ctaHref,
  projects,
}: FeaturedProjectsProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {title ?? "Projets à la une"}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600 leading-relaxed">
              {intro ??
                "Des initiatives concrètes qui démontrent la puissance de l'IA et de la science des données au service des communautés."}
            </p>
          </div>

          <Link
            href={ctaHref ?? "/projets"}
            className="inline-flex items-center justify-center rounded-xl border-2 border-cyan-500 px-6 py-3 text-sm font-semibold text-cyan-600 transition-all hover:-translate-y-1 hover:bg-cyan-50"
          >
            {ctaLabel ?? "Découvrir tous les projets"}
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <article
                key={project._id}
                className="group relative overflow-hidden rounded-2xl gradient-card-bg border border-slate-200 p-6 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient accent top */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />

                {/* Badge status */}
                {(project.projectType || project.statusLabel) && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                    {project.projectType ?? "Projet"}
                    {project.statusLabel ? ` - ${project.statusLabel}` : ""}
                  </div>
                )}

                <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {project.shortDescription ?? project.summary}
                </p>

                {project.tags?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 ? (
                      <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                        +{project.tags.length - 3}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {/* Hover arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-semibold text-cyan-600 opacity-0 transition-opacity group-hover:opacity-100">
                  En savoir plus
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            Contenu en cours de publication.
          </div>
        )}
      </div>
    </section>
  );
}
