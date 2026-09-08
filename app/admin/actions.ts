"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkLoginThrottle,
  createSession,
  destroySession,
  recordLoginAttempt,
  verifyCredentials,
} from "@/lib/auth";

export type LoginState = { error?: string };

/** Best-effort client IP from the proxy headers Vercel / most hosts set. */
async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip")?.trim() || "";
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "E-posta ve şifre gerekli." };
  }

  const ip = await clientIp();

  const throttle = await checkLoginThrottle(ip);
  if (throttle.locked) {
    const mins = Math.ceil(throttle.retryAfterSec / 60);
    return {
      error: `Çok fazla başarısız deneme. Lütfen ${mins} dakika sonra tekrar deneyin.`,
    };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    await recordLoginAttempt(ip, email, false);
    return { error: "E-posta veya şifre hatalı." };
  }

  await recordLoginAttempt(ip, email, true);
  await createSession(user);
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
