import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import {
  defaultPageParams,
  getDefaultPage,
  type ChildLink,
  type PageDoc,
} from "./pages";

export const PAGES_TAG = "pages";

function rowToDoc(row: {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string;
  children: string;
}): PageDoc {
  const parse = <T,>(s: string, fallback: T): T => {
    try {
      return JSON.parse(s) as T;
    } catch {
      return fallback;
    }
  };
  return {
    slug: row.slug,
    eyebrow: row.eyebrow,
    title: row.title,
    intro: row.intro,
    bullets: parse<string[]>(row.bullets, []),
    children: parse<ChildLink[]>(row.children, []),
  };
}

const readPage = unstable_cache(
  async (locale: string, slugPath: string): Promise<PageDoc | null> => {
    const row = await prisma.page.findUnique({
      where: { locale_slug: { locale, slug: slugPath } },
    });
    if (!row || !row.published) return null;
    return rowToDoc(row);
  },
  ["page"],
  { tags: [PAGES_TAG], revalidate: 60 },
);

const readAllSlugs = unstable_cache(
  async (): Promise<{ locale: string; slug: string }[]> => {
    return prisma.page.findMany({
      where: { published: true },
      select: { locale: true, slug: true },
    });
  },
  ["page-slugs"],
  { tags: [PAGES_TAG], revalidate: 60 },
);

export async function getPage(
  locale: Locale,
  slugPath: string,
): Promise<PageDoc | undefined> {
  const fromDb = await readPage(locale, slugPath).catch(() => null);
  return fromDb ?? getDefaultPage(locale, slugPath);
}

export async function getAllPageParams(): Promise<
  { locale: Locale; slug: string[] }[]
> {
  const rows = await readAllSlugs().catch(() => []);

  // Union of DB-published pages and the static seed, so routes added in
  // `pages.ts` (and served via the `getPage` fallback) are still prerendered
  // and listed in the sitemap even when the DB already has rows.
  const seen = new Set<string>();
  const params: { locale: Locale; slug: string[] }[] = [];

  for (const r of rows) {
    if (!(locales as readonly string[]).includes(r.locale)) continue;
    const key = `${r.locale}/${r.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    params.push({ locale: r.locale as Locale, slug: r.slug.split("/") });
  }

  for (const d of defaultPageParams()) {
    const key = `${d.locale}/${d.slug.join("/")}`;
    if (seen.has(key)) continue;
    seen.add(key);
    params.push(d);
  }

  return params;
}
