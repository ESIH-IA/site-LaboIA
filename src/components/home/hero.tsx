import Link from "next/link";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            {site.shortName}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
            {site.name}
          </h1>
          <p className="mt-5 text-base text-white/75 md:text-lg">
            Nous concevons des solutions en intelligence artificielle et science des
            données pour l’agriculture, les services publics, la santé, l’environnement
            et l’innovation en Haïti et à l’international.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projets"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
            >
              Découvrir nos projets
            </Link>
            <Link
              href="/collaborer"
              className="rounded-xl border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:border-white/70"
            >
              Collaborer avec nous
            </Link>
            <Link
              href="/publications"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              Voir nos publications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
