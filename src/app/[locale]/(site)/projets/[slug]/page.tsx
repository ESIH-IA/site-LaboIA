import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextRenderer from "@/components/content/portable-text";
import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { projectBySlugQuery, projectListQuery } from "@/lib/sanity/queries";
import type { ProjectListItem } from "@/lib/sanity/types";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

type ProjectDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  projectType?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  objectives?: PortableTextBlock[];
  methods?: PortableTextBlock[];
  results?: PortableTextBlock[];
  members?: Array<{ _id: string; fullName: string; role?: string; slug?: { current: string } }>;
  partners?: Array<{ _id: string; name: string; partnerType?: string; slug?: { current: string } }>;
  publications?: Array<{ _id: string; title: string; slug?: { current: string } }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const project = await sanityFetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug, locale },
    null,
  );

  const frSlug = project?.slugIntl?.fr?.current ?? slug;
  const enSlug = project?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: project?.title,
    description: project?.summary,
    path: localizedPath(`/projets/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/projets/${frSlug}`, "fr"),
      en: localizedPath(`/projets/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const project = await sanityFetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug, locale },
    null,
  );

  if (!project) {
    notFound();
  }

  return (
    <article className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div className="simple-card-meta">
        {project.projectType ? (
          <span className="badge badge-primary">
            {project.projectType}
          </span>
        ) : null}
        {project.startDate ? <span>Start {project.startDate}</span> : null}
      </div>

      <h1 className="section-title" style={{marginTop:'1rem'}}>{project.title}</h1>
      {project.summary ? <p className="section-subtitle" style={{fontSize:'1.125rem'}}>{project.summary}</p> : null}

      {(project.objectives || project.methods || project.results) && (
        <div className="simple-card" style={{marginTop:'2rem', gap:'2rem'}}>
          {project.objectives ? (
            <div>
              <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Objectifs</h2>
              <div style={{marginTop:'0.75rem'}}>
                <PortableTextRenderer value={project.objectives} />
              </div>
            </div>
          ) : null}
          {project.methods ? (
            <div>
              <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Méthodes</h2>
              <div style={{marginTop:'0.75rem'}}>
                <PortableTextRenderer value={project.methods} />
              </div>
            </div>
          ) : null}
          {project.results ? (
            <div>
              <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Résultats</h2>
              <div style={{marginTop:'0.75rem'}}>
                <PortableTextRenderer value={project.results} />
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div className="card-grid card-grid-2" style={{marginTop:'2.5rem'}}>
        <div className="simple-card">
          <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Partners</h2>
          {!project.partners?.length ? (
            <p className="simple-card-text" style={{marginTop:'0.5rem'}}>Contenu en cours de publication.</p>
          ) : (
            <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
              {project.partners.map((partner) => (
                <li key={partner._id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem'}}>
                  <span style={{fontWeight:500}}>{partner.name}</span>
                  {partner.partnerType ? (
                    <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--muted)'}}>{partner.partnerType}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="simple-card">
          <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Équipe impliquée</h2>
          {!project.members?.length ? (
            <p className="simple-card-text" style={{marginTop:'0.5rem'}}>Contenu en cours de publication.</p>
          ) : (
            <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
              {project.members.map((member) => (
                <li key={member._id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem'}}>
                  {member.slug?.current ? (
                    <Link
                      href={`/equipe/${member.slug.current}`}
                      className="btn-link"
                    >
                      {member.fullName}
                    </Link>
                  ) : (
                    <span style={{fontWeight:500}}>{member.fullName}</span>
                  )}
                  {member.role ? (
                    <span style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--muted)'}}>{member.role}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {project.publications?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <h2 style={{fontSize:'1.125rem', fontWeight:600, color:'#0f172a'}}>Publications liées</h2>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.875rem', color:'#1e293b'}}>
            {project.publications.map((publication) => (
              <li key={publication._id}>
                {publication.slug?.current ? (
                  <Link
                    href={`/publications/${publication.slug.current}`}
                    className="btn-link"
                  >
                    {publication.title}
                  </Link>
                ) : (
                  <span style={{fontWeight:500}}>{publication.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

