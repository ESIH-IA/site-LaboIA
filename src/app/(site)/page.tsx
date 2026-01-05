import Hero from "@/components/home/hero";
import Intro from "@/components/home/intro";
import EventBanner from "@/components/home/event-banner";
import Kpis from "@/components/home/kpis";
import Highlights from "@/components/home/highlights";
import FeaturedProjects from "@/components/home/featured-projects";
import PublicationsPreview from "@/components/home/publications-preview";
import Partners from "@/components/home/partners";
import CollaborateCta from "@/components/home/collaborate-cta";

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
