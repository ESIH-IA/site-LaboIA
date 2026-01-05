"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";

function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname);

  return (
    <div className="hidden items-center gap-2 text-xs text-neutral-500 lg:flex">
      {locales.map((locale, index) => {
        const href = `/${locale}${basePath}`;
        const label = locale.toUpperCase();

        return (
          <div key={locale} className="flex items-center gap-2">
            <Link href={href} className="font-medium text-neutral-900">
              {label}
            </Link>
            {index < locales.length - 1 ? <span aria-hidden="true">|</span> : null}
          </div>
        );
      })}
    </div>
  );
}
