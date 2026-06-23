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

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "formation", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
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
  const hasOffers = offers.length > 0;
  const hasPrograms = programs.length > 0;

  return (
    <section className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <h1 className="section-title">{page?.title ?? "Formation & opportunités"}</h1>
      {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
      {page?.content && (
        <div style={{ marginTop: "1.5rem" }}>
          <PortableTextRenderer value={page.content} />
        </div>
      )}

      {hasOffers ? (
        <div style={{marginTop:'3rem'}}>
          <div className="card-grid card-grid-2" style={{marginTop:'1.5rem', gap:'1rem'}}>
            {offers.map((offer) => (
              <article
                key={offer._id}
                className="simple-card"
              >
                <div className="simple-card-meta">
                  {offer.offerType ? (
                    <span className="tag-small">
                      {offer.offerType}
                    </span>
                  ) : null}
                  {offer.openDate ? <span>{offer.openDate}</span> : null}
                </div>
                <h3 style={{marginTop:'0.75rem', fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>{offer.title}</h3>
                {offer.summary ? (
                  <p style={{marginTop:'0.5rem', fontSize:'0.875rem', color:'#334155'}}>{offer.summary}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {hasPrograms ? (
        <div style={{ marginTop: "3rem" }}>
          <div className="card-grid card-grid-2" style={{ marginTop: "1.5rem", gap: "1rem" }}>
            {programs.map((program) => (
              <article key={program._id} className="simple-card">
                <div className="simple-card-meta">
                  {program.programType ? <span className="tag-small">{program.programType}</span> : null}
                  {program.startDate ? <span>{program.startDate}</span> : null}
                </div>
                <h3 style={{ marginTop: "0.75rem", fontSize: "1.125rem", fontWeight: 600, color: "#0f172a" }}>{program.title}</h3>
                {program.summary ? (
                  <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#334155" }}>{program.summary}</p>
                ) : null}
                <Link href={`/formation/programmes/${program.slug.current}`} className="btn-link" style={{ marginTop: "0.75rem" }}>
                  {program.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {!hasOffers && !hasPrograms && (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-[#8892b0]" style={{ marginTop: "3rem" }}>
          Aucune offre ou programme disponible pour le moment. Revenez bientôt.
        </div>
      )}
    </section>
  );
}
