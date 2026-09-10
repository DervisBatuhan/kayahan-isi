"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Award,
  BarChart3,
  ChevronDown,
  FileText,
  House,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  LayoutTemplate,
  Megaphone,
  Menu,
  PanelBottom,
  PanelTop,
  Route,
  Settings,
  ShieldCheck,
  Tag,
  UserRound,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type NavChild = { section: string; label: string; icon: LucideIcon };
type NavEntry = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  children?: NavChild[];
};

/**
 * Static nav tree — defined here (inside the client component) rather than
 * in the server layout, because the icon components are function references
 * and can't cross the server → client prop boundary (they'd arrive as
 * `undefined` on the client).
 */
const NAV: NavEntry[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
  {
    href: "/admin/home",
    label: "Ana Sayfa İçeriği",
    icon: House,
    children: [
      { section: "hero", label: "Hero", icon: LayoutTemplate },
      { section: "stats", label: "İstatistikler", icon: BarChart3 },
      { section: "activity-areas", label: "Faaliyet Alanlarımız", icon: LayoutGrid },
      { section: "journey", label: "Yolculuğumuz", icon: Route },
      { section: "corporate-strength", label: "Kurumsal Gücümüz", icon: ShieldCheck },
      { section: "engineering", label: "Mühendislik Çözümleri", icon: Wrench },
      { section: "home-bands", label: "Ana Sayfa Bantları", icon: LayoutGrid },
      { section: "founder", label: "Kurucu Hikâyesi", icon: UserRound },
      { section: "authority", label: "Kurumsal Otorite", icon: Award },
      { section: "cta-band", label: "Kapanış Bandı", icon: Megaphone },
    ],
  },
  { href: "/admin/pages", label: "Sayfalar", icon: FileText },
  { href: "/admin/design-pages", label: "Tasarım Sayfaları", icon: LayoutTemplate },
  { href: "/admin/certificates", label: "Sertifikalar", icon: Award },
  { href: "/admin/leads", label: "Talepler", icon: Inbox },
  {
    href: "/admin/settings",
    label: "Menü & İletişim",
    icon: Settings,
    children: [
      { section: "brand", label: "Marka", icon: Tag },
      { section: "topbar", label: "Üst Bar", icon: PanelTop },
      { section: "nav", label: "Navigasyon", icon: Menu },
      { section: "footer", label: "Footer", icon: PanelBottom },
    ],
  },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale");
  const currentSection = searchParams.get("section");

  return (
    <nav className="flex-1 space-y-1 p-3">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;

        if (!item.children) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-[4px] px-3 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-surface-blue text-brand-600"
                  : "text-ink-600 hover:bg-surface-blue hover:text-brand-600"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              {item.label}
            </Link>
          );
        }

        return (
          <details
            key={item.href}
            open={active}
            className="group [&_summary::-webkit-details-marker]:hidden"
          >
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-2 rounded-[4px] px-3 py-2 text-[13px] font-medium transition-colors select-none ${
                active ? "text-brand-600" : "text-ink-600 hover:bg-surface-blue hover:text-brand-600"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                {item.label}
              </span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-0.5 ml-3 space-y-0.5 border-l border-line pl-3">
              {item.children.map((child, i) => {
                const ChildIcon = child.icon;
                const query = new URLSearchParams();
                query.set("section", child.section);
                if (locale) query.set("locale", locale);
                const childActive =
                  active &&
                  (currentSection === child.section || (!currentSection && i === 0));
                return (
                  <Link
                    key={child.section}
                    href={`${item.href}?${query.toString()}`}
                    aria-current={childActive ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-[4px] px-2 py-1.5 text-[12px] font-medium transition-colors ${
                      childActive
                        ? "bg-surface-blue text-brand-600"
                        : "text-ink-500 hover:bg-surface-blue hover:text-brand-600"
                    }`}
                  >
                    <ChildIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </nav>
  );
}
