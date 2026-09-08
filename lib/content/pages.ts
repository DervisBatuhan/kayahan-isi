import type { Locale } from "@/lib/i18n/config";

/**
 * Placeholder content for every route referenced by the header/footer nav.
 * Each page currently shows a breadcrumb, a title and a short intro; the real
 * per-page designs will replace these one by one. A dedicated
 * `app/[locale]/<path>/page.tsx` always wins over the `[...slug]` catch-all,
 * so promoting a page later is non-breaking.
 */

export type ChildLink = { title: string; slug: string; text: string };

export type PageDoc = {
  slug: string; // e.g. "kurumsal/hakkimizda"
  eyebrow: string;
  title: string;
  intro: string;
  bullets?: string[];
  children?: ChildLink[];
};

type Dict = {
  home: string;
  detail: string;
  draftNote: string;
  pages: PageDoc[];
};

const tr: Dict = {
  home: "Ana Sayfa",
  detail: "Detay",
  draftNote: "Bu sayfanın detaylı içeriği ve tasarımı hazırlanıyor.",
  pages: [
    {
      slug: "kurumsal",
      eyebrow: "Kurumsal",
      title: "Kurumsal",
      intro:
        "45 yıllık teknik birikimi kurumsal bir yapıya dönüştüren Kayahan Isı; köklü geçmişini modern mühendislik anlayışıyla birleştirir.",
      children: [
        { title: "Hakkımızda", slug: "kurumsal/hakkimizda", text: "Kayahan Isı'nın kısa hikâyesi ve bugünü." },
        { title: "Kurucu Hikâyesi", slug: "kurumsal/kurucu-hikayesi", text: "İlhan Kaya'nın 1976'da başlayan yolculuğu." },
        { title: "Misyon & Vizyon", slug: "kurumsal/misyon-vizyon", text: "Nereden geldik, nereye gidiyoruz." },
        { title: "Kalite Politikamız", slug: "kurumsal/kalite-politikasi", text: "TSE ve uluslararası standartlarda hizmet." },
        { title: "Sürdürülebilirlik", slug: "kurumsal/surdurulebilirlik", text: "Enerji verimliliği ve çevre duyarlılığı." },
        { title: "45 Yıllık Yolculuğumuz", slug: "kurumsal/tarihce", text: "1976'dan bugüne mil taşları." },
      ],
    },
    {
      slug: "kurumsal/hakkimizda",
      eyebrow: "Kurumsal",
      title: "Hakkımızda",
      intro:
        "Kayahan Isı, iklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında faaliyet gösteren köklü bir Türk şirketidir. Geçmişin ustalığını geleceğin teknolojisiyle buluşturuyoruz.",
    },
    {
      slug: "kurumsal/kurucu-hikayesi",
      eyebrow: "Kurumsal",
      title: "Kurucu Hikâyesi — İlhan Kaya",
      intro:
        "16 yaşında bir çıraklıkla başlayan teknik birikim; usta, eğitmen, bilirkişi ve sektör temsilcisi kimliğiyle Kayahan Isı'nın kurumsal kültürüne dönüştü.",
    },
    {
      slug: "kurumsal/misyon-vizyon",
      eyebrow: "Kurumsal",
      title: "Misyon & Vizyon",
      intro:
        "Misyonumuz; güvenilir, verimli ve sürdürülebilir çözümlerle yaşam alanlarının kalitesini yükseltmek. Vizyonumuz; 45 yıllık bir Türk şirketini global bir iklim ve enerji markasına dönüştürmek.",
    },
    {
      slug: "kurumsal/kalite-politikasi",
      eyebrow: "Kurumsal",
      title: "Kalite Politikamız",
      intro:
        "25 yılı aşan TSE yetkili servis geçmişimizle; her işi standartlara uygun, ölçülebilir ve izlenebilir biçimde yürütürüz.",
    },
    {
      slug: "kurumsal/surdurulebilirlik",
      eyebrow: "Kurumsal",
      title: "Sürdürülebilirlik",
      intro:
        "Enerji verimliliğini bir mühendislik disiplini olarak ele alır; daha az tüketen, daha uzun ömürlü sistemler kurarız.",
    },
    {
      slug: "kurumsal/tarihce",
      eyebrow: "Kurumsal",
      title: "45 Yıllık Yolculuğumuz",
      intro:
        "1976'da İlhan Kaya'nın sektöre ilk adımıyla başlayan; E.C.A. ve Demirdöküm yetkili servisliklerinden bugünün çok markalı teknik uzmanlığına uzanan bir tarih.",
    },

    {
      slug: "faaliyet-alanlari",
      eyebrow: "Faaliyet Alanlarımız",
      title: "Faaliyet Alanlarımız",
      intro:
        "İklimi, enerjiyi ve yapıyı birlikte düşünen beş ana alan. Kombi, klima, şofben, teknik servis ve bakım hizmetlerimiz bu alanların altında konumlanır.",
      children: [
        { title: "İklimlendirme", slug: "faaliyet-alanlari/iklimlendirme", text: "Kontrollü, sağlıklı ve verimli iç ortam." },
        { title: "Isıtma", slug: "faaliyet-alanlari/isitma", text: "Güvenli ve verimli sıcaklık yönetimi." },
        { title: "Soğutma", slug: "faaliyet-alanlari/sogutma", text: "Yeni nesil soğutma ve klima teknolojileri." },
        { title: "Yalıtım", slug: "faaliyet-alanlari/yalitim", text: "Enerji kaybını azaltan sistem yaklaşımı." },
        { title: "Enerji", slug: "faaliyet-alanlari/enerji", text: "Verimlilik ve sürdürülebilir enerji yönetimi." },
      ],
    },
    {
      slug: "faaliyet-alanlari/iklimlendirme",
      eyebrow: "Faaliyet Alanlarımız",
      title: "İklimlendirme",
      intro:
        "Yaşam ve çalışma alanlarında kontrollü, sağlıklı ve verimli iklim koşulları için tasarım, uygulama ve bakım.",
      bullets: [
        "Keşif, ısı yükü hesabı ve sistem seçimi",
        "VRF/VRV, fancoil ve kanallı klima sistemleri",
        "Taze hava, filtrasyon ve nem kontrolü",
        "Kanal ve menfez tasarımı, hava debisi dengeleme",
        "Devreye alma ve periyodik bakım",
      ],
    },
    {
      slug: "faaliyet-alanlari/isitma",
      eyebrow: "Faaliyet Alanlarımız",
      title: "Isıtma",
      intro:
        "Modern ısıtma sistemleriyle güvenli, verimli ve sürdürülebilir sıcaklık yönetimi; kombi ve şofben teknik servisi.",
      bullets: [
        "Kombi, kazan dairesi ve kaskad sistemler",
        "Yerden ısıtma ve radyatör tesisatı",
        "Şofben / termosifon montaj ve servisi",
        "Baca ve gaz hattı güvenlik kontrolü",
        "Yakıt verimliliği ölçümü ve ayar",
      ],
    },
    {
      slug: "faaliyet-alanlari/sogutma",
      eyebrow: "Faaliyet Alanlarımız",
      title: "Soğutma",
      intro:
        "Yeni nesil soğutma ve klima teknolojileriyle yüksek performanslı, enerji verimli çözümler.",
      bullets: [
        "Split ve multi-split klima sistemleri",
        "Soğutma grupları (chiller) ve fancoil hatları",
        "Soğuk oda ve proses soğutma uygulamaları",
        "Gaz şarjı, kaçak testi ve performans kontrolü",
        "Enerji tüketimi izleme ve optimizasyon",
      ],
    },
    {
      slug: "faaliyet-alanlari/yalitim",
      eyebrow: "Faaliyet Alanlarımız",
      title: "Yalıtım",
      intro:
        "Enerji kayıplarını azaltan, yapıyı koruyan ve verimliliği artıran yalıtım sistemi yaklaşımı.",
      bullets: [
        "Tesisat, boru ve vana yalıtımı",
        "Çatı, cephe ve döşeme ısı yalıtımı",
        "Yoğuşma ve küf oluşumunun önlenmesi",
        "Isı köprüsü analizi ve iyileştirme",
        "Malzeme, kalınlık ve uygulama detayı seçimi",
      ],
    },
    {
      slug: "faaliyet-alanlari/enerji",
      eyebrow: "Faaliyet Alanlarımız",
      title: "Enerji",
      intro:
        "Sürdürülebilir gelecek için enerji verimliliği, doğru sistem yönetimi ve teknik danışmanlık.",
      bullets: [
        "Enerji etüdü ve tüketim analizi",
        "Isı geri kazanım (ısı geri kazanımlı havalandırma)",
        "Güneş enerjisi destekli ısıtma / sıcak su",
        "Otomasyon ile tüketim izleme ve kontrol",
        "Geri ödeme süresi ve tasarruf raporlaması",
      ],
    },

    {
      slug: "cozumler",
      eyebrow: "Çözümlerimiz",
      title: "Çözümlerimiz",
      intro:
        "Her projeye özel; analizden devreye almaya, bakımdan danışmanlığa uzanan mühendislik odaklı süreç.",
      children: [
        { title: "Sistem Çözümleri", slug: "cozumler/sistem-cozumleri", text: "Analizden devreye almaya uçtan uca mühendislik." },
        { title: "Bina Otomasyonu", slug: "cozumler/bina-otomasyonu", text: "Tek merkezden izleme, kontrol ve verimlilik." },
        { title: "Enerji Verimliliği", slug: "cozumler/enerji-verimliligi", text: "Daha az tüketen, daha uzun ömürlü sistemler." },
        { title: "Servis & Bakım", slug: "cozumler/servis-bakim", text: "Uzun ömürlü sistemler, kesintisiz destek." },
      ],
    },
    {
      slug: "cozumler/sistem-cozumleri",
      eyebrow: "Çözümlerimiz",
      title: "Sistem Çözümleri",
      intro:
        "İklimlendirme, ısıtma ve soğutma sistemlerini tek bir mühendislik yaklaşımıyla ele alıyoruz: ihtiyaç analizi, sistem tasarımı, uygulama ve devreye alma. Her proje, binanın kullanım profiline ve enerji hedeflerine göre boyutlandırılır.",
      bullets: [
        "İhtiyaç analizi ve ısı yükü hesabı",
        "Sistem seçimi ve boyutlandırma",
        "Uygulama projesi ve saha keşfi",
        "Montaj, test ve devreye alma",
        "Garanti ve periyodik bakım planı",
      ],
    },
    {
      slug: "cozumler/bina-otomasyonu",
      eyebrow: "Çözümlerimiz",
      title: "Bina Otomasyonu",
      intro:
        "Isıtma, soğutma, havalandırma ve enerji sayaçlarını tek bir kontrol katmanında toplayan otomasyon çözümleri. Senaryo bazlı çalışma, uzaktan izleme ve raporlama ile hem konfor hem de işletme maliyeti kontrol altına alınır.",
      bullets: [
        "HVAC, aydınlatma ve sayaç entegrasyonu",
        "Senaryo ve zaman planı tabanlı çalışma",
        "Uzaktan izleme, alarm ve arıza bildirimi",
        "Enerji ölçümü ve tüketim raporları",
        "Mevcut sisteme kademeli uyarlama",
      ],
    },
    {
      slug: "cozumler/enerji-verimliligi",
      eyebrow: "Çözümlerimiz",
      title: "Enerji Verimliliği",
      intro:
        "Mevcut tesisatın etüdü, kayıpların tespiti ve verimlilik odaklı iyileştirme projeleri. Ekipman seçimi, yalıtım ve kontrol stratejileriyle tüketimi düşürür, geri ödeme süresini ölçülebilir biçimde ortaya koyarız.",
      bullets: [
        "Mevcut tesisat etüdü ve ölçüm",
        "Kayıp ve verimsizlik noktalarının tespiti",
        "Ekipman ve kontrol stratejisi iyileştirme",
        "Yalıtım ve ısı geri kazanım önerileri",
        "Ölçülebilir geri ödeme (payback) analizi",
      ],
    },
    { slug: "cozumler/analiz-kesif", eyebrow: "Çözümlerimiz", title: "Analiz & Keşif", intro: "Mevcut durumun ölçülmesi ve doğru çözümün belirlenmesi için saha analizi ve keşif." },
    { slug: "cozumler/sistem-tasarimi", eyebrow: "Çözümlerimiz", title: "Sistem Tasarımı", intro: "İhtiyaca özel, enerji verimli ve uygulanabilir mühendislik tasarımı." },
    { slug: "cozumler/uygulama-devreye-alma", eyebrow: "Çözümlerimiz", title: "Uygulama & Devreye Alma", intro: "Kurallara uygun montaj, test ve sorunsuz devreye alma." },
    { slug: "cozumler/servis-bakim", eyebrow: "Çözümlerimiz", title: "Servis & Bakım", intro: "Periyodik bakım, arıza onarımı ve satış sonrası kesintisiz destek." },
    { slug: "cozumler/teknik-danismanlik", eyebrow: "Çözümlerimiz", title: "Teknik Danışmanlık", intro: "45 yıllık deneyime dayalı bağımsız teknik görüş ve yönlendirme." },

    {
      slug: "referanslar",
      eyebrow: "Referanslar",
      title: "Referanslar",
      intro:
        "Yıllar içinde tamamladığımız projeler ve birlikte çalıştığımız kurumlar bu sayfada yer alacak.",
    },
    {
      slug: "insan-kaynaklari",
      eyebrow: "İnsan Kaynakları",
      title: "İnsan Kaynakları & Kariyer",
      intro:
        "Ustalık geleneğini sürdüren bir ekibin parçası olmak isteyenler için açık pozisyonlar ve staj olanakları burada duyurulacak.",
    },
    {
      slug: "iletisim",
      eyebrow: "İletişim",
      title: "İletişim",
      intro: "Sorularınız, servis talepleriniz ve iş birlikleri için bize ulaşın.",
    },
    {
      slug: "teklif-al",
      eyebrow: "Teklif Al",
      title: "Teklif Al",
      intro:
        "Projeniz veya cihazınız için hızlı bir dönüş alın. Detaylı teklif formu yakında bu sayfada olacak; şimdilik iletişim kanallarımızdan bize yazabilirsiniz.",
    },
  ],
};

const en: Dict = {
  home: "Home",
  detail: "Details",
  draftNote: "The detailed content and design for this page is being prepared.",
  pages: [
    {
      slug: "kurumsal",
      eyebrow: "Corporate",
      title: "Corporate",
      intro:
        "Kayahan Isı turned 45 years of technical know-how into a corporate structure, joining a rooted past with a modern engineering mindset.",
      children: [
        { title: "About Us", slug: "kurumsal/hakkimizda", text: "The short story of Kayahan Isı and where it stands today." },
        { title: "Founder's Story", slug: "kurumsal/kurucu-hikayesi", text: "İlhan Kaya's journey since 1976." },
        { title: "Mission & Vision", slug: "kurumsal/misyon-vizyon", text: "Where we come from, where we are heading." },
        { title: "Quality Policy", slug: "kurumsal/kalite-politikasi", text: "Service to TSE and international standards." },
        { title: "Sustainability", slug: "kurumsal/surdurulebilirlik", text: "Energy efficiency and environmental care." },
        { title: "Our 45-Year Journey", slug: "kurumsal/tarihce", text: "Milestones from 1976 to today." },
      ],
    },
    {
      slug: "kurumsal/hakkimizda",
      eyebrow: "Corporate",
      title: "About Us",
      intro:
        "Kayahan Isı is a long-established Turkish company working across air conditioning, heating, cooling, insulation and energy — bringing the craftsmanship of the past together with the technology of the future.",
    },
    {
      slug: "kurumsal/kurucu-hikayesi",
      eyebrow: "Corporate",
      title: "Founder's Story — İlhan Kaya",
      intro:
        "Technical know-how that began with an apprenticeship at 16 grew into Kayahan Isı's corporate culture, carried by a craftsman, trainer, expert witness and sector representative.",
    },
    {
      slug: "kurumsal/misyon-vizyon",
      eyebrow: "Corporate",
      title: "Mission & Vision",
      intro:
        "Our mission: to raise the quality of living spaces with reliable, efficient and sustainable solutions. Our vision: to grow a 45-year-old Turkish company into a global climate and energy brand.",
    },
    {
      slug: "kurumsal/kalite-politikasi",
      eyebrow: "Corporate",
      title: "Quality Policy",
      intro:
        "With over 25 years as a TSE-authorised service, we run every job to standard — measurable and traceable.",
    },
    {
      slug: "kurumsal/surdurulebilirlik",
      eyebrow: "Corporate",
      title: "Sustainability",
      intro:
        "We treat energy efficiency as an engineering discipline, building systems that consume less and last longer.",
    },
    {
      slug: "kurumsal/tarihce",
      eyebrow: "Corporate",
      title: "Our 45-Year Journey",
      intro:
        "A history that began with İlhan Kaya's first step into the sector in 1976 and runs through the E.C.A. and Demirdöküm authorised services to today's multi-brand technical expertise.",
    },

    {
      slug: "faaliyet-alanlari",
      eyebrow: "Our Fields",
      title: "Our Fields",
      intro:
        "Five core fields that consider climate, energy and the building together. Boiler, AC, water-heater, technical service and maintenance sit beneath these fields.",
      children: [
        { title: "Air Conditioning", slug: "faaliyet-alanlari/iklimlendirme", text: "Controlled, healthy and efficient indoor climate." },
        { title: "Heating", slug: "faaliyet-alanlari/isitma", text: "Safe and efficient temperature management." },
        { title: "Cooling", slug: "faaliyet-alanlari/sogutma", text: "New-generation cooling and AC technology." },
        { title: "Insulation", slug: "faaliyet-alanlari/yalitim", text: "A system approach that cuts energy loss." },
        { title: "Energy", slug: "faaliyet-alanlari/enerji", text: "Efficiency and sustainable energy management." },
      ],
    },
    {
      slug: "faaliyet-alanlari/iklimlendirme",
      eyebrow: "Our Fields",
      title: "Air Conditioning",
      intro:
        "Design, installation and maintenance for controlled, healthy and efficient indoor climate in living and working spaces.",
      bullets: [
        "Survey, heat-load calculation and system selection",
        "VRF/VRV, fan-coil and ducted systems",
        "Fresh air, filtration and humidity control",
        "Duct and diffuser design, airflow balancing",
        "Commissioning and periodic maintenance",
      ],
    },
    {
      slug: "faaliyet-alanlari/isitma",
      eyebrow: "Our Fields",
      title: "Heating",
      intro:
        "Safe, efficient and sustainable temperature management with modern heating systems; boiler and water-heater technical service.",
      bullets: [
        "Boilers, plant rooms and cascade systems",
        "Underfloor heating and radiator pipework",
        "Water-heater installation and service",
        "Flue and gas-line safety checks",
        "Fuel-efficiency measurement and tuning",
      ],
    },
    {
      slug: "faaliyet-alanlari/sogutma",
      eyebrow: "Our Fields",
      title: "Cooling",
      intro:
        "High-performance, energy-efficient solutions with new-generation cooling and air-conditioning technology.",
      bullets: [
        "Split and multi-split air-conditioning",
        "Chillers and fan-coil circuits",
        "Cold rooms and process cooling",
        "Gas charging, leak testing and performance checks",
        "Energy-consumption monitoring and optimisation",
      ],
    },
    {
      slug: "faaliyet-alanlari/yalitim",
      eyebrow: "Our Fields",
      title: "Insulation",
      intro:
        "An insulation-system approach that cuts energy loss, protects the building and raises efficiency.",
      bullets: [
        "Pipework, duct and valve insulation",
        "Roof, façade and floor thermal insulation",
        "Condensation and mould prevention",
        "Thermal-bridge analysis and remediation",
        "Material, thickness and detailing selection",
      ],
    },
    {
      slug: "faaliyet-alanlari/enerji",
      eyebrow: "Our Fields",
      title: "Energy",
      intro:
        "Energy efficiency, sound system management and technical consultancy for a sustainable future.",
      bullets: [
        "Energy survey and consumption analysis",
        "Heat recovery (heat-recovery ventilation)",
        "Solar-assisted heating / hot water",
        "Consumption monitoring and control via automation",
        "Payback-period and savings reporting",
      ],
    },

    {
      slug: "cozumler",
      eyebrow: "Our Solutions",
      title: "Our Solutions",
      intro:
        "Project-specific and engineering-driven — from analysis to commissioning, from maintenance to consultancy.",
      children: [
        { title: "System Solutions", slug: "cozumler/sistem-cozumleri", text: "End-to-end engineering, from analysis to commissioning." },
        { title: "Building Automation", slug: "cozumler/bina-otomasyonu", text: "One place to monitor, control and optimise." },
        { title: "Energy Efficiency", slug: "cozumler/enerji-verimliligi", text: "Systems that consume less and last longer." },
        { title: "Service & Maintenance", slug: "cozumler/servis-bakim", text: "Long-lasting systems, uninterrupted support." },
      ],
    },
    {
      slug: "cozumler/sistem-cozumleri",
      eyebrow: "Our Solutions",
      title: "System Solutions",
      intro:
        "We treat air conditioning, heating and cooling as a single engineering problem: needs analysis, system design, installation and commissioning. Every project is sized to the building's usage profile and energy targets.",
      bullets: [
        "Needs analysis and heat-load calculation",
        "System selection and sizing",
        "Installation drawings and site survey",
        "Installation, testing and commissioning",
        "Warranty and periodic maintenance plan",
      ],
    },
    {
      slug: "cozumler/bina-otomasyonu",
      eyebrow: "Our Solutions",
      title: "Building Automation",
      intro:
        "Automation that brings heating, cooling, ventilation and energy meters into one control layer. Scenario-based operation, remote monitoring and reporting keep both comfort and running costs under control.",
      bullets: [
        "HVAC, lighting and meter integration",
        "Scenario- and schedule-based operation",
        "Remote monitoring, alarms and fault alerts",
        "Energy metering and consumption reports",
        "Phased retrofit onto existing systems",
      ],
    },
    {
      slug: "cozumler/enerji-verimliligi",
      eyebrow: "Our Solutions",
      title: "Energy Efficiency",
      intro:
        "Surveying the existing installation, pinpointing losses and running efficiency-focused improvement projects. Through equipment selection, insulation and control strategy we cut consumption and put a measurable figure on the payback period.",
      bullets: [
        "Survey and metering of the existing installation",
        "Identifying losses and inefficiencies",
        "Equipment and control-strategy improvements",
        "Insulation and heat-recovery recommendations",
        "Measurable payback analysis",
      ],
    },
    { slug: "cozumler/analiz-kesif", eyebrow: "Our Solutions", title: "Analysis & Survey", intro: "On-site analysis and survey to measure the current state and define the right solution." },
    { slug: "cozumler/sistem-tasarimi", eyebrow: "Our Solutions", title: "System Design", intro: "Needs-specific, energy-efficient and buildable engineering design." },
    { slug: "cozumler/uygulama-devreye-alma", eyebrow: "Our Solutions", title: "Installation & Commissioning", intro: "Compliant installation, testing and seamless commissioning." },
    { slug: "cozumler/servis-bakim", eyebrow: "Our Solutions", title: "Service & Maintenance", intro: "Periodic maintenance, fault repair and uninterrupted after-sales support." },
    { slug: "cozumler/teknik-danismanlik", eyebrow: "Our Solutions", title: "Technical Consultancy", intro: "Independent technical opinion and guidance grounded in 45 years of experience." },

    {
      slug: "referanslar",
      eyebrow: "References",
      title: "References",
      intro:
        "The projects we have completed over the years and the organisations we have worked with will appear on this page.",
    },
    {
      slug: "insan-kaynaklari",
      eyebrow: "Human Resources",
      title: "Human Resources & Careers",
      intro:
        "Open positions and internship opportunities for those who want to join a team that keeps the craft tradition alive will be announced here.",
    },
    {
      slug: "iletisim",
      eyebrow: "Contact",
      title: "Contact",
      intro: "Reach us for questions, service requests and partnerships.",
    },
    {
      slug: "teklif-al",
      eyebrow: "Get a Quote",
      title: "Get a Quote",
      intro:
        "Get a quick response for your project or appliance. A detailed quote form is available on this page.",
    },
  ],
};

const BY_LOCALE: Record<Locale, Dict> = { tr, en };

/**
 * Pages that exist only so the navigation resolves — their body is still a
 * "coming soon" placeholder. Kept out of the sitemap and marked `noindex`
 * until real content lands.
 */
export const PLACEHOLDER_SLUGS: Record<Locale, readonly string[]> = {
  tr: [],
  en: [],
};

export function isPlaceholderPage(locale: Locale, slugPath: string): boolean {
  return PLACEHOLDER_SLUGS[locale]?.includes(slugPath) ?? false;
}

/** Static seed / fallback lookups (DB-backed variants live in pages.server.ts). */
export function getDefaultPage(locale: Locale, slugPath: string): PageDoc | undefined {
  return BY_LOCALE[locale]?.pages.find((p) => p.slug === slugPath);
}

export function getDefaultPages(locale: Locale): PageDoc[] {
  return BY_LOCALE[locale]?.pages ?? [];
}

export function getPageDict(locale: Locale): Dict {
  return BY_LOCALE[locale] ?? BY_LOCALE.tr;
}

export function defaultPageParams(): { locale: Locale; slug: string[] }[] {
  return (Object.keys(BY_LOCALE) as Locale[]).flatMap((locale) =>
    BY_LOCALE[locale].pages.map((p) => ({ locale, slug: p.slug.split("/") })),
  );
}

/**
 * Best-effort slug map across locales. The `tr` and `en` page arrays are kept
 * in the same order and structure, so entry N in one is the translation of
 * entry N in the other. Returns the equivalent sub-path (slug) for every
 * locale, falling back to the given slug when no counterpart is found — used
 * for `hreflang` alternates and the sitemap.
 */
export function slugAcrossLocales(
  locale: Locale,
  slugPath: string,
): Record<Locale, string> {
  const out = { tr: slugPath, en: slugPath } as Record<Locale, string>;
  const idx = BY_LOCALE[locale]?.pages.findIndex((p) => p.slug === slugPath);
  if (idx === undefined || idx < 0) return out;
  for (const l of Object.keys(BY_LOCALE) as Locale[]) {
    const match = BY_LOCALE[l].pages[idx];
    if (match) out[l] = match.slug;
  }
  return out;
}
