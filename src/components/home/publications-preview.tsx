import { articles } from "@/content/articles";

export default function PublicationsPreview() {
  const featuredPublications = [...articles]
    .filter((article) => article.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Publications récentes</h2>
            <p className="mt-3 text-base text-slate-300">
              Articles, rapports et communications qui documentent nos avancées scientifiques.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPublications.map((publication) => (
            <article
              key={publication.id}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              {/* Top accent gradient */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-cyan-500 to-teal-500" />

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
                  <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-400">
                    {publication.category}
                  </span>
                  <span>{publication.date}</span>
                  <span aria-hidden="true">•</span>
                  <span>{publication.authorName}</span>
                </div>

                <h3 className="text-lg font-semibold text-white leading-snug">{publication.title}</h3>
                <p className="text-base text-slate-300 leading-relaxed">{publication.summary}</p>
              </div>

              {publication.sourceUrl ? (
                <a
                  href={publication.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-smooth hover:text-cyan-300 hover:gap-3"
                >
                  Lire la source
                  <span aria-hidden>→</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
