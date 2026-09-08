"use server";

import { refresh } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession, hashPassword } from "@/lib/auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Bu işlem için yönetici yetkisi gerekli." };

  const email = input.email.trim().toLowerCase();
  if (!email || !input.name.trim()) return { ok: false, error: "Ad ve e-posta gerekli." };
  if (input.password.length < 8) return { ok: false, error: "Şifre en az 8 karakter olmalı." };

  const exists = await prisma.adminUser.findUnique({ where: { email } });
  if (exists) return { ok: false, error: "Bu e-posta zaten kayıtlı." };

  await prisma.adminUser.create({
    data: {
      email,
      name: input.name.trim(),
      role: input.role === "admin" ? "admin" : "editor",
      passwordHash: await hashPassword(input.password),
    },
  });

  refresh();
  return { ok: true };
}

export async function updateUserRole(id: string, role: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Bu işlem için yönetici yetkisi gerekli." };
  if (session.uid === id) return { ok: false, error: "Kendi rolünü değiştiremezsin." };

  await prisma.adminUser.update({
    where: { id },
    data: { role: role === "admin" ? "admin" : "editor" },
  });

  refresh();
  return { ok: true };
}

export async function resetUserPassword(id: string, password: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Bu işlem için yönetici yetkisi gerekli." };
  if (password.length < 8) return { ok: false, error: "Şifre en az 8 karakter olmalı." };

  await prisma.adminUser.update({
    where: { id },
    data: { passwordHash: await hashPassword(password) },
  });

  return { ok: true };
}

export async function deleteUser(id: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Bu işlem için yönetici yetkisi gerekli." };
  if (session.uid === id) return { ok: false, error: "Kendi hesabını silemezsin." };

  const adminCount = await prisma.adminUser.count({ where: { role: "admin" } });
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (target?.role === "admin" && adminCount <= 1) {
    return { ok: false, error: "Son yönetici hesabı silinemez." };
  }

  await prisma.adminUser.delete({ where: { id } });
  refresh();
  return { ok: true };
}
