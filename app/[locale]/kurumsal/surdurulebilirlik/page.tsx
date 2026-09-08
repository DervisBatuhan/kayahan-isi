import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CorporatePage from "@/components/pages/ported/CorporatePage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getCorporateContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/kurumsal/surdurulebilirlik";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/kurumsal/surdurulebilirlik">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/kurumsal/surdurulebilirlik">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getCorporateContent("sustainability", locale);
  return (
    <PortedFrame site={site} family="corporate" kind="sustainability">
      <CorporatePage kind="sustainability" content={content} locale={locale} />
    </PortedFrame>
  );
}
