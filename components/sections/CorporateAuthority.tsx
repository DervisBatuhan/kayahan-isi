import { Container } from "@/components/ui/Container";
import { featureIcon } from "@/components/icons";
import type { SiteContent } from "@/lib/content/types";

export function CorporateAuthority({
  content,
}: {
  content: SiteContent["authority"];
}) {
  return (
    <section id="kurumsal-otorite" className="border-t border-line bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-label text-brand-600">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[24px] font-extrabold text-ink-900 sm:text-[28px]">
            {content.title}
          </h2>
          <span className="mx-auto mt-4 block h-[3px] w-14 rounded-full bg-danger-500" />
          <p className="mt-5 text-[14px] leading-relaxed text-ink-600">
            {content.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => {
            const Icon = featureIcon[item.icon];
            return (
              <article
                key={item.title}
                className="flex flex-col rounded-[4px] border border-line bg-white p-6 transition-colors hover:border-brand-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-surface-blue text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[14px] font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
