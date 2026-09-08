import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { getPortedEntry } from "@/lib/content/ported/registry";
import { PORTED_META } from "@/lib/content/ported/meta";
import { breadcrumbGraph, jsonLdScript } from "@/lib/structured-data";
import type { Locale } from "@/lib/i18n/config";
import type { SiteContent } from "@/lib/content/types";

const HOME_LABEL: Record<Locale, string> = { tr: "Ana Sayfa", en: "Home" };

/** Which section a family's pages hang under, and its label per locale. */
const PARENT: Record<string, { seg: string; label: Record<Locale, string> } | null> = {
  hub: null,
  corporate: { seg: "kurumsal", label: { tr: "Kurumsal", en: "Corporate" } },
  activity: {
    seg: "faaliyet-alanlari",
    label: { tr: "Faaliyet Alanlarımız", en: "Our Fields" },
  },
  solution: { seg: "cozumler", label: { tr: "Çözümlerimiz", en: "Our Solutions" } },
};

const EXPANSION_PARENT: Record<string, { seg: string; label: Record<Locale, string> } | null> = {
  board: { seg: "kurumsal", label: { tr: "Kurumsal", en: "Corporate" } },
  message: { seg: "kurumsal", label: { tr: "Kurumsal", en: "Corporate" } },
  certificates: { seg: "kurumsal", label: { tr: "Kurumsal", en: "Corporate" } },
  gallery: null,
  press: null,
  career: null,
};

/** Strip the leading `/tr` (or `/en`) from a registry route. */
const bare = (route: string) => route.replace(/^\/(tr|en)/, "");

/**
 * Shared chrome for the richly-designed inner pages: the site header/footer plus
 * a locale-correct `BreadcrumbList` JSON-LD block.
 */
export function PortedFrame({
  site,
  family,
  kind,
  title,
  crumbHref,
  children,
}: {
  site: SiteContent;
  family?: string;
  kind?: string;
  /** Trailing crumb label (overrides the registry label). */
  title?: string;
  /** Trailing crumb path (locale-less or /tr-prefixed) when not in the registry. */
  crumbHref?: string;
  children: React.ReactNode;
}) {
  const locale = (site.locale === "en" ? "en" : "tr") as Locale;
  const entry = family && kind ? getPortedEntry(family, kind) : undefined;

  const selfPath = entry ? bare(entry.route) : crumbHref ? bare(crumbHref) : "";
  // Prefer the locale-correct title from PORTED_META over the registry's TR label.
  const metaTitle = PORTED_META[selfPath]?.[locale]?.title;
  const selfLabel = title ?? metaTitle ?? entry?.label ?? "";
  const selfHref = selfPath ? `/${locale}${selfPath}` : "";

  const parentDef =
    family === "expansion" && kind ? EXPANSION_PARENT[kind] : family ? PARENT[family] : null;
  const parent = parentDef
    ? { label: parentDef.label[locale], href: `/${locale}/${parentDef.seg}` }
    : null;

  const crumbs = [
    { label: HOME_LABEL[locale], href: `/${locale}` },
    ...(parent && parent.href !== selfHref ? [parent] : []),
    ...(selfLabel && selfHref ? [{ label: selfLabel, href: selfHref }] : []),
  ];

  return (
    <main id="top">
      {crumbs.length > 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbGraph(crumbs)) }}
        />
      )}
      <SiteHeader content={site} />
      {children}
      <SiteFooter content={site} />
    </main>
  );
}
