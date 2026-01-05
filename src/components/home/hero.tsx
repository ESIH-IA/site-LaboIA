import Image from "next/image";

import { Banner } from "@/components/media/banner";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-footer py-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-hero-float">
          <Image
            src="/images/ai-network-bg.webp"
            alt="Fond intelligence artificielle et réseaux neuronaux"
            fill
            priority
            className="object-cover opacity-50 saturate-75"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-footer/70 to-footer" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(15,118,110,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(91,33,182,0.14),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <Banner className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
