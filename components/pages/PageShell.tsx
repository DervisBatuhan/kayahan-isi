import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChevronDown } from "@/components/icons";
import type { ChildLink, PageDoc } from "@/lib/content/pages";

type Crumb = { label: string; href: string };

export function PageShell({
  locale,
  page,
  crumbs,
  draftNote,
  moreLabel,
}: {
  locale: string;
  page: PageDoc;
  crumbs: Crumb[];
  draftNote: string;
  moreLabel: string;
}) {
  return (
    <>
      <section className="border-b border-line bg-surface-muted">
        <Container className="py-10 sm:py-14">
          <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-[12px] text-ink-500">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronDown className="h-3 w-3 -rotate-90 text-ink-400" />}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-brand-600">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink-700">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <p className="mt-6 text-[12px] font-bold uppercase tracking-label text-brand-600">
            {page.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[30px] font-extrabold leading-tight text-ink-900 sm:text-[40px]">
            {page.title}
          </h1>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <p className="max-w-3xl text-[15px] leading-relaxed text-ink-600">
            {page.intro}
          </p>

          {page.bullets && page.bullets.length > 0 && (
            <ul className="mt-8 max-w-3xl space-y-3">
              {page.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-ink-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {page.children && page.children.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.children.map((child: ChildLink) => (
                <Link
                  key={child.slug}
                  href={`/${locale}/${child.slug}`}
                  className="group flex flex-col rounded-[4px] border border-line bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <h3 className="text-[15px] font-bold text-ink-900 group-hover:text-brand-600">
                    {child.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                    {child.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-label text-brand-600">
                    {moreLabel}
                    <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {!page.children && !page.bullets?.length && (
            <p className="mt-8 inline-block rounded-[3px] border border-line bg-surface-muted px-4 py-2 text-[12.5px] text-ink-500">
              {draftNote}
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
