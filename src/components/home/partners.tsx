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
  media: "M\u00e9dia",
  academic: "Acad\u00e9mique",
};

export default function Partners({ title, intro, badge, items }: PartnersProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {title ?? "Partenaires & collaborations"}
            </h2>
            <p className="mt-3 text-base text-slate-600">
              {intro ??
                "Nous travaillons avec des institutions acad\u00e9miques, publiques et priv\u00e9es pour acc\u00e9l\u00e9rer l'impact de la recherche."}
            </p>
          </div>
          <div className="rounded-2xl border border-teal-200 bg-linear-to-br from-teal-50 to-cyan-50 px-5 py-3 text-sm text-teal-700 md:whitespace-nowrap">
            {badge ?? "Besoin de collaborer ? Contactez-nous."}
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {items.map((partner) => (
            <div
              key={partner._id}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10"
            >
              {/* Top accent gradient */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-lg font-semibold text-slate-900">
                    {partner.name}
                  </div>
                  {partner.type ? (
                    <span className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-600">
                      {typeLabels[partner.type] ?? partner.type}
                    </span>
                  ) : null}
                </div>
                {partner.shortDescription ? (
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">{partner.shortDescription}</p>
                ) : null}
                {partner.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {partner.tags.map((tag) => (
                      <span key={tag} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              {partner.website ? (
                <a
                  href={partner.website}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-600 transition-smooth hover:text-teal-500 hover:gap-3"
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
