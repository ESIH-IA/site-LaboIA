import type { Metadata } from "next";
import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery, resourceListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, ResourceListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "ressources", locale },
    null,
  );

  return buildMetadata({
    title: page?.title ?? "Ressources scientifiques",
    description: page?.summary,
    path: localizedPath("/ressources", locale),
    alternates: {
      fr: localizedPath("/ressources", "fr"),
      en: localizedPath("/ressources", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "ressources", locale },
    null,
  );
  const resources = await sanityFetch<ResourceListItem[]>(resourceListQuery, { locale }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
        {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      </div>

      <div className="mt-8 grid gap-6">
        {resources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          resources.map((resource) => (
            <article
              key={resource._id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
                {resource.resourceType ? (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700">
                    {resource.resourceType}
                  </span>
                ) : null}
                {resource.date ? <span>{resource.date}</span> : null}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-neutral-900">{resource.title}</h2>
              {resource.summary ? (
                <p className="mt-2 text-sm text-neutral-700">{resource.summary}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-neutral-900">
                {resource.fileUrl ? (
                  <Link
                    href={resource.fileUrl}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telecharger
                  </Link>
                ) : null}
                {resource.url ? (
                  <Link
                    href={resource.url}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lien externe
                  </Link>
                ) : null}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
