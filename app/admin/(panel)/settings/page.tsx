import type { Metadata } from "next";
import { SettingsEditor } from "@/components/admin/SettingsEditor";
import { LocaleTabs } from "@/components/admin/fields";
import { getSiteContent } from "@/lib/content/site.server";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Menü & İletişim" };

export default async function SettingsPage({
  searchParams,
}: PageProps<"/admin/settings">) {
  const sp = await searchParams;
  const localeParam = typeof sp.locale === "string" ? sp.locale : defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  const content = await getSiteContent(locale);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">Menü & İletişim</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Navigasyon, footer, iletişim bilgileri ve sosyal medya bağlantıları.
          </p>
        </div>
        <LocaleTabs locale={locale} basePath="/admin/settings" />
      </div>

      <div className="mt-6">
        <SettingsEditor
          key={locale}
          locale={locale}
          initial={{
            brand: content.brand,
            topBar: content.topBar,
            nav: content.nav,
            footer: content.footer,
          }}
        />
      </div>
    </div>
  );
}
