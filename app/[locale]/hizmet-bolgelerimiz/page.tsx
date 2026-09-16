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

const PATH = "/hizmet-bolgelerimiz";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/hizmet-bolgelerimiz">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/hizmet-bolgelerimiz">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getHubContent("areas", locale);
  return (
    <PortedFrame site={site} family="hub" kind="areas">
      <SectionHubPage kind="areas" content={content} locale={locale} />
    </PortedFrame>
  );
}
