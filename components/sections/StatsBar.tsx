import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/lib/content/types";

const valueColor = ["text-brand-400", "text-danger-500", "text-brand-400", "text-white"];

export function StatsBar({ stats }: { stats: SiteContent["stats"] }) {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 46px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700" />
      <Container className="relative">
        <ul className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
          {stats.map((stat, i) => (
            <li key={stat.label} className="px-2 py-8 text-center lg:py-10">
              <p className="font-display text-[32px] font-extrabold leading-none sm:text-[38px]">
                <span className={valueColor[i % valueColor.length]}>{stat.value}</span>
                {stat.suffix && (
                  <span className={`text-[20px] ${valueColor[i % valueColor.length]}`}>
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p className="mt-2 text-[12px] font-medium tracking-wide text-white/70">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
