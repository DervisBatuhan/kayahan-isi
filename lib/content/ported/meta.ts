import type { Locale } from "@/lib/i18n/config";

type Meta = { title: string; description: string };
type Entry = { og: "website" | "article"; tr: Meta; en: Meta };

/**
 * Per-locale <title> + meta description for every physically-routed page
 * (design pages + the contact/quote/references utility pages). Keyed by the
 * locale-less path.
 */
export const PORTED_META: Record<string, Entry> = {
  "/kurumsal": {
    og: "website",
    tr: {
      title: "Kurumsal",
      description:
        "45 yıllık teknik birikimi kurumsal bir yapıya taşıyan Kayahan Isı; hakkımızda, yönetim kurulu, misyon-vizyon, kalite ve sürdürülebilirlik.",
    },
    en: {
      title: "Corporate",
      description:
        "Kayahan Isı turns 45 years of technical know-how into a corporate structure — about us, board, mission & vision, quality and sustainability.",
    },
  },
  "/kurumsal/hakkimizda": {
    og: "article",
    tr: {
      title: "Hakkımızda",
      description:
        "Kayahan Isı'nın 1976'dan bugüne uzanan kurumsal yolculuğu; teknik ustalık, kurumsal sorumluluk ve geleceğin teknolojileri.",
    },
    en: {
      title: "About Us",
      description:
        "Kayahan Isı's corporate journey since 1976 — technical craftsmanship, corporate responsibility and the technology of the future.",
    },
  },
  "/kurumsal/misyon-vizyon": {
    og: "article",
    tr: {
      title: "Misyon & Vizyon",
      description:
        "Kayahan Isı'nın misyonu, vizyonu ve çalışma ilkeleri: insan, yapı ve enerji arasında daha dengeli, verimli ve güvenilir sistemler.",
    },
    en: {
      title: "Mission & Vision",
      description:
        "Kayahan Isı's mission, vision and working principles: more balanced, efficient and reliable systems across people, buildings and energy.",
    },
  },
  "/kurumsal/kalite-politikasi": {
    og: "article",
    tr: {
      title: "Kalite Politikamız",
      description:
        "Analizden uygulamaya, devreye almadan satış sonrası desteğe kadar ölçülebilir ve izlenebilir kalite anlayışı.",
    },
    en: {
      title: "Quality Policy",
      description:
        "A measurable, traceable approach to quality — from analysis to installation, from commissioning to after-sales support.",
    },
  },
  "/kurumsal/surdurulebilirlik": {
    og: "article",
    tr: {
      title: "Sürdürülebilirlik",
      description:
        "Konforu azaltmadan tüketimi düşüren, kaynakları verimli kullanan ve uzun ömürlü çözümler geliştiren sorumlu mühendislik.",
    },
    en: {
      title: "Sustainability",
      description:
        "Responsible engineering: cutting consumption without cutting comfort, using resources efficiently and building solutions that last.",
    },
  },
  "/kurumsal/yonetim-kurulu": {
    og: "article",
    tr: {
      title: "Yönetim Kurulu",
      description:
        "Tecrübenin yön verdiği, geleceğe açık bir yönetim; güven, ustalık, gelişim ve sorumluluk ilkeleri.",
    },
    en: {
      title: "Board of Directors",
      description:
        "A board guided by experience and open to the future — grounded in trust, craftsmanship, development and responsibility.",
    },
  },
  "/kurumsal/yonetim-kurulu-mesaji": {
    og: "article",
    tr: {
      title: "Yönetim Kurulu Mesajı",
      description:
        "Geçmişe bağlı, geleceğe hazır: 1976'dan bu yana işi doğru yapma sorumluluğu.",
    },
    en: {
      title: "Message from the Board",
      description:
        "Rooted in the past, ready for the future: the responsibility of doing the work right, since 1976.",
    },
  },
  "/kurumsal/sertifikalarimiz": {
    og: "article",
    tr: {
      title: "Sertifikalarımız",
      description:
        "Kalite yönetimi, teknik yetkinlik, iş sağlığı ve güvenliği ve enerji performansı alanlarında belgelendirilmiş kurumsal yeterlilik.",
    },
    en: {
      title: "Our Certifications",
      description:
        "Certified corporate competence in quality management, technical proficiency, occupational health & safety and energy performance.",
    },
  },
  "/faaliyet-alanlari": {
    og: "website",
    tr: {
      title: "Faaliyet Alanlarımız",
      description:
        "İklimlendirme, ısıtma, soğutma, yalıtım ve enerji; tek bir mühendislik disiplini altında toplanan beş ana alan.",
    },
    en: {
      title: "Our Fields",
      description:
        "Air conditioning, heating, cooling, insulation and energy — five core fields brought together under a single engineering discipline.",
    },
  },
  "/faaliyet-alanlari/iklimlendirme": {
    og: "article",
    tr: {
      title: "İklimlendirme",
      description:
        "Yapının kullanım senaryosunu, hava kalitesini ve enerji performansını birlikte ele alan bütünsel iklimlendirme çözümleri.",
    },
    en: {
      title: "Air Conditioning",
      description:
        "Holistic air-conditioning solutions that consider the building's usage profile, air quality and energy performance together.",
    },
  },
  "/faaliyet-alanlari/isitma": {
    og: "article",
    tr: {
      title: "Isıtma",
      description:
        "Kaynağından son kullanıcıya kadar kayıpları azaltan, dengeli ve güvenilir ısıtma sistemleri.",
    },
    en: {
      title: "Heating",
      description:
        "Balanced, reliable heating systems that reduce losses from the source all the way to the end user.",
    },
  },
  "/faaliyet-alanlari/sogutma": {
    og: "article",
    tr: {
      title: "Soğutma",
      description:
        "Yüksek performansı kontrollü tüketimle buluşturan, kararlı ve hassas soğutma çözümleri.",
    },
    en: {
      title: "Cooling",
      description:
        "Stable, precise cooling solutions that pair high performance with controlled consumption.",
    },
  },
  "/faaliyet-alanlari/yalitim": {
    og: "article",
    tr: {
      title: "Yalıtım",
      description:
        "Isı, ses ve nem kontrolünü yapı kabuğunun tamamında çözen uzun ömürlü yalıtım sistemleri.",
    },
    en: {
      title: "Insulation",
      description:
        "Long-lasting insulation systems that solve heat, sound and moisture control across the whole building envelope.",
    },
  },
  "/faaliyet-alanlari/enerji": {
    og: "article",
    tr: {
      title: "Enerji",
      description:
        "Enerjiyi ölçen, kayıpları görünür kılan ve iyileştirmeyi sürekli hale getiren mühendislik yaklaşımı.",
    },
    en: {
      title: "Energy",
      description:
        "An engineering approach that measures energy, makes losses visible and turns improvement into a continuous process.",
    },
  },
  "/cozumler": {
    og: "website",
    tr: {
      title: "Çözümlerimiz",
      description:
        "Sistem çözümleri, bina otomasyonu, enerji verimliliği ve servis & bakım; analizden devreye almaya mühendislik odaklı süreç.",
    },
    en: {
      title: "Our Solutions",
      description:
        "System solutions, building automation, energy efficiency and service & maintenance — an engineering-driven process from analysis to commissioning.",
    },
  },
  "/cozumler/sistem-cozumleri": {
    og: "article",
    tr: {
      title: "Sistem Çözümleri",
      description:
        "Mekanik sistemleri birlikte çalışan bir performans mimarisi olarak tasarlıyoruz: analiz, tasarım, entegrasyon, devreye alma.",
    },
    en: {
      title: "System Solutions",
      description:
        "We design mechanical systems as one performance architecture that works together: analysis, design, integration, commissioning.",
    },
  },
  "/cozumler/bina-otomasyonu": {
    og: "article",
    tr: {
      title: "Bina Otomasyonu",
      description:
        "Sensör, kontrol ve izleme katmanlarını tek merkezde birleştiren akıllı bina otomasyonu.",
    },
    en: {
      title: "Building Automation",
      description:
        "Smart building automation that unifies sensing, control and monitoring layers in a single hub.",
    },
  },
  "/cozumler/enerji-verimliligi": {
    og: "article",
    tr: {
      title: "Enerji Verimliliği",
      description:
        "Tüketimi azaltırken konforu ve üretkenliği koruyan ölçülebilir enerji verimliliği çözümleri.",
    },
    en: {
      title: "Energy Efficiency",
      description:
        "Measurable energy-efficiency solutions that cut consumption while protecting comfort and productivity.",
    },
  },
  "/cozumler/servis-bakim": {
    og: "article",
    tr: {
      title: "Servis & Bakım",
      description:
        "Sistemin ömrü boyunca güvenilir, verimli ve kesintisiz çalışmasını koruyan teknik servis yaklaşımı.",
    },
    en: {
      title: "Service & Maintenance",
      description:
        "A technical-service approach that keeps the system reliable, efficient and uninterrupted throughout its life.",
    },
  },
  "/galeri": {
    og: "website",
    tr: {
      title: "Galeri",
      description: "Sahadan ve projelerden seçkiler; mühendisliğin detayları.",
    },
    en: {
      title: "Gallery",
      description: "A selection from the field and from projects — the details of engineering.",
    },
  },
  "/basinda-biz": {
    og: "website",
    tr: {
      title: "Basında Biz",
      description:
        "Kayahan Isı'dan güncel gelişmeler, teknik haberler ve kurumsal duyurular.",
    },
    en: {
      title: "In the Press",
      description:
        "Latest developments, technical news and corporate announcements from Kayahan Isı.",
    },
  },
  "/insan-kaynaklari": {
    og: "website",
    tr: {
      title: "İnsan Kaynakları",
      description:
        "Ustalığın paylaşıldığı bir ekip kültürü; açık pozisyonlar ve genel başvuru.",
    },
    en: {
      title: "Human Resources",
      description:
        "A team culture where craftsmanship is shared — open positions and general applications.",
    },
  },
  "/referanslar": {
    og: "website",
    tr: {
      title: "Referanslar",
      description:
        "Konuttan sağlığa, endüstriden turizme; 1976'dan bugüne tamamlanan projeler ve sürdürülen güven.",
    },
    en: {
      title: "References",
      description:
        "From housing to healthcare, from industry to tourism — projects completed since 1976 and the trust we sustain.",
    },
  },
  "/iletisim": {
    og: "website",
    tr: {
      title: "İletişim",
      description:
        "Projenizi konuşalım: telefon, e-posta ve İstanbul merkezimiz üzerinden bize ulaşın.",
    },
    en: {
      title: "Contact",
      description:
        "Let's talk about your project — reach us by phone, email or at our Istanbul head office.",
    },
  },
  "/teklif-al": {
    og: "website",
    tr: {
      title: "Teklif Al",
      description:
        "Proje bilgilerinizi paylaşın; teknik ekibimiz ihtiyacınıza uygun kapsamı oluştursun.",
    },
    en: {
      title: "Get a Quote",
      description:
        "Share your project details and our technical team will build a scope that fits your needs.",
    },
  },
};

export function getPortedMeta(path: string, locale: Locale): Meta & { og: Entry["og"] } {
  const entry = PORTED_META[path];
  if (!entry) return { og: "website", title: "Kayahan Isı", description: "" };
  return { og: entry.og, ...(entry[locale] ?? entry.tr) };
}
