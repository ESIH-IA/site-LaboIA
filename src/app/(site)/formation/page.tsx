import type { Metadata } from "next";
import Link from "next/link";

import PortableTextRenderer from "@/components/content/portable-text";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import {
  institutionalPageBySlugQuery,
  offerListQuery,
  programListQuery,
} from "@/lib/sanity/queries";
import type { InstitutionalPage, OfferListItem, ProgramListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "formation", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/formation", locale),
    alternates: {
      fr: localizedPath("/formation", "fr"),
      en: localizedPath("/formation", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "formation", locale },
    null,
  );
  const offers = await sanityFetch<OfferListItem[]>(offerListQuery, { locale }, []);
  const programs = await sanityFetch<ProgramListItem[]>(programListQuery, { locale }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
      {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Offres et opportunites</h2>
        {offers.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
                  {offer.offerType ? (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                      {offer.offerType}
                    </span>
                  ) : null}
                  {offer.openDate ? <span>{offer.openDate}</span> : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">{offer.title}</h3>
                {offer.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{offer.summary}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Programmes et ateliers</h2>
        {programs.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <article
                key={program._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
                  {program.programType ? (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                      {program.programType}
                    </span>
                  ) : null}
                  {program.startDate ? <span>{program.startDate}</span> : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">{program.title}</h3>
                {program.summary ? (
                  <p className="mt-2 text-sm text-neutral-700">{program.summary}</p>
                ) : null}
                <Link
                  href={`/formation/programmes/${program.slug.current}`}
                  className="mt-3 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
                >
                  Voir le programme
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
