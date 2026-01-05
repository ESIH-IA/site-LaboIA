import type { Metadata } from "next";
import PortableTextRenderer from "@/components/content/portable-text";
import ContactForm from "@/components/forms/contact-form";
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
    { slug: "contact", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/contact", locale),
    alternates: {
      fr: localizedPath("/contact", "fr"),
      en: localizedPath("/contact", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "contact", locale },
    null,
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>

      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <ContactForm />
    </section>
  );
}
