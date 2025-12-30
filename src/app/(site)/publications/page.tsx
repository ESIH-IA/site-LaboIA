import Link from "next/link";
import { articles } from "@/content/articles";

export default function Page() {
  const publications = [...articles]
    .filter((article) => article.category === "Publication")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Publications</h1>
        <p className="mt-3 text-neutral-600">
          Articles, rapports, thèses et ressources scientifiques du laboratoire.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        {publications.map((publication) => (
          <article
            key={publication.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                {publication.category}
              </span>
              <span>{publication.date}</span>
              <span aria-hidden="true">•</span>
              <span>{publication.authorName}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-neutral-900">{publication.title}</h2>
            <p className="mt-2 text-sm text-neutral-700">{publication.summary}</p>
            {publication.sourceUrl ? (
              <Link
                href={publication.sourceUrl}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
              >
                Lire la publication
                <span aria-hidden>↗</span>
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
