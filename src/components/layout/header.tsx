import Link from "next/link";
import { mainNav } from "@/content/nav";
import { site } from "@/content/site";

const languages = ["FR", "EN", "ES", "HT"];

export default function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="leading-tight">
          <div className="text-xs uppercase tracking-wide text-neutral-500">
            {site.shortName}
          </div>
          <div className="text-base font-semibold text-neutral-950">
            {site.name}
          </div>
        </Link>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <nav className="flex flex-wrap items-center gap-4 text-sm text-neutral-700">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-neutral-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            {languages.map((language, index) => (
              <span key={language} className={language === "FR" ? "font-semibold text-neutral-900" : ""}>
                {language}
                {index < languages.length - 1 && (
                  <span className="mx-2 text-neutral-300">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
