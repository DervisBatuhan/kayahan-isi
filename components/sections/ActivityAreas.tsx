import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LineArt } from "@/components/graphics/LineArt";
import { ArrowRight } from "@/components/icons";
import type { AccentKey, SiteContent } from "@/lib/content/types";

const titleColor: Record<AccentKey, string> = {
  lacivert: "text-navy-700",
  turkuaz: "text-brand-500",
  kirmizi: "text-danger-500",
  turuncu: "text-accent-500",
  sari: "text-sari-600",
};

export function ActivityAreas({
  content,
}: {
  content: SiteContent["activityAreas"];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading>{content.eyebrow}</SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {content.items.map((area, i) => (
            <Link
              key={area.slug}
              href={`#${area.slug}`}
              className="group flex flex-col rounded-[4px] border border-line bg-white p-6 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
            >
              <h3
                className={`text-[13px] font-extrabold uppercase tracking-[0.08em] ${titleColor[area.accent]}`}
              >
                {area.title}
              </h3>
              <div className="my-5 flex h-24 items-center justify-center">
                <LineArt variant={i} accent={area.accent} className="h-full w-full" />
              </div>
              <p className="text-[12px] leading-[1.6] text-ink-500">
                {area.description}
              </p>
              <ArrowRight className="mx-auto mt-4 h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
