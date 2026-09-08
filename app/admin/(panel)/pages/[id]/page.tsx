import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageEditor } from "@/components/admin/PageEditor";
import type { ChildLink } from "@/lib/content/pages";

export const metadata: Metadata = { title: "Sayfa Düzenle" };

function parseJson<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

export default async function EditPagePage({ params }: PageProps<"/admin/pages/[id]">) {
  const { id } = await params;
  const row = await prisma.page.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/pages" className="text-[12.5px] font-semibold text-brand-600 hover:underline">
        ← Sayfalar
      </Link>
      <h1 className="mt-2 text-[20px] font-extrabold text-ink-900">{row.title}</h1>
      <p className="mt-1 text-[13px] text-ink-500 font-mono">
        /{row.locale}/{row.slug}
      </p>

      <div className="mt-6">
        <PageEditor
          initial={{
            id: row.id,
            locale: row.locale,
            slug: row.slug,
            eyebrow: row.eyebrow,
            title: row.title,
            intro: row.intro,
            bullets: parseJson<string[]>(row.bullets, []),
            children: parseJson<ChildLink[]>(row.children, []),
            order: row.order,
            published: row.published,
          }}
        />
      </div>
    </div>
  );
}
