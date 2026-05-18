import Link from "next/link";
import type { Metadata } from "next";

import EditablePageView from "@/components/content/editable-page-view";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery, researchAxisListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, ResearchAxisListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche", locale },
    null,
  );

  return buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/recherche", locale),
    alternates: {
      fr: localizedPath("/recherche", "fr"),
      en: localizedPath("/recherche", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const [page, axes] = await Promise.all([
    sanityFetch<InstitutionalPage | null>(institutionalPageBySlugQuery, { slug: "recherche", locale }, null),
    sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []),
  ]);

  return (
    <EditablePageView page={page}>
      {axes.length > 0 ? (
        <section className="section section-white">
          <div className="container">
            <div className="card-grid card-grid-3">
              {axes.map((axis) => (
                <Link
                  key={axis._id}
                  href={`/recherche/axes/${axis.slug.current}`}
                  className="card card-hover gradient-card-bg"
                  style={{ padding: "2rem", color: "inherit", textDecoration: "none" }}
                >
                  <div className="card-accent-top" />
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0f172a", marginBottom: "0.5rem" }}>
                    {axis.title}
                  </h2>
                  {axis.summary ? (
                    <p style={{ fontSize: "0.875rem", color: "#475569" }}>{axis.summary}</p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </EditablePageView>
  );
}
