/**
 * Cookie-consent state. Pure module: shared by the banner (client), the
 * analytics loader (client) and tests.
 *
 * Only two categories exist today. `necessary` is always on (session, locale,
 * Turnstile). `analytics` gates GA4. Add `marketing` here if ads ever arrive —
 * the banner and the preferences dialog render from this list.
 */
export const CONSENT_COOKIE = "kh_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_TTL_DAYS = 180;

export type ConsentCategory = "necessary" | "analytics";
export type ConsentState = {
  v: number;
  /** ISO timestamp of the decision */
  at: string;
  necessary: true;
  analytics: boolean;
};

export const CATEGORIES: { key: ConsentCategory; locked: boolean }[] = [
  { key: "necessary", locked: true },
  { key: "analytics", locked: false },
];

export function makeConsent(analytics: boolean, now = new Date()): ConsentState {
  return { v: CONSENT_VERSION, at: now.toISOString(), necessary: true, analytics };
}

export function serializeConsent(c: ConsentState): string {
  return encodeURIComponent(JSON.stringify(c));
}

/** Returns null for a missing, malformed or outdated (older version) cookie. */
export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (o.v !== CONSENT_VERSION || typeof o.analytics !== "boolean" || typeof o.at !== "string") return null;
    return { v: CONSENT_VERSION, at: o.at, necessary: true, analytics: o.analytics };
  } catch {
    return null;
  }
}

export function readConsentCookie(cookieHeader: string): ConsentState | null {
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
  return parseConsent(m?.[1]);
}

export function consentCookieString(c: ConsentState): string {
  const maxAge = CONSENT_TTL_DAYS * 24 * 60 * 60;
  return `${CONSENT_COOKIE}=${serializeConsent(c)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

/** Name of the DOM event fired when the visitor changes their choice. */
export const CONSENT_EVENT = "kh-consent-change";
