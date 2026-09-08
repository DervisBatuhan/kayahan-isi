import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { ThemeProvider, ThemeToggle } from "@/components/admin/ThemeProvider";
import { logoutAction } from "../actions";

export const metadata: Metadata = {
  title: { default: "Yönetim Paneli", template: "%s · Kayahan Isı Panel" },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <ThemeProvider>
      <div className="flex min-h-dvh bg-surface-muted text-ink-900">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-white md:flex">
          <div className="border-b border-line px-5 py-4">
            <Link href="/admin" className="font-display text-[17px] font-extrabold tracking-tight text-navy-700">
              KAYAHAN<span className="text-brand-500">ISI</span>
            </Link>
            <p className="text-[10px] uppercase tracking-label text-ink-400">Panel</p>
          </div>
          <Suspense fallback={<nav className="flex-1 p-3" />}>
            <Sidebar />
          </Suspense>
          <div className="border-t border-line p-3">
            <ThemeToggle />
          </div>
          <div className="border-t border-line p-3">
            <p className="px-3 text-[12px] font-semibold text-ink-800">{session.name}</p>
            <p className="px-3 text-[11px] text-ink-400">{session.email}</p>
            <form action={logoutAction}>
              <button className="mt-2 w-full rounded-[4px] px-3 py-2 text-left text-[12.5px] font-medium text-danger-600 transition-colors hover:bg-danger-500/10">
                Çıkış Yap
              </button>
            </form>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line bg-white px-5 py-3 md:hidden">
            <Link href="/admin" className="font-display text-[15px] font-extrabold text-navy-700">
              KAYAHAN<span className="text-brand-500">ISI</span> Panel
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle compact />
              <form action={logoutAction}>
                <button className="text-[12px] font-semibold text-danger-600">Çıkış</button>
              </form>
            </div>
          </header>
          <main className="flex-1 p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
