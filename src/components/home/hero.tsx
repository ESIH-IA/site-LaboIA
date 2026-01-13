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
    <section className="relative overflow-hidden gradient-mesh-bg py-20 md:py-28">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Background image avec animation subtile */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/ai-network-bg.webp"
          alt="Fond intelligence artificielle et r\u00e9seaux neuronaux"
          fill
          priority
          className="object-cover animate-float"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Badge tech au-dessus du titre */}
        <div className="mb-8 flex justify-center">
          <div className="glass-card rounded-full px-6 py-2.5">
            <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
              {badge ?? "Intelligence Artificielle - Recherche - Innovation"}
            </span>
          </div>
        </div>

        {/* Banner principal avec effet glassmorphism */}
        <div className="mx-auto w-full overflow-hidden rounded-3xl glass-card banner-fused shadow-2xl shadow-cyan-500/20 transition-smooth hover:shadow-glow-cyan">
          <Banner className="rounded-3xl" banner={banner} />
        </div>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href={primary?.href ?? "/solutions"}
            className="group relative overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-cyan-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <span className="relative z-10">{primary?.label ?? "D\u00e9couvrir nos solutions"}</span>
            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href={secondary?.href ?? "/equipe"}
            className="rounded-xl border-2 border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/20"
          >
            {secondary?.label ?? "Rencontrer l'\u00e9quipe"}
          </Link>
        </div>
      </div>

      {/* Gradient fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
    </section>
  );
}
