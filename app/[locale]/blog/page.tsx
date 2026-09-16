import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/pages/ported/KnowledgePage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { BlogList } from "@/components/blog/BlogList";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { FILTER_UI, applyFilter, facets, isDefault, parseFilter } from "@/lib/blog/filter";
import "@/components/blog/blog.scss";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo.server";
import { isLocale, locales } from "@/lib/i18n/config";
import { getKnowledgeContent } from "@/lib/content/ported/index.server";
import { getPublishedPosts } from "@/lib/blog/index.server";
import { jsonLdScript, blogGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/blog";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const base = buildPortedMetadata(locale, PATH);
  // Filtered/sorted views are the same list — keep them out of the index and
  // point them at the clean URL so nothing competes with /blog itself.
  const f = parseFilter(await searchParams);
  return isDefault(f) ? base : { ...base, robots: { index: false, follow: true } };
}

export default async function Page({ params, searchParams }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const filter = parseFilter(await searchParams);
  const [site, content, allPosts] = await Promise.all([
    getSiteContent(locale),
    getKnowledgeContent("blog", locale),
    getPublishedPosts(locale),
  ]);
  const posts = applyFilter(allPosts, filter);
  const ui = FILTER_UI[locale];

  return (
    <PortedFrame site={site} family="knowledge" kind="blog">
      {allPosts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(blogGraph(locale, allPosts)) }}
        />
      )}
      <KnowledgePage kind="blog" content={content} contactHref={`/${locale}/iletisim`}>
        {allPosts.length > 0 ? (
          <div className="blog-listing">
            <BlogFilters filter={filter} facets={facets(allPosts, locale)} total={posts.length} locale={locale} basePath={`/${locale}/blog`} />
            {posts.length > 0 ? (
              <BlogList posts={posts} locale={locale} />
            ) : (
              <div className="bf-empty">
                <h3>{ui.empty}</h3>
                <p>{ui.emptyHint}</p>
                <a href={`/${locale}/blog`}>{ui.clear}</a>
              </div>
            )}
          </div>
        ) : null}
      </KnowledgePage>
    </PortedFrame>
  );
}
