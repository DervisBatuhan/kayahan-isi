import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/base.scss";
import { fontVariables } from "@/lib/fonts";

/**
 * Root layout for the admin area. The public site's root layout lives at
 * `app/[locale]/layout.tsx`; because there is no `app/layout.tsx`, each
 * top-level segment owns its own <html>/<body>.
 */

export const metadata: Metadata = {
  title: { default: "Yönetim Paneli", template: "%s · Kayahan Isı Panel" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-surface text-ink-900">{children}</body>
    </html>
  );
}
