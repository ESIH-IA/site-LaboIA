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

const typeLabels: Record<string, string> = {
  partner: "Partenaire",
  client: "Client",
  media: "Média",
  academic: "Académique",
};

export default function Partners({ title, intro, badge, items }: PartnersProps) {
  return (
    <section className="section section-white">
      <div className="section-inner" style={{ padding: "5rem 0" }}>
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              {title ?? "Partenaires & collaborations"}
            </h2>
            <p className="section-subtitle">
              {intro ??
                "Nous travaillons avec des institutions académiques, publiques et privées pour accélérer l'impact de la recherche."}
            </p>
          </div>
          <div className="badge-teal-box">
            {badge ?? "Besoin de collaborer ? Contactez-nous."}
          </div>
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
                    {typeLabels[partner.type] ?? partner.type}
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
                >
                  Voir le site
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
