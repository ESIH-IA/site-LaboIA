import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // Le site est volontairement reduit a 4 pages : Accueil, Solutions,
    // Actualites (integree a la home), Contact. Tout le reste a ete retire
    // du code (pas seulement masque) — voir git log pour retrouver ces
    // pages si elles doivent revenir plus tard. Ces redirections couvrent
    // les liens externes/marque-pages/anciens resultats de recherche et
    // tout contenu CMS pas encore resynchronise avec le nouveau perimetre.
    const removedTrees = [
      "equipe",
      "a-propos",
      "recherche",
      "lacdia-tech",
      "formation",
      "projets",
      "publications",
      "ressources",
      "newsletter",
    ];

    const homeRedirects = removedTrees.flatMap((tree) => [
      { source: `/${tree}`, destination: "/fr", permanent: false },
      { source: `/${tree}/:path*`, destination: "/fr", permanent: false },
      { source: `/fr/${tree}`, destination: "/fr", permanent: false },
      { source: `/fr/${tree}/:path*`, destination: "/fr", permanent: false },
      { source: `/en/${tree}`, destination: "/en", permanent: false },
      { source: `/en/${tree}/:path*`, destination: "/en", permanent: false },
    ]);

    return [
      { source: "/", destination: "/fr", permanent: false },
      // Actualites : listing uniquement — /actualites/[slug] et
      // /actualites/evenements/[slug] restent des pages actives, donc
      // pas de wildcard ici (contrairement aux autres arborescences).
      { source: "/actualites", destination: "/fr", permanent: false },
      { source: "/fr/actualites", destination: "/fr", permanent: false },
      { source: "/en/actualites", destination: "/en", permanent: false },
      ...homeRedirects,
      // Collaborer : plus de page dediee, tout passe par l'onglet
      // "Proposer une collaboration" sur /contact.
      { source: "/collaborer", destination: "/fr/contact?tab=collaborate", permanent: false },
      { source: "/collaborer/:path*", destination: "/fr/contact?tab=collaborate", permanent: false },
      { source: "/fr/collaborer", destination: "/fr/contact?tab=collaborate", permanent: false },
      { source: "/fr/collaborer/:path*", destination: "/fr/contact?tab=collaborate", permanent: false },
      { source: "/en/collaborer", destination: "/en/contact?tab=collaborate", permanent: false },
      { source: "/en/collaborer/:path*", destination: "/en/contact?tab=collaborate", permanent: false },
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
