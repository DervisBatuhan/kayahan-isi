import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHubPage from "@/components/pages/ported/SectionHubPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getHubContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/faaliyet-alanlari";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faaliyet-alanlari">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/faaliyet-alanlari">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getHubContent("activity", locale);
  return (
    <PortedFrame site={site} family="hub" kind="activity">
      <SectionHubPage kind="activity" content={content} locale={locale} />
    </PortedFrame>
  );
}
