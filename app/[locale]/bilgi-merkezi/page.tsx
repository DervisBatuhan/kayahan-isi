import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHubPage from "@/components/pages/ported/SectionHubPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo.server";
import { isLocale, locales } from "@/lib/i18n/config";
import { getHubContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/bilgi-merkezi";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/bilgi-merkezi">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/bilgi-merkezi">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getHubContent("knowledge", locale);
  return (
    <PortedFrame site={site} family="hub" kind="knowledge">
      <SectionHubPage kind="knowledge" content={content} locale={locale} />
    </PortedFrame>
  );
}
