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
    <section className="section-labo-surface section-padding">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-xl">
            <div className="badge-violet inline-flex mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6c63ff]" />
              Projets à la une
            </div>
            <h2 className="text-display-lg text-[#f0f4ff]">
              {title ?? "Projets à la une"}
            </h2>
            <p className="mt-4 text-[#8892b0] leading-relaxed">
              {intro ??
                "Des initiatives concrètes qui démontrent la puissance de l'IA et de la science des données au service des communautés."}
            </p>
          </div>

          {(ctaLabel || ctaHref) && (
            <Link
              href={ctaHref ?? "/collaborer"}
              className="btn btn-secondary-labo shrink-0"
            >
              {ctaLabel ?? "Tous les projets"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <article
                key={project._id}
                className="glass-labo-hover rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top accent */}
                <div
                  className="h-px w-full mb-6 rounded-full"
                  style={{ background: "linear-gradient(90deg, #00d4aa, #6c63ff, transparent)" }}
                  aria-hidden="true"
                />

                <div className="flex-1">
                  {/* Badge */}
                  {(project.projectType || project.statusLabel) && (
                    <div className="badge-teal inline-flex mb-4">
                      {project.projectType ?? "Projet"}
                      {project.statusLabel ? ` · ${project.statusLabel}` : ""}
                    </div>
                  )}

                  <h3
                    className="text-xl font-bold text-[#f0f4ff] leading-snug group-hover:text-[#00d4aa] transition-colors"
                    style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm text-[#8892b0] leading-relaxed">
                    {project.shortDescription ?? project.summary}
                  </p>

                  {project.tags?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="tag">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#00d4aa] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="h-px w-4 bg-[#00d4aa]" />
                  En savoir plus
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 p-12 text-center text-sm text-[#8892b0]">
            Projets en cours de publication.
          </div>
        )}
      </div>
    </section>
  );
}
