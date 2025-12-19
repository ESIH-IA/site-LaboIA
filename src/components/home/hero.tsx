import Link from "next/link";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            {site.shortName}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
            {site.name}
          </h1>
          <p className="mt-5 text-base text-white/75 md:text-lg">
            Nous concevons des solutions en intelligence artificielle et science des données
            pour l’agriculture, les services publics, la santé, l’environnement et
            l’innovation en Haïti et à l’international.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projets"
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
            >
              Découvrir nos projets
            </Link>
            <Link
              href="/collaborer"
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white transition hover:border-white/70"
            >
              Collaborer avec nous
            </Link>
            <Link
              href="/publications"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              Voir nos publications
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Points clés
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              IA frugale et responsable
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Données ouvertes & partenariats publics
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Formation des talents et mentorat
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
