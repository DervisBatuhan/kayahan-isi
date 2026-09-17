import { MessageCircle, Phone, Wrench } from "lucide-react";
import type { SiteContent } from "@/lib/content/types";
import "./service-bar.scss";

/**
 * Mobile-only sticky bar: Call · WhatsApp · Service request. Most service
 * customers arrive on a phone and want to call — this keeps that one tap away
 * on every page. Hidden on desktop by CSS.
 */
export function ServiceBar({ site }: { site: SiteContent }) {
  const sf = site.serviceFocus;
  const phone = site.footer.contact.phone;
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const wa = site.footer.contact.whatsapp ? `https://wa.me/${site.footer.contact.whatsapp}` : "";
  return (
    <nav className="serviceBar" aria-label={sf.bar.form}>
      <a href={tel}>
        <Phone /> <span>{sf.bar.call}</span>
      </a>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="serviceBar__wa">
          <MessageCircle /> <span>{sf.bar.whatsapp}</span>
        </a>
      )}
      <a href={sf.heroPrimary.href} className="serviceBar__form">
        <Wrench /> <span>{sf.bar.form}</span>
      </a>
    </nav>
  );
}
