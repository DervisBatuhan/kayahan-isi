import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n/config";
import { BLOG_TAG, parseTags, type BlogPostView } from "./shared";

type Row = {
  id: string;
  locale: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  coverAlt: string;
  tags: string;
  pairKey: string | null;
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
};

function rowToView(r: Row): BlogPostView {
  return {
    ...r,
    tags: parseTags(r.tags),
    publishedAt: r.publishedAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

/** Published posts for one locale, newest first — the public list page. */
export const getPublishedPosts = unstable_cache(
  async (locale: Locale): Promise<BlogPostView[]> => {
    const rows = await prisma.blogPost
      .findMany({
        where: { locale, published: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      })
      .catch(() => [] as Row[]);
    return rows.map(rowToView);
  },
  ["blog-published"],
  { tags: [BLOG_TAG], revalidate: 60 },
);

/** One published post by locale + slug, or null (draft or missing). */
export const getPublishedPost = unstable_cache(
  async (locale: Locale, slug: string): Promise<BlogPostView | null> => {
    const row = await prisma.blogPost
      .findUnique({ where: { locale_slug: { locale, slug } } })
      .catch(() => null);
    if (!row || !row.published) return null;
    return rowToView(row);
  },
  ["blog-post"],
  { tags: [BLOG_TAG], revalidate: 60 },
);

/**
 * The published translation of a post in another locale, matched by `pairKey`.
 * Used for hreflang + the language switcher on the article page.
 */
export const getTranslation = unstable_cache(
  async (pairKey: string, locale: Locale): Promise<{ slug: string } | null> => {
    const row = await prisma.blogPost
      .findFirst({
        where: { pairKey, locale, published: true },
        select: { slug: true },
      })
      .catch(() => null);
    return row;
  },
  ["blog-translation"],
  { tags: [BLOG_TAG], revalidate: 60 },
);

/**
 * Where the header's TR/EN toggle should land when it swaps only the locale
 * segment of an article URL: the same slug in the *other* locale is looked up,
 * and its translation (via `pairKey`) in the requested locale is returned —
 * or the blog index when no translation exists. `null` when the slug is
 * unknown in both locales, so a genuinely wrong URL still 404s.
 */
export const resolveSwitchedLocale = unstable_cache(
  async (locale: Locale, slug: string, from: Locale): Promise<string | null> => {
    const source = await prisma.blogPost
      .findUnique({
        where: { locale_slug: { locale: from, slug } },
        select: { pairKey: true, published: true },
      })
      .catch(() => null);
    if (!source?.published) return null;
    if (source.pairKey) {
      const t = await prisma.blogPost
        .findFirst({ where: { pairKey: source.pairKey, locale, published: true }, select: { slug: true } })
        .catch(() => null);
      if (t) return `/${locale}/blog/${t.slug}`;
    }
    return `/${locale}/blog`;
  },
  ["blog-switch"],
  { tags: [BLOG_TAG], revalidate: 60 },
);

/** Every published post across locales — sitemap. Uncached: runs at build/request of the sitemap only. */
export async function getAllPublishedForSitemap(): Promise<
  { locale: string; slug: string; pairKey: string | null; updatedAt: Date }[]
> {
  return prisma.blogPost
    .findMany({
      where: { published: true },
      select: { locale: true, slug: true, pairKey: true, updatedAt: true },
    })
    .catch(() => []);
}

/** Admin list — all posts incl. drafts. Uncached. */
export async function getAllPostsForAdmin(): Promise<BlogPostView[]> {
  const rows = await prisma.blogPost.findMany({
    orderBy: [{ locale: "asc" }, { publishedAt: "desc" }],
  });
  return rows.map(rowToView);
}

export async function getPostByIdForAdmin(id: string): Promise<BlogPostView | null> {
  const row = await prisma.blogPost.findUnique({ where: { id } });
  return row ? rowToView(row) : null;
}
