type PublicationPreview = {
  _id: string;
  title: string;
  category?: string;
  date?: string;
  authorName?: string;
  summary?: string;
  sourceUrl?: string;
};

type PublicationsPreviewProps = {
  title?: string;
  intro?: string;
  items: PublicationPreview[];
};

export default function PublicationsPreview({ title, intro, items }: PublicationsPreviewProps) {
  return (
    <section className="section-labo-surface section-padding">
      <div className="container-site">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-xl">
            <div className="badge-violet inline-flex mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6c63ff]" />
              Recherche
            </div>
            <h2 className="text-display-lg text-[#f0f4ff]">
              {title ?? "Publications récentes"}
            </h2>
            <p className="mt-4 text-[#8892b0] leading-relaxed">
              {intro ??
                "Articles, rapports et communications qui documentent nos avancées scientifiques."}
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((pub) => (
              <article
                key={pub._id}
                className="glass-labo-hover rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {pub.category && (
                      <span className="badge-violet text-[10px] py-0.5 px-2">{pub.category}</span>
                    )}
                    {pub.date && (
                      <span className="label-mono text-[#8892b0]">{pub.date}</span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-[#f0f4ff] leading-snug group-hover:text-[#6c63ff] transition-colors">
                    {pub.title}
                  </h3>

                  {pub.authorName && (
                    <p className="mt-2 text-xs text-[#8892b0]">{pub.authorName}</p>
                  )}

                  {pub.summary && (
                    <p className="mt-4 text-sm text-[#8892b0] leading-relaxed line-clamp-3">
                      {pub.summary}
                    </p>
                  )}
                </div>

                {pub.sourceUrl && (
                  <a
                    href={pub.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#00d4aa] hover:text-[#00f0c0] transition-colors"
                  >
                    Lire la source
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#8892b0]">
            Publications en cours de référencement.
          </div>
        )}
      </div>
    </section>
  );
}
