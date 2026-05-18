import type { Metadata } from "next";

import EditablePageView from "@/components/content/editable-page-view";
import NewsCard from "@/components/news/news-card";
import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/client";
import { institutionalPageBySlugQuery, newsListQuery } from "@/lib/sanity/queries";
import type { InstitutionalPage, NewsListItem } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const page = await sanityFetch<InstitutionalPage | null>(
    institutionalPageBySlugQuery,
    { slug: "actualites", locale },
    null,
  );

  return buildMetadata({
    locale,
    title: page?.title,
    description: page?.summary,
    seo: page?.seo,
    path: localizedPath("/actualites", locale),
    alternates: {
      fr: localizedPath("/actualites", "fr"),
      en: localizedPath("/actualites", "en"),
    },
  });
}

export default async function Page() {
  const locale = await getServerLocale();
  const [page, news] = await Promise.all([
    sanityFetch<InstitutionalPage | null>(institutionalPageBySlugQuery, { slug: "actualites", locale }, null),
    sanityFetch<NewsListItem[]>(newsListQuery, { locale }, []),
  ]);

  return (
    <EditablePageView page={page}>
      {news.length > 0 ? (
        <section className="section section-white">
          <div className="container">
            <div className="card-grid">
              {news.map((item) => (
                <NewsCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </EditablePageView>
  );
}
