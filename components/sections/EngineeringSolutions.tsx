import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { BuildingDiagram } from "@/components/graphics/BuildingDiagram";
import { featureIcon } from "@/components/icons";
import type { SiteContent } from "@/lib/content/types";

export function EngineeringSolutions({
  content,
}: {
  content: SiteContent["engineering"];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_0.8fr_1.6fr] lg:gap-8">
          {/* Intro */}
          <div>
            <h2 className="font-display text-[21px] font-extrabold uppercase leading-[1.15] tracking-[0.03em] text-ink-900 sm:text-[24px]">
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

          {/* Steps */}
          <ul className="flex flex-col gap-5">
            {content.steps.map((step) => {
              const Icon = featureIcon[step.icon];
              return (
                <li key={step.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <div>
                    <h3 className="text-[13px] font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-0.5 text-[11.5px] leading-[1.5] text-ink-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Diagram + callouts */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <BuildingDiagram className="w-full max-w-[360px] shrink-0" />
            <ul className="flex flex-1 flex-col gap-5">
              {content.callouts.map((c) => {
                const Icon = featureIcon[c.icon];
                return (
                  <li key={c.title} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-3 hidden h-px w-6 shrink-0 border-t border-dashed border-line-strong sm:block"
                    />
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-brand-500">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-[12.5px] font-bold text-ink-900">{c.title}</h3>
                      <p className="mt-0.5 text-[11px] leading-[1.5] text-ink-500">
                        {c.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
