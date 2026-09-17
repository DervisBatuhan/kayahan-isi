import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceRequestPage from "@/components/pages/ported/ServiceRequestPage";
import { PortedFrame } from "@/components/pages/ported/PortedFrame";
import { getSiteContent } from "@/lib/content/site.server";
import { buildPortedMetadata } from "@/lib/seo.server";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const PATH = "/servis-talebi";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/servis-talebi">): Promise<Metadata> {
  const { locale } = await params;
  return buildPortedMetadata(locale, PATH);
}

export default async function Page({ params }: PageProps<"/[locale]/servis-talebi">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const site = await getSiteContent(locale);
  return (
    <PortedFrame site={site} crumbHref={PATH} title={site.serviceFocus.form.eyebrow}>
      <ServiceRequestPage site={site} />
    </PortedFrame>
  );
}
