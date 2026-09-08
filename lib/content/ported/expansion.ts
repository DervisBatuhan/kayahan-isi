import { z } from "zod";

export type ExpansionKind =
  | "board"
  | "message"
  | "certificates"
  | "gallery"
  | "press"
  | "career";

const s = z.string().trim();
const req = s.min(1, "Boş bırakılamaz.");
const numTitleText = z.object({ num: s.max(8), title: req.max(120), text: s.max(400) });
const iconTitleText = z.object({ icon: s.max(40), title: req.max(120), text: s.max(400) });

const heroShape = {
  heroEyebrow: s.max(80),
  heroTitle: s.max(160),
  heroAccent: s.max(160),
};

export const boardSchema = z.object({
  ...heroShape,
  introLabel: s.max(80),
  introHeadingTop: s.max(160),
  introHeadingAccent: s.max(160),
  chairMonogram: s.max(8),
  chairRole: s.max(80),
  chairName: s.max(120),
  chairText: s.max(600),
  governance: z.array(numTitleText).min(1).max(8),
});

export const messageSchema = z.object({
  ...heroShape,
  lead: s.max(600),
  paragraphs: z.array(s.max(1200)).min(1).max(8),
  signatureName: s.max(120),
  signatureRole: s.max(120),
});

export const certificatesSchema = z.object({
  ...heroShape,
  introLabel: s.max(80),
  introHeadingTop: s.max(160),
  introHeadingAccent: s.max(160),
  introBody: s.max(600),
  items: z.array(req.max(120)).min(1).max(16),
});

export const gallerySchema = z.object({
  ...heroShape,
  items: z
    .array(z.object({ src: req.max(200), title: req.max(120), caption: s.max(160) }))
    .min(1)
    .max(24),
});

export const pressSchema = z.object({
  ...heroShape,
  featureImage: s.max(200),
  featureImageAlt: s.max(200),
  featureLabel: s.max(80),
  featureHeadingTop: s.max(160),
  featureHeadingAccent: s.max(160),
  featureBody: s.max(600),
  featureCtaLabel: s.max(80),
  featureCtaHref: s.max(200),
  emptyLabel: s.max(80),
  emptyBody: s.max(400),
});

export const careerSchema = z.object({
  ...heroShape,
  introLabel: s.max(80),
  introHeadingTop: s.max(160),
  introHeadingAccent: s.max(160),
  introBody: s.max(600),
  applyLabel: s.max(80),
  applyHref: s.max(200),
  values: z.array(iconTitleText).min(1).max(8),
  openLabel: s.max(80),
  openHeading: s.max(160),
  openBody: s.max(400),
});

export const expansionSchemas: Record<ExpansionKind, z.ZodType> = {
  board: boardSchema,
  message: messageSchema,
  certificates: certificatesSchema,
  gallery: gallerySchema,
  press: pressSchema,
  career: careerSchema,
};

export const EXPANSION_KIND_LABEL: Record<ExpansionKind, string> = {
  board: "Yönetim Kurulu",
  message: "Yönetim Kurulu Mesajı",
  certificates: "Sertifikalarımız",
  gallery: "Galeri",
  press: "Basında Biz",
  career: "İnsan Kaynakları",
};

export const EXPANSION_ROUTE: Record<ExpansionKind, string> = {
  board: "/tr/kurumsal/yonetim-kurulu",
  message: "/tr/kurumsal/yonetim-kurulu-mesaji",
  certificates: "/tr/kurumsal/sertifikalarimiz",
  gallery: "/tr/galeri",
  press: "/tr/basinda-biz",
  career: "/tr/insan-kaynaklari",
};

export const expansionDefaults: Record<ExpansionKind, Record<string, unknown>> = {
  board: {
    heroEyebrow: "YÖNETİM",
    heroTitle: "Ortak akıl.",
    heroAccent: "Teknik sorumluluk.",
    introLabel: "YÖNETİM KURULU",
    introHeadingTop: "Tecrübenin yön verdiği,",
    introHeadingAccent: "geleceğe açık bir yönetim.",
    chairMonogram: "İK",
    chairRole: "YÖNETİM KURULU BAŞKANI",
    chairName: "İlhan Kaya",
    chairText:
      "Kayahan Isı’nın köklü saha kültürünü, kurumsal sorumluluk ve yeni nesil teknoloji yaklaşımıyla geleceğe taşır.",
    governance: [
      { num: "01", title: "Güven", text: "Uzun vadeli ilişkiler ve açık iletişim." },
      { num: "02", title: "Ustalık", text: "Kararlarda sahadan gelen teknik bilgi." },
      { num: "03", title: "Gelişim", text: "Yeni teknolojiye ve öğrenmeye açıklık." },
      { num: "04", title: "Sorumluluk", text: "İnsana, yapıya ve enerjiye saygı." },
    ],
  },
  message: {
    heroEyebrow: "YÖNETİM KURULU MESAJI",
    heroTitle: "Geçmişimize bağlı,",
    heroAccent: "geleceğe hazırız.",
    lead: "1976’dan bu yana değişmeyen en önemli değerimiz, işimizi doğru yapma sorumluluğudur.",
    paragraphs: [
      "Kayahan Isı olarak teknik tecrübeyi yalnızca geçmişten gelen bir birikim değil, her yeni projede yeniden kanıtlanması gereken bir güven olarak görüyoruz. İklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında yapının gerçek ihtiyacını anlamaya; doğru, verimli ve uzun ömürlü sistemler kurmaya odaklanıyoruz.",
      "Bugün ustalık kültürümüzü yeni nesil mühendislik, enerji verimliliği ve akıllı teknolojilerle geliştiriyoruz. Bizi yarım asra yaklaşan bu yolculukta destekleyen müşterilerimize, iş ortaklarımıza ve çalışma arkadaşlarımıza teşekkür ederim.",
    ],
    signatureName: "İlhan Kaya",
    signatureRole: "Yönetim Kurulu Başkanı",
  },
  certificates: {
    heroEyebrow: "SERTİFİKALARIMIZ",
    heroTitle: "Yetkinlik.",
    heroAccent: "Belgelendirilmiş güven.",
    introLabel: "KURUMSAL YETERLİLİK",
    introHeadingTop: "Standartlara bağlı,",
    introHeadingAccent: "ölçülebilir hizmet.",
    introBody:
      "Kurumsal ve teknik belgelerimiz güncel dokümanlar eklendikçe bu alanda yayınlanacaktır.",
    items: [
      "Kalite Yönetim Sistemi",
      "Teknik Yetkinlik Belgeleri",
      "İş Sağlığı ve Güvenliği",
      "Enerji Performansı",
      "Mesleki Yeterlilik",
      "Yetkili Servis Belgeleri",
    ],
  },
  gallery: {
    heroEyebrow: "GALERİ",
    heroTitle: "Mühendisliğin",
    heroAccent: "detayları.",
    items: [
      { src: "/assets/activity-climate-cgi.png", title: "İklimlendirme", caption: "Hava akışı ve konfor" },
      { src: "/assets/activity-heating-cgi.png", title: "Isıtma", caption: "Güvenli enerji dağıtımı" },
      { src: "/assets/activity-cooling-cgi.png", title: "Soğutma", caption: "Yüksek performans" },
      { src: "/assets/activity-insulation-cgi.png", title: "Yalıtım", caption: "Yapı kabuğu çözümleri" },
      { src: "/assets/solution-automation-cgi.png", title: "Otomasyon", caption: "Akıllı kontrol" },
      { src: "/assets/solution-service-cgi.png", title: "Servis", caption: "Sürekli performans" },
    ],
  },
  press: {
    heroEyebrow: "BASINDA BİZ",
    heroTitle: "Kayahan Isı’dan",
    heroAccent: "güncel gelişmeler.",
    featureImage: "/assets/home-media-cgi.png",
    featureImageAlt: "Kayahan Isı mühendislik ve teknoloji",
    featureLabel: "KURUMSAL HABERLER",
    featureHeadingTop: "45 yıllık ustalık,",
    featureHeadingAccent: "geleceğin teknolojisiyle buluşuyor.",
    featureBody:
      "Yeni projelerimiz, teknik gelişmelerimiz ve kurumsal duyurularımız yakında burada.",
    featureCtaLabel: "BASIN İLETİŞİMİ",
    featureCtaHref: "/tr/iletisim",
    emptyLabel: "HABER ARŞİVİ",
    emptyBody: "Yeni içerikler eklendikçe bu alanda listelenecektir.",
  },
  career: {
    heroEyebrow: "KARİYER / İNSAN KAYNAKLARI",
    heroTitle: "Birlikte öğren.",
    heroAccent: "Birlikte geliştir.",
    introLabel: "KAYAHAN ISI’DA KARİYER",
    introHeadingTop: "Ustalığın paylaşıldığı",
    introHeadingAccent: "bir ekip kültürü.",
    introBody:
      "Teknik bilgiyi önemseyen, sorumluluk alan ve birlikte gelişmeye inanan çalışma arkadaşlarıyla geleceğin sistemlerini kuruyoruz.",
    applyLabel: "GENEL BAŞVURU",
    applyHref: "mailto:info@kayahanisi.com.tr",
    values: [
      { icon: "users", title: "Ekip ruhu", text: "Bilgi paylaşımı ve ortak sorumluluk." },
      { icon: "briefcase", title: "Gelişim", text: "Saha deneyimi ve sürekli öğrenme." },
      { icon: "shield", title: "Güven", text: "Açık iletişim ve uzun soluklu ilişkiler." },
      { icon: "award", title: "Ustalık", text: "İşin her aşamasında teknik özen." },
    ],
    openLabel: "AÇIK POZİSYONLAR",
    openHeading: "Yeni ilanlar yakında.",
    openBody: "Özgeçmişinizi genel başvuru üzerinden bizimle paylaşabilirsiniz.",
  },
};

export const expansionDefaultsEn: Record<ExpansionKind, Record<string, unknown>> = {
  board: {
    heroEyebrow: "GOVERNANCE",
    heroTitle: "Shared judgement.",
    heroAccent: "Technical responsibility.",
    introLabel: "BOARD OF DIRECTORS",
    introHeadingTop: "A board guided by experience,",
    introHeadingAccent: "open to the future.",
    chairMonogram: "İK",
    chairRole: "CHAIRMAN OF THE BOARD",
    chairName: "İlhan Kaya",
    chairText:
      "He carries Kayahan Isı's rooted field culture into the future with corporate responsibility and a new-generation technology approach.",
    governance: [
      { num: "01", title: "Trust", text: "Long-term relationships and open communication." },
      { num: "02", title: "Craftsmanship", text: "Technical knowledge from the field in decisions." },
      { num: "03", title: "Development", text: "Openness to new technology and to learning." },
      { num: "04", title: "Responsibility", text: "Respect for people, the building and energy." },
    ],
  },
  message: {
    heroEyebrow: "MESSAGE FROM THE BOARD",
    heroTitle: "Rooted in our past,",
    heroAccent: "ready for the future.",
    lead: "Since 1976, our most important value that has not changed is the responsibility of doing our work right.",
    paragraphs: [
      "At Kayahan Isı we see technical experience not merely as a legacy from the past but as trust that must be proven again on every new project. Across air conditioning, heating, cooling, insulation and energy, we focus on understanding the building's real need and on building correct, efficient and long-lasting systems.",
      "Today we develop our craft culture with new-generation engineering, energy efficiency and smart technologies. I thank our customers, business partners and colleagues who have supported us on this journey of nearly half a century.",
    ],
    signatureName: "İlhan Kaya",
    signatureRole: "Chairman of the Board",
  },
  certificates: {
    heroEyebrow: "OUR CERTIFICATIONS",
    heroTitle: "Competence.",
    heroAccent: "Certified trust.",
    introLabel: "CORPORATE COMPETENCE",
    introHeadingTop: "Standards-based,",
    introHeadingAccent: "measurable service.",
    introBody:
      "Our corporate and technical documents will be published in this area as up-to-date documents are added.",
    items: [
      "Quality Management System",
      "Technical Competence Certificates",
      "Occupational Health and Safety",
      "Energy Performance",
      "Vocational Qualification",
      "Authorised Service Certificates",
    ],
  },
  gallery: {
    heroEyebrow: "GALLERY",
    heroTitle: "The details",
    heroAccent: "of engineering.",
    items: [
      { src: "/assets/activity-climate-cgi.png", title: "Air Conditioning", caption: "Airflow and comfort" },
      { src: "/assets/activity-heating-cgi.png", title: "Heating", caption: "Safe energy distribution" },
      { src: "/assets/activity-cooling-cgi.png", title: "Cooling", caption: "High performance" },
      { src: "/assets/activity-insulation-cgi.png", title: "Insulation", caption: "Building-envelope solutions" },
      { src: "/assets/solution-automation-cgi.png", title: "Automation", caption: "Smart control" },
      { src: "/assets/solution-service-cgi.png", title: "Service", caption: "Continuous performance" },
    ],
  },
  press: {
    heroEyebrow: "IN THE PRESS",
    heroTitle: "Latest developments",
    heroAccent: "from Kayahan Isı.",
    featureImage: "/assets/home-media-cgi.png",
    featureImageAlt: "Kayahan Isı engineering and technology",
    featureLabel: "CORPORATE NEWS",
    featureHeadingTop: "45 years of craftsmanship,",
    featureHeadingAccent: "meeting the technology of the future.",
    featureBody:
      "Our new projects, technical developments and corporate announcements will be here soon.",
    featureCtaLabel: "PRESS CONTACT",
    featureCtaHref: "/en/iletisim",
    emptyLabel: "NEWS ARCHIVE",
    emptyBody: "New content will be listed in this area as it is added.",
  },
  career: {
    heroEyebrow: "CAREERS / HUMAN RESOURCES",
    heroTitle: "Learn together.",
    heroAccent: "Grow together.",
    introLabel: "A CAREER AT KAYAHAN ISI",
    introHeadingTop: "A team culture where",
    introHeadingAccent: "craftsmanship is shared.",
    introBody:
      "We build the systems of the future with colleagues who value technical knowledge, take responsibility and believe in growing together.",
    applyLabel: "GENERAL APPLICATION",
    applyHref: "mailto:info@kayahanisi.com.tr",
    values: [
      { icon: "users", title: "Team spirit", text: "Knowledge sharing and shared responsibility." },
      { icon: "briefcase", title: "Development", text: "Field experience and continuous learning." },
      { icon: "shield", title: "Trust", text: "Open communication and long-lasting relationships." },
      { icon: "award", title: "Craftsmanship", text: "Technical care at every stage of the work." },
    ],
    openLabel: "OPEN POSITIONS",
    openHeading: "New listings coming soon.",
    openBody: "You can share your CV with us through the general application.",
  },
};
