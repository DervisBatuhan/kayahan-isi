import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getSiteContent } from "@/lib/content/site.server";
import { getPortedMeta } from "@/lib/content/ported/meta";
import {
  getPublishedPost,
  getTranslation,
  resolveSwitchedLocale,
} from "@/lib/blog/index.server";
import { markdownToText, wordCount } from "@/lib/blog/markdown";
import { isLocale, otherLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL, absoluteUrl, ogLocale } from "@/lib/seo";
import { blogPostingGraph, breadcrumbGraph, jsonLdScript } from "@/lib/structured-data";

type Props = PageProps<"/[locale]/blog/[slug]">;

async function load(locale: Locale, slug: string) {
  const post = await getPublishedPost(locale, slug);
  if (!post) return null;
  const other = otherLocale(locale);
  const translation = post.pairKey ? await getTranslation(post.pairKey, other) : null;
  return { post, translation, other };
}

/** Meta description: the excerpt, else the first ~155 chars of the body. */
function describe(excerpt: string, content: string): string {
  if (excerpt.trim()) return excerpt.trim();
  const t = markdownToText(content);
  return t.length > 155 ? `${t.slice(0, 152).trimEnd()}…` : t;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const data = await load(locale, slug);
  if (!data) return {};
  const { post, translation, other } = data;

  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const description = describe(post.excerpt, post.content);
  // hreflang only to a translation that really exists — never to a 404.
  const languages: Record<string, string> = { [locale]: url };
  if (translation) languages[other] = absoluteUrl(`/${other}/blog/${translation.slug}`);
  languages["x-default"] = languages.tr ?? url;

  return {
    title: post.title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      locale: ogLocale(locale),
      url,
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(post.tags.length ? { tags: post.tags } : {}),
      ...(post.coverUrl ? { images: [{ url: post.coverUrl, alt: post.coverAlt }] } : {}),
    },
    twitter: {
      card: post.coverUrl ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(post.coverUrl ? { images: [post.coverUrl] } : {}),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const data = await load(locale, slug);
  if (!data) {
    // The header's language toggle keeps the slug and swaps only the locale;
    // send that case to the real translation (or the index) instead of a 404.
    const target = await resolveSwitchedLocale(locale, slug, otherLocale(locale));
    if (target) redirect(target);
    notFound();
  }
  const { post, translation, other } = data;
  const site = await getSiteContent(locale);

  const bodyText = markdownToText(post.content);
  const blogLabel = getPortedMeta("/blog", locale).title;
  const crumbs = [
    { label: locale === "tr" ? "Ana Sayfa" : "Home", href: `/${locale}` },
    { label: blogLabel, href: `/${locale}/blog` },
    { label: post.title, href: `/${locale}/blog/${post.slug}` },
  ];

  return (
    <PortedFrame site={site}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbGraph(crumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            blogPostingGraph(locale, post, { wordCount: wordCount(post.content), bodyText }),
          ),
        }}
      />
      <BlogArticle
        post={post}
        locale={locale}
        translationHref={translation ? `/${other}/blog/${translation.slug}` : null}
      />
    </PortedFrame>
  );
}
