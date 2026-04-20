import Link from "next/link";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("home");

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
            <h2 className="event-banner-title">
              {title ?? t("eventLabel")}
            </h2>
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
