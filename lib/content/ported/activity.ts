import type { ActivityContent } from "./types";

export type ActivityKind =
  | "climate"
  | "heating"
  | "cooling"
  | "insulation"
  | "energy";

/** Section furniture shared by all five activity pages. */
export const ACTIVITY_CHROME = {
  heroCta: "YAKLAŞIMIMIZI KEŞFEDİN",
  artNoteLabel: "SİSTEM YAKLAŞIMI",
  artNoteValue: "Analiz → Tasarım → Uygulama",
  switchAriaLabel: "Faaliyet alanları",
  approachLabel: "MÜHENDİSLİK YAKLAŞIMI",
  equation: ["İHTİYAÇ", "VERİ", "UZMANLIK", "PERFORMANS"] as const,
  pillarsLabel: "PERFORMANS BİLEŞENLERİ",
  pillarsTitleTop: "Sistemi bütünüyle",
  pillarsTitleAccent: "ele alıyoruz.",
  usesLabel: "UYGULAMA ALANLARI",
};

export const ACTIVITY_CHROME_EN = {
  heroCta: "DISCOVER OUR APPROACH",
  artNoteLabel: "SYSTEM APPROACH",
  artNoteValue: "Analysis → Design → Delivery",
  switchAriaLabel: "Fields of activity",
  approachLabel: "ENGINEERING APPROACH",
  equation: ["NEED", "DATA", "EXPERTISE", "PERFORMANCE"] as const,
  pillarsLabel: "PERFORMANCE COMPONENTS",
  pillarsTitleTop: "We address the system",
  pillarsTitleAccent: "as a whole.",
  usesLabel: "APPLICATION AREAS",
};

/** Locale-correct section furniture. */
export function activityChrome(locale: string) {
  return locale === "en" ? ACTIVITY_CHROME_EN : ACTIVITY_CHROME;
}

export const activityDefaults: Record<ActivityKind, ActivityContent> = {
  climate: {
    index: "01 / İKLİMLENDİRME",
    name: "İklimlendirme",
    slug: "/tr/faaliyet-alanlari/iklimlendirme",
    asset: "/assets/activity-climate-cgi.png",
    assetAlt: "İklimlendirme mühendislik görselleştirmesi",
    titleTop: "Havayı yönet.",
    titleAccent: "Konforu büyüt.",
    lead: "Yapının kullanım senaryosunu, hava kalitesini ve enerji performansını birlikte ele alan bütünsel iklimlendirme çözümleri.",
    ctaLabel: ACTIVITY_CHROME.heroCta,
    statement: "Her hacim için doğru hava, doğru sıcaklık ve doğru denge.",
    detail:
      "Debi, basınç, sıcaklık ve nem değerlerini yapının gerçek ihtiyacına göre analiz ediyor; konforu tesadüfe bırakmayan sistemler tasarlıyoruz.",
    pillars: [
      { title: "Hava kalitesi", text: "Taze hava ve filtreleme senaryoları." },
      { title: "Termal konfor", text: "Dengeli sıcaklık ve nem kontrolü." },
      { title: "Akıllı işletme", text: "Değişken yüke uyumlu otomasyon." },
    ],
    process: ["Keşif", "Analiz", "Tasarım", "Uygulama", "İzleme"],
    usesHeading: "İhtiyaca göre şekillenen çözümler.",
    uses: [
      "Ticari yapılar",
      "Endüstriyel tesisler",
      "Sağlık yapıları",
      "Karma kullanımlı projeler",
    ],
  },
  heating: {
    index: "02 / ISITMA",
    name: "Isıtma",
    slug: "/tr/faaliyet-alanlari/isitma",
    asset: "/assets/activity-heating-cgi.png",
    assetAlt: "Isıtma mühendislik görselleştirmesi",
    titleTop: "Isıyı üretme.",
    titleAccent: "Akıllıca yönet.",
    lead: "Kaynağından son kullanıcıya kadar kayıpları azaltan, dengeli ve güvenilir ısıtma sistemleri.",
    ctaLabel: ACTIVITY_CHROME.heroCta,
    statement: "Kontrollü ısı, sürdürülebilir konfor ve düşük işletme yükü.",
    detail:
      "Isı üretimi, dağıtımı ve mahal kontrolünü tek performans bütünü olarak kurguluyor; sistemin her noktasını ölçülebilir hale getiriyoruz.",
    pillars: [
      { title: "Doğru kaynak", text: "İhtiyaca uygun kapasite ve teknoloji." },
      { title: "Dengeli dağıtım", text: "Hidrolik denge ve minimum kayıp." },
      { title: "Hassas kontrol", text: "Zon bazlı, değişken yüke uyumlu işletme." },
    ],
    process: ["Keşif", "Analiz", "Tasarım", "Uygulama", "İzleme"],
    usesHeading: "İhtiyaca göre şekillenen çözümler.",
    uses: ["Merkezi sistemler", "Proses ısıtma", "Yerden ısıtma", "Isı geri kazanımı"],
  },
  cooling: {
    index: "03 / SOĞUTMA",
    name: "Soğutma",
    slug: "/tr/faaliyet-alanlari/sogutma",
    asset: "/assets/activity-cooling-cgi.png",
    assetAlt: "Soğutma mühendislik görselleştirmesi",
    titleTop: "Serinliği değil,",
    titleAccent: "dengeyi tasarla.",
    lead: "Yüksek performansı kontrollü tüketimle buluşturan, kararlı ve hassas soğutma çözümleri.",
    ctaLabel: ACTIVITY_CHROME.heroCta,
    statement: "Değişen yüklere anında uyum sağlayan kararlı performans.",
    detail:
      "Soğutma yüklerini kullanım saatleri ve dış koşullarla birlikte değerlendiriyor; kısmi yüklerde de verimini koruyan sistem mimarileri geliştiriyoruz.",
    pillars: [
      { title: "Yük analizi", text: "Gerçek kullanım verisine göre boyutlandırma." },
      { title: "Kesintisiz performans", text: "Kritik hacimlerde güvenilir süreklilik." },
      { title: "Verimli işletme", text: "Kısmi yüklerde optimize enerji kullanımı." },
    ],
    process: ["Keşif", "Analiz", "Tasarım", "Uygulama", "İzleme"],
    usesHeading: "İhtiyaca göre şekillenen çözümler.",
    uses: [
      "Konfor soğutması",
      "Proses soğutma",
      "Hassas kontrollü alanlar",
      "Soğuk su sistemleri",
    ],
  },
  insulation: {
    index: "04 / YALITIM",
    name: "Yalıtım",
    slug: "/tr/faaliyet-alanlari/yalitim",
    asset: "/assets/activity-insulation-cgi.png",
    assetAlt: "Yalıtım mühendislik görselleştirmesi",
    titleTop: "Enerjiyi içeride tut.",
    titleAccent: "Değeri koru.",
    lead: "Isı, ses ve nem kontrolünü yapı kabuğunun tamamında çözen uzun ömürlü yalıtım sistemleri.",
    ctaLabel: ACTIVITY_CHROME.heroCta,
    statement: "Görünmeyen katmanlarda çalışan, ömrü boyunca değer üreten koruma.",
    detail:
      "Malzeme seçimini iklim, yüzey ve kullanım koşullarına göre yapıyor; ısı köprülerini, yoğuşma riskini ve uygulama detaylarını birlikte çözüyoruz.",
    pillars: [
      { title: "Isı kontrolü", text: "Kayıpları azaltan kesintisiz kabuk." },
      { title: "Nem güvenliği", text: "Yoğuşma riskine karşı doğru katman." },
      { title: "Uygulama kalitesi", text: "Detaylarda süreklilik ve izlenebilirlik." },
    ],
    process: ["Keşif", "Analiz", "Tasarım", "Uygulama", "İzleme"],
    usesHeading: "İhtiyaca göre şekillenen çözümler.",
    uses: [
      "Mekanik tesisat",
      "Endüstriyel yüzeyler",
      "Çatı ve cephe",
      "Akustik uygulamalar",
    ],
  },
  energy: {
    index: "05 / ENERJİ",
    name: "Enerji",
    slug: "/tr/faaliyet-alanlari/enerji",
    asset: "/assets/activity-energy-cgi.png",
    assetAlt: "Enerji mühendislik görselleştirmesi",
    titleTop: "Tüketimi gör.",
    titleAccent: "Performansı yükselt.",
    lead: "Enerjiyi ölçen, kayıpları görünür kılan ve iyileştirmeyi sürekli hale getiren mühendislik yaklaşımı.",
    ctaLabel: ACTIVITY_CHROME.heroCta,
    statement: "Veriyi karara, kararı kalıcı enerji performansına dönüştürmek.",
    detail:
      "Tüketim profilini sistem ve mahal bazında analiz ediyor; geri kazanım, otomasyon ve optimizasyon fırsatlarını birlikte değerlendiriyoruz.",
    pillars: [
      { title: "Enerji analizi", text: "Tüketim ve kayıp noktalarının görünürlüğü." },
      { title: "Geri kazanım", text: "Atık enerjiyi yeniden sisteme kazandırma." },
      { title: "Sürekli optimizasyon", text: "İzleme verisiyle gelişen performans." },
    ],
    process: ["Keşif", "Analiz", "Tasarım", "Uygulama", "İzleme"],
    usesHeading: "İhtiyaca göre şekillenen çözümler.",
    uses: ["Enerji etüdü", "Isı geri kazanımı", "Bina otomasyonu", "Performans izleme"],
  },
};

const P_EN = ["Discovery", "Analysis", "Design", "Delivery", "Monitoring"];
const USES_HEADING_EN = "Solutions shaped by the need.";

export const activityDefaultsEn: Record<ActivityKind, ActivityContent> = {
  climate: {
    index: "01 / AIR CONDITIONING",
    name: "Air Conditioning",
    slug: "/en/faaliyet-alanlari/iklimlendirme",
    asset: "/assets/activity-climate-cgi.png",
    assetAlt: "Air conditioning engineering visualisation",
    titleTop: "Manage the air.",
    titleAccent: "Grow the comfort.",
    lead: "Holistic air-conditioning solutions that consider the building's usage profile, air quality and energy performance together.",
    ctaLabel: ACTIVITY_CHROME_EN.heroCta,
    statement: "The right air, the right temperature and the right balance for every space.",
    detail:
      "We analyse flow, pressure, temperature and humidity against the building's real need, designing systems that leave nothing about comfort to chance.",
    pillars: [
      { title: "Air quality", text: "Fresh-air and filtration scenarios." },
      { title: "Thermal comfort", text: "Balanced temperature and humidity control." },
      { title: "Smart operation", text: "Automation that adapts to a variable load." },
    ],
    process: P_EN,
    usesHeading: USES_HEADING_EN,
    uses: ["Commercial buildings", "Industrial facilities", "Healthcare buildings", "Mixed-use projects"],
  },
  heating: {
    index: "02 / HEATING",
    name: "Heating",
    slug: "/en/faaliyet-alanlari/isitma",
    asset: "/assets/activity-heating-cgi.png",
    assetAlt: "Heating engineering visualisation",
    titleTop: "Produce the heat.",
    titleAccent: "Manage it smartly.",
    lead: "Balanced, reliable heating systems that reduce losses from the source all the way to the end user.",
    ctaLabel: ACTIVITY_CHROME_EN.heroCta,
    statement: "Controlled heat, sustainable comfort and a low operating load.",
    detail:
      "We treat heat generation, distribution and zone control as one performance whole, making every point in the system measurable.",
    pillars: [
      { title: "The right source", text: "Capacity and technology matched to the need." },
      { title: "Balanced distribution", text: "Hydraulic balance and minimal loss." },
      { title: "Precise control", text: "Zone-based operation that adapts to a variable load." },
    ],
    process: P_EN,
    usesHeading: USES_HEADING_EN,
    uses: ["Central systems", "Process heating", "Underfloor heating", "Heat recovery"],
  },
  cooling: {
    index: "03 / COOLING",
    name: "Cooling",
    slug: "/en/faaliyet-alanlari/sogutma",
    asset: "/assets/activity-cooling-cgi.png",
    assetAlt: "Cooling engineering visualisation",
    titleTop: "Design not coolness,",
    titleAccent: "but balance.",
    lead: "Stable, precise cooling solutions that pair high performance with controlled consumption.",
    ctaLabel: ACTIVITY_CHROME_EN.heroCta,
    statement: "Stable performance that adapts instantly to changing loads.",
    detail:
      "We evaluate cooling loads alongside operating hours and outdoor conditions, developing system architectures that keep their efficiency at partial loads too.",
    pillars: [
      { title: "Load analysis", text: "Sizing based on real usage data." },
      { title: "Uninterrupted performance", text: "Reliable continuity in critical spaces." },
      { title: "Efficient operation", text: "Optimised energy use at partial loads." },
    ],
    process: P_EN,
    usesHeading: USES_HEADING_EN,
    uses: ["Comfort cooling", "Process cooling", "Precision-controlled areas", "Chilled-water systems"],
  },
  insulation: {
    index: "04 / INSULATION",
    name: "Insulation",
    slug: "/en/faaliyet-alanlari/yalitim",
    asset: "/assets/activity-insulation-cgi.png",
    assetAlt: "Insulation engineering visualisation",
    titleTop: "Keep the energy in.",
    titleAccent: "Protect the value.",
    lead: "Long-lasting insulation systems that solve heat, sound and moisture control across the whole building envelope.",
    ctaLabel: ACTIVITY_CHROME_EN.heroCta,
    statement: "Protection that works in unseen layers and creates value across its lifetime.",
    detail:
      "We select materials by climate, surface and usage conditions, solving thermal bridges, condensation risk and detailing together.",
    pillars: [
      { title: "Heat control", text: "An uninterrupted envelope that reduces losses." },
      { title: "Moisture safety", text: "The right layer against condensation risk." },
      { title: "Application quality", text: "Continuity and traceability in the details." },
    ],
    process: P_EN,
    usesHeading: USES_HEADING_EN,
    uses: ["Mechanical installations", "Industrial surfaces", "Roof and façade", "Acoustic applications"],
  },
  energy: {
    index: "05 / ENERGY",
    name: "Energy",
    slug: "/en/faaliyet-alanlari/enerji",
    asset: "/assets/activity-energy-cgi.png",
    assetAlt: "Energy engineering visualisation",
    titleTop: "See the consumption.",
    titleAccent: "Raise the performance.",
    lead: "An engineering approach that measures energy, makes losses visible and turns improvement into a continuous process.",
    ctaLabel: ACTIVITY_CHROME_EN.heroCta,
    statement: "Turning data into decisions, and decisions into lasting energy performance.",
    detail:
      "We analyse the consumption profile by system and by space, evaluating recovery, automation and optimisation opportunities together.",
    pillars: [
      { title: "Energy analysis", text: "Visibility of consumption and loss points." },
      { title: "Recovery", text: "Returning waste energy back into the system." },
      { title: "Continuous optimisation", text: "Performance that improves with monitoring data." },
    ],
    process: P_EN,
    usesHeading: USES_HEADING_EN,
    uses: ["Energy survey", "Heat recovery", "Building automation", "Performance monitoring"],
  },
};
