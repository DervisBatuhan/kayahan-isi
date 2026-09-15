import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";
import { getPostByIdForAdmin } from "@/lib/blog/index.server";
import { toDateInput, type BlogPostInput } from "@/lib/blog/shared";

export const metadata: Metadata = { title: "Yazı Düzenle" };

export default async function EditBlogPostPage({ params }: PageProps<"/admin/blog/[id]">) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  const initial: BlogPostInput = {
    id: post.id,
    locale: post.locale === "en" ? "en" : "tr",
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverUrl: post.coverUrl,
    coverAlt: post.coverAlt,
    tags: post.tags,
    pairKey: post.pairKey ?? "",
    published: post.published,
    publishedAt: toDateInput(post.publishedAt),
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/blog" className="text-[12.5px] font-semibold text-brand-600 hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-2 text-[20px] font-extrabold text-ink-900">{post.title || "(başlıksız)"}</h1>
      <p className="mt-1 font-mono text-[13px] text-ink-500">
        /{post.locale}/blog/{post.slug}
      </p>
      <div className="mt-6">
        <BlogPostEditor initial={initial} />
      </div>
    </div>
  );
}
