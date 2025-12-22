import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/content/nav";
import { site } from "@/content/site";

export default function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3 leading-tight">
          <Image
            src="/logo-only.svg"
            alt={`${site.shortName} logo`}
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div>
            <div className="text-xs uppercase tracking-wide text-neutral-500">
              {site.shortName}
            </div>
            <div className="text-base font-semibold text-neutral-950">
              {site.name}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-5 text-sm text-neutral-700 md:flex">
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
          <div className="hidden items-center gap-2 text-xs text-neutral-500 lg:flex">
            <span className="font-medium text-neutral-900">FR</span>
            <span aria-hidden="true">|</span>
            <span>EN</span>
            <span aria-hidden="true">|</span>
            <span>ES</span>
            <span aria-hidden="true">|</span>
            <span>HT</span>
          </div>
        </div>
      </div>
    </header>
  );
}
