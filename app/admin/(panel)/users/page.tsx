import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { UsersEditor } from "@/components/admin/UsersEditor";

export const metadata: Metadata = { title: "Kullanıcılar" };

export default async function UsersPage() {
  const session = await getSession();

  if (session?.role !== "admin") {
    return (
      <div className="mx-auto max-w-4xl">
        <h1 className="text-[20px] font-extrabold text-ink-900">Kullanıcılar</h1>
        <div className="mt-6 rounded-[6px] border border-dashed border-line bg-white p-10 text-center text-[13px] text-ink-500">
          Kullanıcı yönetimi için yönetici yetkisi gerekiyor.
        </div>
      </div>
    );
  }

  const rows = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-[20px] font-extrabold text-ink-900">Kullanıcılar</h1>
      <p className="mt-1 text-[13px] text-ink-500">Panel kullanıcıları ve şifre yönetimi.</p>

      <div className="mt-6">
        <UsersEditor
          currentUid={session.uid}
          users={rows.map((r) => ({
            id: r.id,
            name: r.name,
            email: r.email,
            role: r.role,
            createdAt: r.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
