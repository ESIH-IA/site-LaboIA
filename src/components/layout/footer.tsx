import Link from "next/link";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-neutral-950">
            {site.shortName}
          </div>
          <div className="mt-1 text-sm text-neutral-600">{site.name}</div>
          <p className="mt-3 text-xs text-neutral-500">
            Langues disponibles : français, anglais, espagnol, créole haïtien.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-neutral-700">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
