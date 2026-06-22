import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
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
    { slug: "axes-recherche", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/recherche/axes", locale),
    alternates: {
      fr: localizedPath("/recherche/axes", "fr"),
      en: localizedPath("/recherche/axes", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "axes-recherche", locale },
    null,
  );
  const axes = await sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []);
  const hasPageContent = Boolean(page?.title || page?.summary || page?.content?.length);
  const isReady = hasPageContent && axes.length > 0;

  if (!isReady) {
    notFound();
  }

  return (
    <section className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div style={{maxWidth:'48rem'}}>
        {page?.title ? <h1 className="section-title">{page.title}</h1> : null}
        {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
      </div>
      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="card-grid card-grid-2" style={{marginTop:'2rem'}}>
        {axes.map((axis) => (
          <article
            key={axis._id}
            className="simple-card"
          >
            <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>{axis.title}</h2>
            {axis.summary ? <p style={{marginTop:'0.5rem', fontSize:'0.875rem', color:'#334155'}}>{axis.summary}</p> : null}
            <Link
              href={`/recherche/axes/${axis.slug.current}`}
              className="btn-link" style={{marginTop:'0.75rem'}}
            >
              Explorer l{"'"}axe
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
