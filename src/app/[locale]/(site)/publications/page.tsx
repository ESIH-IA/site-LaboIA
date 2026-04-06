import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableTextRenderer from "@/components/content/portable-text";
import PublicationsFilter from "@/components/publications/publications-filter";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import {
  institutionalPageBySlugQuery,
  partnerListQuery,
  publicationListQuery,
  researchAxisListQuery,
} from "@/lib/sanity/queries";
import type {
  InstitutionalPage,
  PartnerListItem,
  PublicationListItem,
  ResearchAxisListItem,
} from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "publications", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/publications", locale),
    alternates: {
      fr: localizedPath("/publications", "fr"),
      en: localizedPath("/publications", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "publications", locale },
    null,
  );
  const publications = await sanityFetch<PublicationListItem[]>(publicationListQuery, { locale }, []);
  const axes = await sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []);
  const partners = await sanityFetch<PartnerListItem[]>(partnerListQuery, { locale }, []);
  const hasPageContent = Boolean(page?.title || page?.summary || page?.content?.length);
  const isReady = hasPageContent && publications.length > 0;

  if (!isReady) {
    notFound();
  }

  return (
    <section className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div style={{maxWidth:'48rem'}}>
        {page?.title ? <h1 className="section-title">{page.title}</h1> : null}
        {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
        <div style={{marginTop:'1rem'}}>
          <Link
            href="/publications/axes"
            className="btn-link"
          >
            Explorer les publications par axe
          </Link>
        </div>
      </div>
      <div style={{marginTop:'1.5rem'}}>
        <PortableTextRenderer value={page?.content} />
      </div>

      <PublicationsFilter publications={publications} axes={axes} partners={partners} />
    </section>
  );
}
