import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const hasImage = Boolean(item.mainImageUrl);

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
    >
      <Card className="card-hover">
        <div className={`news-card-layout ${hasImage ? "news-card-layout--with-image" : ""}`}>
          {item.mainImageUrl ? (
            <div className="news-card-image">
              <Image
                src={item.mainImageUrl}
                alt={item.mainImageAlt ?? item.title}
                fill
                sizes="(min-width: 768px) 240px, 100vw"
                style={{ objectFit: "cover", transition: "transform 500ms" }}
              />
              <div className="news-card-image-overlay" />
            </div>
          ) : null}

          <div className="news-card-body">
            <CardHeader className={hasImage ? "card-header--flush" : ""}>
              <div className="news-card-meta">
                {item.category ? <span className="badge badge-news">{item.category}</span> : null}
                {item.date ? <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--muted)" }}>{item.date}</span> : null}
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>

            {item.summary ? (
              <CardContent className={hasImage ? "card-content--flush" : ""}>
                <CardDescription>{item.summary}</CardDescription>
              </CardContent>
            ) : null}
          </div>
        </div>
      </Card>
    </Link>
  );
}
