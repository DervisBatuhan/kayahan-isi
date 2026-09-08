import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LangSwitcher } from "./LangSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { SiteContent } from "@/lib/content/types";

export function TopBar({
  content,
  locale,
}: {
  content: SiteContent["topBar"];
  locale: Locale;
}) {
  return (
    <div className="bg-navy-800 text-white/80">
      <Container className="flex h-10 items-center justify-between text-[11px]">
        <ul className="hidden items-center gap-6 md:flex">
          {content.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="tracking-wide">{item}</span>
            </li>
          ))}
        </ul>
        <span className="tracking-wide md:hidden">{content.highlights[0]}</span>
        <div className="flex items-center gap-5">
          {content.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden font-semibold tracking-wide transition-colors hover:text-white sm:inline"
            >
              {link.label}
            </Link>
          ))}
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <LangSwitcher current={locale} />
        </div>
      </Container>
    </div>
  );
}
