"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="mt-5 space-y-4">
      <input type="hidden" name="next" value={next} />

      <label className="block">
        <span className="text-[12px] font-semibold text-ink-700">E-posta</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-[4px] border border-line px-3 py-2 text-[14px] outline-none focus:border-brand-500"
        />
      </label>

      <label className="block">
        <span className="text-[12px] font-semibold text-ink-700">Şifre</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-[4px] border border-line px-3 py-2 text-[14px] outline-none focus:border-brand-500"
        />
      </label>

      {state.error && (
        <p className="rounded-[4px] bg-danger-500/10 px-3 py-2 text-[12.5px] font-medium text-danger-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[4px] bg-navy-700 px-4 py-2.5 text-[13px] font-bold uppercase tracking-label text-white transition-colors hover:bg-navy-600 disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
