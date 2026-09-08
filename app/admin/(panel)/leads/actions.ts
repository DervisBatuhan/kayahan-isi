"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const STATUSES = ["new", "contacted", "closed"] as const;
type LeadStatus = (typeof STATUSES)[number];

export type LeadActionResult = { ok: boolean; error?: string };

export async function updateLeadStatus(
  id: string,
  status: string,
): Promise<LeadActionResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };
  if (!STATUSES.includes(status as LeadStatus)) {
    return { ok: false, error: "Geçersiz durum." };
  }
  try {
    await prisma.lead.update({ where: { id }, data: { status } });
    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Güncellenemedi." };
  }
}

export async function updateLeadNotes(
  id: string,
  notes: string,
): Promise<LeadActionResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Oturum bulunamadı." };
  try {
    await prisma.lead.update({
      where: { id },
      data: { notes: notes.slice(0, 4000) },
    });
    revalidatePath(`/admin/leads/${id}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Kaydedilemedi." };
  }
}

export async function deleteLead(id: string) {
  const session = await getSession();
  if (!session) return;
  await prisma.lead.delete({ where: { id } }).catch(() => null);
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
