import type { Metadata } from "next";
import Link from "next/link";

import PortableTextRenderer from "@/components/content/portable-text";
import { ProjectCard } from "@/components/cards/cards";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import {
  institutionalPageBySlugQuery,
  partnerListQuery,
  projectListQuery,
} from "@/lib/sanity/queries";
import type { InstitutionalPage, PartnerListItem, ProjectListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "innovation", locale },
    null,
  );

  return buildMetadata({
    title: page?.title,
    description: page?.summary,
    path: localizedPath("/innovation", locale),
    alternates: {
      fr: localizedPath("/innovation", "fr"),
      en: localizedPath("/innovation", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "innovation", locale },
    null,
  );
  const projects = await sanityFetch<ProjectListItem[]>(projectListQuery, { locale }, []);
  const partners = await sanityFetch<PartnerListItem[]>(partnerListQuery, { locale }, []);

  const appliedProjects = projects.filter(
    (project) => project.projectType === "applied" || project.projectType === "hybrid",
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {page?.title ? <h1 className="text-3xl font-semibold">{page.title}</h1> : null}
      {page?.summary ? <p className="mt-3 text-neutral-600">{page.summary}</p> : null}
      <div className="mt-6">
        <PortableTextRenderer value={page?.content} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Projets appliques</h2>
        {appliedProjects.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {appliedProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Partenaires institutionnels</h2>
        {partners.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
            Contenu en cours de publication.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {partners.map((partner) => (
              <article
                key={partner._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-base font-semibold text-neutral-900">{partner.name}</div>
                  {partner.partnerType ? (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-600">
                      {partner.partnerType}
                    </span>
                  ) : null}
                </div>
                {partner.shortDescription ? (
                  <p className="mt-2 text-sm text-neutral-600">{partner.shortDescription}</p>
                ) : null}
                {partner.website ? (
                  <Link
                    href={partner.website}
                    className="mt-3 inline-flex text-sm font-semibold text-neutral-900 underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le site
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
