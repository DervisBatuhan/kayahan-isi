import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/lib/content/types";

export function FounderStory({ content }: { content: SiteContent["founder"] }) {
  return (
    <section id="kurucu-hikayesi" className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[180px] font-extrabold leading-none text-white/[0.045] sm:text-[240px]"
      >
        {content.watermark}
      </span>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-label text-brand-400">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 max-w-md font-display text-[30px] font-extrabold leading-[1.12] sm:text-[38px]">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/65">
              {content.lead}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {content.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/75"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-10">
            <div className="space-y-4 border-l-2 border-brand-500 pl-6">
              {content.paragraphs.map((p) => (
                <p key={p} className="text-[13.5px] leading-relaxed text-white/60">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 pl-6">
              <p className="font-display text-[24px] font-bold italic text-white">
                {content.signature}
              </p>
              <span className="mt-2 block h-[2px] w-12 bg-accent-500" />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-label text-white/50">
                {content.signatureRole}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
