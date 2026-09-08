"use server";

import { updateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { Locale } from "@/lib/i18n/config";
import { isLocale } from "@/lib/i18n/config";
import { siteContentSchema } from "./schema";
import type { SiteContent } from "./types";
import { getSiteContent, SITE_CONTENT_TAG } from "./site.server";

export type SaveResult = { ok: true } | { ok: false; error: string };

/**
 * Merge a partial patch into the current SiteContent row for a locale and
 * persist it. Used by both the home-content and settings editors, which each
 * only ever touch a subset of the full JSON blob.
 */
export async function saveSiteContent(
  locale: Locale,
  patch: Partial<Omit<SiteContent, "locale">>,
): Promise<SaveResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };
  if (!isLocale(locale)) return { ok: false, error: "Geçersiz dil." };

  const current = await getSiteContent(locale);
  const merged: SiteContent = { ...current, ...patch, locale };

  const parsed = siteContentSchema.safeParse(merged);
  if (!parsed.success) {
    return { ok: false, error: `Geçersiz içerik: ${parsed.error.issues[0]?.message ?? "bilinmeyen hata"}` };
  }

  await prisma.siteContent.upsert({
    where: { locale },
    create: { locale, data: JSON.stringify(parsed.data), updatedBy: session.email },
    update: { data: JSON.stringify(parsed.data), updatedBy: session.email },
  });

  updateTag(SITE_CONTENT_TAG);
  return { ok: true };
}
