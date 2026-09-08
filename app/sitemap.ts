import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getAllPageParams } from "@/lib/content/pages.server";
import { isPlaceholderPage } from "@/lib/content/pages";
import { PORTED_ENTRIES } from "@/lib/content/ported/registry";
import { locales } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";

/** Strip the leading /tr or /en from a registry route. */
const bare = (route: string) => route.replace(/^\/(tr|en)/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const [portedRows, pageRows, siteRows] = await Promise.all([
    prisma.portedContent.findMany({ select: { family: true, kind: true, updatedAt: true } }).catch(() => []),
    prisma.page.findMany({ select: { locale: true, slug: true, updatedAt: true } }).catch(() => []),
    prisma.siteContent.findMany({ select: { updatedAt: true } }).catch(() => []),
  ]);
  const portedAt = new Map(portedRows.map((r) => [`${r.family}/${r.kind}`, r.updatedAt]));
  const pageAt = new Map(pageRows.map((r) => [`${r.locale}/${r.slug}`, r.updatedAt]));
  const homeAt = siteRows[0]?.updatedAt ?? buildDate;

  /** Add one path in every locale, cross-linked with hreflang alternates. */
  const addAll = (
    subPath: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date,
  ) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = absoluteUrl(`/${l}${subPath}`);
    languages["x-default"] = languages[locales[0]];

    for (const l of locales) {
      const url = absoluteUrl(`/${l}${subPath}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({ url, lastModified, changeFrequency, priority, alternates: { languages } });
    }
  };

  addAll("", 1, "weekly", homeAt);

  for (const e of PORTED_ENTRIES) {
    if (!e.route) continue;
    const sub = bare(e.route);
    addAll(sub, sub.split("/").length > 2 ? 0.7 : 0.8, "monthly", portedAt.get(`${e.family}/${e.kind}`) ?? buildDate);
  }

  const params = await getAllPageParams();
  const doneSubPaths = new Set<string>();
  for (const { locale, slug } of params) {
    const slugPath = slug.join("/");
    if (isPlaceholderPage(locale, slugPath)) continue;
    const sub = `/${slugPath}`;
    if (doneSubPaths.has(sub)) continue;
    doneSubPaths.add(sub);
    addAll(sub, slug.length > 1 ? 0.6 : 0.8, "monthly", pageAt.get(`${locale}/${slugPath}`) ?? buildDate);
  }

  return entries;
}
