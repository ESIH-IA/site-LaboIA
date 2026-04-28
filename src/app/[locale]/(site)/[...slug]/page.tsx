import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { genericPageBySlugQuery } from '@/lib/sanity/queries';
import { PageBuilder } from '@/components/page-builder';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slugStr = resolvedParams.slug.join('/');

  const page = await sanityFetch<any>(
    genericPageBySlugQuery,
    { slug: slugStr, locale },
    null
  );

  if (!page) return {};

  return {
    title: page.title,
    description: page.slug,
  };
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const slugStr = resolvedParams.slug.join('/');
  
  // Intercept predefined routes or Next.js reserved chunks 
  // It's a catch-all, but we don't want it taking over /studio or other API routes
  if (resolvedParams.slug[0] === 'studio' || resolvedParams.slug[0] === 'api') {
    notFound();
  }

  const page = await sanityFetch<any>(
    genericPageBySlugQuery,
    { slug: slugStr, locale },
    null
  );

  if (!page) {
    notFound();
  }

  return (
    <main className="flex-1 w-full mt-24 mb-32 flex flex-col items-center">
      {/* 
        The top-level container has no global padding so sections can break out if needed,
        but the PageBuilder enforces containment internally. 
      */}
      <PageBuilder blocks={page.blocks} locale={locale} />
    </main>
  );
}