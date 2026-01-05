import type { Metadata } from "next";

import { sanityFetch } from "@/lib/sanity/client";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { searchQuery } from "@/lib/sanity/queries";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  searchParams?: { q?: string; type?: string };
};

type SearchResult = {
  _id: string;
  _type: "publication" | "project" | "member";
  title: string;
  slug: { current: string };
  summary?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return buildMetadata({
    title: "Recherche scientifique",
    description: "Recherche plein texte dans les publications, projets et membres du laboratoire.",
    path: localizedPath("/recherche/explorer", locale),
    alternates: {
      fr: localizedPath("/recherche/explorer", "fr"),
      en: localizedPath("/recherche/explorer", "en"),
    },
  });
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getServerLocale();
  const query = searchParams?.q?.toString().trim() ?? "";
  const type = searchParams?.type?.toString().trim() || null;
  const term = query ? `${query}*` : null;

  const results = term
    ? await sanityFetch<SearchResult[]>(searchQuery, { term, type, locale }, [])
    : [];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Recherche scientifique</h1>
        <p className="mt-3 text-neutral-600">
          Interrogez les publications, projets et membres du laboratoire.
        </p>
      </div>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          type="search"
          name="q"
          placeholder="Mot-cle, auteur, projet..."
          defaultValue={query}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 md:w-80"
        />
        <select
          name="type"
          defaultValue={type ?? ""}
          className="rounded-lg border border-neutral-200 px-3 py-2"
        >
          <option value="">Tous les contenus</option>
          <option value="publication">Publications</option>
          <option value="project">Projets</option>
          <option value="member">Membres</option>
        </select>
        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          Rechercher
        </button>
      </form>

      {query && results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
          Aucun resultat pour votre recherche.
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {results.map((item) => {
            const href =
              item._type === "publication"
                ? `/publications/${item.slug.current}`
                : item._type === "project"
                  ? `/projets/${item.slug.current}`
                  : `/equipe/${item.slug.current}`;

            return (
              <article
                key={item._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="text-xs uppercase tracking-wide text-neutral-500">{item._type}</div>
                <a
                  href={href}
                  className="mt-2 inline-flex text-lg font-semibold text-neutral-900 underline underline-offset-4"
                >
                  {item.title}
                </a>
                {item.summary ? <p className="mt-2 text-sm text-neutral-700">{item.summary}</p> : null}
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
