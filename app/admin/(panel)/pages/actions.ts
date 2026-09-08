"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isLocale } from "@/lib/i18n/config";
import { PAGES_TAG } from "@/lib/content/pages.server";
import type { ChildLink } from "@/lib/content/pages";

export type PageInput = {
  id?: string;
  locale: string;
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  children: ChildLink[];
  order: number;
  published: boolean;
};

export type SavePageResult = { ok: true; id: string } | { ok: false; error: string };

export async function savePage(input: PageInput): Promise<SavePageResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };
  if (!isLocale(input.locale)) return { ok: false, error: "Geçersiz dil." };
  if (!input.slug.trim()) return { ok: false, error: "Slug gerekli." };
  if (!input.title.trim()) return { ok: false, error: "Başlık gerekli." };

  const data = {
    locale: input.locale,
    slug: input.slug.trim().replace(/^\/+/, ""),
    eyebrow: input.eyebrow,
    title: input.title,
    intro: input.intro,
    bullets: JSON.stringify(input.bullets),
    children: JSON.stringify(input.children),
    order: input.order,
    published: input.published,
  };

  try {
    const row = input.id
      ? await prisma.page.update({ where: { id: input.id }, data })
      : await prisma.page.create({ data });
    updateTag(PAGES_TAG);
    return { ok: true, id: row.id };
  } catch {
    return { ok: false, error: "Bu dil + slug kombinasyonu zaten kullanılıyor." };
  }
}

export async function deletePage(id: string) {
  const session = await getSession();
  if (!session) return;
  await prisma.page.delete({ where: { id } }).catch(() => null);
  updateTag(PAGES_TAG);
  redirect("/admin/pages");
}
