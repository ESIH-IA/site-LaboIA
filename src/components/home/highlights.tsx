import { Building2 } from "lucide-react";

type HighlightItem = {
  title: string;
  description: string;
};

type HighlightsProps = {
  title?: string;
  intro?: string;
  items?: HighlightItem[];
};

const fallbackItems: HighlightItem[] = [
  {
    title: "Agriculture intelligente",
    description:
      "Systèmes de prédiction des rendements, monitoring des cultures et alertes précoces basées sur la donnée.",
  },
  {
    title: "Services publics & gouvernance",
    description:
      "Optimisation des services essentiels, observatoires de données et aide à la décision.",
  },
  {
    title: "Santé & environnement",
    description:
      "Analyse de données épidémiologiques, détection de risques et modélisation de scénarios.",
  },
];

const ICONS = [
  /* Agriculture */
  <svg key="ag" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="#00d4aa" strokeWidth="1.5"/>
    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8v8M9 11l3-3 3 3" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  /* Gouvernance */
  <Building2 key="gov" size={24} color="#6c63ff" strokeWidth={1.5} aria-hidden />,
  /* Santé */
  <svg key="health" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

export default function Highlights({ title, intro, items }: HighlightsProps) {
  const list = items?.length ? items : fallbackItems;

  return (
    <section className="section-labo section-padding">
      <div className="container-site">
        {/* Section header — left aligned */}
        <div className="max-w-2xl mb-16">
          <div className="badge-teal inline-flex mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
            Axes de recherche
          </div>
          <h2 className="text-display-lg text-[#f0f4ff]">
            {title ?? "Ce que nous faisons"}
          </h2>
          <p className="mt-5 text-[#8892b0] text-lg leading-relaxed">
            {intro ??
              "Des axes de recherche appliquée et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux."}
          </p>
        </div>

        {/* Bento grid — asymmetrique */}
        <div className="bento-grid">
          {/* Featured large cell */}
          <article className="bento-cell-wide glass-labo-hover rounded-2xl p-8 flex flex-col justify-between min-h-70">
            <div>
              <div className="mb-5 h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)" }}>
                {ICONS[0]}
              </div>
              <div className="label-eyebrow text-[#00d4aa] mb-3">01</div>
              <h3 className="text-display-md text-[#f0f4ff]">{list[0]?.title}</h3>
              <p className="mt-4 text-[#8892b0] leading-relaxed">{list[0]?.description}</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#00d4aa] text-sm font-medium">
              <span className="h-px w-6 bg-[#00d4aa]" />
              En savoir plus
            </div>
          </article>

          {/* Tall side cell */}
          <div className="bento-cell-tall flex flex-col gap-4">
            {list.slice(1).map((item, i) => (
              <article
                key={item.title}
                className="glass-labo-hover rounded-2xl p-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                    {ICONS[i + 1]}
                  </div>
                  <div className="label-eyebrow text-[#6c63ff] mb-2">0{i + 2}</div>
                  <h3 className="font-semibold text-[#f0f4ff] text-lg leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#8892b0] leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
