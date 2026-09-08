"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { ChevronDown } from "@/components/icons";
import { Logo } from "./Logo";
import type { SiteContent } from "@/lib/content/types";

export function Header({
  brand,
  nav,
  homeHref,
}: {
  brand: SiteContent["brand"];
  nav: SiteContent["nav"];
  homeHref: string;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between gap-4">
        <Logo brand={brand} href={homeHref} />

        <nav className="hidden items-center gap-3.5 xl:flex 2xl:gap-6">
          {nav.items.map((item) => (
            <div
              key={item.label}
              className="relative shrink-0"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap py-6 text-[11.5px] font-bold uppercase tracking-[0.01em] text-ink-800 transition-colors hover:text-brand-600 2xl:text-[13px] 2xl:tracking-[0.04em]"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3 w-3 shrink-0 text-ink-400" />}
              </Link>
              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full z-50 min-w-[248px] overflow-hidden rounded-[3px] border border-line bg-white py-2 shadow-card">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-[13px] font-medium text-ink-600 transition-colors hover:bg-surface-blue hover:text-brand-600"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 xl:block">
          <CtaButton href={nav.cta.href} size="sm" className="2xl:px-6 2xl:py-3.5 2xl:text-[12px]">
            {nav.cta.label}
          </CtaButton>
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span className={`h-0.5 w-6 bg-ink-800 transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink-800 transition ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-ink-800 transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-line bg-white xl:hidden">
          <Container className="py-4">
            <ul className="divide-y divide-line">
              {nav.items.map((item) => (
                <li key={item.label} className="py-3">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[14px] font-bold uppercase tracking-wide text-ink-800"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-2 flex flex-col gap-2 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[13px] text-ink-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <CtaButton href={nav.cta.href} className="w-full justify-center">
                {nav.cta.label}
              </CtaButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
