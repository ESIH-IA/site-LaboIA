import type { Metadata } from "next";
import "./globals.css";

import { getSiteSettings } from "@/lib/cms";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteUrlObject } from "@/lib/site-url";

/* ──────────────────────────────────────────
   Polices : utilisation de CSS @font-face avec
   Google Fonts via <link> dans le head.
   Cela découple le chargement des polices du
   build Next.js et fonctionne offline + online.

   Pour Vercel/Netlify : remplacer par next/font/google
   si souhaité pour l'optimisation automatique.
   ────────────────────────────────────────── */
const fontVars = "--font-inter --font-geist-mono";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const site = await getSiteSettings(locale);
  const banner = site.banner;
  const bannerImage = banner?.url
    ? [
        {
          url: banner.url,
          width: banner.width,
          height: banner.height,
          alt: banner.alt ?? site.name,
        },
      ]
    : undefined;

  return {
    metadataBase: getSiteUrlObject(),
    title: {
      default: site.name,
      template: `%s | ${site.shortName}`,
    },
    description: site.description,
    openGraph: {
      type: "website",
      title: site.name,
      description: site.description,
      siteName: site.shortName,
      images: bannerImage,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
      images: banner?.url ? [banner.url] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
