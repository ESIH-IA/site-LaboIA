import type { Metadata } from "next";

import PortableTextRenderer from "@/components/content/portable-text";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "confidentialite", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/confidentialite", locale),
    alternates: {
      fr: localizedPath("/confidentialite", "fr"),
      en: localizedPath("/confidentialite", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "confidentialite", locale },
    null,
  );

  return (
    <section className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div style={{maxWidth:'48rem'}}>
        {page?.title ? <h1 className="section-title">{page.title}</h1> : null}
        {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
      </div>
      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={page?.content} />
      </div>
    </section>
  );
}
