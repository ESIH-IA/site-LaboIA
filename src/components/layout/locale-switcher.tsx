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

// EN version hidden until translations are ready — reactivate by restoring the full locales.map loop
export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname);
  void basePath;

  return (
    <div
      className="hidden items-center gap-2 text-xs lg:flex"
      style={{ color: "rgba(136,146,176,0.7)", fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.12em" }}
    >
      <span style={{ fontWeight: 600, color: "rgba(0,212,170,0.8)" }}>FR</span>
    </div>
  );
}
