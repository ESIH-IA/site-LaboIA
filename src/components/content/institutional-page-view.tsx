import { Link } from "@/i18n/navigation";
import PortableTextRenderer from "@/components/content/portable-text";
import type { InstitutionalPage } from "@/lib/sanity/types";

type Props = {
  page: InstitutionalPage | null;
  fallbackTitle?: string;
  fallbackBadge?: string;
  fallbackSummary?: string;
  children?: React.ReactNode;
};

export default function InstitutionalPageView({
  page,
  fallbackTitle,
  fallbackBadge,
  fallbackSummary,
  children,
}: Props) {
  const title = page?.title ?? fallbackTitle ?? "";
  const badge = page?.heroBadge ?? fallbackBadge;
  const summary = page?.summary ?? fallbackSummary;
  const content = page?.content;
  const ctaLabel = page?.ctaLabel;
  const ctaHref = page?.ctaHref;

  return (
    <main>
      <section className="page-hero page-hero-dark">
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="container" style={{ position: "relative" }}>
          {badge ? (
            <div className="hero-badge" style={{ display: "inline-flex", marginBottom: "1.75rem" }}>
              <span className="hero-badge-text">{badge}</span>
            </div>
          ) : null}

          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              marginBottom: summary ? "1.25rem" : 0,
              maxWidth: "22ch",
            }}
          >
            {title}
          </h1>

          {summary ? (
            <p
              className="animate-fade-in-up"
              style={{
                maxWidth: "48rem",
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                lineHeight: 1.75,
                animationDelay: "120ms",
              }}
            >
              {summary}
            </p>
          ) : null}
        </div>
      </section>

      {content && content.length > 0 ? (
        <section className="section section-white">
          <div className="container" style={{ maxWidth: "56rem" }}>
            <PortableTextRenderer value={content} />
          </div>
        </section>
      ) : null}

      {children}

      {ctaLabel && ctaHref ? (
        <section className="section section-light">
          <div className="container" style={{ textAlign: "center", maxWidth: "48rem" }}>
            <Link href={ctaHref} className="btn btn-cta-primary">
              {ctaLabel}
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
