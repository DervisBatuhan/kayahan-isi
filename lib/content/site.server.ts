import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n/config";
import type { SiteContent } from "./types";
import { getDefaultSiteContent } from "./site";
import { siteContentSchema } from "./schema";

export const SITE_CONTENT_TAG = "site-content";

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
  const merged = { ...fallback, ...fromDb, locale };
  const parsed = siteContentSchema.safeParse(merged);
  return parsed.success ? (parsed.data as SiteContent) : fallback;
}
