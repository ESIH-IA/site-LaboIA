type PartnerPreview = {
  _id: string;
  name: string;
  type?: string;
  shortDescription?: string;
  website?: string;
  tags?: string[];
};

type PartnersProps = {
  title?: string;
  intro?: string;
  badge?: string;
  items: PartnerPreview[];
};

export default async function Partners({ title, intro, badge, items }: PartnersProps) {
  if (!title && !intro && !badge && items.length === 0) return null;

  return (
    <section style={{ background: "var(--labo-bg)", color: "var(--labo-text)", padding: "clamp(5rem,9vw,8rem) 0" }}>
      <div className="container">
        <div className="section-header-row">
          <div>
            {title ? <h2 className="section-title">{title}</h2> : null}
            {intro ? <p className="section-subtitle">{intro}</p> : null}
          </div>
          {badge ? <div className="badge-teal-box">{badge}</div> : null}
        </div>

        <div className="card-grid card-grid-3 card-grid-sm-2" style={{ marginTop: "3rem" }}>
          {items.map((partner) => (
            <div
              key={partner._id}
              className="partner-card card-hover"
            >
              {/* Top accent gradient */}
              <div className="card-accent-top" />

              <div className="partner-card-header">
                <div className="partner-card-name">
                  {partner.name}
                </div>
                {partner.type ? (
                  <span className="badge badge-teal">
                    {partner.type}
                  </span>
                ) : null}
              </div>
              {partner.shortDescription ? (
                <p className="partner-card-text">{partner.shortDescription}</p>
              ) : null}
              {partner.tags?.length ? (
                <div className="partner-card-tags">
                  {partner.tags.map((tag) => (
                    <span key={tag} className="tag-small">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {partner.website ? (
                <a
                  href={partner.website}
                  className="partner-card-link"
                  rel="noreferrer"
                  target="_blank"
                  aria-label={partner.name}
                >
                  <span aria-hidden>{">"}</span>
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
