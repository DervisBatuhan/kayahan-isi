import { z } from "zod";

export type CorporateKind = "about" | "mission" | "quality" | "sustainability";

const s = z.string().trim();
const req = s.min(1, "Boş bırakılamaz.");
const numTitleText = z.object({ num: s.max(8), title: req.max(120), text: s.max(400) });
const iconTitleText = z.object({ icon: s.max(40), title: req.max(120), text: s.max(400) });

const heroShape = {
  index: req.max(80),
  titleTop: s.max(160),
  titleAccent: s.max(160),
  lead: s.max(600),
};

export const corporateAboutSchema = z.object({
  ...heroShape,
  introLabel: s.max(80),
  introHeading: s.max(160),
  introBody: s.max(900),
  statValue: s.max(16),
  statSuffix: s.max(8),
  statLabel: s.max(120),
  storyLabel: s.max(80),
  storyHeadingTop: s.max(160),
  storyHeadingAccent: s.max(160),
  storyItems: z.array(numTitleText).min(1).max(8),
  valuesLabel: s.max(80),
  valuesHeading: s.max(160),
  valuesItems: z.array(iconTitleText).min(1).max(8),
});

export const corporateMissionSchema = z.object({
  ...heroShape,
  dual: z
    .array(
      z.object({
        tag: s.max(80),
        headingTop: s.max(160),
        headingBottom: s.max(160),
        body: s.max(600),
      }),
    )
    .min(1)
    .max(4),
  principlesLabel: s.max(80),
  principlesHeadingTop: s.max(160),
  principlesHeadingAccent: s.max(160),
  principlesItems: z.array(numTitleText).min(1).max(8),
  statementLine1: s.max(160),
  statementLine2: s.max(160),
});

export const corporateQualitySchema = z.object({
  ...heroShape,
  systemLabel: s.max(80),
  systemHeadingTop: s.max(160),
  systemHeadingAccent: s.max(160),
  systemBody: s.max(600),
  ringLabels: z.array(req.max(40)).min(1).max(8),
  ringCenter: s.max(8),
  commitLabel: s.max(80),
  commitItems: z.array(numTitleText).min(1).max(12),
  bannerTag: s.max(80),
  bannerHeadingTop: s.max(160),
  bannerHeadingAccent: s.max(160),
});

export const corporateSustainSchema = z.object({
  ...heroShape,
  introLabel: s.max(80),
  introHeadingTop: s.max(160),
  introHeadingAccent: s.max(160),
  introBody: s.max(600),
  gridItems: z
    .array(z.object({ icon: s.max(40), num: s.max(8), title: req.max(120), text: s.max(400) }))
    .min(1)
    .max(8),
  balanceArt: s.max(200),
  balanceArtAlt: s.max(200),
  balanceEquation: z.array(req.max(40)).min(1).max(6),
  balanceLabel: s.max(80),
  balanceHeadingTop: s.max(160),
  balanceHeadingAccent: s.max(160),
  balanceBody: s.max(600),
});

export const corporateSchemas: Record<CorporateKind, z.ZodType> = {
  about: corporateAboutSchema,
  mission: corporateMissionSchema,
  quality: corporateQualitySchema,
  sustainability: corporateSustainSchema,
};

export type CorporateAbout = z.infer<typeof corporateAboutSchema>;
export type CorporateMission = z.infer<typeof corporateMissionSchema>;
export type CorporateQuality = z.infer<typeof corporateQualitySchema>;
export type CorporateSustain = z.infer<typeof corporateSustainSchema>;

export const CORPORATE_KIND_LABEL: Record<CorporateKind, string> = {
  about: "Hakkımızda",
  mission: "Misyon & Vizyon",
  quality: "Kalite Politikamız",
  sustainability: "Sürdürülebilirlik",
};

export const CORPORATE_ROUTE: Record<CorporateKind, string> = {
  about: "/tr/kurumsal/hakkimizda",
  mission: "/tr/kurumsal/misyon-vizyon",
  quality: "/tr/kurumsal/kalite-politikasi",
  sustainability: "/tr/kurumsal/surdurulebilirlik",
};

export const corporateAboutDefault: CorporateAbout = {
  index: "01 / KURUMSAL",
  titleTop: "Köklerimizden",
  titleAccent: "geleceğe.",
  lead: "1976’dan bugüne; teknik ustalığı, kurumsal sorumluluk ve geleceğin teknolojileriyle bir araya getiriyoruz.",
  introLabel: "BİZ KİMİZ?",
  introHeading: "Tecrübeli ailenizden biri.",
  introBody:
    "Kayahan Isı, 1976’dan bu yana iklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında teknik bilgi ile güveni aynı çatı altında buluşturur. Değişen teknolojiye uyum sağlarken, ustalık kültürünü ve uzun vadeli hizmet anlayışını korur.",
  statValue: "45",
  statSuffix: "+",
  statLabel: "Yıllık sektörel birikim",
  storyLabel: "1976’DAN BUGÜNE",
  storyHeadingTop: "Teknoloji değişti.",
  storyHeadingAccent: "Sorumluluğumuz değişmedi.",
  storyItems: [
    { num: "01", title: "Ustalık", text: "Sahada kazanılan teknik deneyim." },
    { num: "02", title: "Kurumsallaşma", text: "Standartlaşan hizmet ve ekip kültürü." },
    { num: "03", title: "Mühendislik", text: "Veriye dayalı, ihtiyaca özel çözümler." },
    { num: "04", title: "Gelecek", text: "Enerji verimliliği ve sürdürülebilir sistemler." },
  ],
  valuesLabel: "KURUMSAL OMURGA",
  valuesHeading: "Geçmişten taşıdığımız dört değer.",
  valuesItems: [
    { icon: "heritage", title: "Köklü deneyim", text: "Kararlarımızı sahada edinilmiş gerçek bilgiyle alırız." },
    { icon: "people", title: "İnsan odağı", text: "Güveni, açık iletişimi ve uzun soluklu ilişkileri önemseriz." },
    { icon: "precision", title: "Teknik doğruluk", text: "Her çözümü ölçer, analiz eder ve ihtiyaca göre tasarlarız." },
    { icon: "future", title: "Yenilik", text: "Biriktirdiğimiz ustalığı geleceğin teknolojisiyle geliştiririz." },
  ],
};

export const corporateMissionDefault: CorporateMission = {
  index: "02 / YÖNÜMÜZ",
  titleTop: "Bugünü iyileştir.",
  titleAccent: "Geleceği tasarla.",
  lead: "İnsan, yapı ve enerji arasında daha dengeli, daha verimli ve daha güvenilir sistemler kuruyoruz.",
  dual: [
    {
      tag: "01 / MİSYONUMUZ",
      headingTop: "Doğru sistemi,",
      headingBottom: "doğru ihtiyaçla buluşturmak.",
      body: "İklimlendirme ve enerji sistemlerinde güvenli, verimli ve uzun ömürlü çözümler sunmak; teknik bilgiyi erişilebilir hizmete dönüştürmek.",
    },
    {
      tag: "02 / VİZYONUMUZ",
      headingTop: "Tecrübeyi,",
      headingBottom: "geleceğin standardına taşımak.",
      body: "Köklü uzmanlığımızı yeni nesil teknolojilerle birleştirerek sektörün güven, verimlilik ve sürdürülebilirlik yaklaşımına yön vermek.",
    },
  ],
  principlesLabel: "NASIL İLERLİYORUZ?",
  principlesHeadingTop: "Her kararın merkezinde",
  principlesHeadingAccent: "ölçülebilir değer var.",
  principlesItems: [
    { num: "01", title: "Dinlemek", text: "İhtiyacı doğru tanımlamak." },
    { num: "02", title: "Analiz etmek", text: "Veriyi teknik bilgiyle yorumlamak." },
    { num: "03", title: "Tasarlamak", text: "Yapıya özel çözüm geliştirmek." },
    { num: "04", title: "Sürdürmek", text: "Performansı uzun vadede korumak." },
  ],
  statementLine1: "Geçmişin ustalığı.",
  statementLine2: "Geleceğin enerjisi.",
};

export const corporateQualityDefault: CorporateQuality = {
  index: "03 / KALİTE",
  titleTop: "Her aşamada",
  titleAccent: "aynı güven.",
  lead: "Analizden uygulamaya, devreye almadan satış sonrası desteğe kadar ölçülebilir kalite anlayışı.",
  systemLabel: "KALİTE YAKLAŞIMIMIZ",
  systemHeadingTop: "Kalite, sonuçtan önce",
  systemHeadingAccent: "başlayan bir disiplindir.",
  systemBody:
    "Her projede doğru analiz, şeffaf süreç, uygun uygulama ve sürdürülebilir performans ilkeleriyle hareket ederiz.",
  ringLabels: ["PLANLA", "UYGULA", "KONTROL ET", "GELİŞTİR"],
  ringCenter: "Q",
  commitLabel: "POLİTİKAMIZ",
  commitItems: [
    { num: "01", title: "Standartlara bağlılık", text: "Teknik şartlara, güvenlik kriterlerine ve yürürlükteki standartlara uygunluk." },
    { num: "02", title: "Sürekli iyileştirme", text: "Süreçleri, ekip yetkinliğini ve hizmet kalitesini düzenli olarak geliştirme." },
    { num: "03", title: "Müşteri güveni", text: "Açık iletişim, doğru bilgilendirme ve satış sonrası sorumluluk." },
    { num: "04", title: "Kaynak verimliliği", text: "Enerjiyi, zamanı ve malzemeyi bilinçli kullanma." },
    { num: "05", title: "Yetkin ekip", text: "Bilgiyi paylaşan, gelişimi sürdüren uzman kadro." },
    { num: "06", title: "İzlenebilir süreç", text: "Analizden teslimata kadar kontrollü ve anlaşılır çalışma düzeni." },
  ],
  bannerTag: "DEĞİŞMEYEN İLKE",
  bannerHeadingTop: "Her işte aynı özen.",
  bannerHeadingAccent: "Her teslimde aynı güven.",
};

export const corporateSustainDefault: CorporateSustain = {
  index: "04 / SÜRDÜRÜLEBİLİRLİK",
  titleTop: "Enerjiyi koru.",
  titleAccent: "Yarını güçlendir.",
  lead: "Konforu azaltmadan tüketimi düşüren, kaynakları verimli kullanan ve uzun ömürlü çözümler geliştiriyoruz.",
  introLabel: "SORUMLU MÜHENDİSLİK",
  introHeadingTop: "Daha az tüketim.",
  introHeadingAccent: "Daha uzun ömür.",
  introBody:
    "Sürdürülebilirliği yalnızca enerji tasarrufu olarak değil; doğru sistem seçimi, verimli işletme, uzun kullanım ömrü ve kaynakların bilinçli yönetimi olarak ele alıyoruz.",
  gridItems: [
    { icon: "energy", num: "01", title: "Enerji verimliliği", text: "İhtiyaç kadar tüketen, performansı koruyan sistemler." },
    { icon: "precision", num: "02", title: "Kaynak yönetimi", text: "Malzeme, zaman ve enerjinin bilinçli kullanımı." },
    { icon: "cycle", num: "03", title: "Uzun sistem ömrü", text: "Doğru bakım ve optimizasyonla sürdürülen performans." },
    { icon: "future", num: "04", title: "Gelecek odağı", text: "Yeni teknolojilere uyumlu, geliştirilebilir çözümler." },
  ],
  balanceArt: "/assets/climate-orchestration-cgi.png",
  balanceArtAlt: "Isı, hava ve enerjiyi birleştiren iklim sistemi",
  balanceEquation: ["ISI", "HAVA", "ENERJİ"],
  balanceLabel: "DENGE",
  balanceHeadingTop: "Konfor ile verimlilik",
  balanceHeadingAccent: "birlikte mümkün.",
  balanceBody:
    "Yapının gerçek ihtiyacını analiz ediyor; sistem bileşenlerini tek bir performans bütünü olarak değerlendiriyoruz.",
};

export const corporateDefaults: Record<CorporateKind, Record<string, unknown>> = {
  about: corporateAboutDefault as unknown as Record<string, unknown>,
  mission: corporateMissionDefault as unknown as Record<string, unknown>,
  quality: corporateQualityDefault as unknown as Record<string, unknown>,
  sustainability: corporateSustainDefault as unknown as Record<string, unknown>,
};

/* ── English defaults ─────────────────────────────────────────────────── */

export const corporateAboutDefaultEn: CorporateAbout = {
  index: "01 / CORPORATE",
  titleTop: "From our roots",
  titleAccent: "to the future.",
  lead: "Since 1976, we bring technical craftsmanship, corporate responsibility and the technology of the future together.",
  introLabel: "WHO WE ARE",
  introHeading: "One of your experienced family.",
  introBody:
    "Since 1976 Kayahan Isı has brought technical knowledge and trust under one roof across air conditioning, heating, cooling, insulation and energy. As technology changes, we keep the craft culture and a long-term service mindset.",
  statValue: "45",
  statSuffix: "+",
  statLabel: "Years of sector know-how",
  storyLabel: "SINCE 1976",
  storyHeadingTop: "Technology changed.",
  storyHeadingAccent: "Our responsibility did not.",
  storyItems: [
    { num: "01", title: "Craftsmanship", text: "Technical experience earned in the field." },
    { num: "02", title: "Becoming corporate", text: "Standardised service and team culture." },
    { num: "03", title: "Engineering", text: "Data-driven, needs-specific solutions." },
    { num: "04", title: "The future", text: "Energy efficiency and sustainable systems." },
  ],
  valuesLabel: "CORPORATE BACKBONE",
  valuesHeading: "Four values we carry from the past.",
  valuesItems: [
    { icon: "heritage", title: "Rooted experience", text: "We make decisions with real knowledge earned in the field." },
    { icon: "people", title: "People focus", text: "We value trust, open communication and long-lasting relationships." },
    { icon: "precision", title: "Technical accuracy", text: "We measure, analyse and design every solution to the need." },
    { icon: "future", title: "Innovation", text: "We develop the craftsmanship we have gathered with the technology of the future." },
  ],
};

export const corporateMissionDefaultEn: CorporateMission = {
  index: "02 / OUR DIRECTION",
  titleTop: "Improve today.",
  titleAccent: "Design the future.",
  lead: "We build more balanced, more efficient and more reliable systems across people, buildings and energy.",
  dual: [
    {
      tag: "01 / OUR MISSION",
      headingTop: "To match the right system",
      headingBottom: "with the right need.",
      body: "To provide safe, efficient and long-lasting solutions in air-conditioning and energy systems; to turn technical knowledge into accessible service.",
    },
    {
      tag: "02 / OUR VISION",
      headingTop: "To carry experience",
      headingBottom: "into the standard of the future.",
      body: "To shape the sector's approach to trust, efficiency and sustainability by combining our rooted expertise with new-generation technologies.",
    },
  ],
  principlesLabel: "HOW WE MOVE FORWARD",
  principlesHeadingTop: "At the centre of every decision",
  principlesHeadingAccent: "there is measurable value.",
  principlesItems: [
    { num: "01", title: "Listen", text: "Define the need correctly." },
    { num: "02", title: "Analyse", text: "Interpret data with technical knowledge." },
    { num: "03", title: "Design", text: "Develop a solution specific to the building." },
    { num: "04", title: "Sustain", text: "Protect performance over the long term." },
  ],
  statementLine1: "Craftsmanship of the past.",
  statementLine2: "Energy of the future.",
};

export const corporateQualityDefaultEn: CorporateQuality = {
  index: "03 / QUALITY",
  titleTop: "The same trust",
  titleAccent: "at every stage.",
  lead: "A measurable approach to quality — from analysis to installation, from commissioning to after-sales support.",
  systemLabel: "OUR QUALITY APPROACH",
  systemHeadingTop: "Quality is a discipline that begins",
  systemHeadingAccent: "before the result.",
  systemBody:
    "On every project we work by the principles of correct analysis, a transparent process, appropriate implementation and sustainable performance.",
  ringLabels: ["PLAN", "DO", "CHECK", "IMPROVE"],
  ringCenter: "Q",
  commitLabel: "OUR POLICY",
  commitItems: [
    { num: "01", title: "Commitment to standards", text: "Compliance with technical specifications, safety criteria and applicable standards." },
    { num: "02", title: "Continuous improvement", text: "Regularly improving processes, team competence and service quality." },
    { num: "03", title: "Customer trust", text: "Open communication, accurate information and after-sales responsibility." },
    { num: "04", title: "Resource efficiency", text: "Conscious use of energy, time and materials." },
    { num: "05", title: "A competent team", text: "An expert crew that shares knowledge and keeps developing." },
    { num: "06", title: "A traceable process", text: "A controlled, understandable order of work from analysis to delivery." },
  ],
  bannerTag: "THE CONSTANT PRINCIPLE",
  bannerHeadingTop: "The same care in every job.",
  bannerHeadingAccent: "The same trust at every handover.",
};

export const corporateSustainDefaultEn: CorporateSustain = {
  index: "04 / SUSTAINABILITY",
  titleTop: "Protect the energy.",
  titleAccent: "Strengthen tomorrow.",
  lead: "We develop long-lasting solutions that cut consumption without cutting comfort and use resources efficiently.",
  introLabel: "RESPONSIBLE ENGINEERING",
  introHeadingTop: "Less consumption.",
  introHeadingAccent: "A longer life.",
  introBody:
    "We treat sustainability not only as energy saving but as the right system choice, efficient operation, a long service life and the conscious management of resources.",
  gridItems: [
    { icon: "energy", num: "01", title: "Energy efficiency", text: "Systems that consume only what is needed and keep their performance." },
    { icon: "precision", num: "02", title: "Resource management", text: "Conscious use of materials, time and energy." },
    { icon: "cycle", num: "03", title: "Long system life", text: "Performance sustained with correct maintenance and optimisation." },
    { icon: "future", num: "04", title: "Future focus", text: "Solutions that are compatible with new technologies and can be developed." },
  ],
  balanceArt: "/assets/climate-orchestration-cgi.png",
  balanceArtAlt: "A climate system combining heat, air and energy",
  balanceEquation: ["HEAT", "AIR", "ENERGY"],
  balanceLabel: "BALANCE",
  balanceHeadingTop: "Comfort and efficiency",
  balanceHeadingAccent: "are possible together.",
  balanceBody:
    "We analyse the building's real need and evaluate the system components as one performance whole.",
};

export const corporateDefaultsEn: Record<CorporateKind, Record<string, unknown>> = {
  about: corporateAboutDefaultEn as unknown as Record<string, unknown>,
  mission: corporateMissionDefaultEn as unknown as Record<string, unknown>,
  quality: corporateQualityDefaultEn as unknown as Record<string, unknown>,
  sustainability: corporateSustainDefaultEn as unknown as Record<string, unknown>,
};

/** Decorative hero-art text (not editable — mirrors the design). */
export const CORP_CHROME = {
  tr: {
    eraNow: "BUGÜN",
    missionLabel: "MİSYON",
    missionArt: ["Bugünü", "iyileştir."],
    visionLabel: "VİZYON",
    visionArt: ["Geleceği", "tasarla."],
    calibration: ["ÖLÇÜLEBİLİR", "KALİTE"],
    cycleLabel: "ENERJİ DÖNGÜSÜ",
    cycleValue: "Sürekli değer.",
    memoryAlt: "Kurumsal hafızayı temsil eden cam katmanlar",
    calibrationAlt: "Hassas kalite kalibrasyon sistemi",
    flowAlt: "Sürdürülebilir enerji dolaşımı",
  },
  en: {
    eraNow: "TODAY",
    missionLabel: "MISSION",
    missionArt: ["Improve", "today."],
    visionLabel: "VISION",
    visionArt: ["Design the", "future."],
    calibration: ["MEASURABLE", "QUALITY"],
    cycleLabel: "ENERGY CYCLE",
    cycleValue: "Lasting value.",
    memoryAlt: "Glass layers representing corporate memory",
    calibrationAlt: "Precision quality calibration system",
    flowAlt: "Sustainable energy circulation",
  },
};

export function corpChrome(locale: string) {
  return locale === "en" ? CORP_CHROME.en : CORP_CHROME.tr;
}
