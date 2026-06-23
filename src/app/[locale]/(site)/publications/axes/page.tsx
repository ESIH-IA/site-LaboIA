import type { Metadata } from "next";
import Link from "next/link";

import PortableTextRenderer from "@/components/content/portable-text";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery, researchAxisListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, ResearchAxisListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";
import { researchAxes } from "@/data/research-axes";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "publications-axes", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/publications/axes", locale),
    alternates: {
      fr: localizedPath("/publications/axes", "fr"),
      en: localizedPath("/publications/axes", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "publications-axes", locale },
    null,
  );
  const sanityAxes = await sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []);

  const displayAxes: ResearchAxisListItem[] = sanityAxes.length > 0
    ? sanityAxes
    : researchAxes.map((axis) => ({
        _id: axis.id,
        title: axis.title,
        summary: axis.problematic.length > 220 ? axis.problematic.slice(0, 220) + "…" : axis.problematic,
        slug: { current: axis.id },
      }));

  return (
    <section className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "48rem" }}>
        <h1 className="section-title">{page?.title ?? "Publications par axe de recherche"}</h1>
        {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
      </div>
      {page?.content && (
        <div style={{ marginTop: "1.5rem" }}>
          <PortableTextRenderer value={page.content} />
        </div>
      )}

      <div className="card-grid card-grid-2" style={{ marginTop: "2rem" }}>
        {displayAxes.map((axis) => (
          <Link
            key={axis._id}
            href={`/publications/axes/${axis.slug.current}`}
            className="simple-card"
          >
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0f172a" }}>{axis.title}</h2>
            {axis.summary ? (
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#334155" }}>{axis.summary}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
