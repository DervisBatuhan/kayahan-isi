import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/pages/PageShell";
import { CtaBand } from "@/components/sections/CtaBand";
import { getSiteContent } from "@/lib/content/site.server";
import { getAllPageParams, getPage } from "@/lib/content/pages.server";
import {
  getPageDict,
  isPlaceholderPage,
  slugAcrossLocales,
} from "@/lib/content/pages";
import { isLocale } from "@/lib/i18n/config";
import { SITE_URL, buildAlternates, ogLocale } from "@/lib/seo";
import { breadcrumbGraph, jsonLdScript } from "@/lib/structured-data";

export async function generateStaticParams() {
  return getAllPageParams();
}

/** Trim an intro to a sensible meta-description length on a word boundary. */
function clamp(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[...slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const slugPath = slug.join("/");
  const page = await getPage(locale, slugPath);
  if (!page) return {};

  const description = clamp(page.intro);
  const byLocale = slugAcrossLocales(locale, slugPath);

  return {
    title: page.title,
    description,
    ...(isPlaceholderPage(locale, slugPath)
      ? { robots: { index: false, follow: true } }
      : {}),
    alternates: buildAlternates(locale, `/${slugPath}`, byLocale),
    openGraph: {
      type: "article",
      locale: ogLocale(locale),
      url: `${SITE_URL}/${locale}/${slugPath}`,
      title: page.title,
      description,
    },
    twitter: { title: page.title, description },
  };
}

export default async function CatchAllPage({
  params,
}: PageProps<"/[locale]/[...slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const slugPath = slug.join("/");
  const page = await getPage(locale, slugPath);
  if (!page) notFound();

  const dict = getPageDict(locale);
  const crumbs = [{ label: dict.home, href: `/${locale}` }];

  if (slug.length > 1) {
    const parent = await getPage(locale, slug[0]);
    if (parent) crumbs.push({ label: parent.title, href: `/${locale}/${parent.slug}` });
  }
  crumbs.push({ label: page.title, href: `/${locale}/${slugPath}` });

  const site = await getSiteContent(locale);

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbGraph(crumbs)) }}
      />
      <TopBar content={site.topBar} locale={locale} />
      <Header brand={site.brand} nav={site.nav} homeHref={`/${locale}`} />
      <main className="flex-1">
        <PageShell
          locale={locale}
          page={page}
          crumbs={crumbs}
          draftNote={dict.draftNote}
          moreLabel={dict.detail}
        />
        <CtaBand content={site.ctaBand} />
      </main>
      <Footer brand={site.brand} footer={site.footer} homeHref={`/${locale}`} />
    </div>
  );
}
