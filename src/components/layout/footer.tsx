import Link from "next/link";

import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "@/components/media/logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo size="footer" className="h-9 w-auto opacity-95" />
            <div>
              <div className="text-sm font-semibold tracking-tight text-footer-foreground">
                {site.shortName}
              </div>
              <div className="mt-1 text-xs text-slate-300">{site.name}</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-slate-300">{site.description}</p>
          <p className="mt-4 text-xs text-slate-400">Langues : français (défaut), anglais.</p>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Navigation
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-200 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Contact
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div>Collaboration, projets, encadrement.</div>
            <Link href="/contact" className="inline-flex text-slate-200 underline underline-offset-4">
              Écrire au laboratoire
            </Link>
          </div>
        </div>

        <div className="md:col-span-12">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>
              © {new Date().getFullYear()} {site.shortName}. Tous droits réservés.
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/mentions-legales" className="hover:text-slate-200">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-slate-200">
                Confidentialité
              </Link>
              <Link href="/cookies" className="hover:text-slate-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
