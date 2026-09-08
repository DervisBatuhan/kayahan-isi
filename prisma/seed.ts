import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { defaultSiteContent } from "../lib/content/site";
import { getDefaultPages } from "../lib/content/pages";
import { locales } from "../lib/i18n/config";

const prisma = new PrismaClient();

async function main() {
  // 1) Admin user
  const email = (process.env.ADMIN_EMAIL ?? "admin@kayahanisi.com.tr")
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "kayahan2025";
  const name = process.env.ADMIN_NAME ?? "Kayahan Yönetici";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { name, role: "admin" },
    create: { email, name, passwordHash, role: "admin" },
  });
  console.log(`✓ admin user: ${email}`);

  // 2) Site content (one JSON row per locale)
  for (const locale of locales) {
    const data = JSON.stringify(defaultSiteContent[locale]);
    await prisma.siteContent.upsert({
      where: { locale },
      update: { data },
      create: { locale, data },
    });
    console.log(`✓ site content: ${locale}`);
  }

  // 3) Inner pages
  for (const locale of locales) {
    const pages = getDefaultPages(locale);
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      await prisma.page.upsert({
        where: { locale_slug: { locale, slug: p.slug } },
        update: {
          eyebrow: p.eyebrow,
          title: p.title,
          intro: p.intro,
          bullets: JSON.stringify(p.bullets ?? []),
          children: JSON.stringify(p.children ?? []),
          order: i,
        },
        create: {
          locale,
          slug: p.slug,
          eyebrow: p.eyebrow,
          title: p.title,
          intro: p.intro,
          bullets: JSON.stringify(p.bullets ?? []),
          children: JSON.stringify(p.children ?? []),
          order: i,
        },
      });
    }
    console.log(`✓ pages: ${locale} (${pages.length})`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
