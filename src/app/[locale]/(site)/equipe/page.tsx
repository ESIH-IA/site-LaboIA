import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";

import { TeamPageView } from "@/components/governance/TeamPageView";
import type { GovernanceProfile, GovernanceProfileCategory } from "@/components/governance/types";
import PortableTextRenderer from "@/components/content/portable-text";
import { getGovernancePageData } from "@/lib/cms";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import { urlForImage } from "@/lib/sanity/image";
import type { Person as SanityPerson } from "@/lib/sanity/types";
import { getGovernanceData } from "@/data/governance";
import type { Person as LocalPerson } from "@/data/governance/types";

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
  const governance = await getGovernancePageData(locale);
  const page = governance.page;

  return await buildMetadata({
    locale,
    title: page?.title,
    path: "/equipe",
  });
}

function toProfileFromLocal(person: LocalPerson): GovernanceProfile {
  return {
    id: person.id,
    slug: person.slug,
    name: person.name,
    photoUrl: person.photo ?? undefined,
    roleTitle: person.roleTitle,
    category: person.roleCategory as GovernanceProfileCategory,
    shortBio: person.shortBio ?? undefined,
    longBio: person.longBio ?? undefined,
    affiliation: person.affiliation ?? undefined,
    expertise: person.expertise ?? [],
    links: person.links ?? {},
    contribution: person.contribution ?? undefined,
    order: person.order,
    status: person.status,
  };
}

export default function EquipePage() {
  return notFound();
}
