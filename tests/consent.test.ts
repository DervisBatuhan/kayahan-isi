import { describe, it, expect } from "vitest";
import { CONSENT_COOKIE, consentCookieString, makeConsent, parseConsent, readConsentCookie, serializeConsent } from "@/lib/consent/shared";

describe("lib/consent/shared", () => {
  it("round-trips a decision through the cookie value", () => {
    const c = makeConsent(true, new Date("2026-09-17T10:00:00Z"));
    expect(parseConsent(serializeConsent(c))).toEqual(c);
    expect(readConsentCookie(`a=1; ${consentCookieString(c).split(";")[0]}; b=2`)).toEqual(c);
  });
  it("treats missing, malformed or old-version cookies as no decision", () => {
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent("%7Bnope")).toBeNull();
    expect(parseConsent(encodeURIComponent(JSON.stringify({ v: 0, at: "x", analytics: true })))).toBeNull();
    expect(readConsentCookie("foo=bar")).toBeNull();
  });
  it("writes a 180-day, Lax, root-path cookie", () => {
    const str = consentCookieString(makeConsent(false));
    expect(str).toMatch(new RegExp(`^${CONSENT_COOKIE}=`));
    expect(str).toContain("Max-Age=15552000");
    expect(str).toContain("Path=/");
    expect(str).toContain("SameSite=Lax");
  });
});
