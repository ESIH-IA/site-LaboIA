import Link from "next/link";

import { getFeaturedProject } from "@/lib/content-loader";

export default function FeaturedProjects() {
  const featuredProject = getFeaturedProject();

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
          </Link>
        </div>

        {featuredProject ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm md:col-span-2 lg:col-span-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {featuredProject.type} · {featuredProject.status}
              </span>
              <h3 className="mt-3 text-2xl font-semibold text-neutral-900">{featuredProject.title}</h3>
              <p className="mt-3 text-base text-neutral-600">{featuredProject.shortDescription}</p>
              {featuredProject.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-neutral-500">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-neutral-900 underline underline-offset-4">
                <Link href={`/projets/${featuredProject.slug}`}>Voir le détail</Link>
                {featuredProject.portals?.map((portal) => (
                  <a key={portal.url} href={portal.url} target="_blank" rel="noreferrer">
                    {portal.label}
                    <span className="ml-1" aria-hidden>
                      ↗
                    </span>
                  </a>
                ))}
              </div>
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
