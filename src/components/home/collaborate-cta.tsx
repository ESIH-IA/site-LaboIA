import { getTranslations } from "next-intl/server";

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

export default async function CollaborateCta({ title, body, actions }: CollaborateCtaProps) {
  const t = await getTranslations("home");
  const primary = actions?.find((action) => action.variant === "primary") ?? actions?.[0];
  const secondary = actions?.find((action) => action.variant === "secondary") ?? actions?.[1];

  return (
    <section className="collab-cta section">
      <div className="section-inner" style={{ padding: "5rem 0" }}>
        <div className="collab-cta-box">
          {/* Decorative gradient accent */}
          <div className="collab-cta-accent" />

          {/* Subtle pattern overlay */}
          <div className="collab-cta-pattern" />

          <div className="collab-cta-content">
            <div className="collab-cta-text">
              <h2 className="collab-cta-title">
                {title ?? t("collaborateTitle")}
              </h2>
              <p className="collab-cta-body">
                {body ?? t("collaborateBody")}
              </p>
            </div>
            <div className="collab-cta-buttons">
              {primary ? (
                <a
                  href={primary.href}
                  className="btn btn-cta-primary"
                >
                  <span style={{ position: "relative", zIndex: 10 }}>{primary.label}</span>
                </a>
              ) : null}
              {secondary ? (
                <a
                  href={secondary.href}
                  className="btn btn-cta-secondary"
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
