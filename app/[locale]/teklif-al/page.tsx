import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UtilityPage from "@/components/pages/ported/UtilityPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/teklif-al";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/teklif-al">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/teklif-al">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  return (
    <PortedFrame site={site} crumbHref="/teklif-al">
      <UtilityPage kind="quote" locale={locale} />
    </PortedFrame>
  );
}
