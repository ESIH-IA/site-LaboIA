import Link from "next/link";

type Action = {
  label: string;
  href: string;
  variant?: string;
};

type IntroProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  actions?: Action[];
};

export default function Intro({ eyebrow, title, body, actions }: IntroProps) {
  return (
    <section className="section-labo section-padding-sm">
      <div className="container-site">
        {/* Split layout: crème card on dark */}
        <div
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: "var(--tech-bg)", color: "var(--tech-text)" }}
        >
          {/* Decorative top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00b894, transparent)" }}
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge-dark inline-flex mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b894]" />
                {eyebrow ?? "LaCDIA"}
              </div>
              <h2
                className="text-display-lg"
                style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {title ?? "Laboratoire de recherche et d'innovation en IA et science des données."}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                {body ??
                  "Nous menons des travaux de recherche appliquée et fondamentale, et nous accompagnons des partenaires et des institutions dans la conception de solutions fondées sur l'intelligence artificielle, la science des données et les systèmes intelligents."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
