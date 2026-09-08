import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();
  const [pageCount, leadCount, newLeadCount, userCount, contentCount] =
    await Promise.all([
      prisma.page.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.adminUser.count(),
      prisma.siteContent.count(),
    ]);

  const stats = [
    { label: "Sayfa", value: pageCount, href: "/admin/pages" },
    { label: "Talep", value: leadCount, href: "/admin/leads", note: `${newLeadCount} yeni` },
    { label: "Dil (içerik)", value: contentCount, href: "/admin/home" },
    { label: "Kullanıcı", value: userCount, href: "/admin/users" },
  ];

  const sections = [
    { href: "/admin/home", title: "Ana Sayfa İçeriği", text: "Hero, istatistikler, kartlar, zaman çizelgesi ve diğer bölümler." },
    { href: "/admin/pages", title: "Sayfalar", text: "Kurumsal, faaliyet alanları ve çözümler alt sayfaları." },
    { href: "/admin/leads", title: "Talepler", text: "Servis talebi / teklif formundan gelen kayıtlar." },
    { href: "/admin/settings", title: "Menü & İletişim", text: "Navigasyon, footer, iletişim bilgileri ve sosyal medya." },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-[20px] font-extrabold text-ink-900">
        Hoş geldin{session ? `, ${session.name.split(" ")[0]}` : ""}.
      </h1>
      <p className="mt-1 text-[13px] text-ink-500">
        Sitenin içeriğini buradan yönetebilirsin.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-[6px] border border-line bg-white p-4 transition-colors hover:border-brand-300"
          >
            <p className="text-[22px] font-extrabold text-navy-700">{s.value}</p>
            <p className="text-[12px] text-ink-500">{s.label}</p>
            {s.note && <p className="mt-1 text-[11px] font-semibold text-accent-600">{s.note}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-[6px] border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <h2 className="text-[14px] font-bold text-ink-900 group-hover:text-brand-600">
              {s.title}
            </h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">{s.text}</p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-[12px] text-ink-400">
        Genel bakış için siteyi görüntüle:{" "}
        <a href="/tr" target="_blank" className="font-semibold text-brand-600 hover:underline">
          kayahanisi /tr
        </a>
      </p>
    </div>
  );
}
