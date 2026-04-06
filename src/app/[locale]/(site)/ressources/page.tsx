import type { Metadata } from "next";
import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { institutionalPageBySlugQuery, resourceListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, ResourceListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "ressources", locale },
    null,
  );

  return await buildMetadata({
    locale,
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
    <section className="container" style={{paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div style={{maxWidth:'48rem'}}>
        {page?.title ? <h1 className="section-title">{page.title}</h1> : null}
        {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
      </div>

      <div className="card-grid" style={{marginTop:'2rem'}}>
        {resources.length === 0 ? (
          <div className="empty-state">
            Contenu en cours de publication.
          </div>
        ) : (
          resources.map((resource) => (
            <article
              key={resource._id}
              className="simple-card"
            >
              <div className="simple-card-meta">
                {resource.resourceType ? (
                  <span className="tag-small">
                    {resource.resourceType}
                  </span>
                ) : null}
                {resource.date ? <span>{resource.date}</span> : null}
              </div>
              <h2 style={{marginTop:'0.75rem', fontSize:'1.25rem', fontWeight:600, color:'#0f172a'}}>{resource.title}</h2>
              {resource.summary ? (
                <p style={{marginTop:'0.5rem', fontSize:'0.875rem', color:'#334155'}}>{resource.summary}</p>
              ) : null}
              <div style={{marginTop:'1rem', display:'flex', flexWrap:'wrap', gap:'0.75rem', fontSize:'0.875rem', fontWeight:600}}>
                {resource.fileUrl ? (
                  <Link
                    href={resource.fileUrl}
                    className="btn-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Télécharger
                  </Link>
                ) : null}
                {resource.url ? (
                  <Link
                    href={resource.url}
                    className="btn-link"
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
