"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import {
  CONSENT_EVENT,
  consentCookieString,
  makeConsent,
  readConsentCookie,
  type ConsentState,
} from "@/lib/consent/shared";
import "./cookie-consent.scss";

const T: Record<
  Locale,
  {
    title: string; body: string; acceptAll: string; necessaryOnly: string; manage: string; save: string; close: string;
    policy: string; prefsTitle: string; prefsIntro: string; always: string;
    cats: Record<"necessary" | "analytics", { name: string; desc: string }>;
  }
> = {
  tr: {
    title: "Çerez tercihleri",
    body: "Sitemizin çalışması için zorunlu çerezler kullanıyoruz. Onayınızla, ziyaretlerin nasıl gerçekleştiğini anlamamıza yardımcı olan analitik çerezleri de kullanabiliriz.",
    acceptAll: "Tümünü kabul et",
    necessaryOnly: "Yalnızca zorunlu",
    manage: "Tercihleri yönet",
    save: "Tercihleri kaydet",
    close: "Kapat",
    policy: "Çerez Politikası",
    prefsTitle: "Çerez tercihleri",
    prefsIntro: "Kategorileri açıp kapatabilirsiniz. Kararınızı istediğiniz zaman sayfa altındaki “Çerez Tercihleri” bağlantısından değiştirebilirsiniz.",
    always: "Her zaman açık",
    cats: {
      necessary: { name: "Zorunlu çerezler", desc: "Oturum, dil seçimi ve form güvenliği (Cloudflare Turnstile) için gereklidir; kapatılamaz." },
      analytics: { name: "Analitik çerezler", desc: "Google Analytics ile hangi sayfaların ziyaret edildiğini anonim olarak ölçer; siteyi iyileştirmemize yardımcı olur." },
    },
  },
  en: {
    title: "Cookie preferences",
    body: "We use necessary cookies to run the site. With your consent we also use analytics cookies that help us understand how visits happen.",
    acceptAll: "Accept all",
    necessaryOnly: "Necessary only",
    manage: "Manage preferences",
    save: "Save preferences",
    close: "Close",
    policy: "Cookie Policy",
    prefsTitle: "Cookie preferences",
    prefsIntro: "Toggle categories below. You can change your decision any time via the “Cookie Preferences” link in the footer.",
    always: "Always on",
    cats: {
      necessary: { name: "Necessary cookies", desc: "Required for the session, language choice and form security (Cloudflare Turnstile); cannot be switched off." },
      analytics: { name: "Analytics cookies", desc: "Measure which pages are visited, anonymously, via Google Analytics; helps us improve the site." },
    },
  },
};

/** Any element with `data-cookie-settings` reopens the preferences dialog. */
export function CookieConsent({ locale }: { locale: Locale }) {
  const t = T[locale];
  // Cookie is only readable on the client; lazy initialisers keep the first
  // client render in sync without a setState inside an effect.
  const [state, setState] = useState<ConsentState | null | "unknown">(() =>
    typeof document === "undefined" ? "unknown" : readConsentCookie(document.cookie),
  );
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() =>
    typeof document === "undefined" ? false : Boolean(readConsentCookie(document.cookie)?.analytics),
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  // Server HTML never contains the banner; only render it after hydration so
  // the client's first paint matches the server (no hydration mismatch).
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cookie-settings]");
      if (el) {
        e.preventDefault();
        setPrefsOpen(true);
      }
    };
    document.addEventListener("click", onOpen);
    return () => document.removeEventListener("click", onOpen);
  }, []);

  useEffect(() => {
    if (!prefsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPrefsOpen(false);
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [prefsOpen]);

  function commit(allowAnalytics: boolean) {
    const c = makeConsent(allowAnalytics);
    document.cookie = consentCookieString(c);
    setState(c);
    setAnalytics(allowAnalytics);
    setPrefsOpen(false);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  }

  const showBanner = mounted && state === null && !prefsOpen;
  const policyHref = `/${locale}/cerez-politikasi`;

  return (
    <>
      {showBanner && (
        <div className="cc-banner" role="region" aria-label={t.title}>
          <div className="cc-banner-text">
            <Cookie aria-hidden="true" />
            <div>
              <b>{t.title}</b>
              <p>
                {t.body} <Link href={policyHref}>{t.policy}</Link>
              </p>
            </div>
          </div>
          <div className="cc-banner-actions">
            <button type="button" className="cc-btn cc-btn--ghost" onClick={() => setPrefsOpen(true)}>
              {t.manage}
            </button>
            <button type="button" className="cc-btn cc-btn--ghost" onClick={() => commit(false)}>
              {t.necessaryOnly}
            </button>
            <button type="button" className="cc-btn cc-btn--primary" onClick={() => commit(true)}>
              {t.acceptAll}
            </button>
          </div>
        </div>
      )}

      {prefsOpen && (
        <div className="cc-backdrop" onClick={(e) => e.target === e.currentTarget && setPrefsOpen(false)}>
          <div className="cc-dialog" role="dialog" aria-modal="true" aria-labelledby="cc-title" ref={dialogRef}>
            <div className="cc-dialog-head">
              <ShieldCheck aria-hidden="true" />
              <h2 id="cc-title">{t.prefsTitle}</h2>
              <button type="button" className="cc-close" onClick={() => setPrefsOpen(false)} aria-label={t.close}>
                <X />
              </button>
            </div>
            <p className="cc-dialog-intro">
              {t.prefsIntro} <Link href={policyHref}>{t.policy}</Link>
            </p>
            <ul className="cc-cats">
              <li>
                <div>
                  <b>{t.cats.necessary.name}</b>
                  <p>{t.cats.necessary.desc}</p>
                </div>
                <span className="cc-locked">{t.always}</span>
              </li>
              <li>
                <div>
                  <b>{t.cats.analytics.name}</b>
                  <p>{t.cats.analytics.desc}</p>
                </div>
                <label className="cc-switch">
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                  <i aria-hidden="true" />
                  <span className="sr-only">{t.cats.analytics.name}</span>
                </label>
              </li>
            </ul>
            <div className="cc-dialog-actions">
              <button type="button" className="cc-btn cc-btn--ghost" onClick={() => commit(false)}>
                {t.necessaryOnly}
              </button>
              <button type="button" className="cc-btn cc-btn--ghost" onClick={() => commit(true)}>
                {t.acceptAll}
              </button>
              <button type="button" className="cc-btn cc-btn--primary" onClick={() => commit(analytics)}>
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
