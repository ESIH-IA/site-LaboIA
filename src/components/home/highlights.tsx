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
      "Syst\u00e8mes de pr\u00e9diction des rendements, monitoring des cultures et alertes pr\u00e9coces bas\u00e9es sur la donn\u00e9e.",
  },
  {
    title: "Services publics & gouvernance",
    description:
      "Optimisation des services essentiels, observatoires de donn\u00e9es et aide \u00e0 la d\u00e9cision.",
  },
  {
    title: "Sant\u00e9 & environnement",
    description:
      "Analyse de donn\u00e9es \u00e9pid\u00e9miologiques, d\u00e9tection de risques et mod\u00e9lisation de sc\u00e9narios.",
  },
];

export default function Highlights({ title, intro, items }: HighlightsProps) {
  const list = items?.length ? items : fallbackItems;

  return (
    <section className="relative bg-slate-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900">
            {title ?? "Ce que nous faisons"}
          </h2>
          <p className="mt-4 text-base text-slate-600">
            {intro ??
              "Des axes de recherche appliqu\u00e9e et fondamentale qui valorisent l'IA au service des besoins locaux et des enjeux globaux."}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {list.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-smooth hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Top accent gradient */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 to-cyan-500" />

              {/* Number badge */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-linear-to-br from-cyan-50 to-teal-50">
                <span className="text-lg font-bold gradient-text-cyan">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
