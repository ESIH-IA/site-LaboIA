type HighlightItem = {
  title: string;
  description: string;
};

type HighlightsProps = {
  title?: string;
  intro?: string;
  items?: HighlightItem[];
};

export default async function Highlights({ title, intro, items }: HighlightsProps) {
  const list = items ?? [];

  if (!title && !intro && list.length === 0) return null;

  return (
    <section className="highlights section">
      {/* Subtle background pattern */}
      <div className="section-pattern dot-pattern pattern-30" />

      <div className="section-inner" style={{ position: "relative", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="section-header">
          {title ? <h2 className="section-title">{title}</h2> : null}
          {intro ? <p className="section-subtitle" style={{ marginTop: "1rem" }}>{intro}</p> : null}
        </div>
        <div className="card-grid card-grid-3" style={{ marginTop: "3rem" }}>
          {list.map((item, index) => (
            <article
              key={item.title}
              className="highlights-card card-hover"
            >
              {/* Top accent gradient */}
              <div className="card-accent-top" />

              {/* Number badge */}
              <div className="highlights-number">
                <span>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
