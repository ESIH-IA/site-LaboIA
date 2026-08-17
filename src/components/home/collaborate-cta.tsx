import { Link } from "@/i18n/navigation";

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
  const primary = actions?.find((action) => action.variant === "primary") ?? actions?.[0];
  const secondary = actions?.find((action) => action.variant === "secondary") ?? actions?.[1];

  if (!title && !body && !primary && !secondary) return null;

  return (
    <section className="collab-cta section">
      <div className="section-inner" style={{ padding: "5rem 0" }}>
        <div className="collab-cta-box">
          <div className="collab-cta-accent" />
          <div className="collab-cta-pattern" />

          <div className="collab-cta-content">
            <div className="collab-cta-text">
              {title ? <h2 className="collab-cta-title">{title}</h2> : null}
              {body ? <p className="collab-cta-body">{body}</p> : null}
            </div>
            <div className="collab-cta-buttons">
              {primary ? (
                <Link href={primary.href} className="btn btn-cta-primary">
                  {primary.label}
                </Link>
              ) : null}
              {secondary ? (
                <Link href={secondary.href} className="btn btn-cta-secondary">
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
