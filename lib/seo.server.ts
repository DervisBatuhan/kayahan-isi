import "server-only";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getPortedMeta } from "@/lib/content/ported/meta";
import { PORTED_ENTRIES } from "@/lib/content/ported/registry";
import { getPortedForEdit } from "@/lib/content/ported/index.server";
import { SITE_URL, buildAlternates, ogLocale } from "@/lib/seo";

const bare = (route: string) => route.replace(/^\/(tr|en)/, "");

/**
 * Panel override for a page's SEO title/description, if the editors set one.
 * Looks the page up by its locale-less path in the design-page registry.
 */
export async function getSeoOverride(locale: Locale, path: string): Promise<{ title?: string; description?: string }> {
  const entry = PORTED_ENTRIES.find((e) => e.route && bare(e.route) === path);
  if (!entry) return {};
  try {
    const c = (await getPortedForEdit(entry.family, entry.kind, locale)) as Record<string, unknown> | null;
    const title = typeof c?.seoTitle === "string" ? c.seoTitle.trim() : "";
    const description = typeof c?.seoDescription === "string" ? c.seoDescription.trim() : "";
    return { ...(title ? { title } : {}), ...(description ? { description } : {}) };
  } catch {
    return {};
  }
}

/**
 * Same contract as `buildPortedMetadata` in lib/seo.ts, but applies the
 * panel override first. Use this from route `generateMetadata`s.
 */
export async function buildPortedMetadata(locale: string, path: string): Promise<Metadata> {
  if (!isLocale(locale)) return {};
  const base = getPortedMeta(path, locale);
  const o = await getSeoOverride(locale, path);
  const title = o.title ?? base.title;
  const description = o.description ?? base.description;
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: base.og,
      locale: ogLocale(locale),
      url: `${SITE_URL}/${locale}${path}`,
      title,
      description,
    },
    twitter: { title, description },
  };
}
