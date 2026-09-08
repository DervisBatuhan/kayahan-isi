import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import type { SiteContent } from "@/lib/content/types";

export function CtaBand({ content }: { content: SiteContent["ctaBand"] }) {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700" />
      <svg
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 md:block"
        viewBox="0 0 500 220"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cta-warm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f58220" stopOpacity="0" />
            <stop offset="0.6" stopColor="#f58220" />
            <stop offset="1" stopColor="#d71920" />
          </linearGradient>
        </defs>
        {[0, 16, 32, 48, 64].map((o) => (
          <path
            key={o}
            d={`M-20 ${150 + o} C 140 ${70 + o}, 260 ${190 + o}, 520 ${90 + o}`}
            stroke="url(#cta-warm)"
            strokeWidth="2"
            opacity={0.9 - o / 90}
          />
        ))}
      </svg>

      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-[24px] font-extrabold text-white sm:text-[30px]">
              {content.title}
            </h2>
            <p className="mt-2 text-[14px] text-white/70">{content.subtitle}</p>
          </div>
          <CtaButton href={content.cta.href} variant="light" className="shrink-0">
            {content.cta.label}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
