import Link from "next/link";

import { articles } from "@/content/articles";

export default function PublicationsPreview() {
  const featuredPublications = [...articles]
    .filter((article) => article.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Publications récentes</h2>
            <p className="mt-2 text-white/70">
              Articles, rapports et communications qui documentent nos avancées scientifiques.
            </p>
          </div>

          <Link
            href="/publications"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:border-white/70"
          >
            Voir toutes les publications
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {featuredPublications.map((publication) => (
            <div
              key={publication.id}
              className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-white/60">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
                  {publication.category}
                </span>
                <span>{publication.date}</span>
                <span aria-hidden="true">•</span>
                <span>{publication.authorName}</span>
              </div>

              <h3 className="text-base font-semibold">{publication.title}</h3>
              <p className="text-sm text-white/70">{publication.summary}</p>

              {publication.sourceUrl ? (
                <a
                  href={publication.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
                >
                  Lire la source
                  <span aria-hidden>↗</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
