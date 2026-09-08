import type { Metadata } from "next";
import Link from "next/link";
import { PageEditor } from "@/components/admin/PageEditor";
import { defaultLocale } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Yeni Sayfa" };

export default function NewPagePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/pages" className="text-[12.5px] font-semibold text-brand-600 hover:underline">
        ← Sayfalar
      </Link>
      <h1 className="mt-2 text-[20px] font-extrabold text-ink-900">Yeni Sayfa</h1>

      <div className="mt-6">
        <PageEditor
          initial={{
            locale: defaultLocale,
            slug: "",
            eyebrow: "",
            title: "",
            intro: "",
            bullets: [],
            children: [],
            order: 0,
            published: true,
          }}
        />
      </div>
    </div>
  );
}
