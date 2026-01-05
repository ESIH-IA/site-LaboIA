import Hero from "@/components/home/hero";
import Intro from "@/components/home/intro";
import EventBanner from "@/components/home/event-banner";
import Kpis from "@/components/home/kpis";
import Highlights from "@/components/home/highlights";
import FeaturedProjects from "@/components/home/featured-projects";
import PublicationsPreview from "@/components/home/publications-preview";
import Partners from "@/components/home/partners";
import CollaborateCta from "@/components/home/collaborate-cta";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildMetadata({
    path: localizedPath("/", locale),
    alternates: {
      fr: localizedPath("/", "fr"),
      en: localizedPath("/", "en"),
    },
  });
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <EventBanner />
      <Kpis />
      <Highlights />
      <FeaturedProjects />
      <PublicationsPreview />
      <Partners />
      <CollaborateCta />
    </>
  );
}
