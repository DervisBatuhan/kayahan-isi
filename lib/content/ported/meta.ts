import type { Locale } from "@/lib/i18n/config";

type Meta = { title: string; description: string };
type Entry = { og: "website" | "article"; tr: Meta; en: Meta };

/**
 * Per-locale <title> + meta description for every physically-routed page
 * (design pages + the contact/quote/references utility pages). Keyed by the
 * locale-less path.
 */
export const PORTED_META: Record<string, Entry> = {
  "/kesfet": {
    og: "website",
    tr: {
      title: "Keşfet",
      description:
        "Kayahan Isı'yı daha yakından tanıyın: projelerimiz, sertifikalarımız, galeri ve basında biz.",
    },
    en: {
      title: "Explore",
      description:
        "Get to know Kayahan Isı more closely: our projects, certifications, gallery and press coverage.",
    },
  },
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
  "/projelerimiz": {
    og: "website",
    tr: {
      title: "Projelerimiz",
      description:
        "Analizden devreye almaya; iklimlendirme, ısıtma, soğutma, yalıtım ve enerji projelerimize yaklaşımımız.",
    },
    en: {
      title: "Our Projects",
      description:
        "From analysis to commissioning — our approach to air conditioning, heating, cooling, insulation and energy projects.",
    },
  },
  "/blog": {
    og: "website",
    tr: {
      title: "Blog",
      description:
        "Sahadan gelen teknik deneyimi, güncel teknolojileri ve mühendislik bakış açısını bir araya getiren yazılar.",
    },
    en: {
      title: "Insights",
      description:
        "Articles bringing together field expertise, current technologies and an engineering perspective.",
    },
  },
  "/sikca-sorulan-sorular": {
    og: "website",
    tr: {
      title: "Sıkça Sorulan Sorular",
      description:
        "Proje, uygulama ve hizmet süreçlerine ilişkin merak edilenler tek yerde.",
    },
    en: {
      title: "Frequently Asked Questions",
      description: "Common questions about our projects, implementation and services in one place.",
    },
  },
  "/musteri-yorumlari": {
    og: "website",
    tr: {
      title: "Müşteri Yorumları",
      description:
        "Birlikte tamamladığımız projelerin gerçek deneyimleri, şeffaf ve yalın biçimde.",
    },
    en: {
      title: "Client Stories",
      description: "Authentic experiences from completed projects, shared with clarity and transparency.",
    },
  },
  "/cozum-ortaklarimiz": {
    og: "website",
    tr: {
      title: "Çözüm Ortaklarımız",
      description:
        "Teknik yetkinliği, güvenilirliği ve uzun vadeli değer üretme yaklaşımını paylaşan iş ortaklarımız.",
    },
    en: {
      title: "Solution Partners",
      description:
        "The partner brands that share our commitment to technical expertise, reliability and long-term value.",
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
  "/servis": {
    og: "website",
    tr: {
      title: "Servis — Kombi, Klima ve Şofben Servisi, İstanbul Avrupa Yakası",
      description:
        "Kombi, klima ve şofben servisi: arıza, yıllık bakım, orijinal parça ve montaj. Bahçelievler, Bağcılar, Bakırköy ve beş komşu ilçede aynı gün; DemirDöküm, Vaillant, Baymak, Protherm dahil tüm markalar.",
    },
    en: {
      title: "Service — Boiler, AC and Water-Heater Service, Istanbul",
      description:
        "Boiler, AC and water-heater service: repair, annual maintenance, genuine parts and installation. Same day across eight districts on Istanbul's European side; every brand.",
    },
  },
  "/hizmet-bolgelerimiz": {
    og: "website",
    tr: {
      title: "Hizmet Bölgelerimiz — İstanbul Avrupa Yakası Kombi, Klima, Şofben Servisi",
      description:
        "Bahçelievler, Bağcılar, Bakırköy, Güngören, Zeytinburnu, Esenler, Bayrampaşa ve Küçükçekmece'de aynı gün kombi, klima ve şofben servisi. İlçenizi seçin.",
    },
    en: {
      title: "Service Areas — Istanbul European Side",
      description:
        "Same-day boiler, AC and water-heater service in Bahçelievler, Bağcılar, Bakırköy, Güngören, Zeytinburnu, Esenler, Bayrampaşa and Küçükçekmece. Pick your district.",
    },
  },
  "/bilgi-merkezi": {
    og: "website",
    tr: {
      title: "Bilgi Merkezi — Blog, Sıkça Sorulan Sorular, Müşteri Yorumları",
      description:
        "Isıtma, soğutma ve enerji verimliliği üzerine rehber yazılar, servis ve bakım hakkında sık sorulan sorular ve müşteri deneyimleri.",
    },
    en: {
      title: "Knowledge Hub — Blog, FAQ, Client Stories",
      description:
        "Guides on heating, cooling and energy efficiency, frequently asked questions on service and maintenance, and client stories.",
    },
  },
  "/kombi-servisi": {
    og: "website",
    tr: {
      title: "Kombi Servisi İstanbul Avrupa Yakası — Arıza, Bakım, Montaj",
      description:
        "45 yıl DemirDöküm ve Vaillant yetkili servisi deneyimiyle tüm markalara kombi arıza, yıllık bakım, orijinal parça ve montaj. Bahçelievler, Bakırköy, Bağcılar ve çevresinde 7/24.",
    },
    en: {
      title: "Boiler Service, Istanbul — Repair, Maintenance, Installation",
      description:
        "Boiler repair, annual maintenance, genuine parts and installation for every brand — 45 years of DemirDöküm and Vaillant authorised-service experience. 24/7 on Istanbul's European side.",
    },
  },
  "/klima-servisi": {
    og: "website",
    tr: {
      title: "Klima Servisi İstanbul Avrupa Yakası — Bakım, Gaz Dolumu, Montaj",
      description:
        "Split, multi-split ve VRF klimalarda bakım, gaz dolumu, kaçak tespiti, arıza ve montaj. MEB belgeli teknisyenler; Bahçelievler, Bakırköy, Bağcılar ve çevre ilçelerde aynı gün.",
    },
    en: {
      title: "AC Service, Istanbul — Maintenance, Refrigerant, Installation",
      description:
        "Maintenance, refrigerant charging, leak detection, repair and installation for split, multi-split and VRF systems by certified technicians. Same day on Istanbul's European side.",
    },
  },
  "/sofben-servisi": {
    og: "website",
    tr: {
      title: "Şofben Servisi İstanbul Avrupa Yakası — Arıza, Bakım, Montaj",
      description:
        "Gazlı ve elektrikli şofbenlerde arıza, yıllık bakım, orijinal parça ve mevzuata uygun montaj. MYK belgeli teknisyenler, gaz güvenliği önce. Avrupa Yakası'nda 7/24.",
    },
    en: {
      title: "Water-Heater Service, Istanbul — Repair, Maintenance, Installation",
      description:
        "Repair, annual maintenance, genuine parts and code-compliant installation for gas and electric water heaters by MYK-certified technicians. 24/7 on Istanbul's European side.",
    },
  },
  "/servis/bahcelievler": {
    og: "website",
    tr: {
      title: "Bahçelievler Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Bahçelievler'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Bahçelievler Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Bahçelievler. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/bagcilar": {
    og: "website",
    tr: {
      title: "Bağcılar Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Bağcılar'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Bağcılar Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Bağcılar. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/bakirkoy": {
    og: "website",
    tr: {
      title: "Bakırköy Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Bakırköy'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Bakırköy Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Bakırköy. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/gungoren": {
    og: "website",
    tr: {
      title: "Güngören Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Güngören'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Güngören Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Güngören. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/zeytinburnu": {
    og: "website",
    tr: {
      title: "Zeytinburnu Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Zeytinburnu'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Zeytinburnu Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Zeytinburnu. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/esenler": {
    og: "website",
    tr: {
      title: "Esenler Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Esenler'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Esenler Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Esenler. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/bayrampasa": {
    og: "website",
    tr: {
      title: "Bayrampaşa Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Bayrampaşa'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Bayrampaşa Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Bayrampaşa. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/servis/kucukcekmece": {
    og: "website",
    tr: {
      title: "Küçükçekmece Kombi Servisi, Klima ve Şofben Servisi — Aynı Gün",
      description:
        "Küçükçekmece'de kombi arıza, bakım ve montaj; klima bakım ve gaz dolumu; şofben servisi. Belgeli teknisyen, orijinal parça, yazılı garanti. 45 yıllık yetkili servis deneyimi, 7/24 hat.",
    },
    en: {
      title: "Küçükçekmece Boiler, AC and Water-Heater Service — Same Day",
      description:
        "Boiler repair, maintenance and installation, AC maintenance and refrigerant charging, water-heater service in Küçükçekmece. Certified technicians, genuine parts, written guarantee, 24/7 line.",
    },
  },
  "/kombi-servisi/demirdokum": {
    og: "website",
    tr: {
      title: "DemirDöküm Kombi Servisi İstanbul Avrupa Yakası — Bağımsız Servis",
      description:
        "DemirDöküm kombilerde arıza, yıllık bakım, orijinal parça ve montaj. 45 yıllık yetkili servis deneyimiyle bağımsız teknik servis; Bahçelievler, Bakırköy, Bağcılar ve çevresinde aynı gün.",
    },
    en: {
      title: "DemirDöküm Boiler Service, Istanbul — Independent Service",
      description:
        "Repair, annual maintenance, genuine parts and installation for DemirDöküm boilers by an independent service with 45 years of authorised-service experience. Same day on Istanbul's European side.",
    },
  },
  "/kombi-servisi/vaillant": {
    og: "website",
    tr: {
      title: "Vaillant Kombi Servisi İstanbul Avrupa Yakası — Bağımsız Servis",
      description:
        "Vaillant kombilerde arıza, yıllık bakım, orijinal parça ve montaj. 45 yıllık yetkili servis deneyimiyle bağımsız teknik servis; Bahçelievler, Bakırköy, Bağcılar ve çevresinde aynı gün.",
    },
    en: {
      title: "Vaillant Boiler Service, Istanbul — Independent Service",
      description:
        "Repair, annual maintenance, genuine parts and installation for Vaillant boilers by an independent service with 45 years of authorised-service experience. Same day on Istanbul's European side.",
    },
  },
  "/kombi-servisi/baymak": {
    og: "website",
    tr: {
      title: "Baymak Kombi Servisi İstanbul Avrupa Yakası — Bağımsız Servis",
      description:
        "Baymak kombilerde arıza, yıllık bakım, orijinal parça ve montaj. 45 yıllık yetkili servis deneyimiyle bağımsız teknik servis; Bahçelievler, Bakırköy, Bağcılar ve çevresinde aynı gün.",
    },
    en: {
      title: "Baymak Boiler Service, Istanbul — Independent Service",
      description:
        "Repair, annual maintenance, genuine parts and installation for Baymak boilers by an independent service with 45 years of authorised-service experience. Same day on Istanbul's European side.",
    },
  },
  "/kombi-servisi/protherm": {
    og: "website",
    tr: {
      title: "Protherm Kombi Servisi İstanbul Avrupa Yakası — Bağımsız Servis",
      description:
        "Protherm kombilerde arıza, yıllık bakım, orijinal parça ve montaj. 45 yıllık yetkili servis deneyimiyle bağımsız teknik servis; Bahçelievler, Bakırköy, Bağcılar ve çevresinde aynı gün.",
    },
    en: {
      title: "Protherm Boiler Service, Istanbul — Independent Service",
      description:
        "Repair, annual maintenance, genuine parts and installation for Protherm boilers by an independent service with 45 years of authorised-service experience. Same day on Istanbul's European side.",
    },
  },
  "/cerez-politikasi": { og: "website", tr: { title: "Çerez Politikası", description: "kayahanisi.com'da kullanılan çerezler, amaçları ve tercihlerinizi nasıl yönetebileceğiniz." }, en: { title: "Cookie Policy", description: "Which cookies kayahanisi.com uses, why, and how to manage your preferences." } },
  "/kvkk-aydinlatma-metni": { og: "website", tr: { title: "KVKK Aydınlatma Metni", description: "6698 sayılı KVKK kapsamında kişisel verilerinizin hangi amaçlarla işlendiği, kimlere aktarıldığı ve haklarınız." }, en: { title: "Personal Data Protection Notice (KVKK)", description: "How we process personal data under Turkey's Law No. 6698, recipients, retention and your rights." } },
  "/gizlilik-politikasi": { og: "website", tr: { title: "Gizlilik Politikası", description: "Kayahan Isı web sitesini ziyaret ettiğinizde gizliliğinizi nasıl koruduğumuz." }, en: { title: "Privacy Policy", description: "How Kayahan Isı protects your privacy when you visit the site and use our services." } },
  "/kullanim-kosullari": { og: "website", tr: { title: "Kullanım Koşulları", description: "kayahanisi.com web sitesinin kullanım koşulları, içerik ve sorumluluk sınırları." }, en: { title: "Terms of Use", description: "Terms of use for kayahanisi.com, nature of content and limitation of liability." } },
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
