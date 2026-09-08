import type { Locale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";
import type { SiteContent } from "./types";

/**
 * Public-site content — matched 1:1 to the approved reference mockup
 * (public/brand/selected-design-reference.jpeg). Founder / authority blocks are
 * kept for later inner-page use; they are NOT rendered on the homepage.
 */

const tr: SiteContent = {
  locale: "tr",
  topBar: {
    highlights: [
      "45+ Yıllık Tecrübe",
      "1976'dan Bugüne",
      "Global Yaklaşım, Yerel Güç",
    ],
    links: [
      { label: "Kariyer", href: "/tr/insan-kaynaklari" },
      { label: "İletişim", href: "/tr/iletisim" },
    ],
  },
  brand: { name: "KAYAHAN", tagline: "ISI" },
  nav: {
    items: [
      {
        label: "Kurumsal",
        href: "/tr/kurumsal",
        children: [
          { label: "Hakkımızda", href: "/tr/kurumsal/hakkimizda" },
          { label: "Yönetim Kurulu", href: "/tr/kurumsal/yonetim-kurulu" },
          { label: "Yönetim Kurulu Mesajı", href: "/tr/kurumsal/yonetim-kurulu-mesaji" },
          { label: "Misyon & Vizyon", href: "/tr/kurumsal/misyon-vizyon" },
          { label: "Kalite Politikamız", href: "/tr/kurumsal/kalite-politikasi" },
          { label: "Sürdürülebilirlik", href: "/tr/kurumsal/surdurulebilirlik" },
        ],
      },
      {
        label: "Faaliyet Alanlarımız",
        href: "/tr/faaliyet-alanlari",
        children: [
          { label: "İklimlendirme", href: "/tr/faaliyet-alanlari/iklimlendirme" },
          { label: "Isıtma", href: "/tr/faaliyet-alanlari/isitma" },
          { label: "Soğutma", href: "/tr/faaliyet-alanlari/sogutma" },
          { label: "Yalıtım", href: "/tr/faaliyet-alanlari/yalitim" },
          { label: "Enerji", href: "/tr/faaliyet-alanlari/enerji" },
        ],
      },
      {
        label: "Çözümlerimiz",
        href: "/tr/cozumler",
        children: [
          { label: "Sistem Çözümleri", href: "/tr/cozumler/sistem-cozumleri" },
          { label: "Bina Otomasyonu", href: "/tr/cozumler/bina-otomasyonu" },
          { label: "Enerji Verimliliği", href: "/tr/cozumler/enerji-verimliligi" },
          { label: "Servis & Bakım", href: "/tr/cozumler/servis-bakim" },
        ],
      },
      { label: "Referanslar", href: "/tr/referanslar" },
      { label: "İnsan Kaynakları", href: "/tr/insan-kaynaklari" },
      { label: "İletişim", href: "/tr/iletisim" },
    ],
    cta: { label: "Teklif Alın", href: "/tr/teklif-al" },
  },
  hero: {
    titleLines: ["45 Yıllık Tecrübe.", "Geleceğin Teknolojisi."],
    accentLineIndex: 1,
    subtitlePre: "Geçmişin Ustalığı. Geleceğin ",
    subtitleAccent: "Enerjisi.",
    subtitlePost: "",
    paragraph:
      "İklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında mühendislik odaklı çözümler üretiyor, daha verimli bir dünya için çalışıyoruz.",
    link: { label: "Tecrübeli ailenizden biri.", href: "/tr/kurumsal/hakkimizda" },
  },
  stats: [
    { value: "45", suffix: "+", label: "Yıllık Tecrübe" },
    { value: "1976", label: "'dan Bugüne" },
    { value: "25", suffix: " Yıl", label: "Ortalama Çalışan Deneyimi" },
    { value: "1400", suffix: "+", label: "Tamamlanan Proje" },
  ],
  activityAreas: {
    eyebrow: "Faaliyet Alanlarımız",
    items: [
      {
        slug: "iklimlendirme",
        title: "İklimlendirme",
        description: "Konforlu, sağlıklı ve verimli yaşam alanları.",
        accent: "turkuaz",
      },
      {
        slug: "isitma",
        title: "Isıtma",
        description: "Güvenli, kesintisiz ve yüksek verimli ısıtma.",
        accent: "kirmizi",
      },
      {
        slug: "sogutma",
        title: "Soğutma",
        description: "Yüksek performanslı soğutma çözümleri.",
        accent: "turkuaz",
      },
      {
        slug: "yalitim",
        title: "Yalıtım",
        description: "Enerji tasarrufu, konfor ve sürdürülebilir koruma.",
        accent: "turuncu",
      },
      {
        slug: "enerji",
        title: "Enerji",
        description: "Yenilenebilir enerji ve akıllı enerji yönetimi.",
        accent: "turuncu",
      },
    ],
  },
  journey: {
    eyebrow: "45 Yıllık Yolculuğumuz",
    paragraph:
      "1976'dan bu yana değişen dünyanın ihtiyaçlarına mühendislik gücümüz ve yenilikçi yaklaşımımızla karşılık veriyoruz.",
    cta: { label: "Tüm Mil Taşlarımız", href: "/tr/kurumsal/tarihce" },
    milestones: [
      {
        year: "1976",
        title: "Kuruluş",
        description: "Kayahan Isı'nın hikayesi başladı.",
        accent: "kirmizi",
      },
      {
        year: "1986",
        title: "Büyüme",
        description: "Yeni yatırımlar ve bölgesel genişleme.",
        accent: "turkuaz",
      },
      {
        year: "1996",
        title: "Uzmanlaşma",
        description: "Mühendislik odaklı çözümler geliştirdik.",
        accent: "turkuaz",
      },
      {
        year: "2006",
        title: "Globalleşme",
        description: "Uluslararası projelerle sınırlarımızı genişlettik.",
        accent: "kirmizi",
      },
      {
        year: "2016",
        title: "Yenilenme",
        description: "Teknoloji ve inovasyon odaklı dönüşüm.",
        accent: "turkuaz",
      },
      {
        year: "2026+",
        title: "Gelecek",
        description: "Sürdürülebilir bir dünya için ilerliyoruz.",
        accent: "kirmizi",
      },
    ],
  },
  corporateStrength: {
    eyebrow: "Kurumsal Gücümüz / Neden Kayahan Isı?",
    items: [
      {
        icon: "shield",
        title: "45+ Yıllık Güven",
        description: "Yarım asra yaklaşan istikrar ve tecrübe.",
      },
      {
        icon: "team",
        title: "Uzman Kadro",
        description: "Deneyimli mühendis ve teknik ekip gücü.",
      },
      {
        icon: "badge",
        title: "Kalite Anlayışı",
        description: "Uluslararası standartlarda kalite ve güvence.",
      },
      {
        icon: "leaf",
        title: "Sürdürülebilirlik",
        description: "Çevre duyarlı, enerji verimli çözümler.",
      },
      {
        icon: "globe",
        title: "Global Deneyim",
        description: "Yurt içi ve yurt dışında başarılı projeler.",
      },
    ],
  },
  engineering: {
    eyebrow: "Mühendislik Odaklı Çözümler",
    paragraph:
      "Her projeye özel tasarım, analiz ve uygulama gücümüzle binaların performansını maksimuma çıkarıyoruz.",
    cta: { label: "Çözümlerimizi Keşfedin", href: "/tr/cozumler" },
    steps: [
      {
        icon: "gauge",
        title: "Performans Analizi",
        description: "Maksimum verim, minimum maliyet.",
      },
      {
        icon: "ruler",
        title: "Sistem Tasarımı",
        description: "İhtiyaca özel mühendislik çözümleri.",
      },
      {
        icon: "search",
        title: "Uygulama & Devreye Alma",
        description: "Kaliteli uygulama, sorunsuz teslim.",
      },
      {
        icon: "wrench",
        title: "Servis & Bakım",
        description: "Uzun ömürlü sistemler, kesintisiz destek.",
      },
    ],
    callouts: [
      {
        icon: "airflow",
        title: "Hava Akışı",
        description: "Optimum hava dağılımı ve iç ortam kalitesi.",
      },
      {
        icon: "efficiency",
        title: "Enerji Verimliliği",
        description: "Daha az tüketim, daha fazla performans.",
      },
      {
        icon: "control",
        title: "Akıllı Kontrol",
        description: "Bina otomasyonu ile tam kontrol ve izleme.",
      },
    ],
  },
  homeBands: {
    about: {
      eyebrow: "HAKKIMIZDA",
      titleTop: "Ustalığı geleceğin",
      titleAccent: "mühendisliğine taşıyoruz.",
      paragraph:
        "1976’da başlayan yolculuğumuzda; sahada kazanılan teknik bilgiyi, insan odaklı hizmet anlayışını ve yeni nesil enerji teknolojilerini aynı çatı altında buluşturuyoruz.",
      ctaLabel: "KAYAHAN ISI’YI TANIYIN",
      ctaHref: "/tr/kurumsal/hakkimizda",
      image: "/assets/home-about-cgi.png",
      imageAlt: "Kayahan Isı mühendislik yaklaşımı",
    },
    projects: {
      eyebrow: "PROJELERİMİZ",
      titleTop: "Her yapı için",
      titleBottom: "ölçülebilir performans.",
      ctaLabel: "TÜM REFERANSLAR",
      ctaHref: "/tr/referanslar",
      image: "/assets/home-projects-cgi.png",
      imageAlt: "Kayahan Isı proje mühendisliği",
      overlayLabel: "01 / BÜTÜNLEŞİK SİSTEMLER",
      overlayTitle: "Analizden devreye almaya.",
      facts: [
        { value: "1400+", label: "Tamamlanan proje" },
        { value: "5", label: "Uzmanlık alanı" },
        { value: "45+", label: "Yıllık saha bilgisi" },
      ],
    },
    certificates: {
      eyebrow: "SERTİFİKALARIMIZ",
      titleTop: "Yetkinliğimiz,",
      titleBottom: "standartlarla belgeli.",
      ctaLabel: "TÜM SERTİFİKALAR",
      ctaHref: "/tr/kurumsal/sertifikalarimiz",
      itemNote: "Belgelendirilmiş kurumsal yeterlilik",
      items: ["KALİTE YÖNETİMİ", "TEKNİK YETKİNLİK", "İŞ GÜVENLİĞİ", "ENERJİ PERFORMANSI"],
    },
    media: {
      image: "/assets/home-media-cgi.png",
      imageAlt: "Kayahan Isı teknik detaylar ve mühendislik planları",
      links: [
        {
          eyebrow: "GALERİ",
          title: "Sahadan ve projelerden seçkiler.",
          href: "/tr/galeri",
          icon: "images",
        },
        {
          eyebrow: "BASINDA BİZ",
          title: "Kayahan Isı’dan güncel gelişmeler.",
          href: "/tr/basinda-biz",
          icon: "news",
        },
      ],
    },
  },
  founder: {
    eyebrow: "Kurucu Hikâyesi",
    title: "1976'da bir çıraklıkla başlayan yolculuk.",
    lead: "İlhan Kaya, 16 yaşında Demirdöküm servisinde çırak olarak girdiği ısıtma sektöründe; Junkers şofben, fırın ve soba tamiriyle başlayan teknik birikimini yarım asra yaklaşan kurumsal bir uzmanlığa dönüştürdü.",
    paragraphs: [
      "1982–1994 arasında E.C.A. Bakırköy Bölge Yetkili Servisi'ni yürüttü; 1994'ten itibaren Kayahan Isı çatısı altında Demirdöküm Bahçelievler Yetkili Servisi olarak 25 kişilik uzman bir kadro kurdu.",
      "Bugün İlhan Kaya yalnızca bir şirket sahibi değil; ustalık geleneğini yaşatan bir eğitmen, teknik uyuşmazlıklarda görüş bildiren bir bilirkişi ve sektörü temsil eden bir isimdir.",
    ],
    roles: ["Usta", "Eğitmen", "Teknik Uzman", "Bilirkişi", "Sektör Temsilcisi"],
    signature: "İlhan Kaya",
    signatureRole: "Kurucu",
    watermark: "1976",
  },
  authority: {
    eyebrow: "Kurumsal Otorite",
    title: "Ticari faaliyetin ötesinde bir sorumluluk.",
    lead: "Kayahan Isı'nın gücü yalnızca sahada değil; mesleki eğitimde, tüketici haklarında ve sektörün standartlarını belirleyen masalarda da hissedilir.",
    items: [
      { icon: "cap", title: "1400+ Gence Mesleki Eğitim", description: "Bağcılar Anadolu Endüstri Meslek Lisesi ve MEB Avrupa Projeleri kapsamında eğitim." },
      { icon: "badge", title: "Avrupa Eğitim Belgeleri", description: "Yetiştirilen teknisyenlere uluslararası geçerliliğe sahip sertifikalar." },
      { icon: "scale", title: "Tüketici Mahkemeleri Bilirkişiliği", description: "İlçe tüketici mahkemelerinde tarafsız ve teknik temelli raporlar." },
      { icon: "institution", title: "Bakanlık Düzeyinde Katılım", description: "Ticaret Bakanlığı toplantılarına davetli uzman konuşmacı." },
      { icon: "partners", title: "İŞKUR & Oda İş Birlikleri", description: "İŞKUR ve İstanbul Esnaf ve Sanatkârlar Odası seminerlerinde aktif rol." },
      { icon: "broadcast", title: "Ulusal Medyada Bilinçlendirme", description: "Kanal D ve CNN TÜRK yayınlarında tüketici bilgilendirmeleri." },
    ],
  },
  ctaBand: {
    title: "Geleceği birlikte şekillendirelim.",
    subtitle: "Projeniz için bizimle iletişime geçin.",
    cta: { label: "Teklif Alın", href: "/tr/teklif-al" },
  },
  footer: {
    description:
      "Kayahan Isı olarak; 45 yıldır sektörün öncüsü, iklimlendirme, ısıtma, soğutma, yalıtım ve enerji alanlarında mühendislik odaklı çözümler sunmaktan gurur duyuyoruz.",
    columns: [
      {
        title: "Kurumsal",
        links: [
          { label: "Hakkımızda", href: "/tr/kurumsal/hakkimizda" },
          { label: "Yönetim Kurulu", href: "/tr/kurumsal/yonetim-kurulu" },
          { label: "Yönetim Kurulu Mesajı", href: "/tr/kurumsal/yonetim-kurulu-mesaji" },
          { label: "Misyon & Vizyon", href: "/tr/kurumsal/misyon-vizyon" },
          { label: "Kalite Politikamız", href: "/tr/kurumsal/kalite-politikasi" },
          { label: "Sürdürülebilirlik", href: "/tr/kurumsal/surdurulebilirlik" },
          { label: "Kariyer", href: "/tr/insan-kaynaklari" },
        ],
      },
      {
        title: "Faaliyet Alanlarımız",
        links: [
          { label: "İklimlendirme", href: "/tr/faaliyet-alanlari/iklimlendirme" },
          { label: "Isıtma", href: "/tr/faaliyet-alanlari/isitma" },
          { label: "Soğutma", href: "/tr/faaliyet-alanlari/sogutma" },
          { label: "Yalıtım", href: "/tr/faaliyet-alanlari/yalitim" },
          { label: "Enerji", href: "/tr/faaliyet-alanlari/enerji" },
        ],
      },
      {
        title: "Çözümlerimiz",
        links: [
          { label: "Sistem Çözümleri", href: "/tr/cozumler/sistem-cozumleri" },
          { label: "Bina Otomasyonu", href: "/tr/cozumler/bina-otomasyonu" },
          { label: "Enerji Verimliliği", href: "/tr/cozumler/enerji-verimliligi" },
          { label: "Servis & Bakım", href: "/tr/cozumler/servis-bakim" },
        ],
      },
    ],
    contact: {
      title: "İletişim",
      address: "Merkez Mah. Teknik Sok. No: 10\n34956 Tuzla / İstanbul / Türkiye",
      phone: "+90 212 441 88 88",
      whatsapp: "905322153304",
      email: "info@kayahanisi.com.tr",
      cta: { label: "İletişime Geçin", href: "/tr/iletisim" },
    },
    social: [],
    copyright: "© 2026 Kayahan Isı. Tüm hakları saklıdır.",
  },
};

const en: SiteContent = {
  locale: "en",
  topBar: {
    highlights: ["45+ Years of Experience", "Since 1976", "Global Approach, Local Strength"],
    links: [
      { label: "Careers", href: "/en/insan-kaynaklari" },
      { label: "Contact", href: "/en/iletisim" },
    ],
  },
  brand: { name: "KAYAHAN", tagline: "ISI" },
  nav: {
    items: [
      {
        label: "Corporate",
        href: "/en/kurumsal",
        children: [
          { label: "About Us", href: "/en/kurumsal/hakkimizda" },
          { label: "Board of Directors", href: "/en/kurumsal/yonetim-kurulu" },
          { label: "Message from the Board", href: "/en/kurumsal/yonetim-kurulu-mesaji" },
          { label: "Mission & Vision", href: "/en/kurumsal/misyon-vizyon" },
          { label: "Quality Policy", href: "/en/kurumsal/kalite-politikasi" },
          { label: "Sustainability", href: "/en/kurumsal/surdurulebilirlik" },
        ],
      },
      {
        label: "Our Fields",
        href: "/en/faaliyet-alanlari",
        children: [
          { label: "Air Conditioning", href: "/en/faaliyet-alanlari/iklimlendirme" },
          { label: "Heating", href: "/en/faaliyet-alanlari/isitma" },
          { label: "Cooling", href: "/en/faaliyet-alanlari/sogutma" },
          { label: "Insulation", href: "/en/faaliyet-alanlari/yalitim" },
          { label: "Energy", href: "/en/faaliyet-alanlari/enerji" },
        ],
      },
      {
        label: "Our Solutions",
        href: "/en/cozumler",
        children: [
          { label: "System Solutions", href: "/en/cozumler/sistem-cozumleri" },
          { label: "Building Automation", href: "/en/cozumler/bina-otomasyonu" },
          { label: "Energy Efficiency", href: "/en/cozumler/enerji-verimliligi" },
          { label: "Service & Maintenance", href: "/en/cozumler/servis-bakim" },
        ],
      },
      { label: "References", href: "/en/referanslar" },
      { label: "Human Resources", href: "/en/insan-kaynaklari" },
      { label: "Contact", href: "/en/iletisim" },
    ],
    cta: { label: "Get a Quote", href: "/en/teklif-al" },
  },
  hero: {
    titleLines: ["45 Years of Experience.", "Technology of the Future."],
    accentLineIndex: 1,
    subtitlePre: "Craftsmanship of the Past. Energy of the ",
    subtitleAccent: "Future.",
    subtitlePost: "",
    paragraph:
      "We deliver engineering-driven solutions across air conditioning, heating, cooling, insulation and energy — working for a more efficient world.",
    link: { label: "One of your experienced family.", href: "/en/kurumsal/hakkimizda" },
  },
  stats: [
    { value: "45", suffix: "+", label: "Years of Experience" },
    { value: "1976", label: "Since" },
    { value: "25", suffix: " yrs", label: "Average Employee Experience" },
    { value: "1400", suffix: "+", label: "Completed Projects" },
  ],
  activityAreas: {
    eyebrow: "Our Fields",
    items: [
      { slug: "iklimlendirme", title: "Air Conditioning", description: "Comfortable, healthy and efficient living spaces.", accent: "turkuaz" },
      { slug: "isitma", title: "Heating", description: "Safe, uninterrupted and highly efficient heating.", accent: "kirmizi" },
      { slug: "sogutma", title: "Cooling", description: "High-performance cooling solutions.", accent: "turkuaz" },
      { slug: "yalitim", title: "Insulation", description: "Energy savings, comfort and sustainable protection.", accent: "turuncu" },
      { slug: "enerji", title: "Energy", description: "Renewable energy and smart energy management.", accent: "turuncu" },
    ],
  },
  journey: {
    eyebrow: "Our 45-Year Journey",
    paragraph:
      "Since 1976 we have answered the needs of a changing world with our engineering strength and innovative approach.",
    cta: { label: "All Milestones", href: "/en/kurumsal/tarihce" },
    milestones: [
      { year: "1976", title: "Foundation", description: "The Kayahan Isı story began.", accent: "kirmizi" },
      { year: "1986", title: "Growth", description: "New investments and regional expansion.", accent: "turkuaz" },
      { year: "1996", title: "Specialisation", description: "We developed engineering-driven solutions.", accent: "turkuaz" },
      { year: "2006", title: "Going Global", description: "We widened our reach with international projects.", accent: "kirmizi" },
      { year: "2016", title: "Renewal", description: "A transformation driven by technology and innovation.", accent: "turkuaz" },
      { year: "2026+", title: "The Future", description: "Moving forward for a sustainable world.", accent: "kirmizi" },
    ],
  },
  corporateStrength: {
    eyebrow: "Our Corporate Strength / Why Kayahan Isı?",
    items: [
      { icon: "shield", title: "45+ Years of Trust", description: "Nearly half a century of stability and experience." },
      { icon: "team", title: "Expert Team", description: "Experienced engineers and a strong technical crew." },
      { icon: "badge", title: "Quality Mindset", description: "Quality and assurance to international standards." },
      { icon: "leaf", title: "Sustainability", description: "Environmentally conscious, energy-efficient solutions." },
      { icon: "globe", title: "Global Experience", description: "Successful projects at home and abroad." },
    ],
  },
  engineering: {
    eyebrow: "Engineering-Driven Solutions",
    paragraph:
      "With project-specific design, analysis and delivery, we push building performance to its maximum.",
    cta: { label: "Explore Our Solutions", href: "/en/cozumler" },
    steps: [
      { icon: "gauge", title: "Performance Analysis", description: "Maximum efficiency, minimum cost." },
      { icon: "ruler", title: "System Design", description: "Engineering solutions tailored to your needs." },
      { icon: "search", title: "Installation & Commissioning", description: "Quality installation, seamless handover." },
      { icon: "wrench", title: "Service & Maintenance", description: "Long-lasting systems, uninterrupted support." },
    ],
    callouts: [
      { icon: "airflow", title: "Airflow", description: "Optimum air distribution and indoor air quality." },
      { icon: "efficiency", title: "Energy Efficiency", description: "Less consumption, more performance." },
      { icon: "control", title: "Smart Control", description: "Full control and monitoring via building automation." },
    ],
  },
  homeBands: {
    about: {
      eyebrow: "ABOUT US",
      titleTop: "Carrying craftsmanship into",
      titleAccent: "the engineering of the future.",
      paragraph:
        "On the journey that began in 1976, we bring field-earned technical knowledge, a people-focused service approach and new-generation energy technologies under one roof.",
      ctaLabel: "GET TO KNOW KAYAHAN ISI",
      ctaHref: "/en/kurumsal/hakkimizda",
      image: "/assets/home-about-cgi.png",
      imageAlt: "Kayahan Isı engineering approach",
    },
    projects: {
      eyebrow: "OUR PROJECTS",
      titleTop: "Measurable performance",
      titleBottom: "for every building.",
      ctaLabel: "ALL REFERENCES",
      ctaHref: "/en/referanslar",
      image: "/assets/home-projects-cgi.png",
      imageAlt: "Kayahan Isı project engineering",
      overlayLabel: "01 / INTEGRATED SYSTEMS",
      overlayTitle: "From analysis to commissioning.",
      facts: [
        { value: "1400+", label: "Completed projects" },
        { value: "5", label: "Fields of expertise" },
        { value: "45+", label: "Years of field knowledge" },
      ],
    },
    certificates: {
      eyebrow: "OUR CERTIFICATIONS",
      titleTop: "Our competence,",
      titleBottom: "certified to standards.",
      ctaLabel: "ALL CERTIFICATES",
      ctaHref: "/en/kurumsal/sertifikalarimiz",
      itemNote: "Certified corporate competence",
      items: ["QUALITY MANAGEMENT", "TECHNICAL COMPETENCE", "OCCUPATIONAL SAFETY", "ENERGY PERFORMANCE"],
    },
    media: {
      image: "/assets/home-media-cgi.png",
      imageAlt: "Kayahan Isı technical details and engineering plans",
      links: [
        { eyebrow: "GALLERY", title: "Selections from the field and projects.", href: "/en/galeri", icon: "images" },
        { eyebrow: "IN THE PRESS", title: "Latest developments from Kayahan Isı.", href: "/en/basinda-biz", icon: "news" },
      ],
    },
  },
  founder: {
    eyebrow: "Founder's Story",
    title: "A journey that began with an apprenticeship in 1976.",
    lead: "At 16, İlhan Kaya joined the heating sector as an apprentice at a Demirdöküm service centre. The know-how he built repairing Junkers water heaters, ovens and stoves grew into a corporate expertise spanning nearly half a century.",
    paragraphs: [
      "From 1982 to 1994 he ran the E.C.A. Bakırköy Regional Authorised Service; from 1994, under Kayahan Isı, he built a 25-person expert team as the Demirdöküm Bahçelievler Authorised Service.",
      "Today İlhan Kaya is not just a company owner — he is a trainer who keeps the craft tradition alive, an expert witness in technical disputes, and a representative of the sector.",
    ],
    roles: ["Craftsman", "Trainer", "Technical Expert", "Expert Witness", "Sector Representative"],
    signature: "İlhan Kaya",
    signatureRole: "Founder",
    watermark: "1976",
  },
  authority: {
    eyebrow: "Corporate Authority",
    title: "A responsibility beyond commercial activity.",
    lead: "Kayahan Isı's strength is felt not only in the field, but in vocational training, in consumer rights, and at the tables that set the sector's standards.",
    items: [
      { icon: "cap", title: "Vocational Training for 1400+ Young People", description: "Training within vocational high schools and Ministry of Education EU projects." },
      { icon: "badge", title: "European Training Certificates", description: "Technicians trained here earned internationally recognised certificates." },
      { icon: "scale", title: "Consumer-Court Expert Witnessing", description: "Impartial, technically grounded expert reports in district consumer courts." },
      { icon: "institution", title: "Ministry-Level Participation", description: "Invited expert speaker at Ministry of Trade meetings." },
      { icon: "partners", title: "İŞKUR & Chamber Partnerships", description: "An active role in İŞKUR and Istanbul Chamber of Tradesmen seminars." },
      { icon: "broadcast", title: "Consumer Awareness on National Media", description: "Consumer guidance on Kanal D and CNN TÜRK broadcasts." },
    ],
  },
  ctaBand: {
    title: "Let's shape the future together.",
    subtitle: "Get in touch with us about your project.",
    cta: { label: "Get a Quote", href: "/en/teklif-al" },
  },
  footer: {
    description:
      "At Kayahan Isı, for 45 years we have been proud to lead the sector with engineering-driven solutions in air conditioning, heating, cooling, insulation and energy.",
    columns: [
      {
        title: "Corporate",
        links: [
          { label: "About Us", href: "/en/kurumsal/hakkimizda" },
          { label: "Board of Directors", href: "/en/kurumsal/yonetim-kurulu" },
          { label: "Message from the Board", href: "/en/kurumsal/yonetim-kurulu-mesaji" },
          { label: "Mission & Vision", href: "/en/kurumsal/misyon-vizyon" },
          { label: "Quality Policy", href: "/en/kurumsal/kalite-politikasi" },
          { label: "Sustainability", href: "/en/kurumsal/surdurulebilirlik" },
          { label: "Careers", href: "/en/insan-kaynaklari" },
        ],
      },
      {
        title: "Our Fields",
        links: [
          { label: "Air Conditioning", href: "/en/faaliyet-alanlari/iklimlendirme" },
          { label: "Heating", href: "/en/faaliyet-alanlari/isitma" },
          { label: "Cooling", href: "/en/faaliyet-alanlari/sogutma" },
          { label: "Insulation", href: "/en/faaliyet-alanlari/yalitim" },
          { label: "Energy", href: "/en/faaliyet-alanlari/enerji" },
        ],
      },
      {
        title: "Our Solutions",
        links: [
          { label: "System Solutions", href: "/en/cozumler/sistem-cozumleri" },
          { label: "Building Automation", href: "/en/cozumler/bina-otomasyonu" },
          { label: "Energy Efficiency", href: "/en/cozumler/enerji-verimliligi" },
          { label: "Service & Maintenance", href: "/en/cozumler/servis-bakim" },
        ],
      },
    ],
    contact: {
      title: "Contact",
      address: "Merkez Mah. Teknik Sok. No: 10\n34956 Tuzla / İstanbul / Türkiye",
      phone: "+90 212 441 88 88",
      whatsapp: "905322153304",
      email: "info@kayahanisi.com.tr",
      cta: { label: "Get in Touch", href: "/en/iletisim" },
    },
    social: [],
    copyright: "© 2026 Kayahan Isı. All rights reserved.",
  },
};

/** Seed / fallback content, used when the DB has no row for a locale. */
export const defaultSiteContent: Record<Locale, SiteContent> = { tr, en };

export function getDefaultSiteContent(locale: Locale): SiteContent {
  return defaultSiteContent[locale] ?? defaultSiteContent[defaultLocale];
}
