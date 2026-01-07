import { redirect } from "next/navigation";

import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";

export default async function Page() {
  const locale = await getServerLocale();
  redirect(`${localizedPath("/innovation", locale)}#projets`);
}

