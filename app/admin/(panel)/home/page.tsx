import type { Metadata } from "next";
import { HomeEditor } from "@/components/admin/HomeEditor";
import { LocaleTabs } from "@/components/admin/fields";
import { getSiteContent } from "@/lib/content/site.server";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Ana Sayfa İçeriği" };

export default async function HomeContentPage({
  searchParams,
}: PageProps<"/admin/home">) {
  const sp = await searchParams;
  const localeParam = typeof sp.locale === "string" ? sp.locale : defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  const content = await getSiteContent(locale);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">Ana Sayfa İçeriği</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Hero, istatistikler, kartlar, zaman çizelgesi, kurucu ve otorite bölümleri.
          </p>
        </div>
        <LocaleTabs locale={locale} basePath="/admin/home" />
      </div>

      <div className="mt-6">
        <HomeEditor
          key={locale}
          locale={locale}
          initial={{
            hero: content.hero,
            stats: content.stats,
            activityAreas: content.activityAreas,
            journey: content.journey,
            corporateStrength: content.corporateStrength,
            engineering: content.engineering,
            homeBands: content.homeBands,
            founder: content.founder,
            authority: content.authority,
            ctaBand: content.ctaBand,
          }}
        />
      </div>
    </div>
  );
}
