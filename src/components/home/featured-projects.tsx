import { projects } from "@/content/projects";

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Projets à la une
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Des initiatives concrètes qui démontrent la puissance de l’IA et de la science
              des données au service des communautés.
            </p>
          </div>
          <Link
            href="/projets"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400"
          >
            Découvrir tous les projets
          </button>
          </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {project.type} · {project.status}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">{project.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">{project.shortDescription}</p>
              {project.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-neutral-500">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        )}
      </div>
    </section>
  );
}
