import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

import { getSiteSettings } from "@/lib/cms";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteUrlObject } from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
