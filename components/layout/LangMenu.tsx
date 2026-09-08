"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n/config";
import { setLocaleCookie } from "@/lib/i18n/set-locale-cookie";

const LABEL: Record<Locale, string> = { tr: "TR", en: "EN" };

/**
 * Language switcher used inside the "trust bar" (homepage + shared inner-page
 * chrome). Swaps only the locale segment so the visitor stays on the same page.
 */
export function LangMenu({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchTo(next: Locale) {
    setOpen(false);
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
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LABEL[current]} <ChevronDown />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[88px] overflow-hidden rounded-[3px] border border-line bg-white py-1 text-ink-800 shadow-card"
        >
          {locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => switchTo(loc)}
                role="option"
                aria-selected={loc === current}
                // Inline colour beats the ambient `.trust button{color:#fff}` rule.
                style={{ color: loc === current ? "#2670bf" : "#55617a" }}
                className="block w-full px-3 py-1.5 text-left text-[12px] font-semibold hover:bg-surface-blue"
              >
                {LABEL[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
