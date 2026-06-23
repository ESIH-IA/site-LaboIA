import { sanityFetch } from "@/lib/sanity/client";
import { institutionalPageBySlugQuery, searchQuery } from "@/lib/sanity/queries";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n";
import type { InstitutionalPage } from "@/lib/sanity/types";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";

interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  summary?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche-explorer", locale },
    null,
  );

  return await buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/recherche/explorer", locale),
    alternates: {
      fr: localizedPath("/recherche/explorer", "fr"),
      en: localizedPath("/recherche/explorer", "en"),
    },
  });
}

function getSearchCopy(page: InstitutionalPage | null) {
  const formSection = page?.sections?.find((section) => section.layout === "form");
  const filterCards = formSection?.cards ?? [];
  const filters = filterCards
    .filter((card) => card.title && card.href !== undefined)
    .map((card) => ({ label: card.title as string, value: card.href ?? "" }));

  return {
    placeholder: filterCards.find((card) => card.label)?.label,
    emptyText: filterCards.find((card) => card.description)?.description,
    submitLabel: formSection?.actions?.[0]?.label,
    filters,
  };
}

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getServerLocale();
  const resolvedSearchParams = await searchParams;
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "recherche-explorer", locale },
    null,
  );
  const copy = getSearchCopy(page);
  const query = resolvedSearchParams?.q?.toString().trim() || "";
  const type = resolvedSearchParams?.type?.toString().trim() || null;
  const term = query ? `${query}*` : null;

  const effectiveCopy = {
    placeholder: copy.placeholder ?? "Rechercher…",
    emptyText: copy.emptyText ?? "Aucun résultat pour cette recherche.",
    submitLabel: copy.submitLabel ?? "Rechercher",
    filters: copy.filters.length > 0
      ? copy.filters
      : [
          { label: "Tous les types", value: "" },
          { label: "Publications", value: "publication" },
          { label: "Projets", value: "project" },
          { label: "Membres", value: "member" },
        ],
  };

  const results = term
    ? await sanityFetch<SearchResult[]>(searchQuery, { term, type, locale }, [])
    : [];

  return (
    <section className="container" style={{ maxWidth: "64rem", paddingTop: "3rem", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "48rem" }}>
        <h1 className="section-title">{page?.title ?? "Explorer le laboratoire"}</h1>
        {page?.summary ? <p className="section-subtitle">{page.summary}</p> : null}
      </div>

      <form style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }} method="get">
        <input
          type="search"
          name="q"
          placeholder={effectiveCopy.placeholder}
          defaultValue={query}
          className="form-input-light"
          style={{ width: "100%", maxWidth: "20rem" }}
        />
        <select name="type" defaultValue={type ?? ""} className="form-select">
          {effectiveCopy.filters.map((filter) => (
            <option key={filter.value || "all"} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-small btn-small-primary">
          {effectiveCopy.submitLabel}
        </button>
      </form>

      {query && results.length === 0 ? (
        <div className="empty-state" style={{ marginTop: "2rem" }}>
          {effectiveCopy.emptyText}
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="card-grid" style={{marginTop:'2rem', gap:'1rem'}}>
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
                className="simple-card"
              >
                <div style={{fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--muted)'}}>{item._type}</div>
                <a
                  href={href}
                  className="btn-link" style={{marginTop:'0.5rem', fontSize:'1.125rem'}}
                >
                  {item.title}
                </a>
                {item.summary ? <p style={{marginTop:'0.5rem', fontSize:'0.875rem', color:'#334155'}}>{item.summary}</p> : null}
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
