import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroBackdrop } from "@/components/graphics/HeroBackdrop";
import type { SiteContent } from "@/lib/content/types";

export function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[66%] lg:block">
        <HeroBackdrop className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      <Container className="relative">
        <div className="max-w-[540px] py-16 sm:py-20 lg:py-24">
          <h1 className="font-display text-[38px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[50px]">
            {content.titleLines.map((line, i) => (
              <span
                key={line}
                className={`block ${
                  i === content.accentLineIndex ? "text-brand-500" : "text-ink-900"
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 text-[18px] font-bold text-navy-700 sm:text-[20px]">
            {content.subtitlePre}
            <span className="text-accent-500">{content.subtitleAccent}</span>
            {content.subtitlePost}
          </p>

          <p className="mt-5 max-w-[420px] text-[13.5px] leading-[1.7] text-ink-500">
            {content.paragraph}
          </p>

          <Link
            href={content.link.href}
            className="group mt-8 inline-block text-[14px] font-semibold text-navy-700"
          >
            {content.link.label}
            <span className="mt-2 block h-[2px] w-full bg-brand-500 transition-all duration-300" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
