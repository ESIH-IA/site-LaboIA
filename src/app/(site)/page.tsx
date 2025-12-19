import CollaborateCta from "@/components/home/collaborate-cta";
import EventBanner from "@/components/home/event-banner";
import FeaturedProjects from "@/components/home/featured-projects";
import Hero from "@/components/home/hero";
import Highlights from "@/components/home/highlights";
import Kpis from "@/components/home/kpis";
import Partners from "@/components/home/partners";
import PublicationsPreview from "@/components/home/publications-preview";

export default function Home() {
  return (
    <>
      <Hero />
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
