import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgePage from "@/components/pages/ported/KnowledgePage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { BlogList } from "@/components/blog/BlogList";
import { BlogFilters } from "@/components/blog/BlogFilters";
import "@/components/blog/blog.scss";
import { getSiteContent } from "@/lib/content/site.server";
import { getPortedMeta } from "@/lib/content/ported/meta";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getKnowledgeContent } from "@/lib/content/ported/index.server";
import { getPublishedPosts } from "@/lib/blog/index.server";
import { FILTER_UI, applyFilter, facets, parseFilter, tagSlug } from "@/lib/blog/filter";
import { SITE_URL, absoluteUrl, ogLocale } from "@/lib/seo";

type Props = PageProps<"/[locale]/blog/etiket/[tag]">;

/** Crawlable topic pages — one per tag that has at least one published post. */
export async function generateStaticParams() {
  const out: { locale: Locale; tag: string }[] = [];
  for (const locale of locales) {
    const posts = await getPublishedPosts(locale);
    const tags = new Set(posts.flatMap((p) => p.tags.map(tagSlug)));
    for (const tag of tags) out.push({ locale, tag });
  }
  return out;
}

async function load(locale: Locale, tag: string) {
  const all = await getPublishedPosts(locale);
  const label = all.flatMap((p) => p.tags).find((t) => tagSlug(t) === tag);
  if (!label) return null;
  return { all, label };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isLocale(locale)) return {};
  const data = await load(locale, tag);
  if (!data) return {};
  const blog = getPortedMeta("/blog", locale).title;
  const title = locale === "tr" ? `${data.label} yazıları` : `Articles on ${data.label}`;
  const description =
    locale === "tr"
      ? `${data.label} hakkında rehber yazılar: ${data.all.filter((p) => p.tags.map(tagSlug).includes(tag)).length} yazı. Kayahan Isı ${blog}.`
      : `Guides on ${data.label}: ${data.all.filter((p) => p.tags.map(tagSlug).includes(tag)).length} articles. Kayahan Isı ${blog}.`;
  const url = `${SITE_URL}/${locale}/blog/etiket/${tag}`;
  const f = parseFilter(await searchParams);
  const extra = f.duration || f.year || f.sort !== "yeni" || f.tags.length > 1;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { [locale]: url, "x-default": absoluteUrl(`/tr/blog/etiket/${tag}`) } },
    ...(extra ? { robots: { index: false, follow: true } } : {}),
    openGraph: { type: "website", locale: ogLocale(locale), url, title, description },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { locale, tag } = await params;
  if (!isLocale(locale)) notFound();
  const data = await load(locale, tag);
  if (!data) notFound();
  const filter = parseFilter(await searchParams);
  const withTag = { ...filter, tags: [...new Set([tag, ...filter.tags])] };
  const [site, content] = await Promise.all([getSiteContent(locale), getKnowledgeContent("blog", locale)]);
  const posts = applyFilter(data.all, withTag);
  const ui = FILTER_UI[locale];
  const heroContent = {
    ...content,
    heroIndex: locale === "tr" ? "BLOG · KONU" : "BLOG · TOPIC",
    heroTitleTop: data.label,
    heroTitleAccent: locale === "tr" ? "üzerine yazılar." : "articles.",
  };
  return (
    <PortedFrame site={site} family="knowledge" kind="blog" title={data.label} crumbHref={`/${locale}/blog/etiket/${tag}`}>
      <KnowledgePage kind="blog" content={heroContent} contactHref={`/${locale}/iletisim`}>
        <div className="blog-listing">
          <BlogFilters filter={withTag} facets={facets(data.all, locale)} total={posts.length} locale={locale} basePath={`/${locale}/blog`} />
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
      </KnowledgePage>
    </PortedFrame>
  );
}
