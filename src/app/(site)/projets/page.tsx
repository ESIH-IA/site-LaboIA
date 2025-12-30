import { projects } from "@/content/projects";

export default function Page() {
  const sortedProjects = [...projects].sort((a, b) => (b.yearStart ?? 0) - (a.yearStart ?? 0));

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Projets</h1>
        <p className="mt-3 text-neutral-600">
          Projets de recherche en cours, terminés et démonstrateurs du laboratoire.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {sortedProjects.map((project) => (
          <article
            key={project.id}
            className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-neutral-500">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                {project.type}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                {project.status}
              </span>
              {project.yearStart ? <span>Depuis {project.yearStart}</span> : null}
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">{project.title}</h2>
            <p className="text-sm text-neutral-700">{project.shortDescription}</p>
            {project.tags?.length ? (
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-neutral-500">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {project.portals?.length ? (
              <div className="mt-auto flex flex-wrap gap-3 text-sm font-semibold text-neutral-900 underline underline-offset-4">
                {project.portals.map((portal) => (
                  <a key={portal.url} href={portal.url} target="_blank" rel="noreferrer">
                    {portal.label}
                    <span className="ml-1" aria-hidden>
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
