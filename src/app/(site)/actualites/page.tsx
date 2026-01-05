import Link from "next/link";

import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { eventListQuery, institutionalPageBySlugQuery, newsListQuery } from "@/lib/sanity/queries";
import type { EventListItem, InstitutionalPage, NewsListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "actualites", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/actualites", locale),
    alternates: {
      fr: localizedPath("/actualites", "fr"),
      en: localizedPath("/actualites", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "actualites", locale },
    null,
  );
  const news = await sanityFetch<NewsListItem[]>(newsListQuery, { locale }, []);
  const events = await sanityFetch<EventListItem[]>(eventListQuery, { locale }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-neutral-900">Actualites</h2>
        {news.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6">
            {news.map((item) => (
              <article
                key={item._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
                  {item.category ? (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                      {item.category}
                    </span>
                  ) : null}
                  {item.date ? <span>{item.date}</span> : null}
                </div>
                <h2 className="mt-3 text-xl font-semibold text-neutral-900">{item.title}</h2>
                {item.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{item.summary}</p>
                ) : null}
                <Link
                  href={`/actualites/${item.slug.current}`}
                  className="mt-4 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
                >
                  Lire l{"'"}article
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Evenements academiques</h2>
        {events.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <article
                key={event._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
                  {event.eventType ? (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                      {event.eventType}
                    </span>
                  ) : null}
                  {event.startDate ? <span>{event.startDate}</span> : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">{event.title}</h3>
                {event.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{event.summary}</p>
                ) : null}
                <Link
                  href={`/actualites/evenements/${event.slug.current}`}
                  className="mt-4 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
                >
                  Voir l{"'"}evenement
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
