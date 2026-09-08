"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "kh-admin-theme";
const listeners = new Set<() => void>();

function readDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "dark";
  } catch {
    // localStorage unavailable — fall through to the system preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setDarkPreference(next: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // ignore — the toggle still works for the current tab via re-render.
  }
  listeners.forEach((notify) => notify());
}

const ThemeContext = createContext<{ dark: boolean; toggle: () => void } | null>(null);

/**
 * Reads the persisted/system theme via `useSyncExternalStore` (server
 * snapshot is always light) so the admin panel picks up the saved
 * preference without a manual effect+setState render cascade.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const dark = useSyncExternalStore(subscribe, readDark, () => false);
  const toggle = useCallback(() => setDarkPreference(!readDark()), []);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className={dark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;

  if (compact) {
    return (
      <button
        type="button"
        onClick={ctx.toggle}
        aria-label={ctx.dark ? "Açık moda geç" : "Koyu moda geç"}
        className="flex h-8 w-8 items-center justify-center rounded-[4px] text-ink-500 transition-colors hover:bg-surface-blue hover:text-brand-600"
      >
        {ctx.dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={ctx.toggle}
      className="flex w-full items-center gap-2 rounded-[4px] px-3 py-2 text-left text-[12.5px] font-medium text-ink-600 transition-colors hover:bg-surface-blue hover:text-brand-600"
    >
      {ctx.dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {ctx.dark ? "Açık mod" : "Koyu mod"}
    </button>
  );
}
