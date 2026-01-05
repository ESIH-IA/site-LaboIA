import Link from "next/link";

import { mainNav } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "@/components/media/logo";
import LocaleSwitcher from "@/components/layout/locale-switcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 shadow-sm shadow-black/5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link
          href="/"
          title={site.name}
          className="flex items-center gap-3 leading-tight"
        >
          <Logo size="header" className="h-9 w-9" />
          <div className="flex flex-col">
            <div className="text-base font-semibold tracking-tight text-foreground">
              {site.shortName}
            </div>
            <div className="hidden text-xs text-muted md:block">
              Laboratoire de recherche en IA &amp; science des données
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-2 py-1 transition hover:bg-surface-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
