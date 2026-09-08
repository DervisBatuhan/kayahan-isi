import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpansionPage from "@/components/pages/ported/ExpansionPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getExpansionContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/insan-kaynaklari";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insan-kaynaklari">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/insan-kaynaklari">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getExpansionContent("career", locale);
  return (
    <PortedFrame site={site} family="expansion" kind="career">
      <ExpansionPage kind="career" content={content} locale={locale} />
    </PortedFrame>
  );
}
