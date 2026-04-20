import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";

import { TeamPageView } from "@/components/governance/TeamPageView";
import type { GovernanceProfile, GovernanceProfileCategory } from "@/components/governance/types";
import PortableTextRenderer from "@/components/content/portable-text";
import { evensEmmanuel } from "@/data/governance/people";
import type { Person as LocalPerson } from "@/data/governance/types";
import { getGovernancePageData } from "@/lib/cms";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import { urlForImage } from "@/lib/sanity/image";
import type { Person as SanityPerson } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";

function getCategoryFromSanity(person: SanityPerson): GovernanceProfileCategory {
  if (
    person.roleCategory === "direction" ||
    person.roleCategory === "gouvernance" ||
    person.roleCategory === "recherche" ||
    person.roleCategory === "conseil"
  ) {
    return person.roleCategory;
  }

  if (person.governanceGroup === "comite_scientifique") return "conseil";
  if (person.governanceGroup === "direction") return "direction";
  if (person.governanceGroup === "gouvernance") return "gouvernance";
  if (person.teamGroup === "research") return "recherche";
  return "gouvernance";
}

function toProfileFromSanity(person: SanityPerson): GovernanceProfile {
  const photoUrl = person.photo ? urlForImage(person.photo).width(480).height(480).fit("crop").url() : undefined;

  return {
    id: person._id,
    slug: person.slug?.current,
    name: person.name,
    photoUrl,
    roleTitle: person.roleTitle ?? "",
    category: getCategoryFromSanity(person),
    shortBio: person.shortBio ?? undefined,
    longBio: person.longBio ?? undefined,
    affiliation: person.affiliation ?? undefined,
    expertise: person.expertise ?? [],
    links: person.links ?? {},
    contribution: person.contribution ?? undefined,
    order: person.order,
    status: "actif",
  };
}

function toProfileFromLocal(person: LocalPerson): GovernanceProfile {
  return {
    id: person.id,
    slug: person.slug,
    name: person.name,
    photoUrl: person.photo,
    roleTitle: person.roleTitle,
    category: person.roleCategory,
    shortBio: person.shortBio,
    longBio: person.longBio,
    affiliation: person.affiliation,
    expertise: person.expertise,
    links: person.links,
    contribution: person.contribution,
    order: person.order,
    status: person.status,
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

function mergeProfiles(base: GovernanceProfile[], supplemental: GovernanceProfile[]) {
  const profiles = new Map<string, GovernanceProfile>();

  for (const person of base) profiles.set(person.id, person);
  for (const person of supplemental) {
    if (!profiles.has(person.id)) profiles.set(person.id, person);
  }

  return [...profiles.values()];
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "Équipe et Gouvernance",
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
      <TeamPageView
        locale={locale}
        title={data.title}
        intro={data.intro ? <p>{data.intro}</p> : undefined}
        leadershipTitle={data.orgChart.sectionTitle}
        leadershipIntro={data.orgChart.sectionIntro ? <p>{data.orgChart.sectionIntro}</p> : undefined}
        directoryTitle={data.members.sectionTitle}
        directoryIntro={data.members.sectionIntro}
        topPerson={toProfileFromLocal(data.orgChart.topPerson)}
        scientificDirectors={data.orgChart.scientificDirectors.map(toProfileFromLocal)}
        associateResearchers={data.orgChart.associateResearchers.map(toProfileFromLocal)}
        members={data.members.people.map(toProfileFromLocal)}
      />
    );
  }

  const page = governance.page;
  const chart = governance.chart;
  const members = governance.members;
  const membersIntro = toPlainText(page.membersSectionIntro);
  const evensProfile = toProfileFromLocal(evensEmmanuel);
  const scientificMembers = mergeProfiles(
    page.showMembers ? members.map(toProfileFromSanity) : [],
    [evensProfile],
  );
  const associateResearchers = mergeProfiles(
    page.showOrgChart && chart?.associateResearchers ? chart.associateResearchers.map(toProfileFromSanity) : [],
    [evensProfile],
  );

  return (
    <TeamPageView
      locale={locale}
      title={page.title}
      intro={page.intro ? <PortableTextRenderer value={page.intro} /> : undefined}
      leadershipTitle={page.orgChartSectionTitle ?? chart?.orgSectionTitle ?? (locale === "en" ? "Leadership" : "Pilotage")}
      leadershipIntro={page.orgChartSectionIntro ? <PortableTextRenderer value={page.orgChartSectionIntro} /> : undefined}
      directoryTitle={page.membersSectionTitle ?? (locale === "en" ? "Profiles" : "Profils")}
      directoryIntro={membersIntro}
      topPerson={page.showOrgChart && chart?.topPerson ? toProfileFromSanity(chart.topPerson) : null}
      scientificDirectors={
        page.showOrgChart && chart?.scientificDirectors ? chart.scientificDirectors.map(toProfileFromSanity) : []
      }
      associateResearchers={associateResearchers}
      members={scientificMembers}
    />
  );
}
