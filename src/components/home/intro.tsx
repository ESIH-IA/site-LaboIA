import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/lib/i18n";

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
  locale?: Locale;
};

export default async function Intro({ eyebrow, title, body, actions, locale = "fr" }: IntroProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section className="section-labo-surface section-padding-sm relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--labo-accent-teal), var(--labo-accent-violet), transparent)" }}
        aria-hidden="true"
      />
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="badge-teal inline-flex mb-6">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--labo-accent-teal)" }} />
              {eyebrow ?? "LaCDIA"}
            </div>
            <h2
              className="text-display-lg"
              style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
            >
              {title ?? t("introTitle")}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
              {body ?? t("introBody")}
            </p>
            {actions && actions.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={action.variant === "primary" ? "btn btn-cta-primary" : "btn btn-cta-secondary"}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
