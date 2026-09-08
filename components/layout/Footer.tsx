import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "./Logo";
import { MapPin, Phone, Mail, MessageCircle, socialIcon } from "@/components/icons";
import type { SiteContent } from "@/lib/content/types";

export function Footer({
  brand,
  footer,
  homeHref,
}: {
  brand: SiteContent["brand"];
  footer: SiteContent["footer"];
  homeHref: string;
}) {
  return (
    <footer className="bg-navy-900 text-white/70">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] lg:gap-8">
        <div className="max-w-xs">
          <Logo brand={brand} href={homeHref} tone="light" />
          <p className="mt-5 text-[12.5px] leading-[1.7] text-white/55">
            {footer.description}
          </p>
          <p className="mt-5 text-[11.5px] text-white/40">{footer.copyright}</p>
          <div className="mt-3 flex items-center gap-2.5">
            {footer.social.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-brand-400 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-bold uppercase tracking-label text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12.5px] text-white/55 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-label text-white">
            {footer.contact.title}
          </h3>
          <ul className="mt-4 space-y-3 text-[12.5px] text-white/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span className="whitespace-pre-line">{footer.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-400" />
              <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {footer.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-400" />
              <a href={`mailto:${footer.contact.email}`} className="hover:text-white">
                {footer.contact.email}
              </a>
            </li>
            {footer.contact.whatsapp && (
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-brand-400" />
                <a
                  href={`https://wa.me/${footer.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
          <CtaButton href={footer.contact.cta.href} variant="ghost" size="sm" className="mt-5">
            {footer.contact.cta.label}
          </CtaButton>
        </div>
      </Container>
    </footer>
  );
}
