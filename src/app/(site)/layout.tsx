import type { ReactNode } from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import CookieBanner from "@/components/layout/cookie-banner";
import AnalyticsScripts from "@/components/layout/analytics-scripts";
import WebVitalsReporter from "@/components/layout/web-vitals";
import { getNavigation, getSiteSettings } from "@/lib/cms";
import { getServerLocale } from "@/lib/i18n-server";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const locale = await getServerLocale();
  const [site, nav] = await Promise.all([getSiteSettings(locale), getNavigation(locale)]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header nav={nav} site={site} />
      <main className="flex-1">{children}</main>
      <Footer nav={nav} site={site} />
      <CookieBanner />
      <AnalyticsScripts />
      <WebVitalsReporter />
    </div>
  );
}
