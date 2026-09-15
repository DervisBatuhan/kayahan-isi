"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isBlobUrl } from "@/lib/content/ported/certificates-shared";
import { BLOG_TAG, blogPostInputSchema, type BlogPostInput } from "./shared";

export type SavePostResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveBlogPost(input: BlogPostInput): Promise<SavePostResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };

  const parsed = blogPostInputSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: first?.message ?? "Geçersiz veri." };
  }
  const v = parsed.data;

  // Date input is a bare yyyy-mm-dd; pin it to noon UTC so it never rolls over
  // a day when rendered in a TR/EN timezone.
  const publishedAt = new Date(`${v.publishedAt}T12:00:00.000Z`);
  if (Number.isNaN(publishedAt.getTime())) return { ok: false, error: "Geçersiz tarih." };

  const data = {
    locale: v.locale,
    slug: v.slug,
    title: v.title,
    excerpt: v.excerpt,
    content: v.content,
    coverUrl: v.coverUrl,
    coverAlt: v.coverAlt,
    tags: JSON.stringify(v.tags),
    pairKey: v.pairKey || null,
    published: v.published,
    publishedAt,
    updatedBy: session.email,
  };

  try {
    const row = v.id
      ? await prisma.blogPost.update({ where: { id: v.id }, data })
      : await prisma.blogPost.create({ data });
    updateTag(BLOG_TAG);
    return { ok: true, id: row.id };
  } catch {
    return { ok: false, error: "Bu dilde aynı slug'a sahip bir yazı zaten var." };
  }
}

export async function deleteBlogPost(id: string) {
  const session = await getSession();
  if (!session) return;
  const row = await prisma.blogPost.findUnique({ where: { id }, select: { coverUrl: true } });
  await prisma.blogPost.delete({ where: { id } }).catch(() => null);
  if (row?.coverUrl && isBlobUrl(row.coverUrl)) {
    await del(row.coverUrl).catch(() => null);
  }
  updateTag(BLOG_TAG);
  redirect("/admin/blog");
}
