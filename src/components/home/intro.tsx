import Link from "next/link";

const actionStyles = {
  primary:
    "group rounded-2xl bg-linear-to-r from-cyan-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-smooth hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30",
  secondary:
    "rounded-2xl border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-smooth hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50/50",
  tertiary:
    "rounded-2xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition-smooth hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-50",
} as const;

type Action = {
  label: string;
  href: string;
  variant?: keyof typeof actionStyles;
};

type IntroProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  actions?: Action[];
};

export default function Intro({ eyebrow, title, body, actions }: IntroProps) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Transition douce depuis le Hero sombre */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-linear-to-b from-slate-950 to-white" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-50/50 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-cyan-500 animate-glow" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            {eyebrow ?? "LaCDIA"}
          </p>
        </div>

        <h2 className="mt-6 max-w-4xl text-3xl font-bold text-slate-900 md:text-4xl leading-tight">
          {title ?? "Laboratoire de recherche et d'innovation en IA et science des donnees."}
        </h2>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
          {body ??
            "Nous menons des travaux de recherche appliquee et fondamentale, et nous accompagnons egalement des partenaires et des institutions dans la conception de solutions fondees sur l'intelligence artificielle, la science des donnees et les systemes intelligents."}
        </p>

        {actions?.length ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={actionStyles[action.variant ?? "primary"]}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
