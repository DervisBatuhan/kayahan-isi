"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Globe } from "@/components/icons";
import { locales, type Locale } from "@/lib/i18n/config";
import { setLocaleCookie } from "@/lib/i18n/set-locale-cookie";

const LABEL: Record<Locale, string> = { tr: "TR", en: "EN" };

export function LangSwitcher({ current }: { current: Locale }) {
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
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/80 transition-colors hover:text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" />
        {LABEL[current]}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <ul
          className="absolute right-0 top-full z-50 mt-2 min-w-[88px] overflow-hidden rounded-[3px] border border-line bg-white py-1 text-ink-800 shadow-card"
          role="listbox"
        >
          {locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => switchTo(loc)}
                className={`block w-full px-3 py-1.5 text-left text-[12px] font-semibold hover:bg-surface-blue ${
                  loc === current ? "text-brand-600" : "text-ink-600"
                }`}
                role="option"
                aria-selected={loc === current}
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
