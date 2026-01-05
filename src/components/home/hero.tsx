import Image from "next/image";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-16">
      {/* FOND IA (animé, décoratif) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-hero-float">
          <Image
            src="/images/ai-network-bg.webp"
            alt="Fond intelligence artificielle et réseaux neuronaux"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
        {/* Voile pour calmer le fond */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      {/* CONTENU AU-DESSUS */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* BANNER OFFICIEL — ratio strict */}
        <div
          className="relative mx-auto w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-lg"
          style={{ aspectRatio: "894 / 160" }}
        >
          <Image
            src={site.assets.banner.src}
            alt={site.assets.banner.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>
    </section>
  );
}
