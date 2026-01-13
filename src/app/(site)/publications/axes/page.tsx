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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "publications-axes", locale },
    null,
  );

  return buildMetadata({
    title: page?.title ?? "Publications par axe",
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
  const axes = await sanityFetch<ResearchAxisListItem[]>(researchAxisListQuery, { locale }, []);
  const hasPageContent = Boolean(page?.title || page?.summary || page?.content?.length);
  const isReady = hasPageContent && axes.length > 0;

  if (!isReady) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {axes.map((axis) => (
          <article
            key={axis._id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{axis.title}</h2>
            {axis.summary ? <p className="mt-2 text-sm text-neutral-700">{axis.summary}</p> : null}
            <Link
              href={`/publications/axes/${axis.slug.current}`}
              className="mt-3 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
            >
              Voir les publications
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
