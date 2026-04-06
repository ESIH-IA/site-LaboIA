import Image from "next/image";
import Link from "next/link";

import { Banner } from "@/components/media/banner";
import type { SiteAsset } from "@/lib/sanity/types";

type HeroAction = {
  label: string;
  href: string;
  variant?: string;
};

type HeroProps = {
  badge?: string;
  actions?: HeroAction[];
  banner?: SiteAsset | null;
};

export default function Hero({ badge, actions, banner }: HeroProps) {
  const primary = actions?.find((action) => action.variant === "primary") ?? actions?.[0];
  const secondary = actions?.find((action) => action.variant === "secondary") ?? actions?.[1];

  return (
    <section className="hero">
      {/* Grid pattern overlay */}
      <div className="hero-grid-overlay" />

      {/* Background image avec animation subtile */}
      <div className="hero-bg-image">
        <Image
          src="/images/ai-network-bg.webp"
          alt="Fond intelligence artificielle et réseaux neuronaux"
          fill
          priority
          className="animate-float"
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </div>

      <div className="hero-content">
        {/* Badge tech au-dessus du titre */}
        <div className="hero-badge-wrapper">
          <div className="hero-badge">
            <span className="hero-badge-text">
              {badge ?? "Intelligence Artificielle - Recherche - Innovation"}
            </span>
          </div>
        </div>

        {/* Banner principal avec effet glassmorphism */}
        <div className="hero-banner">
          <Banner banner={banner} />
        </div>

        {/* CTA buttons */}
        <div className="hero-cta">
          <Link
            href={primary?.href ?? "/solutions"}
            className="btn btn-primary"
          >
            <span className="btn-primary-overlay" />
            <span style={{ position: "relative", zIndex: 10 }}>{primary?.label ?? "Découvrir nos solutions"}</span>
          </Link>
          <Link
            href={secondary?.href ?? "/equipe"}
            className="btn btn-secondary"
          >
            {secondary?.label ?? "Rencontrer l'équipe"}
          </Link>
        </div>
      </div>

      {/* Gradient fade bottom */}
      <div className="hero-fade-bottom" />
    </section>
  );
}
