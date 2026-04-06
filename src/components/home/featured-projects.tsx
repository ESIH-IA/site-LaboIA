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
    <section className="featured-projects">
      <div className="section-inner">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              {title ?? "Projets à la une"}
            </h2>
            <p className="section-subtitle" style={{ maxWidth: "42rem", lineHeight: 1.7 }}>
              {intro ??
                "Des initiatives concrètes qui démontrent la puissance de l'IA et de la science des données au service des communautés."}
            </p>
          </div>

          <Link
            href={ctaHref ?? "/projets"}
            className="btn btn-outline-cyan"
          >
            {ctaLabel ?? "Découvrir tous les projets"}
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="card-grid card-grid-3" style={{ marginTop: "3rem" }}>
            {projects.map((project, idx) => (
              <article
                key={project._id}
                className="project-card card-hover"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient accent top */}
                <div className="card-accent-top" />

                {/* Badge status */}
                {(project.projectType || project.statusLabel) && (
                  <div className="badge badge-cyan">
                    {project.projectType ?? "Projet"}
                    {project.statusLabel ? ` - ${project.statusLabel}` : ""}
                  </div>
                )}

                <h3 className="project-card-title">
                  {project.title}
                </h3>

                <p className="project-card-text">
                  {project.shortDescription ?? project.summary}
                </p>

                {project.tags?.length ? (
                  <div className="project-card-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="tag"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 ? (
                      <span className="tag tag-count">
                        +{project.tags.length - 3}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {/* Hover arrow indicator */}
                <div className="project-card-cta">
                  En savoir plus
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            Contenu en cours de publication.
          </div>
        )}
      </div>
    </section>
  );
}
