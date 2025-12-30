import { partners } from "@/content/partners";

const typeLabels = {
  partner: "Partenaire", // par défaut
  client: "Client",
  media: "Média",
  academic: "Académique",
} as const;

export default function Partners() {
  const featuredPartners = partners.filter((partner) => partner.featured);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Partenaires & collaborations
            </h2>
            <p className="mt-2 text-neutral-600">
              Nous travaillons avec des institutions académiques, publiques et privées pour
              accélérer l’impact de la recherche.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-600">
            Besoin de collaborer ? <span className="font-medium">Contactez-nous.</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {featuredPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col gap-2 rounded-xl border border-dashed border-neutral-200 bg-white p-6 text-sm text-neutral-700"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-base font-semibold text-neutral-900">
                  {partner.name}
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
                  {typeLabels[partner.type]}
                </span>
              </div>
              <p className="text-sm text-neutral-600">{partner.shortDescription}</p>
              {partner.tags?.length ? (
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] uppercase tracking-wide text-neutral-500">
                  {partner.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {partner.website ? (
                <a
                  href={partner.website}
                  className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-900 underline underline-offset-4"
                  rel="noreferrer"
                  target="_blank"
                >
                  Voir le site
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
