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
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/actualites"
        className="text-sm font-semibold text-neutral-900 underline underline-offset-4"
      >
        Retour aux actualités
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
        {event.eventType ? (
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
            {event.eventType}
          </span>
        ) : null}
        {event.startDate ? <span>{event.startDate}</span> : null}
        {event.location ? <span>{event.location}</span> : null}
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-neutral-900">{event.title}</h1>
      {event.summary ? <p className="mt-3 text-lg text-neutral-700">{event.summary}</p> : null}

      <div className="mt-8">
        <PortableTextRenderer value={event.content} />
      </div>

      {event.speakers?.length ? (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-neutral-900">Intervenants</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-800">
            {event.speakers.map((speaker) => (
              <li key={speaker._id} className="flex items-center justify-between gap-3">
                {speaker.slug?.current ? (
                  <Link
                    href={`/equipe/${speaker.slug.current}`}
                    className="font-medium text-neutral-900 underline underline-offset-4"
                  >
                    {speaker.fullName}
                  </Link>
                ) : (
                  <span className="font-medium">{speaker.fullName}</span>
                )}
                {speaker.role ? (
                  <span className="text-xs uppercase text-neutral-500">{speaker.role}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {event.registrationUrl ? (
        <div className="mt-8">
          <Link
            href={event.registrationUrl}
            className="inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
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

