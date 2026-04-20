import Link from "next/link";
import { getTranslations } from "next-intl/server";

const actionStyles = {
  primary: "btn btn-cta-primary",
  secondary: "btn btn-cta-secondary",
  tertiary: "btn btn-cta-tertiary",
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

export default async function Intro({ eyebrow, title, body, actions }: IntroProps) {
  const t = await getTranslations("home");
  return (
    <section className="intro">
      {/* Transition douce depuis le Hero sombre */}
      <div className="intro-transition" />

      {/* Subtle background pattern */}
      <div className="intro-pattern" />

      <div className="intro-inner">
        <div className="intro-eyebrow">
          <div className="intro-eyebrow-dot" />
          <p className="intro-eyebrow-text">
            {eyebrow ?? t("introEyebrow")}
          </p>
        </div>

        <h2 className="intro-title">
          {title ?? t("introTitle")}
        </h2>

        <p className="intro-body">
          {body ?? t("introBody")}
        </p>

        {actions?.length ? (
          <div className="intro-actions">
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
