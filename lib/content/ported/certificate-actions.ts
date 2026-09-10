"use server";

import { del } from "@vercel/blob";
import { getSession } from "@/lib/auth";
import { isBlobUrl } from "./certificates-shared";

export type DeleteFileResult = { ok: true } | { ok: false; error: string };

/**
 * Remove a certificate file from Vercel Blob. Called when a file is replaced or
 * its row is deleted in the editor. Best-effort: a failed delete only leaves an
 * orphan blob, it must not block the content save.
 */
export async function deleteCertificateFile(url: string): Promise<DeleteFileResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };
  if (!isBlobUrl(url)) return { ok: false, error: "Geçersiz dosya adresi." };

  try {
    await del(url);
    return { ok: true };
  } catch {
    return { ok: false, error: "Dosya silinemedi." };
  }
}
