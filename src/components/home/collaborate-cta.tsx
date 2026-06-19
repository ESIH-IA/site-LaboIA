import Link from "next/link";

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
  const primary = actions?.find((a) => a.variant === "primary") ?? actions?.[0];
  const secondary = actions?.find((a) => a.variant === "secondary") ?? actions?.[1];

  return (
    <section className="section-labo-surface section-padding">
      <div className="container-site">
        {/* Split card: dark left / teal-lit right */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 100% 50%, rgba(0,212,170,0.12) 0%, transparent 60%), var(--labo-surface)",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 border border-white/8 rounded-3xl" aria-hidden="true" />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00d4aa, #6c63ff, transparent)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-8 p-10 md:p-14 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-xl">
              <div className="badge-teal inline-flex mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
                Collaborer avec le labo
              </div>
              <h2 className="text-display-lg text-[#f0f4ff]">
                {title ?? "Collaborer avec le laboratoire"}
              </h2>
              <p className="mt-5 text-[#8892b0] text-lg leading-relaxed">
                {body ??
                  "Partenariats institutionnels, stages, financements ou projets appliqués : construisons ensemble des solutions d'impact."}
              </p>
            </div>

            <div className="flex flex-col gap-4 shrink-0">
              {primary && (
                <Link href={primary.href} className="btn btn-primary-labo text-center justify-center">
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn btn-secondary-labo text-center justify-center">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
