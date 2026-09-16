import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { LEGAL_KINDS, LEGAL_LABEL } from "@/lib/content/ported/legal";

const PREFS: Record<Locale, string> = { tr: "Çerez Tercihleri", en: "Cookie Preferences" };

/**
 * Slim legal strip under the footer: the four legal pages plus the cookie
 * preferences trigger (handled by CookieConsent via `data-cookie-settings`).
 */
export function LegalBar({ locale, copyright }: { locale: Locale; copyright?: string }) {
  return (
    <div className="legalBar">
      <ul>
        {LEGAL_KINDS.map((k) => (
          <li key={k}>
            <Link href={`/${locale}/${k}`}>{LEGAL_LABEL[k][locale]}</Link>
          </li>
        ))}
        <li>
          <a href={`/${locale}/cerez-politikasi`} data-cookie-settings>
            {PREFS[locale]}
          </a>
        </li>
      </ul>
      {copyright && <small>{copyright}</small>}
    </div>
  );
}
