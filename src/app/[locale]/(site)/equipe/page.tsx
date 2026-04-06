import type { Metadata } from "next";

import { MembersGrid } from "@/components/governance/members-grid";
import { GovernanceChartPremium } from "@/components/governance/GovernanceChartPremium";
import type { PortableTextBlock } from "@portabletext/types";
import PortableTextRenderer from "@/components/content/portable-text";
import { getGovernancePageData } from "@/lib/cms";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import type { Person as SanityPerson } from "@/lib/sanity/types";
import type { Person as LocalPerson } from "@/data/governance/types";
import { urlForImage } from "@/lib/sanity/image";

export const dynamic = "force-dynamic";

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function toLocalPerson(person: SanityPerson): LocalPerson {
  const photoUrl = person.photo ? urlForImage(person.photo).width(200).height(200).fit("crop").url() : undefined;
  const roleCategory =
    person.roleCategory === "direction" ||
    person.roleCategory === "gouvernance" ||
    person.roleCategory === "recherche" ||
    person.roleCategory === "conseil"
      ? (person.roleCategory as LocalPerson["roleCategory"])
      : person.governanceGroup === "comite_scientifique"
        ? "conseil"
        : person.governanceGroup === "direction"
          ? "direction"
          : person.governanceGroup === "gouvernance"
            ? "gouvernance"
            : "gouvernance";

  return {
    id: person._id,
    name: person.name,
    initials: initialsFromName(person.name),
    slug: person.slug?.current ?? person._id,
    photo: photoUrl,
    roleTitle: person.roleTitle ?? "",
    roleCategory,
    shortBio: person.shortBio ?? undefined,
    longBio: person.longBio ?? "",
    affiliation: person.affiliation ?? undefined,
    expertise: person.expertise ?? [],
    links: person.links ?? {},
    contribution: person.contribution ?? undefined,
    status: "actif",
    order: person.order,
  };
}

function localToSanityPerson(person: LocalPerson): SanityPerson {
  return {
    _id: person.id,
    name: person.name,
    roleTitle: person.roleTitle,
    roleCategory: person.roleCategory,
    shortBio: person.shortBio,
    longBio: person.longBio,
    affiliation: person.affiliation,
    expertise: person.expertise,
    links: person.links,
    contribution: person.contribution,
    order: person.order,
  };
}

function toPlainText(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) return undefined;
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => ("text" in child ? child.text : "")).join("");
    })
    .filter(Boolean)
    .join("\n");
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "Équipe & Gouvernance",
    description:
      "Découvrez la structure hiérarchique du laboratoire LaCDIA, ses membres clés et leur expertise en intelligence artificielle, data science et agronomie appliquées au développement d'Haïti.",
    path: "/equipe",
  });
}

export default async function EquipePage() {
  const locale = await getServerLocale();
  const governance = await getGovernancePageData(locale);

  if (governance.mode === "local") {
    const data = governance.data;
    return (
      <main style={{position:'relative', minHeight:'100vh', overflow:'hidden'}}>
        <section className="page-hero page-hero-dark" style={{paddingTop:'7rem', paddingBottom:'9rem'}}>
          <div className="section-pattern grid-pattern pattern-40" />
          <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
          <div
            className="animate-glow" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(20,184,166,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
          />

          <div className="container" style={{position:'relative', zIndex:10, maxWidth:'64rem', textAlign:'center'}}>
            <div className="glass-card" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'2rem'}}>
              <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
              <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
                Intelligence Artificielle - Recherche - Innovation
              </span>
            </div>

            <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, color:'#fff', marginBottom:'2rem', letterSpacing:'-0.01em'}}>
              {data.title}
            </h1>

            {data.intro ? (
              <p style={{fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', maxWidth:'48rem', margin:'0 auto', lineHeight:1.7}}>
                {data.intro}
              </p>
            ) : null}

            <div style={{marginTop:'3rem', display:'flex', justifyContent:'center', gap:'0.75rem'}}>
              <div style={{height:'0.25rem', width:'5rem', borderRadius:'9999px', background:'linear-gradient(to right, transparent, #22d3ee, transparent)', opacity:0.6}} />
              <div style={{height:'0.25rem', width:'5rem', borderRadius:'9999px', background:'linear-gradient(to right, transparent, #2dd4bf, transparent)', opacity:0.8}} />
              <div style={{height:'0.25rem', width:'5rem', borderRadius:'9999px', background:'linear-gradient(to right, transparent, #22d3ee, transparent)', opacity:0.6}} />
            </div>
          </div>
        </section>

        <section className="section section-white" style={{position:'relative'}} aria-labelledby="governance-section">
          <div className="container" style={{maxWidth:'80rem'}}>
            <div className="section-header-centered" style={{marginBottom:'4rem'}}>
              <h2
                id="governance-section"
                className="section-title" style={{marginBottom:'1.5rem'}}
              >
                {data.orgChart.sectionTitle}
              </h2>
              {data.orgChart.sectionIntro ? (
                <p className="section-subtitle">
                  {data.orgChart.sectionIntro}
                </p>
              ) : null}
            </div>

            <GovernanceChartPremium
              topPerson={data.orgChart.topPerson}
              scientificDirectors={data.orgChart.scientificDirectors}
              associateResearchers={data.orgChart.associateResearchers}
            />
          </div>
        </section>

        <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
          <div className="section-pattern dot-pattern pattern-10" />
          <div className="container" style={{position:'relative', maxWidth:'80rem'}}>
            <MembersGrid
              title={data.members.sectionTitle}
              intro={data.members.sectionIntro}
              members={data.members.people.map(localToSanityPerson)}
            />
          </div>
        </section>
      </main>
    );
  }

  const page = governance.page;
  const chart = governance.chart;
  const members = governance.members;
  const membersIntro = toPlainText(page.membersSectionIntro);

  const topPerson = chart?.topPerson ? toLocalPerson(chart.topPerson) : null;
  const scientificDirectors = chart?.scientificDirectors ? chart.scientificDirectors.map(toLocalPerson) : [];
  const associates = chart?.associateResearchers ? chart.associateResearchers.map(toLocalPerson) : [];

  return (
    <main style={{position:'relative', minHeight:'100vh', overflow:'hidden'}}>
      <section className="page-hero page-hero-dark" style={{paddingTop:'7rem', paddingBottom:'9rem'}}>
        <div className="section-pattern grid-pattern pattern-40" />
        <div className="animate-glow" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
        <div
          className="animate-glow" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(20,184,166,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
        />

        <div className="container" style={{position:'relative', zIndex:10, maxWidth:'64rem', textAlign:'center'}}>
          <div className="glass-card" style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'2rem'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              Intelligence Artificielle - Recherche - Innovation
            </span>
          </div>

          <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, color:'#fff', marginBottom:'2rem', letterSpacing:'-0.01em'}}>
            {page.title}
          </h1>

          {page.intro ? (
            <div style={{fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', maxWidth:'48rem', margin:'0 auto', lineHeight:1.7}}>
              <PortableTextRenderer value={page.intro} />
            </div>
          ) : null}

          <div style={{marginTop:'3rem', display:'flex', justifyContent:'center', gap:'0.75rem'}}>
            <div style={{height:'0.25rem', width:'5rem', borderRadius:'9999px', background:'linear-gradient(to right, transparent, #22d3ee, transparent)', opacity:0.6}} />
            <div style={{height:'0.25rem', width:'5rem', borderRadius:'9999px', background:'linear-gradient(to right, transparent, #2dd4bf, transparent)', opacity:0.8}} />
            <div style={{height:'0.25rem', width:'5rem', borderRadius:'9999px', background:'linear-gradient(to right, transparent, #22d3ee, transparent)', opacity:0.6}} />
          </div>
        </div>
      </section>

      {page.showOrgChart && topPerson && scientificDirectors.length === 2 ? (
        <section className="section section-white" style={{position:'relative'}} aria-labelledby="governance-section">
          <div className="container" style={{maxWidth:'80rem'}}>
            <div className="section-header-centered" style={{marginBottom:'4rem'}}>
              <h2
                id="governance-section"
                className="section-title" style={{marginBottom:'1.5rem'}}
              >
                {page.orgChartSectionTitle ?? chart?.orgSectionTitle}
              </h2>
              {page.orgChartSectionIntro ? (
                <div className="section-subtitle">
                  <PortableTextRenderer value={page.orgChartSectionIntro} />
                </div>
              ) : null}
            </div>

            <GovernanceChartPremium
              topPerson={topPerson}
              scientificDirectors={scientificDirectors as [LocalPerson, LocalPerson]}
              associateResearchers={associates}
            />
          </div>
        </section>
      ) : null}

      {page.showMembers ? (
        <section className="section section-light" style={{position:'relative', overflow:'hidden'}}>
          <div className="section-pattern dot-pattern pattern-10" />
          <div className="container" style={{position:'relative', maxWidth:'80rem'}}>
            <MembersGrid
              title={page.membersSectionTitle ?? "Membres & Profils"}
              intro={membersIntro}
              members={members}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
