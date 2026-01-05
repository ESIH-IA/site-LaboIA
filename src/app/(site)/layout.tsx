import type { ReactNode } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import CookieBanner from "@/components/layout/cookie-banner";
import AnalyticsScripts from "@/components/layout/analytics-scripts";
import WebVitalsReporter from "@/components/layout/web-vitals";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
      <AnalyticsScripts />
      <WebVitalsReporter />
    </div>
  );
}
