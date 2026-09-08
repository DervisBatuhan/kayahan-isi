import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { milestoneIcons } from "@/components/icons";
import type { AccentKey, SiteContent } from "@/lib/content/types";

const yearColor: Record<AccentKey, string> = {
  lacivert: "text-navy-700",
  turkuaz: "text-brand-500",
  kirmizi: "text-danger-500",
  turuncu: "text-accent-600",
  sari: "text-sari-700",
};
const dotColor: Record<AccentKey, string> = {
  lacivert: "bg-navy-700",
  turkuaz: "bg-brand-500",
  kirmizi: "bg-danger-500",
  turuncu: "bg-accent-500",
  sari: "bg-sari-500",
};

export function Journey({ content }: { content: SiteContent["journey"] }) {
  return (
    <section className="bg-surface-muted py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          <div>
            <h2 className="font-display text-[22px] font-extrabold uppercase leading-[1.15] tracking-[0.03em] text-ink-900 sm:text-[26px]">
              {content.eyebrow}
            </h2>
            <span className="mt-4 block h-[3px] w-12 rounded-full bg-danger-500" />
            <p className="mt-5 text-[13px] leading-[1.7] text-ink-500">
              {content.paragraph}
            </p>
            <CtaButton href={content.cta.href} variant="outline" className="mt-6">
              {content.cta.label}
            </CtaButton>
          </div>

          <ol className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
            {content.milestones.map((m, i) => {
              const Icon = milestoneIcons[i % milestoneIcons.length];
              const first = i === 0;
              return (
                <li key={m.year} className="relative flex flex-col items-center text-center">
                  <p className={`text-[18px] font-extrabold ${yearColor[m.accent]}`}>
                    {m.year}
                  </p>

                  <div className="relative my-3 flex h-4 w-full items-center justify-center">
                    <span className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-line-strong lg:block" />
                    {first ? (
                      <span className="relative z-10 h-4 w-4 rounded-full bg-danger-500 ring-4 ring-danger-500/20" />
                    ) : (
                      <span
                        className={`relative z-10 h-2.5 w-2.5 rounded-full ${dotColor[m.accent]} ring-2 ring-white`}
                      />
                    )}
                  </div>

                  <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-[12.5px] font-bold text-ink-900">{m.title}</h3>
                  <p className="mt-1 text-[11px] leading-[1.5] text-ink-500">
                    {m.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
