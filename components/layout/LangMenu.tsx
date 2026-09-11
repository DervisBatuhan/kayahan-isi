"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { setLocaleCookie } from "@/lib/i18n/set-locale-cookie";

const LABEL: Record<Locale, string> = { tr: "TR", en: "EN" };

/**
 * Language switcher used inside the "trust bar" (homepage + shared inner-page
 * chrome). Inline `TR / EN` toggle (matches the approved v20 reference). Swaps
 * only the locale segment so the visitor stays on the same page.
 */
export function LangMenu({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === current) return;
    setLocaleCookie(next);
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className="languageSwitch" aria-label="Dil seçimi">
      {locales.flatMap((loc, i) => [
        i > 0 ? <span key={`sep-${loc}`}>/</span> : null,
        <button
          key={loc}
          type="button"
          className={loc === current ? "active" : ""}
          aria-current={loc === current ? "true" : undefined}
          onClick={() => switchTo(loc)}
        >
          {LABEL[loc]}
        </button>,
      ])}
    </div>
  );
}
