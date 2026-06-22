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

export default async function PublicationsPreview({ title, intro, items }: PublicationsPreviewProps) {
  if (!title && !intro && items.length === 0) return null;

  return (
    <section className="pub-preview section">
      {/* Grid pattern background */}
      <div className="section-pattern grid-pattern pattern-10" />

      <div className="section-inner" style={{ position: "relative", padding: "5rem 0" }}>
        <div className="section-header-row">
          <div>
            {title ? <h2 className="section-title section-title-white">{title}</h2> : null}
            {intro ? <p className="section-subtitle section-subtitle-light">{intro}</p> : null}
          </div>
        </div>

        <div className="card-grid card-grid-3" style={{ marginTop: "3rem" }}>
          {items.map((publication) => (
            <article
              key={publication._id}
              className="pub-card"
            >
              {/* Top accent gradient */}
              <div className="card-accent-top" />

              <div className="pub-card-meta">
                <div className="pub-card-meta">
                  {publication.category ? (
                    <span className="pub-card-category">
                      {publication.category}
                    </span>
                  ) : null}
                  {publication.date ? <span>{publication.date}</span> : null}
                  {publication.authorName ? (
                    <>
                      <span aria-hidden="true">-</span>
                      <span>{publication.authorName}</span>
                    </>
                  ) : null}
                </div>

                <h3 className="pub-card-title">{publication.title}</h3>
                {publication.summary ? (
                  <p className="pub-card-summary">{publication.summary}</p>
                ) : null}
              </div>

              {publication.sourceUrl ? (
                <a
                  href={publication.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pub-card-link"
                  aria-label={publication.title}
                >
                  <span aria-hidden>{">"}</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
