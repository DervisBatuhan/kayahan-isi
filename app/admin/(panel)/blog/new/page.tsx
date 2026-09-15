import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";
import { emptyPostInput } from "@/lib/blog/shared";
import { isLocale } from "@/lib/i18n/config";

export const metadata: Metadata = { title: "Yeni Yazı" };

export default async function NewBlogPostPage({ searchParams }: PageProps<"/admin/blog/new">) {
  const { locale } = await searchParams;
  const l = typeof locale === "string" && isLocale(locale) ? locale : "tr";

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/blog" className="text-[12.5px] font-semibold text-brand-600 hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-2 text-[20px] font-extrabold text-ink-900">Yeni Yazı</h1>
      <div className="mt-6">
        <BlogPostEditor initial={emptyPostInput(l)} />
      </div>
    </div>
  );
}
