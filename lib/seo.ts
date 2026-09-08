import type { Metadata } from "next";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getPortedMeta } from "@/lib/content/ported/meta";

/**
 * Canonical production origin. Override per-environment with
 * `NEXT_PUBLIC_SITE_URL` (e.g. a preview deployment); falls back to the live
 * domain so `metadataBase`, canonicals, hreflang and the sitemap all resolve to
 * absolute URLs even without env config.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.kayahanisi.com.tr"
).replace(/\/$/, "");

export const SITE_NAME = "Kayahan Isı";

/** Build an absolute URL from a root-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * `alternates` block for a page: a self-referencing canonical plus one
 * `hreflang` entry per locale and an `x-default` pointing at the default
 * locale.
 *
 * @param locale     current locale
 * @param subPath    path *after* the locale segment, e.g. "" for the home page
 *                   or "/kurumsal/hakkimizda" — but pass the locale-correct
 *                   slug via `pathByLocale` when the slug itself is translated.
 * @param pathByLocale optional map of locale -> sub-path when slugs differ
 *                     between languages.
 */
export function buildAlternates(
  locale: Locale,
  subPath: string,
  pathByLocale?: Partial<Record<Locale, string>>,
): Metadata["alternates"] {
  const pathFor = (l: Locale) => {
    const sub = pathByLocale?.[l] ?? subPath;
    const clean = sub && !sub.startsWith("/") ? `/${sub}` : sub;
    return `/${l}${clean ?? ""}`;
  };

  // Single-language site: a self-referencing hreflang set is just noise, so
  // emit only the canonical. Restore the `languages` map when a second locale
  // comes back.
  if (locales.length < 2) {
    return { canonical: absoluteUrl(pathFor(locale)) };
  }

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(pathFor(l));
  languages["x-default"] = absoluteUrl(pathFor(locales[0]));

  return {
    canonical: absoluteUrl(pathFor(locale)),
    languages,
  };
}

/** OpenGraph locale tag ("tr_TR" / "en_US"). */
export function ogLocale(locale: Locale): string {
  return locale === "tr" ? "tr_TR" : "en_US";
}

/**
 * Full `Metadata` for a physically-routed inner page, from `PORTED_META`.
 * `path` is the locale-less path, e.g. "/kurumsal/hakkimizda".
 */
export function buildPortedMetadata(locale: string, path: string): Metadata {
  if (!isLocale(locale)) return {};
  const { title, description, og } = getPortedMeta(path, locale);
  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: og,
      locale: ogLocale(locale),
      url: `${SITE_URL}/${locale}${path}`,
      title,
      description,
    },
    twitter: { title, description },
  };
}
