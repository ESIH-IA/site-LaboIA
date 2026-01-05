import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get("lacdia_locale")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;
  return defaultLocale;
}
