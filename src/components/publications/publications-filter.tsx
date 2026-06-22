import Link from "next/link";

import type { PublicationListItem } from "@/lib/sanity/types";

type AxisOption = { _id: string; title: string };
type PartnerOption = { _id: string; name: string };

type Props = {
  publications: PublicationListItem[];
  axes: AxisOption[];
  partners: PartnerOption[];
};

export default function PublicationsFilter({ publications }: Props) {
  if (publications.length === 0) return null;

  return (
    <div className="pub-filter-results">
      {publications.map((publication) => (
        <Link
          key={publication._id}
          href={`/publications/${publication.slug.current}`}
          className="pub-filter-card"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div className="pub-filter-card-meta">
            {publication.publicationType ? <span className="badge badge-accent">{publication.publicationType}</span> : null}
            {publication.date ? <span>{publication.date}</span> : null}
          </div>
          <h2 className="pub-filter-card-title">{publication.title}</h2>
          {publication.summary ? <p className="pub-filter-card-summary">{publication.summary}</p> : null}
          {publication.doi ? <span className="pub-filter-doi">{publication.doi}</span> : null}
        </Link>
      ))}
    </div>
  );
}
