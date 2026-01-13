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
    title: "Equipe & Gouvernance",
    description:
      "Decouvrez la structure hierarchique du laboratoire LaCDIA, ses membres cles et leur expertise en intelligence artificielle, data science et agronomie appliquees au developpement d'Haiti.",
    path: "/equipe",
  });
}

export default async function EquipePage() {
  const locale = await getServerLocale();
  const governance = await getGovernancePageData(locale);

  if (governance.mode === "local") {
    const data = governance.data;
    return (
      <main className="relative min-h-screen overflow-hidden bg-white">
        <section className="relative overflow-hidden gradient-mesh-bg py-28 md:py-36">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
          <div
            className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-glow"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-8">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
                Intelligence Artificielle - Recherche - Innovation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
              {data.title}
            </h1>

            {data.intro ? (
              <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                {data.intro}
              </p>
            ) : null}

            <div className="mt-12 flex justify-center gap-3">
              <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
              <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-teal-400 to-transparent opacity-80" />
              <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28 bg-white" aria-labelledby="governance-section">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="governance-section"
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
              >
                {data.orgChart.sectionTitle}
              </h2>
              {data.orgChart.sectionIntro ? (
                <p className="text-base text-slate-600 leading-relaxed">
                  {data.orgChart.sectionIntro}
                </p>
              ) : null}
            </div>

            <GovernanceChartPremium
              topPerson={data.orgChart.topPerson}
              coFounders={data.orgChart.coFounders}
              associateResearchers={data.orgChart.associateResearchers}
            />
          </div>
        </section>

        <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4">
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
  const coFounders = chart?.coFounders ? chart.coFounders.map(toLocalPerson) : [];
  const associates = chart?.associateResearchers ? chart.associateResearchers.map(toLocalPerson) : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <section className="relative overflow-hidden gradient-mesh-bg py-28 md:py-36">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-glow" />
        <div
          className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-100">
              Intelligence Artificielle - Recherche - Innovation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            {page.title}
          </h1>

          {page.intro ? (
            <div className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              <PortableTextRenderer value={page.intro} />
            </div>
          ) : null}

          <div className="mt-12 flex justify-center gap-3">
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-teal-400 to-transparent opacity-80" />
            <div className="h-1 w-20 rounded-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
          </div>
        </div>
      </section>

      {page.showOrgChart && topPerson && coFounders.length === 2 ? (
        <section className="relative py-20 md:py-28 bg-white" aria-labelledby="governance-section">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="governance-section"
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6"
              >
                {page.orgChartSectionTitle ?? chart?.orgSectionTitle}
              </h2>
              {page.orgChartSectionIntro ? (
                <div className="text-base text-slate-600 leading-relaxed">
                  <PortableTextRenderer value={page.orgChartSectionIntro} />
                </div>
              ) : null}
            </div>

            <GovernanceChartPremium
              topPerson={topPerson}
              coFounders={coFounders as [LocalPerson, LocalPerson]}
              associateResearchers={associates}
            />
          </div>
        </section>
      ) : null}

      {page.showMembers ? (
        <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4">
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
