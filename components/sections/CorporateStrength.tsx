import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featureIcon } from "@/components/icons";
import type { SiteContent } from "@/lib/content/types";

export function CorporateStrength({
  content,
}: {
  content: SiteContent["corporateStrength"];
}) {
  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading>{content.eyebrow}</SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {content.items.map((item) => {
            const Icon = featureIcon[item.icon];
            return (
              <div key={item.title} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-8 w-8 shrink-0 text-navy-700" strokeWidth={1.5} />
                <div>
                  <h3 className="text-[13px] font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-[11px] leading-[1.55] text-ink-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
