import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPage from "@/components/pages/ported/SolutionPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo";
import { isLocale, locales } from "@/lib/i18n/config";
import { getSolutionContent } from "@/lib/content/ported/index.server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/cozumler/bina-otomasyonu";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cozumler/bina-otomasyonu">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({
  params,
}: PageProps<"/[locale]/cozumler/bina-otomasyonu">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  const content = await getSolutionContent("automation", locale);
  return (
    <PortedFrame site={site} family="solution" kind="automation">
      <SolutionPage kind="automation" content={content} locale={locale} />
    </PortedFrame>
  );
}
