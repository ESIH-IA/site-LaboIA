import Link from "next/link";

import { getPeople } from "@/lib/content-loader";

export default function Page() {
  const featuredPeople = getPeople().sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Équipe</h1>
        <p className="mt-3 text-neutral-600">
          Direction, chercheurs, étudiants et partenaires académiques.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPeople.map((member) => (
          <article
            key={member.id}
            className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="text-sm uppercase tracking-wide text-neutral-500">{member.role}</div>
            <Link
              href={`/equipe/${member.slug}`}
              className="text-lg font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              {member.fullName}
            </Link>
            <p className="text-sm text-neutral-700">{member.bio}</p>
            {member.links?.length ? (
              <div className="mt-auto flex flex-col gap-2 text-sm font-semibold text-neutral-900 underline underline-offset-4">
                {member.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                    <span className="ml-1" aria-hidden>
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
