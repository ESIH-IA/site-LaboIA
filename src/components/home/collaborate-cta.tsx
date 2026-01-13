type CollaborateAction = {
  label: string;
  href: string;
  variant?: string;
};

type CollaborateCtaProps = {
  title?: string;
  body?: string;
  actions?: CollaborateAction[];
};

export default function CollaborateCta({ title, body, actions }: CollaborateCtaProps) {
  const primary = actions?.find((action) => action.variant === "primary") ?? actions?.[0];
  const secondary = actions?.find((action) => action.variant === "secondary") ?? actions?.[1];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-white via-slate-50 to-teal-50/30 p-10 md:p-12 shadow-lg">
          {/* Decorative gradient accent */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-teal-500 via-cyan-500 to-teal-500" />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 dot-pattern opacity-20" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900">
                {title ?? "Collaborer avec le laboratoire"}
              </h2>
              <p className="mt-4 max-w-2xl text-base text-slate-600 leading-relaxed">
                {body ??
                  "Partenariats institutionnels, stages, financements ou projets appliqu\u00e9s : construisons ensemble des solutions d'impact."}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {primary ? (
                <a
                  href={primary.href}
                  className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-smooth hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <span className="relative z-10">{primary.label}</span>
                </a>
              ) : null}
              {secondary ? (
                <a
                  href={secondary.href}
                  className="rounded-2xl border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-smooth hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50/50"
                >
                  {secondary.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
