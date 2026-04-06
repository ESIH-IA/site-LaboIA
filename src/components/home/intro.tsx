import Link from "next/link";

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

export default function Intro({ eyebrow, title, body, actions }: IntroProps) {
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
            {eyebrow ?? "LaCDIA"}
          </p>
        </div>

        <h2 className="intro-title">
          {title ?? "Laboratoire de recherche et d'innovation en IA et science des données."}
        </h2>

        <p className="intro-body">
          {body ??
            "Nous menons des travaux de recherche appliquée et fondamentale, et nous accompagnons également des partenaires et des institutions dans la conception de solutions fondées sur l'intelligence artificielle, la science des données et les systèmes intelligents."}
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
