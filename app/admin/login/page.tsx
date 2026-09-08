import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Panel Girişi" };

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/admin";

  return (
    <div className="flex min-h-dvh items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-extrabold tracking-tight text-white">
            KAYAHAN<span className="text-brand-400">ISI</span>
          </p>
          <p className="mt-1 text-[12px] uppercase tracking-label text-white/50">
            Yönetim Paneli
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white p-6 shadow-2xl">
          <h1 className="text-[15px] font-bold text-ink-900">Panel Girişi</h1>
          <p className="mt-1 text-[12.5px] text-ink-500">
            Devam etmek için giriş yapın.
          </p>
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
