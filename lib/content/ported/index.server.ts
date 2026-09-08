import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { getPortedEntry } from "./registry";
import type { Locale } from "@/lib/i18n/config";
import type { ActivityContent, HubContent, SolutionContent } from "./types";

export const PORTED_TAG = "ported-content";

const readRow = unstable_cache(
  async (family: string, kind: string, locale: string) => {
    const row = await prisma.portedContent.findUnique({
      where: { family_kind_locale: { family, kind, locale } },
    });
    if (!row) return null;
    try {
      return JSON.parse(row.data) as unknown;
    } catch {
      return null;
    }
  },
  ["ported-content"],
  { tags: [PORTED_TAG], revalidate: 60 },
);

/** Static default content for a page in a given locale (falls back to tr). */
export function portedDefault(family: string, kind: string, locale: string): Record<string, unknown> {
  const entry = getPortedEntry(family, kind);
  if (!entry) throw new Error(`Unknown ported page: ${family}/${kind}`);
  const key = (locale === "en" ? "en" : "tr") as Locale;
  return entry.defaults[key] ?? entry.defaults.tr;
}

/**
 * DB-backed content for a design page, validated against its schema and
 * merged over the static default so a partial/legacy row can't break the page.
 */
async function getPorted<T>(family: string, kind: string, locale = "tr"): Promise<T> {
  const entry = getPortedEntry(family, kind);
  if (!entry) throw new Error(`Unknown ported page: ${family}/${kind}`);
  const base = portedDefault(family, kind, locale);

  const fromDb = await readRow(family, kind, locale).catch(() => null);
  if (!fromDb || typeof fromDb !== "object") return base as T;

  const merged = { ...base, ...(fromDb as Record<string, unknown>) };
  const parsed = entry.schema.safeParse(merged);
  return (parsed.success ? parsed.data : base) as T;
}

export function getActivityContent(kind: string, locale = "tr") {
  return getPorted<ActivityContent>("activity", kind, locale);
}
export function getSolutionContent(kind: string, locale = "tr") {
  return getPorted<SolutionContent>("solution", kind, locale);
}
export function getHubContent(kind: string, locale = "tr") {
  return getPorted<HubContent>("hub", kind, locale);
}
export function getCorporateContent<T = Record<string, unknown>>(kind: string, locale = "tr") {
  return getPorted<T>("corporate", kind, locale);
}
export function getExpansionContent<T = Record<string, unknown>>(kind: string, locale = "tr") {
  return getPorted<T>("expansion", kind, locale);
}

/** Raw current content for the admin editor (default when no row yet). */
export async function getPortedForEdit(family: string, kind: string, locale = "tr") {
  const entry = getPortedEntry(family, kind);
  if (!entry) return null;
  const base = portedDefault(family, kind, locale);
  const fromDb = await readRow(family, kind, locale).catch(() => null);
  if (!fromDb || typeof fromDb !== "object") return base;
  return { ...base, ...(fromDb as Record<string, unknown>) };
}
