import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const COOKIE = "kh_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
}

export type Session = {
  uid: string;
  email: string;
  name: string;
  role: string;
};

export async function createSession(user: Session) {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      uid: String(payload.uid),
      email: String(payload.email),
      name: String(payload.name),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

/** Verify a raw JWT string without Node APIs — safe for `proxy.ts`. */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export const SESSION_COOKIE = COOKIE;

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.adminUser.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { uid: user.id, email: user.email, name: user.name, role: user.role };
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/* ── login brute-force throttling ─────────────────────────────────────── */

/** How far back we count failures, and how many are allowed in that window. */
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_MAX_FAILS = 5;

export type LoginThrottle = { locked: boolean; retryAfterSec: number };

/**
 * Count recent failed attempts from this IP. When at/over the limit the caller
 * must refuse the login without checking the password. Fails open (never locks)
 * if the query itself errors, so a DB hiccup can't wall admins out.
 */
export async function checkLoginThrottle(ip: string): Promise<LoginThrottle> {
  if (!ip) return { locked: false, retryAfterSec: 0 };
  const since = new Date(Date.now() - LOGIN_WINDOW_MS);
  try {
    const fails = await prisma.loginAttempt.findMany({
      where: { ip, ok: false, createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    });
    if (fails.length < LOGIN_MAX_FAILS) return { locked: false, retryAfterSec: 0 };
    const oldest = fails[fails.length - LOGIN_MAX_FAILS].createdAt.getTime();
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldest + LOGIN_WINDOW_MS - Date.now()) / 1000),
    );
    return { locked: true, retryAfterSec };
  } catch (err) {
    console.error("[auth] checkLoginThrottle failed:", err);
    return { locked: false, retryAfterSec: 0 };
  }
}

/** Record one attempt and opportunistically prune rows older than the window. */
export async function recordLoginAttempt(
  ip: string,
  email: string,
  ok: boolean,
): Promise<void> {
  try {
    await prisma.loginAttempt.create({
      data: { ip: ip || "unknown", email: email.slice(0, 160), ok },
    });
    // On a clean login, clear this IP's slate so a legit user isn't near a lock.
    if (ok && ip) {
      await prisma.loginAttempt.deleteMany({ where: { ip, ok: false } });
    }
    await prisma.loginAttempt.deleteMany({
      where: { createdAt: { lt: new Date(Date.now() - LOGIN_WINDOW_MS) } },
    });
  } catch (err) {
    console.error("[auth] recordLoginAttempt failed:", err);
  }
}
