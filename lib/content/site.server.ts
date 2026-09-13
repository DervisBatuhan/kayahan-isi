import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n/config";
import type { NavItem, SiteContent } from "./types";
import { getDefaultSiteContent } from "./site";
import { siteContentSchema } from "./schema";

export const SITE_CONTENT_TAG = "site-content";

/**
 * `nav.items` is a nested array, so the top-level `{...fallback, ...fromDb}`
 * spread below can't "fill in" a new item the way it does for a flat key —
 * a saved row's `nav` object wins wholesale, permanently hiding any item
 * added to the code default after that row was last saved (e.g. a brand new
 * top-level menu). Reconcile by href instead: walk the current code default
 * for order and to introduce new items/children, but keep whatever an admin
 * has customized on an item that already existed, and keep any item the
 * admin added that isn't in the code defaults at all.
 */
export function mergeNavItems(dbItems: NavItem[], fallbackItems: NavItem[]): NavItem[] {
  const dbByHref = new Map(dbItems.map((i) => [i.href, i]));
  const fallbackHrefs = new Set(fallbackItems.map((i) => i.href));

  const ordered = fallbackItems.map((def) => {
    const existing = dbByHref.get(def.href);
    if (!existing) return def;
    if (!def.children) return existing;
    const existingChildHrefs = new Set((existing.children ?? []).map((c) => c.href));
    const newChildren = def.children.filter((c) => !existingChildHrefs.has(c.href));
    return newChildren.length
      ? { ...existing, children: [...(existing.children ?? []), ...newChildren] }
      : existing;
  });

  const adminOnly = dbItems.filter((i) => !fallbackHrefs.has(i.href));
  return [...ordered, ...adminOnly];
}

const readRow = unstable_cache(
  async (locale: Locale): Promise<SiteContent | null> => {
    const row = await prisma.siteContent.findUnique({ where: { locale } });
    if (!row) return null;
    try {
      return JSON.parse(row.data) as SiteContent;
    } catch {
      return null;
    }
  },
  ["site-content"],
  { tags: [SITE_CONTENT_TAG], revalidate: 60 },
);

/**
 * DB-backed site content, with the static default filling in any top-level key
 * a stored row predates (e.g. a section added to the schema after the last save).
 */
export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  const fallback = getDefaultSiteContent(locale);
  const fromDb = await readRow(locale).catch(() => null);
  if (!fromDb) return fallback;

  // Fill in any section a stored row predates, then validate the whole shape so
  // a partial/legacy nested block can't crash a page. Fall back on any mismatch.
  const merged = {
    ...fallback,
    ...fromDb,
    nav: fromDb.nav
      ? { ...fallback.nav, ...fromDb.nav, items: mergeNavItems(fromDb.nav.items ?? [], fallback.nav.items) }
      : fallback.nav,
    locale,
  };
  const parsed = siteContentSchema.safeParse(merged);
  return parsed.success ? (parsed.data as SiteContent) : fallback;
}
