import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { memberBySlugQuery } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

type MemberDetail = {
  _id: string;
  fullName: string;
  role?: string;
  affiliation?: string;
  bio?: string;
  expertise?: string[];
  links?: Array<{ label?: string; url?: string }>;
  slugIntl?: { fr?: { current: string }; en?: { current: string } };
  projects?: Array<{ _id: string; title: string; slug?: { current: string }; summary?: string }>;
  publications?: Array<{ _id: string; title: string; slug?: { current: string }; date?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const member = await sanityFetch<MemberDetail | null>(
    memberBySlugQuery,
    { slug, locale },
    null,
  );

  const frSlug = member?.slugIntl?.fr?.current ?? slug;
  const enSlug = member?.slugIntl?.en?.current ?? slug;

  return await buildMetadata({
    locale,
    title: member?.fullName,
    description: member?.bio,
    path: localizedPath(`/equipe/${slug}`, locale),
    alternates: {
      fr: localizedPath(`/equipe/${frSlug}`, "fr"),
      en: localizedPath(`/equipe/${enSlug}`, "en"),
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const member = await sanityFetch<MemberDetail | null>(
    memberBySlugQuery,
    { slug, locale },
    null,
  );

  if (!member) {
    notFound();
  }

  return (
    <section className="container" style={{maxWidth:'56rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <h1 className="section-title">{member.fullName}</h1>
      {member.role ? <p style={{marginTop:'0.5rem', fontSize:'0.875rem', fontWeight:600, color:'var(--muted)'}}>{member.role}</p> : null}
      {member.affiliation ? (
        <p style={{marginTop:'0.25rem', fontSize:'0.875rem', color:'var(--muted)'}}>{member.affiliation}</p>
      ) : null}

      {member.bio ? <p style={{marginTop:'1.5rem', color:'#334155'}}>{member.bio}</p> : null}

      {member.expertise?.length ? (
        <div style={{marginTop:'2rem'}}>
          <div style={{marginTop:'0.75rem', display:'flex', flexWrap:'wrap', gap:'0.5rem', fontSize:'0.875rem', color:'#334155'}}>
            {member.expertise.map((item) => (
              <span key={item} className="tag-expertise">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {member.links?.length ? (
        <div style={{marginTop:'2rem'}}>
          <ul style={{marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            {member.links.map((link, index) => (
              <li key={`${link.url ?? "link"}-${index}`}>
                {link.url ? (
                  <Link
                    href={link.url}
                    className="btn-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label ?? link.url}
                  </Link>
                ) : (
                  <span>{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {member.projects?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <div className="card-grid card-grid-2" style={{marginTop:'1rem'}}>
            {member.projects.map((project) => (
              <Link
                key={project._id}
                href={`/projets/${project.slug?.current ?? ""}`}
                className="simple-card"
              >
                <div className="simple-card-title" style={{fontSize:'0.875rem'}}>{project.title}</div>
                {project.summary ? (
                  <div className="simple-card-text" style={{marginTop:'0.5rem'}}>{project.summary}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {member.publications?.length ? (
        <div style={{marginTop:'2.5rem'}}>
          <div className="card-grid" style={{marginTop:'1rem'}}>
            {member.publications.map((publication) => (
              <Link
                key={publication._id}
                href={`/publications/${publication.slug?.current ?? ""}`}
                className="simple-card"
              >
                <div className="simple-card-title" style={{fontSize:'0.875rem'}}>{publication.title}</div>
                {publication.date ? (
                  <div className="simple-card-text" style={{marginTop:'0.5rem'}}>{publication.date}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
