import Link from "next/link";
import { getTranslations } from "next-intl/server";
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

export default async function Intro({ eyebrow, badge: _badge, title, body, actions, locale = "fr" }: IntroProps) {
  const t = await getTranslations({ locale, namespace: "home" });

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
                {title ?? t("introTitle")}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed" style={{ color: "var(--tech-text-muted)" }}>
                {body ?? t("introBody")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
