import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PortedEditor } from "@/components/admin/PortedEditor";
import { LocaleTabs } from "@/components/admin/fields";
import { getPortedEntry } from "@/lib/content/ported/registry";
import { getPortedForEdit } from "@/lib/content/ported/index.server";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Tasarım Sayfası Düzenle" };

export default async function DesignPageEditor({
  params,
  searchParams,
}: {
  params: Promise<{ family: string; kind: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();
  if (!session) notFound();
  const { family, kind } = await params;
  const sp = await searchParams;
  const localeParam = typeof sp.locale === "string" ? sp.locale : defaultLocale;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;

  const entry = getPortedEntry(family, kind);
  if (!entry) notFound();

  const initial = await getPortedForEdit(family, kind, locale);
  if (!initial) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/design-pages"
        className="text-[12.5px] font-semibold text-brand-600 hover:underline"
      >
        ← Tasarım Sayfaları
      </Link>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-ink-900">{entry.label}</h1>
          <p className="mt-1 font-mono text-[13px] text-ink-500">{entry.route}</p>
        </div>
        <LocaleTabs locale={locale} basePath={`/admin/design-pages/${family}/${kind}`} />
      </div>

      <div className="mt-6">
        <PortedEditor
          key={`${family}/${kind}/${locale}`}
          family={family}
          kind={kind}
          locale={locale}
          initial={initial}
        />
      </div>
    </div>
  );
}
