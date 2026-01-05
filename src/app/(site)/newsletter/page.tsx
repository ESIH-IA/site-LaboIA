import type { Metadata } from "next";

import PortableTextRenderer from "@/components/content/portable-text";
import NewsletterForm from "@/components/forms/newsletter-form";
import NewsletterUnsubscribeForm from "@/components/forms/newsletter-unsubscribe-form";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "newsletter", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/newsletter", locale),
    alternates: {
      fr: localizedPath("/newsletter", "fr"),
      en: localizedPath("/newsletter", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "newsletter", locale },
    null,
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>

      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Inscription</h2>
          <NewsletterForm />
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Gerer mon abonnement</h2>
          <NewsletterUnsubscribeForm />
        </div>
      </div>
    </section>
  );
}
