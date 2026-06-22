import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { publicationBySlugQuery } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

type PublicationDetail = {
  _id: string;
  title: string;
  publicationType?: string;
  date?: string;
  summary?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  bibtex?: string;
  externalAuthors?: string;
  authors?: Array<{ _id: string; fullName: string; slug?: { current: string } }>;
  projects?: Array<{ _id: string; title: string; slug?: { current: string } }>;
  axes?: Array<{ _id: string; title: string; slug?: { current: string } }>;
  resources?: Array<{ _id: string; title: string; resourceType?: string; fileUrl?: string; url?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const publication = await sanityFetch<PublicationDetail | null>(
    publicationBySlugQuery,
    { slug, locale },
    null,
  );

  const frSlug = publication?.slugIntl?.fr?.current ?? slug;
  const enSlug = publication?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: publication?.title,
    description: publication?.summary,
    path: localizedPath(`/publications/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/publications/${frSlug}`, "fr"),
      en: localizedPath(`/publications/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const publication = await sanityFetch<PublicationDetail | null>(
    publicationBySlugQuery,
    { slug, locale },
    null,
  );

  if (!publication) {
    notFound();
  }

  return (
    <article className="container" style={{maxWidth:'56rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div className="simple-card-meta">
        {publication.publicationType ? (
          <span className="badge badge-teal">
            {publication.publicationType}
          </span>
        ) : null}
        {publication.date ? <span>{publication.date}</span> : null}
      </div>

      <h1 className="section-title" style={{marginTop:'1rem'}}>{publication.title}</h1>
      {publication.summary ? (
        <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{publication.summary}</p>
      ) : null}

      {publication.authors?.length || publication.externalAuthors ? (
        <div style={{marginTop:'2rem'}}>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {publication.authors?.map((author) => (
              <li key={author._id}>
                {author.slug?.current ? (
                  <Link
                    href={`/equipe/${author.slug.current}`}
                    className="btn-link"
                  >
                    {author.fullName}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{author.fullName}</span>
                )}
              </li>
            ))}
            {publication.externalAuthors ? <li>{publication.externalAuthors}</li> : null}
          </ul>
        </div>
      ) : null}

      {publication.doi || publication.url || publication.pdfUrl ? (
        <div style={{marginTop:'2rem', fontSize:'0.875rem', color:'#1e293b'}}>
          {publication.doi ? <div>{publication.doi}</div> : null}
          {publication.url ? (
            <Link
              href={publication.url}
              className="btn-link"
              target="_blank"
              rel="noreferrer"
            >
              {publication.url}
            </Link>
          ) : null}
          {publication.pdfUrl ? (
            <div style={{marginTop:'0.5rem'}}>
              <Link
                href={publication.pdfUrl}
                className="btn-link"
                target="_blank"
                rel="noreferrer"
              >
                {publication.pdfUrl}
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}

      {publication.projects?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {publication.projects.map((project) => (
              <li key={project._id}>
                {project.slug?.current ? (
                  <Link
                    href={`/projets/${project.slug.current}`}
                    className="btn-link"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{project.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.axes?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {publication.axes.map((axis) => (
              <li key={axis._id}>
                {axis.slug?.current ? (
                  <Link
                    href={`/publications/axes/${axis.slug.current}`}
                    className="btn-link"
                  >
                    {axis.title}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{axis.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.resources?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {publication.resources.map((resource) => (
              <li key={resource._id} style={{display:'flex', flexWrap:'wrap', alignItems:'center', gap:'0.75rem'}}>
                <span style={{fontWeight:500}}>{resource.title}</span>
                {resource.resourceType ? (
                  <span className="tag-small">
                    {resource.resourceType}
                  </span>
                ) : null}
                {resource.fileUrl ? (
                  <Link
                    href={resource.fileUrl}
                    className="btn-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.fileUrl}
                  </Link>
                ) : null}
                {resource.url ? (
                  <Link
                    href={resource.url}
                    className="btn-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.url}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {publication.bibtex ? (
        <div style={{marginTop:'2.5rem'}}>
          <pre style={{marginTop:'0.75rem', overflow:'auto', borderRadius:'0.75rem', border:'1px solid var(--border)', background:'var(--surface-muted)', padding:'1rem', fontSize:'0.75rem', color:'#1e293b'}}>
            {publication.bibtex}
          </pre>
        </div>
      ) : null}
    </article>
  );
}
