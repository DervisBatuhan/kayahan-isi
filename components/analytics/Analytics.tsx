"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, readConsentCookie, type ConsentState } from "@/lib/consent/shared";

/**
 * Google Analytics 4 behind cookie consent (Consent Mode v2).
 *
 * - Renders nothing unless `NEXT_PUBLIC_GA_ID` is set (inert locally).
 * - `gtag('consent','default', …denied)` is always declared first, so even if
 *   the tag loads it starts in the denied state.
 * - The gtag.js script itself is only injected once the visitor has granted
 *   the analytics category; a later change (footer "Çerez Tercihleri") flips
 *   the consent state without a reload.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const apply = (c: ConsentState | null) => setGranted(Boolean(c?.analytics));
    apply(readConsentCookie(document.cookie));
    const onChange = (e: Event) => {
      const c = (e as CustomEvent<ConsentState>).detail;
      apply(c);
      const w = window as Window & { gtag?: (...a: unknown[]) => void };
      w.gtag?.("consent", "update", {
        analytics_storage: c.analytics ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!id) return null;

  return (
    <>
      <Script id="ga4-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      {granted && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'update', { analytics_storage: 'granted' });
              gtag('js', new Date());
              gtag('config', '${id}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
    </>
  );
}
