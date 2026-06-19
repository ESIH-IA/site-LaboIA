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
    <section className="section-labo section-padding">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div className="max-w-xl">
            <div className="badge-teal inline-flex mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
              Écosystème
            </div>
            <h2 className="text-display-lg text-[#f0f4ff]">
              {title ?? "Partenaires & collaborations"}
            </h2>
            <p className="mt-4 text-[#8892b0] leading-relaxed">
              {intro ??
                "Nous travaillons avec des institutions académiques, publiques et privées pour accélérer l'impact de la recherche."}
            </p>
          </div>

          {badge && (
            <div className="glass-labo rounded-xl px-5 py-3 text-sm text-[#00d4aa] border border-[#00d4aa]/20 shrink-0">
              {badge}
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((partner) => (
              <div
                key={partner._id}
                className="glass-labo-hover rounded-2xl p-6 flex flex-col gap-4 group"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3
                      className="text-lg font-semibold text-[#f0f4ff]"
                      style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                    >
                      {partner.name}
                    </h3>
                    {partner.type && (
                      <span className="badge-teal text-[10px] py-0.5 px-2">
                        {typeLabels[partner.type] ?? partner.type}
                      </span>
                    )}
                  </div>

                  {partner.shortDescription && (
                    <p className="text-sm text-[#8892b0] leading-relaxed">
                      {partner.shortDescription}
                    </p>
                  )}

                  {partner.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {partner.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {partner.website && (
                  <a
                    href={partner.website}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#00d4aa] hover:text-[#00f0c0] transition-colors mt-auto"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Voir le site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#8892b0]">
            Partenariats en cours de formalisation.
          </div>
        )}
      </div>
    </section>
  );
}
