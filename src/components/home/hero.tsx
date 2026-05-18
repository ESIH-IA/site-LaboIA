import Image from "next/image";

import type { SiteAsset } from "@/lib/sanity/types";

type HeroProps = {
  banner?: SiteAsset | null;
};

export default async function Hero({ banner }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-grid-overlay" />

      {banner?.url ? (
        <div className="hero-bg-image">
          <Image
            src={banner.url}
            alt={banner.alt ?? ""}
            fill
            priority
            className="animate-float"
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        </div>
      ) : null}

      <div className="hero-fade-bottom" />
    </section>
  );
}
