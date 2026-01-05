import Link from "next/link";

import { hero } from "@/content/home";
import { site } from "@/content/site";

const actionStyles = {
  primary:
    "rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800",
  secondary:
    "rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-500",
  tertiary:
    "rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-900 hover:border-neutral-400",
} as const;

export default function Intro() {
  return (
    <section className="relative bg-white">
      {/* Transition douce depuis le Hero sombre */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-neutral-950 to-white" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          {site.shortName}
        </p>

        <h2 className="mt-3 max-w-4xl text-2xl font-semibold text-neutral-900 md:text-3xl">
          {hero.description ?? site.description}
        </h2>

        {/* Texte éditorial court (sans chiffres, recherche + business) */}
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600">
          Nous menons des travaux de recherche appliquée et fondamentale, et nous
          accompagnons également des partenaires et des clients dans la conception de solutions
          basées sur l’intelligence artificielle, la science des données et les systèmes intelligents.
        </p>

        {hero.actions?.length ? (
          <div className="mt-7 flex flex-wrap gap-3">
            {hero.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={actionStyles[action.variant]}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
