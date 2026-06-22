import Link from "next/link";

type EventBannerProps = {
  enabled?: boolean;
  label?: string;
  title?: string;
  date?: string;
  location?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default async function EventBanner({
  enabled = true,
  label,
  title,
  date,
  location,
  ctaLabel,
  ctaHref,
}: EventBannerProps) {
  if (!enabled) return null;
  if (!label && !title && !date && !location && !ctaLabel) return null;

  return (
    <section className="event-banner">
      <div className="section-inner" style={{ padding: "2rem 1rem" }}>
        <div className="event-banner-box">
          <div>
            {label ? (
              <p className="event-banner-label">
                {label}
              </p>
            ) : null}
            {title ? <h2 className="event-banner-title">{title}</h2> : null}
            {(date || location) && (
              <p className="event-banner-meta">
                {date ?? ""}{date && location ? " - " : ""}{location ?? ""}
              </p>
            )}
          </div>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="btn btn-pill"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
