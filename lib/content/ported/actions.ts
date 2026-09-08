"use server";

import { updateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isLocale } from "@/lib/i18n/config";
import { getPortedEntry } from "./registry";
import { PORTED_TAG, portedDefault } from "./index.server";

export type SavePortedResult = { ok: true } | { ok: false; error: string };

export async function savePortedContent(
  family: string,
  kind: string,
  locale: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
): Promise<SavePortedResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };

  const entry = getPortedEntry(family, kind);
  if (!entry) return { ok: false, error: "Bilinmeyen sayfa." };
  if (!isLocale(locale)) return { ok: false, error: "Geçersiz dil." };

  const merged = { ...portedDefault(family, kind, locale), ...data };
  const parsed = entry.schema.safeParse(merged);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const where = first?.path.join(" › ");
    return {
      ok: false,
      error: `Geçersiz içerik${where ? ` (${where})` : ""}: ${first?.message ?? "bilinmeyen hata"}`,
    };
  }

  try {
    await prisma.portedContent.upsert({
      where: { family_kind_locale: { family, kind, locale } },
      create: {
        family,
        kind,
        locale,
        data: JSON.stringify(parsed.data),
        updatedBy: session.email,
      },
      update: { data: JSON.stringify(parsed.data), updatedBy: session.email },
    });
    updateTag(PORTED_TAG);
    return { ok: true };
  } catch {
    return { ok: false, error: "Kaydedilemedi." };
  }
}

export async function resetPortedContent(
  family: string,
  kind: string,
  locale: string,
): Promise<SavePortedResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };
  await prisma.portedContent
    .delete({ where: { family_kind_locale: { family, kind, locale } } })
    .catch(() => null);
  updateTag(PORTED_TAG);
  return { ok: true };
}
