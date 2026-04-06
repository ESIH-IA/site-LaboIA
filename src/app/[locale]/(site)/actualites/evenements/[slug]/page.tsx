import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { eventBySlugQuery, eventListQuery } from "@/lib/sanity/queries";
import type { EventListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

type EventDetail = {
  _id: string;
  title: string;
  eventType?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  summary?: string;
  content?: PortableTextBlock[];
  registrationUrl?: string;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  speakers?: Array<{ _id: string; fullName: string; role?: string; slug?: { current: string } }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const event = await sanityFetch<EventDetail | null>(
    eventBySlugQuery,
    { slug, locale },
    null,
  );

  const frSlug = event?.slugIntl?.fr?.current ?? slug;
  const enSlug = event?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: event?.title,
    description: event?.summary,
    path: localizedPath(`/actualites/evenements/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/actualites/evenements/${frSlug}`, "fr"),
      en: localizedPath(`/actualites/evenements/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const event = await sanityFetch<EventDetail | null>(
    eventBySlugQuery,
    { slug, locale },
    null,
  );

  if (!event) {
    notFound();
  }

  return (
    <article className="container" style={{maxWidth:'56rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <Link
        href="/actualites"
        className="btn-link"
      >
        Retour aux actualités
      </Link>

      <div className="simple-card-meta" style={{marginTop:'1rem'}}>
        {event.eventType ? (
          <span className="tag-small">
            {event.eventType}
          </span>
        ) : null}
        {event.startDate ? <span>{event.startDate}</span> : null}
        {event.location ? <span>{event.location}</span> : null}
      </div>

      <h1 className="section-title" style={{marginTop:'1rem'}}>{event.title}</h1>
      {event.summary ? <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{event.summary}</p> : null}

      <div style={{marginTop:'2rem'}}>
        <PortableTextRenderer value={event.content} />
      </div>

      {event.speakers?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Intervenants</h2>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {event.speakers.map((speaker) => (
              <li key={speaker._id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem'}}>
                {speaker.slug?.current ? (
                  <Link
                    href={`/equipe/${speaker.slug.current}`}
                    className="btn-link"
                  >
                    {speaker.fullName}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{speaker.fullName}</span>
                )}
                {speaker.role ? (
                  <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--muted)'}}>{speaker.role}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {event.registrationUrl ? (
        <div style={{marginTop:'2rem'}}>
          <Link
            href={event.registrationUrl}
            className="btn-link"
            target="_blank"
            rel="noreferrer"
          >
            S{"'"}inscrire
          </Link>
        </div>
      ) : null}
    </article>
  );
}

