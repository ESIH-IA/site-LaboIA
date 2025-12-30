import Link from "next/link";
import { articles } from "@/content/articles";

const categoryColors: Record<string, string> = {
  Partenariat: "bg-indigo-100 text-indigo-800",
  Publication: "bg-emerald-100 text-emerald-800",
  Projet: "bg-amber-100 text-amber-800",
  Soutenance: "bg-blue-100 text-blue-800",
  Actualité: "bg-neutral-100 text-neutral-800",
};

export default function Page() {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Actualités & événements</h1>
        <p className="mt-3 text-neutral-600">
          Séminaires, partenariats, publications et annonces clés du laboratoire.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        {sortedArticles.map((article) => (
          <article
            key={article.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  categoryColors[article.category] ?? "bg-neutral-100 text-neutral-800"
                }`}
              >
                {article.category}
              </span>
              <span>{article.date}</span>
              <span aria-hidden="true">•</span>
              <span>{article.authorName}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-neutral-900">{article.title}</h2>
            <p className="mt-2 text-sm text-neutral-700">{article.summary}</p>
            {article.sourceUrl ? (
              <Link
                href={article.sourceUrl}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Lire la source
                <span aria-hidden>↗</span>
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
