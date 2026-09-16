"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);
  const [showPassword, setShowPassword] = useState(false);

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
        <span className="relative mt-1 block">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-[4px] border border-line py-2 pl-3 pr-10 text-[14px] outline-none focus:border-brand-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
            aria-pressed={showPassword}
            title={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-400 transition-colors hover:text-ink-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
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
