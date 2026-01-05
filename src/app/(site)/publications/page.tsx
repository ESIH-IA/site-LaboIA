import type { Metadata } from "next";
import Link from "next/link";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "publications", locale },
    null,
  );

  return buildMetadata({
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

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
        <div className="mt-4">
          <Link
            href="/publications/axes"
            className="text-sm font-semibold text-neutral-900 underline underline-offset-4"
          >
            Explorer les publications par axe
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      {publications.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
          Contenu en cours de publication.
        </div>
      ) : (
        <PublicationsFilter publications={publications} axes={axes} partners={partners} />
      )}
    </section>
  );
}
