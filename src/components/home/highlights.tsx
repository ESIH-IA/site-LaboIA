import { getTranslations } from "next-intl/server";

type HighlightItem = {
  title: string;
  description: string;
};

type HighlightsProps = {
  title?: string;
  intro?: string;
  items?: HighlightItem[];
};

export default async function Highlights({ title, intro, items }: HighlightsProps) {
  const t = await getTranslations("home");

  const fallbackItems: HighlightItem[] = [
    {
      title: t("highlightsItems.agriculture.title"),
      description: t("highlightsItems.agriculture.description"),
    },
    {
      title: t("highlightsItems.govern.title"),
      description: t("highlightsItems.govern.description"),
    },
    {
      title: t("highlightsItems.health.title"),
      description: t("highlightsItems.health.description"),
    },
  ];

  const list = items?.length ? items : fallbackItems;

  return (
    <section className="highlights section">
      {/* Subtle background pattern */}
      <div className="section-pattern dot-pattern pattern-30" />

      <div className="section-inner" style={{ position: "relative", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="section-header">
          <h2 className="section-title">
            {title ?? t("highlightsTitle")}
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            {intro ?? t("highlightsIntro")}
          </p>
        </div>
        <div className="card-grid card-grid-3" style={{ marginTop: "3rem" }}>
          {list.map((item, index) => (
            <article
              key={item.title}
              className="highlights-card card-hover"
            >
              {/* Top accent gradient */}
              <div className="card-accent-top" />

              {/* Number badge */}
              <div className="highlights-number">
                <span>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
