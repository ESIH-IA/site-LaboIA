import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type Action = {
  label: string;
  href: string;
  variant?: string;
};

type IntroProps = {
  eyebrow?: string;
  badge?: string;
  title?: string;
  body?: string;
  actions?: Action[];
  locale?: Locale;
};

const introFallback: Record<Locale, { title: string; body: string }> = {
  fr: {
    title: "Laboratoire de recherche et d'innovation en IA et science des données.",
    body: "Nous menons des travaux de recherche appliquée et fondamentale, et nous accompagnons des partenaires et des institutions dans la conception de solutions fondées sur l'intelligence artificielle, la science des données et les systèmes intelligents.",
  },
  en: {
    title: "Research and innovation laboratory in AI and data science.",
    body: "We conduct applied and fundamental research, and support partners and institutions in designing solutions based on artificial intelligence, data science and intelligent systems.",
  },
};

export default function Intro({ eyebrow, badge: _badge, title, body, actions, locale = "fr" }: IntroProps) {
  const fb = introFallback[locale] ?? introFallback.fr;

  return (
    <section className="section-labo section-padding-sm">
      <div className="container-site">
        <div
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: "var(--tech-bg)", color: "var(--tech-text)" }}
        >
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
                {title ?? fb.title}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                {body ?? fb.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
