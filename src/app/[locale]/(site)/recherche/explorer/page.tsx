import { sanityFetch } from "@/lib/sanity/client";
import { searchQuery } from "@/lib/sanity/queries";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  summary?: string;
}

export const metadata = {
  title: "Recherche scientifique — Explorer",
  description: "Interrogez les publications, projets et membres du LaCDIA.",
};

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getServerLocale();
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.toString().trim() || "";
  const type = resolvedSearchParams?.type?.toString().trim() || null;
  const term = query ? `${query}*` : null;

  const results = term
    ? await sanityFetch<SearchResult[]>(searchQuery, { term, type, locale }, [])
    : [];

  return (
    <section className="container" style={{maxWidth:'64rem', paddingTop:'3rem', paddingBottom:'3rem'}}>
      <div style={{maxWidth:'48rem'}}>
        <h1 className="section-title">Recherche scientifique</h1>
        <p className="section-subtitle">
          Interrogez les publications, projets et membres du laboratoire.
        </p>
      </div>

      <form style={{marginTop:'1.5rem', display:'flex', flexWrap:'wrap', gap:'0.75rem'}} method="get">
        <input
          type="search"
          name="q"
          placeholder="Mot-clé, auteur, projet..."
          defaultValue={query}
          className="form-input-light" style={{width:'100%', maxWidth:'20rem'}}
        />
        <select
          name="type"
          defaultValue={type ?? ""}
          className="form-select"
        >
          <option value="">Tous les contenus</option>
          <option value="publication">Publications</option>
          <option value="project">Projets</option>
          <option value="member">Membres</option>
        </select>
        <button
          type="submit"
          className="btn btn-small btn-small-primary"
        >
          Rechercher
        </button>
      </form>

      {query && results.length === 0 ? (
        <div className="empty-state" style={{marginTop:'2rem'}}>
          Aucun résultat pour votre recherche.
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
