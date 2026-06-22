import Link from "next/link";

type NewsCardItem = {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  category?: string;
  summary?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
  sourceUrl?: string;
};

type Props = {
  item: NewsCardItem;
};

export default function NewsCard({ item }: Props) {
  const href = item.sourceUrl ?? `/actualites/${item.slug.current}`;
  const isExternal = Boolean(item.sourceUrl);
  const typeAttr = item.category?.toLowerCase().includes("partenariat")
    ? "partenariat"
    : item.category?.toLowerCase().includes("soutenance")
      ? "soutenance"
      : undefined;

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="news-card-dark"
      data-type={typeAttr}
      style={{ display: "flex" }}
    >
      <div className="news-card-meta-row">
        {item.category && (
          <span className="badge-news">{item.category}</span>
        )}
        {item.date && (
          <span className="news-card-date">{item.date}</span>
        )}
      </div>

      <h3 className="news-card-title-dark">{item.title}</h3>

      {item.summary && (
        <p className="news-card-excerpt">{item.summary}</p>
      )}

      <div className="news-card-footer-row">
        <span className="news-card-arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
