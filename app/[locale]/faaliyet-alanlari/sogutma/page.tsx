import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ActivityPage from "@/components/pages/ported/ActivityPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getActivityContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/faaliyet-alanlari/sogutma";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faaliyet-alanlari/sogutma">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/faaliyet-alanlari/sogutma">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getActivityContent("cooling", locale);
  return (
    <PortedFrame site={site} family="activity" kind="cooling">
      <ActivityPage kind="cooling" content={content} locale={locale} />
    </PortedFrame>
  );
}
