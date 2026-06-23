import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return await buildMetadata({
    locale,
    title: locale === "en" ? "Collaboration" : "Collaboration",
    path: localizedPath("/collaborer", locale),
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  redirect(`/${locale}/contact?tab=collaborate`);
}
