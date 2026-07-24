import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: false },
      { source: "/actualites", destination: "/fr", permanent: false },
      { source: "/fr/actualites", destination: "/fr", permanent: false },
      { source: "/en/actualites", destination: "/en", permanent: false },
      // Equipe : page temporairement masquee le temps de consolider le
      // contenu (fiches, organigramme...). Ne redirige que l'index —
      // /equipe/[slug] reste accessible pour les liens d'attribution
      // (publications, projets, evenements, formations). Retirer ces 3
      // lignes pour republier la page une fois le contenu pret.
      { source: "/equipe", destination: "/fr", permanent: false },
      { source: "/fr/equipe", destination: "/fr", permanent: false },
      { source: "/en/equipe", destination: "/en", permanent: false },
    ];
  },
  transpilePackages: ["sanity", "@sanity/ui", "@sanity/icons"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
