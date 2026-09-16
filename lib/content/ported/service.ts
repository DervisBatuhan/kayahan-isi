import { z } from "zod";

/**
 * Local-service landing pages: the three appliance services (kombi / klima /
 * şofben) and one page per district on Istanbul's European side. All share one
 * shape so they render with `ServiceLandingPage` and edit with one spec.
 *
 * `body` is Markdown (rendered by `components/blog/Markdown.tsx`). District
 * pages carry unique local copy in `body` — never the same text with the
 * district name swapped, which search engines treat as doorway pages.
 */

const s = z.string().trim();
const pair = z.object({ title: s.max(160), text: s.max(600) });

export const serviceLandingSchema = z.object({
  heroEyebrow: s.max(80),
  heroTitle: s.max(160),
  heroAccent: s.max(160),
  heroLead: s.max(600),
  /** Optional photo for the hero's right side; empty = abstract art. */
  heroImage: s.max(300).optional().default(""),
  heroImageAlt: s.max(200).optional().default(""),
  introLabel: s.max(80),
  introHeading: s.max(200),
  body: s.max(20_000),
  servicesLabel: s.max(80),
  servicesHeading: s.max(200),
  services: z.array(pair).max(12),
  faqLabel: s.max(80),
  faqHeading: s.max(200),
  faq: z.array(pair).max(12),
  areasLabel: s.max(80),
  areasHeading: s.max(200),
  areasText: s.max(600),
  ctaHeading: s.max(200),
  ctaText: s.max(400),
  ctaLabel: s.max(80),
});

export type ServiceLanding = z.infer<typeof serviceLandingSchema>;

export type ServiceKind = "kombi" | "klima" | "sofben";
export type DistrictKind =
  | "bahcelievler"
  | "bagcilar"
  | "bakirkoy"
  | "gungoren"
  | "zeytinburnu"
  | "esenler"
  | "bayrampasa"
  | "kucukcekmece";

export const SERVICE_ROUTE: Record<ServiceKind, string> = {
  kombi: "/tr/kombi-servisi",
  klima: "/tr/klima-servisi",
  sofben: "/tr/sofben-servisi",
};
export const SERVICE_LABEL: Record<ServiceKind, { tr: string; en: string }> = {
  kombi: { tr: "Kombi Servisi", en: "Boiler Service" },
  klima: { tr: "Klima Servisi", en: "Air-Conditioner Service" },
  sofben: { tr: "Şofben Servisi", en: "Water-Heater Service" },
};

export const DISTRICT_NAME: Record<DistrictKind, string> = {
  bahcelievler: "Bahçelievler",
  bagcilar: "Bağcılar",
  bakirkoy: "Bakırköy",
  gungoren: "Güngören",
  zeytinburnu: "Zeytinburnu",
  esenler: "Esenler",
  bayrampasa: "Bayrampaşa",
  kucukcekmece: "Küçükçekmece",
};
export const DISTRICT_ROUTE = (d: DistrictKind) => `/tr/servis/${d}`;
export const DISTRICT_KINDS = Object.keys(DISTRICT_NAME) as DistrictKind[];

// ------------------------------------------------------------------ shared ----

const BRANDS = "DemirDöküm, Vaillant, Baymak, Protherm, Bosch, Buderus, E.C.A., Airfel, Ferroli, Viessmann";

const COMMON_FAQ_TR: { title: string; text: string }[] = [
  {
    title: "Hangi ilçelere hizmet veriyorsunuz?",
    text: "İstanbul Avrupa Yakası'nda Bahçelievler, Bağcılar, Bakırköy, Güngören, Zeytinburnu, Esenler, Bayrampaşa ve Küçükçekmece ilçelerinin tamamına aynı gün servis veriyoruz. Komşu ilçeler için lütfen arayın.",
  },
  {
    title: "Servis ücreti nasıl belirleniyor?",
    text: "Arıza tespiti sonrası yapılacak işlem ve gerekiyorsa parça bedeli, işe başlamadan önce net olarak bildirilir. Onayınız olmadan işlem yapılmaz.",
  },
  {
    title: "Teknisyenleriniz yetki belgeli mi?",
    text: "Evet. Ekibimiz MYK Mesleki Yeterlilik ve MEB belgeli, yıllarca DemirDöküm ve Vaillant yetkili servisinde çalışmış teknisyenlerden oluşur; yeni teknisyenler kendi AB destekli meslek kursumuzdan yetişir.",
  },
  {
    title: "Yapılan işleme garanti veriyor musunuz?",
    text: "Onarım işçiliği ve taktığımız orijinal parçalar garanti kapsamındadır. Garanti süresi işleme göre serviste yazılı olarak bildirilir.",
  },
];

const COMMON_FAQ_EN: { title: string; text: string }[] = [
  {
    title: "Which districts do you cover?",
    text: "Same-day service across Bahçelievler, Bağcılar, Bakırköy, Güngören, Zeytinburnu, Esenler, Bayrampaşa and Küçükçekmece on Istanbul's European side. Call us for neighbouring districts.",
  },
  {
    title: "How is the service fee set?",
    text: "After diagnosis, the work and any part cost are quoted clearly before we start. Nothing is done without your approval.",
  },
  {
    title: "Are your technicians certified?",
    text: "Yes. Our team holds MYK vocational-qualification and Ministry of Education certificates and spent years in DemirDöküm and Vaillant authorised service; new technicians come through our EU-funded vocational course.",
  },
  {
    title: "Is the work guaranteed?",
    text: "Repair workmanship and the genuine parts we fit are covered by a written guarantee stated on the service report.",
  },
];

const AREAS_TR = {
  areasLabel: "HİZMET BÖLGELERİMİZ",
  areasHeading: "İstanbul Avrupa Yakası'nda aynı gün servis.",
  areasText:
    "Ekiplerimiz Bahçelievler merkezli olarak sekiz ilçede konumlanır; bölgenize en yakın teknisyen yönlendirilir.",
  ctaHeading: "Şimdi servis talebi oluşturun.",
  ctaText: "7/24 telefon ve WhatsApp hattımızdan ulaşın; arıza tespiti ve fiyat bilgisi işlem öncesinde net olarak verilir.",
  ctaLabel: "Servis talebi",
};
const AREAS_EN = {
  areasLabel: "SERVICE AREAS",
  areasHeading: "Same-day service on Istanbul's European side.",
  areasText: "Our teams are based around Bahçelievler and cover eight districts; the nearest technician is dispatched to you.",
  ctaHeading: "Book a service visit now.",
  ctaText: "Reach us 24/7 by phone or WhatsApp; diagnosis and pricing are stated clearly before any work starts.",
  ctaLabel: "Request service",
};

// ---------------------------------------------------------------- services ----

export const serviceDefaults: Record<ServiceKind, ServiceLanding> = {
  kombi: {
    heroEyebrow: "KOMBİ SERVİSİ · İSTANBUL AVRUPA YAKASI",
    heroTitle: "Kombi arızası, bakımı ve montajı.",
    heroAccent: "45 yıllık yetkili servis deneyimiyle.",
    heroLead:
      "DemirDöküm ve Vaillant yetkili servisi olarak geçen 45 yılın ardından bugün tüm markalara hizmet veriyoruz: arıza tespiti, periyodik bakım, orijinal parça, montaj ve 7/24 acil müdahale.",
    heroImage: "/gallery/kombi-servisi-teknisyen-2.webp",
    heroImageAlt: "Kombi bakımı yapan Kayahan Isı teknisyeni",
    introLabel: "NEDEN KAYAHAN?",
    introHeading: "Kombinizi tanıyan bir servis: markadan bağımsız, belgeli, hesap verebilir.",
    body: `Kombi, evin en çok çalışan ve en az bakılan cihazıdır. Kış ortasında arıza vermesi, sıcak suyun kesilmesi ya da gaz faturasının sessizce yükselmesi çoğu zaman aylar öncesinden önlenebilecek küçük sorunların sonucudur. Kayahan Isı olarak ${BRANDS} başta olmak üzere **tüm kombi markalarına** servis veriyoruz.

# Ne zaman servis çağırmalısınız?

- Kombi **arıza kodu** veriyor ya da sürekli kendini kapatıyorsa (F.28, F.75, E01, E10 gibi kodlar çoğunlukla gaz, ateşleme, basınç veya sensör kaynaklıdır)
- Radyatörler ısınmıyor veya bazıları soğuk kalıyorsa
- Sıcak su geç geliyor, dalgalanıyor ya da hiç gelmiyorsa
- Cihazdan **su damlıyor**, basınç sürekli düşüyorsa
- Vantilatör veya pompadan alışılmadık ses geliyorsa
- Son bakımın üzerinden bir yıldan fazla geçtiyse

# Kombi bakımı neden yılda bir kez yapılmalı?

Isı eşanjöründe biriken kireç ve kurum, kombinin aynı ısıyı üretmek için daha fazla gaz yakmasına yol açar. Yıllık bakımda eşanjör ve brülör temizlenir, gaz-hava ayarı ve baca çekişi ölçülür, genleşme tankı basıncı, emniyet ventili ve elektrot kontrol edilir. Düzenli bakım yapılan kombi **daha az yakar, daha az arıza yapar ve daha uzun ömürlüdür**; ayrıca üretici garantisinin çoğu markada bakım şartına bağlı olduğunu unutmayın.

# Orijinal parça politikamız

Değişen her parça — pompa, fan, gaz valfi, eşanjör, üç yollu vana, kart — **markanın orijinal yedek parçasıdır** ve serviste yazılı garantiyle teslim edilir. Muadil parça kullanmayız; kullanılan parçanın kutusunu ve garanti belgesini size bırakırız.

# Montaj ve dönüşüm

Yeni kombi alırken doğru kapasite (kW) seçimi, baca tipi (hermetik / yoğuşmalı) ve tesisat uyumu belirleyicidir. Eski konvansiyonel kombinizi **yoğuşmalı kombiye** dönüştürmek istiyorsanız yerinde keşif yapıp gaz projesi, baca ve tesisat uygunluğunu birlikte planlıyoruz. Montaj sonrası ilk çalıştırma, gaz kaçak testi ve kullanım eğitimi hizmete dahildir.

# Acil servis

Kışın kombisiz kalmak beklenebilecek bir durum değildir. Telefon ve WhatsApp hattımız **7/24** açıktır; bölgenizdeki teknisyen en kısa sürede yönlendirilir. Gaz kokusu hissederseniz önce vanayı kapatın, pencereleri açın, elektrik anahtarına dokunmayın ve bizi arayın.`,
    servicesLabel: "KOMBİ HİZMETLERİMİZ",
    servicesHeading: "Arızadan montaja, tek ekip.",
    services: [
      { title: "Arıza tespiti ve onarım", text: "Arıza kodu okuma, ölçüm cihazlarıyla kök neden analizi, aynı gün onarım." },
      { title: "Periyodik bakım", text: "Eşanjör ve brülör temizliği, gaz-hava ayarı, baca çekiş ve emniyet testleri." },
      { title: "Orijinal yedek parça", text: "Pompa, fan, gaz valfi, kart, eşanjör — markanın orijinal parçası, yazılı garanti." },
      { title: "Montaj ve ilk çalıştırma", text: "Kapasite ve baca uygunluğu, güvenli montaj, gaz kaçak testi, kullanım eğitimi." },
      { title: "Yoğuşmalıya dönüşüm", text: "Eski kombiden yoğuşmalı kombiye geçişte keşif, proje ve tesisat uyumu." },
      { title: "Petek ve tesisat temizliği", text: "Tıkanan radyatör ve tesisatın makineyle yıkanması; ısınmayan petek sorununa kalıcı çözüm." },
      { title: "7/24 acil müdahale", text: "Gece, hafta sonu ve bayramda ulaşılabilir servis hattı." },
      { title: "Yıllık bakım anlaşması", text: "Site ve işletmeler için planlı bakım takvimi ve öncelikli servis." },
    ],
    faqLabel: "SIK SORULAN SORULAR",
    faqHeading: "Kombi servisi hakkında merak edilenler.",
    faq: [
      {
        title: "Kombi bakımı ne zaman yaptırılmalı?",
        text: "En doğru zaman ısıtma sezonu başlamadan önce, eylül–ekim aylarıdır. Sezon içinde de yaptırılabilir; önemli olan yılda bir kez aksatılmamasıdır.",
      },
      {
        title: "Kombim basınç düşürüyor, ne yapmalıyım?",
        text: "Basınç 1–1,5 bar aralığında olmalıdır. Sık sık düşüyorsa tesisatta ya da genleşme tankında sızıntı olabilir; sürekli su basmak kireçlenmeyi artırır. Kaynağın tespiti için servis çağırın.",
      },
      {
        title: "Hangi markalara servis veriyorsunuz?",
        text: `${BRANDS} ve diğer tüm kombi markalarına. 45 yıl DemirDöküm ve Vaillant yetkili servisi olarak çalıştık; bu markalarda özellikle derin deneyimimiz var.`,
      },
      ...COMMON_FAQ_TR,
    ],
    ...AREAS_TR,
  },

  klima: {
    heroEyebrow: "KLİMA SERVİSİ · İSTANBUL AVRUPA YAKASI",
    heroTitle: "Klima bakımı, gaz dolumu ve montajı.",
    heroAccent: "Sezona hazır, verimli, sessiz.",
    heroLead:
      "Split, multi-split ve VRF sistemlerde arıza tespiti, periyodik bakım, gaz dolumu, montaj ve söküm-takım hizmeti. Konut, ofis ve iş yerlerinde MEB Soğutma-İklimlendirme belgeli teknisyenlerle.",
    heroImage: "/gallery/vip-kurumsal-servis-araci.webp",
    heroImageAlt: "Kayahan Isı servis aracı",
    introLabel: "NEDEN KAYAHAN?",
    introHeading: "Klimanız yalnızca soğutmasın; verimli çalışsın, sağlıklı hava üflesin.",
    body: `Klima, İstanbul yazlarında konfor kadar sağlık meselesidir: temizlenmeyen filtre ve evaporatör, küf ve bakteri üreten bir kaynağa dönüşür; eksik gaz ise cihazın iki kat elektrik harcayıp yarım soğutmasına yol açar. Kayahan Isı, tüm markaların **split, multi-split ve VRF** sistemlerine servis verir.

# Klima bakımı nedir, ne kadar sıklıkla yapılmalı?

Bakım, iç ünitenin filtre ve evaporatörünün kimyasal temizliği, dış ünite kondanserinin yıkanması, drenaj hattının açılması, gaz basıncının ve elektrik değerlerinin ölçülmesinden oluşur. Konutta **yılda bir (ilkbaharda)**, yoğun kullanılan ofis ve iş yerlerinde **yılda iki kez** öneriyoruz. Bakımlı klima daha az elektrik tüketir, daha sessiz çalışır ve kompresör ömrü uzar.

# Gaz dolumu ne zaman gerekir?

Klima gazı "tükenmez"; azalıyorsa bir kaçak vardır. Sadece gaz basmak sorunu birkaç ay erteler. Doğru yaklaşım kaçağın **azot testiyle** bulunup giderilmesi, sistemin vakumlanması ve markanın belirttiği miktarda (R32 veya R410A) dolum yapılmasıdır. Serviste gaz cinsini ve dolum miktarını raporda görürsünüz.

# Montaj: verimin yarısı doğru montajdır

Yanlış konumlandırılmış dış ünite, kısa ya da eğimsiz bakır boru, kötü vakum ve zayıf drenaj en sık montaj hatalarıdır ve ilk yaz arızaya dönüşür. Montajda cihaz kapasitesini oda hacmine, yalıtımına ve güneş alma durumuna göre birlikte seçiyor; sızdırmazlık, vakum ve devreye alma testlerini raporluyoruz. **Söküm-takım** (taşınma) hizmetinde gaz toplama işlemi yapılır, cihaz gazı kaybedilmez.

# Arıza belirtileri

- Soğutmuyor ya da ısıtmıyor, yalnızca fan çalışıyor
- İç üniteden **su damlıyor**
- Kötü koku, gürültü veya titreşim
- Dış ünite çalışıp kısa sürede duruyor
- Kumandada hata kodu (E1, E5, F0, P1 gibi)

Bu belirtilerde cihazı kapatıp servis çağırmak kompresörü korur.

# VRF ve ticari sistemler

Ofis, mağaza, klinik ve küçük plazalarda VRF/VRV sistemlerin bakım sözleşmesi, arıza müdahalesi ve iç ünite ekleme-değişim işleri için [bina otomasyonu](/tr/cozumler/bina-otomasyonu) ve [servis & bakım](/tr/cozumler/servis-bakim) ekiplerimizle birlikte çalışırız.`,
    servicesLabel: "KLİMA HİZMETLERİMİZ",
    servicesHeading: "Konuttan ticari sisteme.",
    services: [
      { title: "Periyodik bakım", text: "Filtre ve evaporatör kimyasal temizliği, kondanser yıkama, drenaj açma, ölçüm raporu." },
      { title: "Gaz dolumu ve kaçak tespiti", text: "Azot testiyle kaçak bulma, vakumlama, R32/R410A dolum — miktarı raporlu." },
      { title: "Arıza tespiti ve onarım", text: "Hata kodu analizi, kart, fan motoru, kompresör ve sensör onarımı; orijinal parça." },
      { title: "Montaj", text: "Kapasite seçimi, konumlandırma, bakır boru ve drenaj hattı, vakum ve devreye alma." },
      { title: "Söküm-takım (taşınma)", text: "Gaz toplama ile sökme, yeni adreste montaj ve test." },
      { title: "Multi-split ve VRF", text: "Ticari sistemlerde bakım sözleşmesi, iç ünite ekleme ve arıza müdahalesi." },
      { title: "Yıllık bakım anlaşması", text: "Ofis, mağaza ve site yönetimleri için planlı bakım ve öncelikli servis." },
    ],
    faqLabel: "SIK SORULAN SORULAR",
    faqHeading: "Klima servisi hakkında merak edilenler.",
    faq: [
      {
        title: "Klima bakımı ne kadar sürer?",
        text: "Tek bir split klimanın kapsamlı bakımı ortalama 45–60 dakika sürer. Kimyasal temizlik sonrası cihaz aynı gün kullanılabilir.",
      },
      {
        title: "Klimam su damlatıyor, ciddi bir sorun mu?",
        text: "Genellikle tıkalı drenaj hattı ya da kirli evaporatördür; kısa sürede giderilir. Nadiren gaz eksikliğinden buzlanma da damlamaya yol açar; bu durumda kaçak kontrolü yapılır.",
      },
      {
        title: "Klimayı kışın ısıtma için kullanmak ekonomik mi?",
        text: "Evet. İnverter klimalar ısı pompası mantığıyla çalışır ve harcadığı elektriğin 3–4 katı ısı verir; İstanbul'un ılıman kışında elektrikli ısıtıcılardan çok daha ekonomiktir.",
      },
      ...COMMON_FAQ_TR,
    ],
    ...AREAS_TR,
  },

  sofben: {
    heroEyebrow: "ŞOFBEN SERVİSİ · İSTANBUL AVRUPA YAKASI",
    heroTitle: "Şofben arızası, bakımı ve montajı.",
    heroAccent: "Güvenli sıcak su, belgeli ekip.",
    heroLead:
      "Doğal gazlı ve elektrikli şofbenlerde arıza tespiti, bakım, orijinal parça ve montaj. Gaz yakıcı cihazlarda MYK Seviye 4 belgeli teknisyenlerle, gaz güvenliği önce.",
    heroImage: "/gallery/kombi-servisi-teknisyen-1.webp",
    heroImageAlt: "Sahada Kayahan Isı teknisyeni",
    introLabel: "NEDEN KAYAHAN?",
    introHeading: "Şofben, doğru bakılmadığında en riskli ev cihazıdır. Biz bu işi kurallarına göre yaparız.",
    body: `Şofben küçük bir cihazdır ama gaz yakar ve banyoda çalışır; baca, havalandırma ve emniyet donanımı hayati önemdedir. Kayahan Isı, ${BRANDS} dahil **tüm şofben markalarına** servis verir; hermetik, bacalı ve elektrikli (ani su ısıtıcı ve termosifon) modellerin tamamında.

# Sık görülen arızalar

- Su akıyor ama **alev yanmıyor** (ateşleme, pil, gaz basıncı, su debisi sensörü)
- Sıcak su **dalgalı** geliyor ya da birkaç dakika sonra soğuyor
- Cihaz çalışırken **kendini kapatıyor** (aşırı ısınma termostatı, baca sensörü)
- Kireçlenmiş eşanjör: debi düştü, ses geliyor
- Gaz kokusu, is ve kurum izleri

Gaz kokusu hissederseniz cihazı ve vanayı kapatın, ortamı havalandırın, elektrik anahtarına dokunmadan bizi arayın.

# Yıllık bakım neleri kapsar?

Eşanjör ve brülör temizliği, kireç çözme, gaz-hava ayarı, **baca çekiş testi**, emniyet termostatı ve baca sensörü kontrolü, su filtresi temizliği, gaz kaçak testi. Bacalı şofbenlerde havalandırma menfezinin açık olduğu doğrulanır; bu kontrol atlanırsa karbonmonoksit riski oluşur.

# Montaj ve yer değişikliği

Şofben montajı mevzuata tabidir: bacalı modeller yatak odası ve banyoya değil uygun havalandırmalı hacimlere, hermetik modeller dış duvara bağlanabilir. Keşifte gaz tesisatı, baca yolu ve havalandırma uygunluğunu kontrol ediyor, montaj sonrası gaz kaçak ve baca testlerini raporluyoruz. Eski bacalı şofbenden **hermetik modele geçiş** hem güvenlik hem verim açısından önerimizdir.

# Elektrikli şofben ve termosifon

Ani su ısıtıcılar ve termosifonlarda rezistans, termostat, emniyet ventili ve anot çubuğu kontrolü yapıyor; kireç çözme ile ısınma süresini ve elektrik tüketimini düşürüyoruz. Elektrik bağlantısının kaçak akım rölesi üzerinden olması zorunludur; kontrol ederiz.`,
    servicesLabel: "ŞOFBEN HİZMETLERİMİZ",
    servicesHeading: "Gazlı ve elektrikli tüm modeller.",
    services: [
      { title: "Arıza tespiti ve onarım", text: "Ateşleme, gaz valfi, debi sensörü, termostat ve eşanjör arızalarında aynı gün müdahale." },
      { title: "Periyodik bakım", text: "Kireç çözme, brülör temizliği, gaz-hava ayarı, baca çekiş ve emniyet testleri." },
      { title: "Orijinal yedek parça", text: "Markanın orijinal parçası, yazılı garanti, kutu ve belge teslimi." },
      { title: "Montaj ve yer değişikliği", text: "Mevzuata uygun konum, baca ve havalandırma kontrolü, gaz kaçak testi." },
      { title: "Hermetiğe dönüşüm", text: "Bacalı şofbenden hermetik modele güvenli geçiş; keşif ve proje desteği." },
      { title: "Elektrikli şofben ve termosifon", text: "Rezistans, termostat, emniyet ventili, anot değişimi ve kireç çözme." },
      { title: "7/24 acil servis", text: "Sıcak susuz kalmayın; gece ve hafta sonu ulaşılabilir hat." },
    ],
    faqLabel: "SIK SORULAN SORULAR",
    faqHeading: "Şofben servisi hakkında merak edilenler.",
    faq: [
      {
        title: "Şofben banyoya takılabilir mi?",
        text: "Bacalı şofbenler banyo ve yatak odasına takılamaz. Hermetik (kapalı yanma odalı) şofbenler dış duvara bağlanmak şartıyla banyoya monte edilebilir; keşifte uygunluk kontrol edilir.",
      },
      {
        title: "Şofbenim yanıyor ama su ılık geliyor, sebebi ne?",
        text: "Çoğunlukla kireçlenmiş eşanjör, düşük gaz basıncı ya da yanlış sıcaklık/debi ayarıdır. Bakımda kireç çözme ve ayar ile giderilir.",
      },
      {
        title: "Şofben mi kombi mi?",
        text: "Yalnızca sıcak su ihtiyacı varsa şofben ekonomiktir. Isıtma da gerekiyorsa kombi tek cihazla iki ihtiyacı karşılar; dairenizin durumuna göre keşifte birlikte karar veririz.",
      },
      ...COMMON_FAQ_TR,
    ],
    ...AREAS_TR,
  },
};

export const serviceDefaultsEn: Record<ServiceKind, ServiceLanding> = {
  kombi: {
    heroEyebrow: "BOILER SERVICE · ISTANBUL EUROPEAN SIDE",
    heroTitle: "Boiler repair, maintenance and installation.",
    heroAccent: "45 years of authorised-service experience.",
    heroLead:
      "After 45 years as DemirDöküm and Vaillant authorised service we now serve every brand: diagnosis, annual maintenance, genuine parts, installation and 24/7 emergency response.",
    heroImage: "/gallery/kombi-servisi-teknisyen-2.webp",
    heroImageAlt: "Kayahan Isı technician servicing a boiler",
    introLabel: "WHY KAYAHAN?",
    introHeading: "A service that knows your boiler: brand-independent, certified, accountable.",
    body: `We service **every combi-boiler brand** — ${BRANDS} and more — across Istanbul's European side.

# When to call

- The boiler shows an **error code** or keeps shutting down
- Radiators stay cold, or some do
- Hot water is slow, fluctuating or absent
- The unit **leaks** or pressure keeps dropping
- Unusual fan or pump noise
- More than a year since the last service

# Annual maintenance

Scale and soot on the heat exchanger make the boiler burn more gas for the same heat. Annual maintenance cleans the exchanger and burner, sets the gas/air ratio, measures flue draught and checks the expansion vessel, safety valve and electrode. A maintained boiler **burns less, fails less and lasts longer** — and most manufacturer warranties require it.

# Genuine parts only

Every part we fit — pump, fan, gas valve, exchanger, diverter valve, PCB — is the **manufacturer's genuine part**, handed over with its box and written guarantee.

# Installation and conversion

Choosing the right capacity (kW), flue type and pipework compatibility decides how a new boiler performs. Converting an old conventional boiler to a **condensing** model starts with an on-site survey covering gas project, flue and pipework. Commissioning, gas-leak test and user training are included.

# Emergency service

Our phone and WhatsApp line is open **24/7**. If you smell gas: close the valve, open windows, do not touch electrical switches, and call us.`,
    servicesLabel: "BOILER SERVICES",
    servicesHeading: "From fault to installation, one team.",
    services: [
      { title: "Diagnosis and repair", text: "Error-code reading, instrument-based root-cause analysis, same-day repair." },
      { title: "Annual maintenance", text: "Exchanger and burner cleaning, gas/air setting, flue draught and safety tests." },
      { title: "Genuine spare parts", text: "Pump, fan, gas valve, PCB, exchanger — genuine parts with written guarantee." },
      { title: "Installation and commissioning", text: "Capacity and flue suitability, safe fitting, gas-leak test, user training." },
      { title: "Condensing conversion", text: "Survey, project and pipework compatibility for the switch to a condensing boiler." },
      { title: "Radiator and system flush", text: "Power-flushing blocked radiators and pipework for a lasting fix to cold radiators." },
      { title: "24/7 emergency response", text: "Reachable nights, weekends and holidays." },
      { title: "Annual service contract", text: "Planned maintenance calendar and priority response for sites and businesses." },
    ],
    faqLabel: "FAQ",
    faqHeading: "Common questions about boiler service.",
    faq: [
      { title: "When should the boiler be serviced?", text: "Ideally before the heating season, in September–October. Any time of year works; what matters is once a year, every year." },
      { title: "My boiler keeps losing pressure — what now?", text: "Pressure should sit at 1–1.5 bar. Frequent drops point to a leak in the pipework or expansion vessel; topping up constantly increases scaling. Book a visit to locate the source." },
      { title: "Which brands do you service?", text: `${BRANDS} and every other boiler brand. Our 45 years in DemirDöküm and Vaillant authorised service give us particularly deep experience with those.` },
      ...COMMON_FAQ_EN,
    ],
    ...AREAS_EN,
  },
  klima: {
    heroEyebrow: "AIR-CONDITIONER SERVICE · ISTANBUL EUROPEAN SIDE",
    heroTitle: "AC maintenance, refrigerant charging and installation.",
    heroAccent: "Ready for the season, efficient, quiet.",
    heroLead:
      "Diagnosis, maintenance, refrigerant charging, installation and relocation for split, multi-split and VRF systems — homes, offices and shops, by Ministry-certified refrigeration technicians.",
    heroImage: "/gallery/vip-kurumsal-servis-araci.webp",
    heroImageAlt: "Kayahan Isı service van",
    introLabel: "WHY KAYAHAN?",
    introHeading: "Your AC should not just cool; it should run efficiently and blow healthy air.",
    body: `We service split, multi-split and **VRF** systems of every brand.

# Maintenance — what and how often

Chemical cleaning of the indoor filter and evaporator, washing the outdoor condenser, clearing the drain line, measuring refrigerant pressure and electrical values. **Once a year** (spring) at home, **twice a year** in busy offices and shops. A maintained unit uses less electricity, runs quieter and the compressor lasts longer.

# Refrigerant charging

Refrigerant does not "run out"; if it is low there is a leak. Charging alone postpones the problem. We find the leak with a **nitrogen test**, repair it, vacuum the system and charge the manufacturer's stated amount (R32 or R410A) — type and quantity recorded on your report.

# Installation

Poor outdoor-unit placement, short or unsloped copper lines, weak vacuum and bad drainage are the most common installation faults. We size the unit to the room, insulation and sun exposure and report leak, vacuum and commissioning tests. **Relocation** includes refrigerant recovery so nothing is lost.

# Fault symptoms

- No cooling or heating, fan only
- Indoor unit **dripping water**
- Odour, noise or vibration
- Outdoor unit starts and stops
- Error code on the remote

Switch the unit off and call — it protects the compressor.

# VRF and commercial systems

Maintenance contracts, fault response and indoor-unit additions for offices, retail and clinics, together with our [building automation](/en/cozumler/bina-otomasyonu) and [service & maintenance](/en/cozumler/servis-bakim) teams.`,
    servicesLabel: "AC SERVICES",
    servicesHeading: "From homes to commercial systems.",
    services: [
      { title: "Periodic maintenance", text: "Chemical cleaning of filter and evaporator, condenser wash, drain clearing, measurement report." },
      { title: "Refrigerant charging and leak detection", text: "Nitrogen leak test, vacuum, R32/R410A charge — quantity on the report." },
      { title: "Diagnosis and repair", text: "Error-code analysis; PCB, fan motor, compressor and sensor repair with genuine parts." },
      { title: "Installation", text: "Sizing, placement, copper and drain lines, vacuum and commissioning." },
      { title: "Relocation", text: "Refrigerant recovery, removal, installation and test at the new address." },
      { title: "Multi-split and VRF", text: "Maintenance contracts, indoor-unit additions and fault response for commercial systems." },
      { title: "Annual service contract", text: "Planned maintenance and priority response for offices, retail and site management." },
    ],
    faqLabel: "FAQ",
    faqHeading: "Common questions about AC service.",
    faq: [
      { title: "How long does maintenance take?", text: "A full service of one split unit takes about 45–60 minutes; the unit can be used the same day." },
      { title: "My AC drips water — is it serious?", text: "Usually a blocked drain line or dirty evaporator, fixed quickly. Occasionally icing from low refrigerant causes dripping; then a leak check is done." },
      { title: "Is heating with the AC in winter economical?", text: "Yes. Inverter units work as heat pumps and deliver 3–4 times the heat of the electricity they use — far cheaper than electric heaters in Istanbul's mild winter." },
      ...COMMON_FAQ_EN,
    ],
    ...AREAS_EN,
  },
  sofben: {
    heroEyebrow: "WATER-HEATER SERVICE · ISTANBUL EUROPEAN SIDE",
    heroTitle: "Water-heater repair, maintenance and installation.",
    heroAccent: "Safe hot water, certified team.",
    heroLead:
      "Diagnosis, maintenance, genuine parts and installation for gas and electric water heaters — gas appliances handled by MYK Level 4 certified technicians, safety first.",
    heroImage: "/gallery/kombi-servisi-teknisyen-1.webp",
    heroImageAlt: "Kayahan Isı technician on site",
    introLabel: "WHY KAYAHAN?",
    introHeading: "A neglected gas water heater is the riskiest appliance in the home. We do this by the book.",
    body: `We service **every water-heater brand** — room-sealed, open-flue and electric (instantaneous and storage) models.

# Common faults

- Water flows but the **burner does not light**
- Hot water **fluctuates** or turns cold after a few minutes
- The unit **switches itself off** (overheat thermostat, flue sensor)
- Scaled exchanger: low flow, noise
- Gas smell, soot marks

If you smell gas: turn off the appliance and valve, ventilate, do not touch switches, call us.

# Annual maintenance

Exchanger and burner cleaning, descaling, gas/air setting, **flue draught test**, safety-thermostat and flue-sensor check, water-filter cleaning, gas-leak test. For open-flue models we verify the ventilation grille is clear — skipping this creates a carbon-monoxide risk.

# Installation and relocation

Open-flue models may not go in bedrooms or bathrooms; room-sealed models can be fitted on an outside wall. We check gas pipework, flue route and ventilation on site and report gas-leak and flue tests after fitting. Switching from an old open-flue unit to a **room-sealed model** is our recommendation for both safety and efficiency.

# Electric heaters

Element, thermostat, safety valve and anode checks; descaling cuts heating time and electricity use. The supply must run through an RCD — we verify it.`,
    servicesLabel: "WATER-HEATER SERVICES",
    servicesHeading: "All gas and electric models.",
    services: [
      { title: "Diagnosis and repair", text: "Same-day response to ignition, gas-valve, flow-sensor, thermostat and exchanger faults." },
      { title: "Annual maintenance", text: "Descaling, burner cleaning, gas/air setting, flue draught and safety tests." },
      { title: "Genuine spare parts", text: "Manufacturer parts with written guarantee, box and documents handed over." },
      { title: "Installation and relocation", text: "Code-compliant placement, flue and ventilation check, gas-leak test." },
      { title: "Room-sealed conversion", text: "Safe switch from open-flue to room-sealed; survey and project support." },
      { title: "Electric heaters", text: "Element, thermostat, safety valve, anode replacement and descaling." },
      { title: "24/7 emergency service", text: "Do not stay without hot water — reachable nights and weekends." },
    ],
    faqLabel: "FAQ",
    faqHeading: "Common questions about water-heater service.",
    faq: [
      { title: "Can a water heater go in the bathroom?", text: "Open-flue units cannot be installed in bathrooms or bedrooms. Room-sealed units can, provided they connect to an outside wall; suitability is checked on site." },
      { title: "It lights but the water is only lukewarm — why?", text: "Usually a scaled exchanger, low gas pressure or wrong temperature/flow setting; descaling and adjustment during maintenance fixes it." },
      { title: "Water heater or combi boiler?", text: "For hot water only, a water heater is the economical choice. If you also need heating, a combi covers both with one appliance; we decide together on site." },
      ...COMMON_FAQ_EN,
    ],
    ...AREAS_EN,
  },
};

// --------------------------------------------------------------- districts ----

const DISTRICT_SERVICES_TR = [
  { title: "Kombi servisi", text: "Arıza, yıllık bakım, orijinal parça, montaj ve yoğuşmalıya dönüşüm." },
  { title: "Klima servisi", text: "Bakım, gaz dolumu, kaçak tespiti, montaj ve söküm-takım." },
  { title: "Şofben servisi", text: "Gazlı ve elektrikli modellerde arıza, bakım ve mevzuata uygun montaj." },
  { title: "Petek ve tesisat temizliği", text: "Isınmayan radyatörler için makineyle tesisat yıkama." },
  { title: "7/24 acil müdahale", text: "Gece, hafta sonu ve bayramda ulaşılabilir servis hattı." },
  { title: "Site ve işletme bakım anlaşması", text: "Planlı bakım takvimi, öncelikli servis, tek muhatap." },
];
const DISTRICT_SERVICES_EN = [
  { title: "Boiler service", text: "Faults, annual maintenance, genuine parts, installation and condensing conversion." },
  { title: "AC service", text: "Maintenance, refrigerant charging, leak detection, installation and relocation." },
  { title: "Water-heater service", text: "Gas and electric models — faults, maintenance and code-compliant installation." },
  { title: "Radiator and system flush", text: "Power-flushing for cold radiators." },
  { title: "24/7 emergency response", text: "Reachable nights, weekends and holidays." },
  { title: "Site and business contracts", text: "Planned maintenance, priority response, one point of contact." },
];

type DistrictCopy = { lead: string; heading: string; body: string; faq: { title: string; text: string }[] };

const DISTRICT_TR: Record<DistrictKind, DistrictCopy> = {
  bahcelievler: {
    lead: "Merkezimiz Bahçelievler'de. Şirinevler, Yenibosna, Kocasinan, Siyavuşpaşa, Soğanlı ve Zafer mahallelerine en kısa ulaşım süresiyle kombi, klima ve şofben servisi.",
    heading: "Bahçelievler'de 1994'ten beri aynı ekip, aynı telefon.",
    body: `Kayahan Isı'nın hikâyesi Bahçelievler'de yazıldı: 1994'ten itibaren **Demirdöküm Bahçelievler Yetkili Servisi** olarak on binlerce daireye girdik. İlçenin yapı stoğunu — Şirinevler ve Yenibosna'nın yoğun apartmanlarını, Kocasinan ve Siyavuşpaşa'nın kentsel dönüşümle yenilenen bloklarını, Soğanlı ve Zafer'in müstakil ve az katlı yapılarını — teknisyen düzeyinde tanıyoruz.

# Bahçelievler'de en sık karşılaştığımız işler

- **Eski bacalı kombi ve şofbenlerin** hermetik/yoğuşmalı modele dönüşümü (özellikle 1990'lar apartmanlarında)
- Kentsel dönüşüm sonrası yeni dairelerde **kombi ilk çalıştırma ve ayar**
- Şirinevler–Yenibosna hattındaki ofis ve mağazalarda **klima bakım sözleşmeleri**
- Kış başında petek ısınmama ve tesisat temizliği talepleri

# Ulaşım ve müdahale

Merkez ofisimiz ilçe içinde olduğu için Bahçelievler'de çoğu çağrıya **aynı gün, çoğunlukla birkaç saat içinde** ulaşıyoruz. Acil hattımız 7/24 açık; E-5 ve Metrobüs hattına yakın konumumuz Yenibosna ve Şirinevler'e hızlı erişim sağlıyor.

Komşu ilçeler için [Bakırköy](/tr/servis/bakirkoy), [Bağcılar](/tr/servis/bagcilar) ve [Güngören](/tr/servis/gungoren) sayfalarımıza bakabilirsiniz.`,
    faq: [
      { title: "Bahçelievler'de aynı gün servis mümkün mü?", text: "Evet. Merkezimiz ilçe içinde olduğundan Bahçelievler çağrılarının büyük bölümüne aynı gün, çoğu zaman birkaç saat içinde ulaşırız." },
      { title: "Hangi mahallelere gidiyorsunuz?", text: "Bahçelievler'in tüm mahallelerine: Şirinevler, Yenibosna, Kocasinan, Siyavuşpaşa, Soğanlı, Zafer, Çobançeşme, Fevzi Çakmak, Hürriyet, Cumhuriyet, Bahçelievler Merkez." },
    ],
  },
  bagcilar: {
    lead: "Güneşli, Mahmutbey, Yenimahalle, Kirazlı, Göztepe ve Bağcılar Merkez'de konut ve iş yerlerine kombi, klima ve şofben servisi.",
    heading: "Bağcılar'da konuttan atölyeye tüm cihazlar.",
    body: `Bağcılar hem İstanbul'un en kalabalık ilçelerinden biri hem de Güneşli–Mahmutbey ekseninde büyük bir iş ve üretim bölgesi. Bu yüzden Bağcılar'da iki farklı ihtiyaca aynı anda cevap veriyoruz: **yoğun konut mahallelerinde** hızlı kombi ve şofben müdahalesi; **iş yerleri, tekstil atölyeleri ve plazalarda** klima ve VRF bakım sözleşmeleri.

# Bağcılar'da öne çıkan hizmetler

- Yenimahalle, Kirazlı, Göztepe ve Merkez'de **kombi arıza ve yıllık bakım**
- Güneşli ve Mahmutbey'deki ofis, depo ve mağazalarda **multi-split / VRF bakım anlaşmaları**
- Site yönetimleri için toplu **kombi bakım kampanyaları** (sezon öncesi planlı ziyaret)
- Metro hattı çevresindeki yeni konut projelerinde **kombi ve klima ilk devreye alma**

# Mesleki eğitim bağımız

Kurucumuz İlhan Kaya, Bağcılar Mesleki ve Teknik Anadolu Lisesi ile yürütülen **AB destekli Kombi Servisçiliği Meslek Kursları**'nda eğitmen olarak görev yaptı. Bugün Bağcılar'da sahada çalışan teknisyenlerimizin bir kısmı bu kurslardan yetişti — ilçeyi ve binalarını yakından tanıyorlar.

Komşu ilçeler: [Bahçelievler](/tr/servis/bahcelievler), [Güngören](/tr/servis/gungoren), [Esenler](/tr/servis/esenler), [Küçükçekmece](/tr/servis/kucukcekmece).`,
    faq: [
      { title: "Bağcılar'da iş yerimiz için bakım sözleşmesi yapabilir miyiz?", text: "Evet. Güneşli ve Mahmutbey'deki ofis, depo ve atölyeler için klima/VRF ve kombi bakım sözleşmesi yapıyor; planlı ziyaret ve öncelikli arıza müdahalesi sağlıyoruz." },
      { title: "Bağcılar'ın hangi mahallelerine hizmet veriyorsunuz?", text: "Tamamına: Güneşli, Mahmutbey, Yenimahalle, Kirazlı, Göztepe, Merkez, Bağlar, Barbaros, Demirkapı, Fevzi Çakmak, Hürriyet, İnönü, Kemalpaşa, Sancaktepe, Yavuz Selim, Yıldıztepe, 15 Temmuz, Yenigün, Yüzyıl, Çınar, Fatih." },
    ],
  },
  bakirkoy: {
    lead: "Ataköy, Florya, Yeşilköy, Yeşilyurt, Osmaniye, Kartaltepe ve Bakırköy Merkez'de kombi, klima ve şofben servisi — 1982'den beri bu bölgedeyiz.",
    heading: "Bakırköy'de kırk yılı aşan tanışıklık.",
    body: `İlhan Kaya, 1982–1994 yılları arasında **E.C.A. Bakırköy Bölge Yetkili Servisi**'ni yürüttü; Bakırköy'ün Ataköy sitelerinden Yeşilköy'ün müstakil evlerine kadar bu bölgeyi kırk yıldır tanıyoruz. Bakırköy'de yapı stoğu çeşitlidir ve her tip farklı yaklaşım ister.

# Bakırköy'de yapı tipine göre hizmet

- **Ataköy siteleri:** Merkezi sistemden bireysel kombiye geçmiş dairelerde kombi bakım ve arıza; site yönetimleri için toplu bakım planı
- **Florya, Yeşilköy, Yeşilyurt:** Müstakil ve villa tipi konutlarda yüksek kapasiteli kombi, kaskad sistem ve **çoklu klima / VRF** bakımı
- **Osmaniye, Kartaltepe, Zeytinlik:** 1970–90 arası apartmanlarda **bacalı cihazdan hermetiğe dönüşüm** ve tesisat temizliği
- **Bakırköy Merkez ve İstasyon Caddesi:** Mağaza, klinik ve ofislerde klima bakım sözleşmeleri

# Marina, Yeşilköy ve deniz etkisi

Sahil hattındaki dış ünitelerde tuzlu hava kondanser kanatçıklarını hızla korozyona uğratır. Florya–Yeşilköy hattında klima bakımını **yılda iki kez** ve kondanser yıkamalı yapmanızı öneriyoruz; dış ünite koruma kaplaması konusunda da yönlendiriyoruz.

Komşu ilçeler: [Bahçelievler](/tr/servis/bahcelievler), [Zeytinburnu](/tr/servis/zeytinburnu), [Küçükçekmece](/tr/servis/kucukcekmece).`,
    faq: [
      { title: "Ataköy'de site yönetimi olarak toplu bakım yaptırabilir miyiz?", text: "Evet. Site yönetimleriyle sezon öncesi planlı kombi bakım programı yapıyor, daire başına sabit fiyat ve tek raporlama sunuyoruz." },
      { title: "Yeşilköy'de villamızdaki çoklu klima sistemine bakıyor musunuz?", text: "Evet. Multi-split ve VRF sistemlerde bakım, gaz kontrolü ve arıza müdahalesi yapıyoruz; deniz etkisi nedeniyle yılda iki bakım öneriyoruz." },
    ],
  },
  gungoren: {
    lead: "Merter, Tozkoparan, Haznedar, Güneştepe, Sanayi, Akıncılar ve Mareşal Çakmak'ta konut ve tekstil işletmelerine kombi, klima ve şofben servisi.",
    heading: "Güngören'de konut ve Merter'in iş dünyası için.",
    body: `Güngören küçük ama yoğun bir ilçe: Haznedar, Güneştepe ve Tozkoparan'ın apartmanları ile **Merter'in tekstil ve toptan ticaret merkezi** yan yana. Bahçelievler'deki merkezimize bitişik olduğu için Güngören, en hızlı ulaştığımız ilçelerden biridir.

# Güngören'de sık yaptığımız işler

- Haznedar ve Güneştepe'de **kombi arıza ve yıllık bakım**; kentsel dönüşüm sonrası yeni bloklarda ilk çalıştırma
- **Merter'deki mağaza, showroom ve atölyelerde** klima bakım sözleşmesi, VRF arıza müdahalesi ve iç ünite ekleme
- Tozkoparan'ın eski yapılarında **bacalı şofbenden hermetiğe geçiş** ve baca kontrolleri
- Sanayi Mahallesi'ndeki küçük işletmelerde **elektrikli şofben ve termosifon** bakımı

# Merter için özel: kesintisiz klima

Showroom ve mağazalarda klimanın yaz ortasında durması doğrudan satış kaybı demektir. Merter'deki işletmeler için **öncelikli müdahale garantili bakım sözleşmesi** sunuyoruz: sezon öncesi bakım, yedek parça planlaması ve arızada aynı gün ekip.

Komşu ilçeler: [Bahçelievler](/tr/servis/bahcelievler), [Bağcılar](/tr/servis/bagcilar), [Esenler](/tr/servis/esenler), [Zeytinburnu](/tr/servis/zeytinburnu).`,
    faq: [
      { title: "Merter'deki mağazamız için ne kadar sürede gelirsiniz?", text: "Güngören merkezimize bitişik; sözleşmeli işletmelere aynı gün, çoğunlukla birkaç saat içinde ulaşıyoruz." },
      { title: "Güngören'in hangi mahallelerine gidiyorsunuz?", text: "Tamamına: Merter, Tozkoparan, Haznedar, Güneştepe, Sanayi, Akıncılar, Mareşal Çakmak, Abdurrahman Nafiz Gürman, Gençosman, Güven, Mehmet Nesih Özmen." },
    ],
  },
  zeytinburnu: {
    lead: "Kazlıçeşme, Merkezefendi, Beştelsiz, Sümer, Telsiz, Veliefendi, Seyitnizam ve Yeşiltepe'de kombi, klima ve şofben servisi.",
    heading: "Zeytinburnu'nda eski apartmandan yeni rezidansa.",
    body: `Zeytinburnu, İstanbul'un en hızlı dönüşen ilçelerinden biri: Kazlıçeşme ve sahil hattındaki **yeni rezidans ve konut projeleri**, Merkezefendi ve Sümer'in **1970–80'ler apartmanları**, Telsiz ve Beştelsiz'in yoğun mahalleleriyle iç içe. Her iki yapı tipinde de deneyimliyiz.

# Zeytinburnu'nda yapıya göre hizmet

- **Kazlıçeşme ve sahil projeleri:** Yoğuşmalı kombi ve VRF sistemlerin garanti sonrası bakımı, site yönetimleriyle toplu sözleşme
- **Merkezefendi, Sümer, Telsiz:** Eski kombi ve **bacalı şofbenlerin** hermetik/yoğuşmalı modele dönüşümü, petek ve tesisat temizliği
- **Veliefendi, Seyitnizam, Yeşiltepe:** Kombi arıza ve yıllık bakım, klima montajı
- Olivium, Zeytinburnu Meydan ve Kazlıçeşme çevresindeki **mağaza ve ofislerde** klima bakım sözleşmesi

# Deniz ve rüzgâr

Sahil hattında tuzlu hava klima dış ünitelerini yıpratır; Kazlıçeşme ve Kennedy Caddesi hattındaki cihazlarda kondanser yıkamalı bakımı yılda iki kez öneriyoruz. Yüksek katlı yeni projelerde dış ünite erişimi için site yönetimiyle önceden koordinasyon sağlıyoruz.

Komşu ilçeler: [Bakırköy](/tr/servis/bakirkoy), [Güngören](/tr/servis/gungoren), [Bayrampaşa](/tr/servis/bayrampasa).`,
    faq: [
      { title: "Yeni rezidansımızdaki kombinin garantisi bitti, bakımını yapabilir misiniz?", text: "Evet. Garanti sonrası her markanın kombisine bakım ve onarım yapıyoruz; orijinal parça ve yazılı garanti ile." },
      { title: "Zeytinburnu'nun hangi mahallelerine gidiyorsunuz?", text: "Tamamına: Kazlıçeşme, Merkezefendi, Beştelsiz, Sümer, Telsiz, Veliefendi, Seyitnizam, Yeşiltepe, Çırpıcı, Gökalp, Maltepe, Nuripaşa, Yenidoğan." },
    ],
  },
  esenler: {
    lead: "Atışalanı, Oruçreis, Menderes, Kemer, Fevzi Çakmak, Havaalanı, Nine Hatun ve Esenler Merkez'de kombi, klima ve şofben servisi.",
    heading: "Esenler'de yoğun konut dokusuna hızlı servis.",
    body: `Esenler, İstanbul'un en yoğun nüfuslu ilçelerinden biri ve yapı stoğunun büyük bölümü 1980–2000 arası apartmanlardan oluşuyor. Bu yaş grubundaki binalarda **eski kombi ve şofbenler, kireçlenmiş tesisat ve baca sorunları** en sık karşılaştığımız konular. Otogar ve Havaalanı çevresindeki ticari alanlarda ise klima bakımı öne çıkıyor.

# Esenler'de sık yaptığımız işler

- Atışalanı, Oruçreis ve Menderes'te **kombi arıza, yıllık bakım ve yoğuşmalıya dönüşüm**
- Kentsel dönüşümle yenilenen bloklarda **yeni kombi ilk çalıştırma ve ayar**
- Kemer ve Fevzi Çakmak'ın eski yapılarında **petek ve tesisat temizliği** — "alt katlar ısınmıyor" şikâyetinin kalıcı çözümü
- Esenler Otogarı ve Havaalanı Mahallesi'ndeki **iş yerlerinde klima bakım sözleşmesi**
- **Şofben baca ve havalandırma kontrolleri** (bacalı cihazlarda karbonmonoksit güvenliği)

# Toplu bakım avantajı

Aynı apartmanda 4 ve üzeri dairenin birlikte bakım yaptırması durumunda **ortak randevu ve indirimli daire fiyatı** uyguluyoruz; kapıcı veya yönetici üzerinden tek koordinasyon yeterli. Esenler'de sezon öncesi (eylül–ekim) bu programı yoğun olarak yürütüyoruz.

Komşu ilçeler: [Bağcılar](/tr/servis/bagcilar), [Güngören](/tr/servis/gungoren), [Bayrampaşa](/tr/servis/bayrampasa).`,
    faq: [
      { title: "Apartman olarak toplu kombi bakımı yaptırabilir miyiz?", text: "Evet. 4 ve üzeri daire için ortak randevu ve indirimli daire fiyatı uyguluyoruz; yönetici üzerinden tek koordinasyon yeterlidir." },
      { title: "Esenler'in hangi mahallelerine gidiyorsunuz?", text: "Tamamına: Atışalanı, Oruçreis, Menderes, Kemer, Fevzi Çakmak, Havaalanı, Nine Hatun, Merkez, Birlik, Çiftehavuzlar, Davutpaşa, Fatih, Kazım Karabekir, Mimar Sinan, Namık Kemal, Tuna, Turgutreis, Yavuz Selim." },
    ],
  },
  bayrampasa: {
    lead: "Kocatepe, Yıldırım, Altıntepsi, Muratpaşa, Cevatpaşa, İsmetpaşa, Terazidere ve Vatan'da kombi, klima ve şofben servisi.",
    heading: "Bayrampaşa'da konut ve ticaret bir arada.",
    body: `Bayrampaşa'da iki dünya iç içe: Kocatepe, Yıldırım ve Altıntepsi'nin **konut mahalleleri** ile Forum İstanbul, Terazidere ve Vatan Caddesi çevresindeki **ticari ve lojistik alanlar**. Her ikisinde de yıllardır çalışıyoruz; Bayrampaşa Metro hattı ve TEM bağlantısı sayesinde ilçeye hızlı ulaşıyoruz.

# Bayrampaşa'da öne çıkan hizmetler

- Kocatepe, Yıldırım ve Muratpaşa'da **kombi arıza, yıllık bakım ve orijinal parça değişimi**
- Cevatpaşa ve İsmetpaşa'nın 1980'ler apartmanlarında **bacalı şofbenden hermetiğe dönüşüm**
- Terazidere ve Vatan Caddesi'ndeki **mağaza, depo ve ofislerde** klima/VRF bakım sözleşmesi
- Yeni konut projelerinde **kombi ve klima ilk devreye alma**, site yönetimiyle toplu bakım planı

# İş yerleri için

Depo ve lojistik alanlarında sıklıkla **büyük kapasiteli klima ve salon tipi cihazlar** kullanılıyor; bunlarda kondanser temizliği ve gaz kontrolü ihmal edilince yaz ortasında kompresör arızası kaçınılmaz oluyor. Bayrampaşa'daki işletmelere sezon öncesi bakım ve öncelikli müdahale içeren sözleşme sunuyoruz.

Komşu ilçeler: [Esenler](/tr/servis/esenler), [Zeytinburnu](/tr/servis/zeytinburnu), [Güngören](/tr/servis/gungoren).`,
    faq: [
      { title: "Depomuzdaki salon tipi klimalara bakıyor musunuz?", text: "Evet. Salon tipi, kaset tipi, kanallı ve VRF sistemlerde bakım, gaz kontrolü ve arıza müdahalesi yapıyoruz." },
      { title: "Bayrampaşa'nın hangi mahallelerine gidiyorsunuz?", text: "Tamamına: Kocatepe, Yıldırım, Altıntepsi, Muratpaşa, Cevatpaşa, İsmetpaşa, Terazidere, Vatan, Kartaltepe, Orta, Yenidoğan." },
    ],
  },
  kucukcekmece: {
    lead: "Halkalı, Atakent, Sefaköy, Tevfikbey, İnönü, Cennet, Kanarya, Fevzi Çakmak ve Küçükçekmece Merkez'de kombi, klima ve şofben servisi.",
    heading: "Küçükçekmece'de geniş bir ilçeye planlı servis.",
    body: `Küçükçekmece, hizmet verdiğimiz en geniş ilçe: Sefaköy ve Tevfikbey'in yoğun apartmanlarından **Halkalı ve Atakent'in büyük toplu konut ve site projelerine**, Cennet ve Kanarya'nın eski dokusundan İkitelli sınırındaki iş yerlerine uzanıyor. Bu genişlik nedeniyle Küçükçekmece'de ekiplerimizi **Sefaköy** ve **Halkalı** olmak üzere iki odakta planlıyoruz.

# Küçükçekmece'de bölgeye göre hizmet

- **Halkalı, Atakent, Atatürk Mahallesi:** Site yönetimleriyle toplu kombi bakım programı; yoğuşmalı kombi ve VRF sistemlerin garanti sonrası servisi
- **Sefaköy, Tevfikbey, İnönü:** Kombi arıza ve yıllık bakım, klima montajı ve gaz dolumu
- **Cennet, Kanarya, Fevzi Çakmak:** Eski apartmanlarda **bacalı cihazdan hermetiğe dönüşüm**, tesisat temizliği
- **Küçükçekmece Merkez ve Göl çevresi:** Konut ve küçük işletmelerde klima bakımı

# Toplu konutlar için

Halkalı ve Atakent'teki büyük sitelerde yüzlerce daire aynı marka ve yaştaki kombiyi kullanıyor. Site yönetimleriyle **sezon öncesi planlı bakım takvimi, sabit daire fiyatı, tek rapor ve öncelikli arıza hattı** içeren sözleşme yapıyoruz; bu sayede kış başındaki arıza yoğunluğu büyük ölçüde önleniyor.

Komşu ilçeler: [Bahçelievler](/tr/servis/bahcelievler), [Bakırköy](/tr/servis/bakirkoy), [Bağcılar](/tr/servis/bagcilar).`,
    faq: [
      { title: "Halkalı'daki sitemiz için toplu bakım sözleşmesi yapıyor musunuz?", text: "Evet. Site yönetimleriyle planlı bakım takvimi, sabit daire fiyatı, tek rapor ve öncelikli arıza hattı içeren yıllık sözleşme yapıyoruz." },
      { title: "Küçükçekmece'nin hangi mahallelerine gidiyorsunuz?", text: "Tamamına: Halkalı, Atakent, Atatürk, Sefaköy, Tevfikbey, İnönü, Cennet, Kanarya, Fevzi Çakmak, Merkez, Beşyol, Cumhuriyet, Fatih, Gültepe, Kartaltepe, Kemalpaşa, Mehmet Akif, Söğütlü Çeşme, Sultan Murat, Yarımburgaz, Yeni Mahalle, Yeşilova, Halkalı Merkez, İstasyon." },
    ],
  },
};

const DISTRICT_EN: Record<DistrictKind, DistrictCopy> = {
  bahcelievler: {
    lead: "Our head office is in Bahçelievler. Boiler, AC and water-heater service in Şirinevler, Yenibosna, Kocasinan, Siyavuşpaşa, Soğanlı and Zafer with the shortest response time.",
    heading: "In Bahçelievler since 1994 — same team, same phone number.",
    body: `Kayahan Isı's story was written in Bahçelievler: from 1994 as the **Demirdöküm Bahçelievler authorised service** we have worked in tens of thousands of flats here. We know the district's building stock — the dense apartment blocks of Şirinevler and Yenibosna, the renewed blocks of Kocasinan and Siyavuşpaşa, the low-rise houses of Soğanlı and Zafer — at technician level.

# Most common jobs in Bahçelievler

- Converting **old open-flue boilers and water heaters** to room-sealed / condensing models
- **Commissioning and setting** new boilers in post-renewal flats
- **AC maintenance contracts** for offices and shops along Şirinevler–Yenibosna
- Cold-radiator and system-flush calls at the start of winter

Because our office is inside the district, most Bahçelievler calls are reached **the same day, usually within hours**. See also [Bakırköy](/en/servis/bakirkoy), [Bağcılar](/en/servis/bagcilar) and [Güngören](/en/servis/gungoren).`,
    faq: [{ title: "Same-day service in Bahçelievler?", text: "Yes — our office is in the district, so most calls are reached the same day, often within hours." }],
  },
  bagcilar: {
    lead: "Boiler, AC and water-heater service for homes and businesses in Güneşli, Mahmutbey, Yenimahalle, Kirazlı, Göztepe and central Bağcılar.",
    heading: "Bağcılar: every appliance, from flats to workshops.",
    body: `Bağcılar is both one of Istanbul's most populous districts and, along Güneşli–Mahmutbey, a major business zone. We answer both needs: fast boiler and water-heater response in **dense residential areas**, and AC / VRF maintenance contracts for **offices, textile workshops and plazas**.

# Highlights

- Boiler faults and annual maintenance in Yenimahalle, Kirazlı, Göztepe and the centre
- **Multi-split / VRF contracts** for offices, warehouses and shops in Güneşli and Mahmutbey
- Pre-season **bulk boiler maintenance** for site managements
- Commissioning in new residential projects along the metro line

Our founder İlhan Kaya trained technicians in the **EU-funded boiler-service vocational course** run with Bağcılar Vocational High School; some of our field technicians in Bağcılar came through it. See also [Bahçelievler](/en/servis/bahcelievler), [Güngören](/en/servis/gungoren), [Esenler](/en/servis/esenler), [Küçükçekmece](/en/servis/kucukcekmece).`,
    faq: [{ title: "Can we sign a maintenance contract for our business in Bağcılar?", text: "Yes — AC/VRF and boiler contracts with planned visits and priority fault response for offices, warehouses and workshops in Güneşli and Mahmutbey." }],
  },
  bakirkoy: {
    lead: "Boiler, AC and water-heater service in Ataköy, Florya, Yeşilköy, Yeşilyurt, Osmaniye, Kartaltepe and central Bakırköy — in this area since 1982.",
    heading: "Bakırköy: more than forty years of familiarity.",
    body: `İlhan Kaya ran the **E.C.A. Bakırköy regional authorised service** from 1982 to 1994; from the Ataköy estates to the detached houses of Yeşilköy we have known this area for forty years.

# Service by building type

- **Ataköy estates:** boiler maintenance and faults in flats converted from central heating; bulk plans for site managements
- **Florya, Yeşilköy, Yeşilyurt:** high-capacity and cascade boilers, **multi-split / VRF** in detached homes
- **Osmaniye, Kartaltepe, Zeytinlik:** open-flue to room-sealed conversion and system flushing in 1970–90s blocks
- **Central Bakırköy:** AC contracts for shops, clinics and offices

Salty coastal air corrodes outdoor-unit condensers quickly along Florya–Yeşilköy; we recommend **twice-yearly** AC maintenance with condenser washing there. See also [Bahçelievler](/en/servis/bahcelievler), [Zeytinburnu](/en/servis/zeytinburnu), [Küçükçekmece](/en/servis/kucukcekmece).`,
    faq: [{ title: "Bulk maintenance for an Ataköy site management?", text: "Yes — pre-season planned boiler maintenance with a fixed per-flat price and a single report." }],
  },
  gungoren: {
    lead: "Boiler, AC and water-heater service for homes and Merter's textile businesses in Merter, Tozkoparan, Haznedar, Güneştepe, Sanayi, Akıncılar and Mareşal Çakmak.",
    heading: "Güngören: homes, and Merter's business district.",
    body: `Güngören is small but dense: the apartment blocks of Haznedar, Güneştepe and Tozkoparan sit beside **Merter's textile and wholesale centre**. Adjacent to our Bahçelievler office, it is one of our fastest districts.

# Frequent jobs

- Boiler faults and annual maintenance in Haznedar and Güneştepe
- **AC contracts, VRF response and indoor-unit additions** for Merter showrooms and workshops
- Open-flue to room-sealed conversion in older Tozkoparan buildings
- Electric water heaters in small businesses in Sanayi

For Merter showrooms an AC failure in mid-summer means lost sales; we offer a **priority-response maintenance contract**. See also [Bahçelievler](/en/servis/bahcelievler), [Bağcılar](/en/servis/bagcilar), [Esenler](/en/servis/esenler), [Zeytinburnu](/en/servis/zeytinburnu).`,
    faq: [{ title: "How fast can you reach our shop in Merter?", text: "Güngören borders our office; contracted businesses are reached the same day, usually within hours." }],
  },
  zeytinburnu: {
    lead: "Boiler, AC and water-heater service in Kazlıçeşme, Merkezefendi, Beştelsiz, Sümer, Telsiz, Veliefendi, Seyitnizam and Yeşiltepe.",
    heading: "Zeytinburnu: from old blocks to new residences.",
    body: `Zeytinburnu is one of Istanbul's fastest-changing districts: **new residences** along Kazlıçeşme and the coast, **1970–80s blocks** in Merkezefendi and Sümer, dense neighbourhoods in Telsiz and Beştelsiz. We work in all of them.

# Service by area

- **Kazlıçeşme and coastal projects:** post-warranty condensing-boiler and VRF maintenance, site contracts
- **Merkezefendi, Sümer, Telsiz:** conversion of old boilers and open-flue water heaters, system flushing
- **Veliefendi, Seyitnizam, Yeşiltepe:** boiler faults, annual maintenance, AC installation
- Shops and offices around Olivium and the square: AC contracts

Coastal salt air wears outdoor units; twice-yearly maintenance with condenser washing is advised along Kennedy Avenue. See also [Bakırköy](/en/servis/bakirkoy), [Güngören](/en/servis/gungoren), [Bayrampaşa](/en/servis/bayrampasa).`,
    faq: [{ title: "Our new residence's boiler is out of warranty — can you maintain it?", text: "Yes — post-warranty maintenance and repair for every brand, with genuine parts and a written guarantee." }],
  },
  esenler: {
    lead: "Boiler, AC and water-heater service in Atışalanı, Oruçreis, Menderes, Kemer, Fevzi Çakmak, Havaalanı, Nine Hatun and central Esenler.",
    heading: "Esenler: fast service for a dense residential fabric.",
    body: `Esenler is one of Istanbul's most densely populated districts, mostly 1980–2000 apartment blocks. **Old boilers and water heaters, scaled pipework and flue issues** are the most frequent calls; around the bus terminal and Havaalanı, commercial AC maintenance leads.

# Frequent jobs

- Boiler faults, annual maintenance and condensing conversion in Atışalanı, Oruçreis and Menderes
- Commissioning new boilers in renewed blocks
- **System flushing** in older Kemer and Fevzi Çakmak buildings — the lasting fix for "the lower floors don't heat"
- AC contracts for businesses near the terminal
- **Water-heater flue and ventilation checks** (carbon-monoxide safety)

Four or more flats in one building booking together get a **shared appointment and a reduced per-flat price**. See also [Bağcılar](/en/servis/bagcilar), [Güngören](/en/servis/gungoren), [Bayrampaşa](/en/servis/bayrampasa).`,
    faq: [{ title: "Can our building book bulk boiler maintenance?", text: "Yes — for four or more flats we offer a shared appointment and reduced per-flat price, coordinated through the building manager." }],
  },
  bayrampasa: {
    lead: "Boiler, AC and water-heater service in Kocatepe, Yıldırım, Altıntepsi, Muratpaşa, Cevatpaşa, İsmetpaşa, Terazidere and Vatan.",
    heading: "Bayrampaşa: residential and commercial side by side.",
    body: `Two worlds meet in Bayrampaşa: the **residential neighbourhoods** of Kocatepe, Yıldırım and Altıntepsi, and the **commercial and logistics areas** around Forum İstanbul, Terazidere and Vatan Avenue. The metro and TEM link give us fast access.

# Highlights

- Boiler faults, maintenance and genuine-part replacement in Kocatepe, Yıldırım and Muratpaşa
- Open-flue to room-sealed conversion in 1980s blocks of Cevatpaşa and İsmetpaşa
- **AC / VRF contracts** for shops, warehouses and offices along Terazidere and Vatan Avenue
- Commissioning and site contracts in new residential projects

Warehouses often run **large-capacity and floor-standing units**; neglected condenser cleaning ends in mid-summer compressor failure. We offer pre-season maintenance with priority response. See also [Esenler](/en/servis/esenler), [Zeytinburnu](/en/servis/zeytinburnu), [Güngören](/en/servis/gungoren).`,
    faq: [{ title: "Do you service floor-standing units in our warehouse?", text: "Yes — floor-standing, cassette, ducted and VRF systems: maintenance, refrigerant checks and fault response." }],
  },
  kucukcekmece: {
    lead: "Boiler, AC and water-heater service in Halkalı, Atakent, Sefaköy, Tevfikbey, İnönü, Cennet, Kanarya, Fevzi Çakmak and central Küçükçekmece.",
    heading: "Küçükçekmece: planned service across a wide district.",
    body: `Küçükçekmece is the widest district we serve: from the dense blocks of Sefaköy and Tevfikbey to the **large housing estates of Halkalı and Atakent**, the older fabric of Cennet and Kanarya and the businesses on the İkitelli border. We plan our teams around two hubs, **Sefaköy** and **Halkalı**.

# Service by area

- **Halkalı, Atakent, Atatürk:** bulk boiler programmes with site managements; post-warranty condensing-boiler and VRF service
- **Sefaköy, Tevfikbey, İnönü:** boiler faults and maintenance, AC installation and charging
- **Cennet, Kanarya, Fevzi Çakmak:** open-flue conversion and system flushing in older blocks
- Lake area and centre: AC maintenance for homes and small businesses

In the large Halkalı and Atakent estates hundreds of flats run the same boiler model; our site contracts include a **pre-season calendar, fixed per-flat price, single report and a priority fault line**. See also [Bahçelievler](/en/servis/bahcelievler), [Bakırköy](/en/servis/bakirkoy), [Bağcılar](/en/servis/bagcilar).`,
    faq: [{ title: "Do you offer bulk contracts for our estate in Halkalı?", text: "Yes — annual site contracts with a planned calendar, fixed per-flat price, single report and priority fault line." }],
  },
};

function districtLanding(kind: DistrictKind, locale: "tr" | "en"): ServiceLanding {
  const name = DISTRICT_NAME[kind];
  const c = (locale === "tr" ? DISTRICT_TR : DISTRICT_EN)[kind];
  if (locale === "tr") {
    return {
      heroEyebrow: `${name.toLocaleUpperCase("tr")} · KOMBİ · KLİMA · ŞOFBEN`,
      heroTitle: `${name} kombi, klima ve şofben servisi.`,
      heroAccent: "Aynı gün, belgeli ekip, orijinal parça.",
      heroLead: c.lead,
      heroImage: "/gallery/vip-kurumsal-servis-araci.webp",
      heroImageAlt: `${name} kombi, klima ve şofben servisi — Kayahan Isı servis aracı`,
      introLabel: `${name.toLocaleUpperCase("tr")}'DE KAYAHAN`,
      introHeading: c.heading,
      body: c.body,
      servicesLabel: `${name.toLocaleUpperCase("tr")}'DE HİZMETLERİMİZ`,
      servicesHeading: "Tek telefonla tüm cihazlar.",
      services: DISTRICT_SERVICES_TR,
      faqLabel: "SIK SORULAN SORULAR",
      faqHeading: `${name} servisi hakkında.`,
      faq: [...c.faq, ...COMMON_FAQ_TR.slice(1)],
      ...AREAS_TR,
      ctaHeading: `${name}'de servis talebi oluşturun.`,
    };
  }
  return {
    heroEyebrow: `${name.toUpperCase()} · BOILER · AC · WATER HEATER`,
    heroTitle: `${name} boiler, AC and water-heater service.`,
    heroAccent: "Same day, certified team, genuine parts.",
    heroLead: c.lead,
    heroImage: "/gallery/vip-kurumsal-servis-araci.webp",
    heroImageAlt: `${name} boiler, AC and water-heater service — Kayahan Isı service van`,
    introLabel: `KAYAHAN IN ${name.toUpperCase()}`,
    introHeading: c.heading,
    body: c.body,
    servicesLabel: `OUR SERVICES IN ${name.toUpperCase()}`,
    servicesHeading: "Every appliance, one phone call.",
    services: DISTRICT_SERVICES_EN,
    faqLabel: "FAQ",
    faqHeading: `About service in ${name}.`,
    faq: [...c.faq, ...COMMON_FAQ_EN.slice(1)],
    ...AREAS_EN,
    ctaHeading: `Book a service visit in ${name}.`,
  };
}

export const districtDefaults = Object.fromEntries(
  DISTRICT_KINDS.map((k) => [k, districtLanding(k, "tr")]),
) as Record<DistrictKind, ServiceLanding>;
export const districtDefaultsEn = Object.fromEntries(
  DISTRICT_KINDS.map((k) => [k, districtLanding(k, "en")]),
) as Record<DistrictKind, ServiceLanding>;

// ------------------------------------------------------------------ brands ----

/**
 * Brand-specific boiler-service pages under /kombi-servisi/<brand>. The
 * business spent decades as DemirDöküm and Vaillant *authorised* service and
 * now serves every brand independently — every page says so explicitly, so
 * nothing reads as a claim of current authorisation.
 */
export type BrandKind = "demirdokum" | "vaillant" | "baymak" | "protherm";

export const BRAND_NAME: Record<BrandKind, string> = {
  demirdokum: "DemirDöküm",
  vaillant: "Vaillant",
  baymak: "Baymak",
  protherm: "Protherm",
};
export const BRAND_KINDS = Object.keys(BRAND_NAME) as BrandKind[];
export const BRAND_ROUTE = (b: BrandKind) => `/tr/kombi-servisi/${b}`;

const INDEPENDENT_TR = (brand: string) =>
  `> **Bağımsız servis bilgisi:** Kayahan Isı, ${brand} markasının yetkili servisi değildir; 45 yıllık yetkili servis deneyimine sahip **bağımsız bir teknik servistir**. Garanti süresi devam eden cihazlarda garanti işlemleri için üreticinin yetkili servisine başvurmanız gerekir; garanti dışı her türlü arıza, bakım ve montaj için hizmet veriyoruz.`;

const INDEPENDENT_EN = (brand: string) =>
  `> **Independent-service notice:** Kayahan Isı is not ${brand}'s authorised service; we are an **independent technical service** with 45 years of authorised-service experience. For in-warranty work contact the manufacturer's authorised service; we handle every out-of-warranty fault, maintenance and installation.`;

type BrandCopy = { lead: string; heading: string; body: string; faq: { title: string; text: string }[] };

const BRAND_TR: Record<BrandKind, BrandCopy> = {
  demirdokum: {
    lead: "1994'ten itibaren uzun yıllar DemirDöküm Bahçelievler Yetkili Servisi olarak çalıştık. Bugün bağımsız servis olarak Nitromix, Atromix, Atron, Vintage, Nepto ve Adamix serilerinde arıza, bakım ve montaj hizmeti veriyoruz.",
    heading: "DemirDöküm kombileri en iyi tanıyan ekiplerden biri: yıllarca yetkili servisiydik.",
    body: `${INDEPENDENT_TR("DemirDöküm")}

Kurucumuz İlhan Kaya'nın 1976'da DemirDöküm servisinde çırak olarak başlayan yolculuğu, 1994'ten itibaren **DemirDöküm Bahçelievler Yetkili Servisi** olarak 25 kişilik bir ekibe dönüştü. On binlerce DemirDöküm cihazına girdik; bu markanın her serisinin karakteristik arızasını, parça yapısını ve ayarlarını teknisyen düzeyinde biliyoruz.

# Servis verdiğimiz DemirDöküm serileri

- **Nitromix** (yoğuşmalı) — en yaygın seri; eşanjör temizliği, gaz-hava ayarı ve yoğuşma sifonu bakımı
- **Atromix / Atron** — yoğuşmalı ve konvansiyonel modeller
- **Vintage** — hermetik konvansiyonel; eşanjör ve fan arızaları
- **Nepto, Adamix** ve eski nesil **Isımax** modelleri

# DemirDöküm'de sık karşılaştığımız arızalar

- **F.28 / F.29** — ateşleme ve alev kaybı: elektrot mesafesi, iyonizasyon, gaz valfi
- **F.22** — düşük su basıncı; sık tekrarlıyorsa genleşme tankı ya da tesisat kaçağı
- **F.75** — pompa/basınç sensörü: sensör kirliliği, pompa sıkışması
- **F.61 / F.62** — gaz valfi kontrolü; kesinlikle servis
- Nitromix'te **yoğuşma sifonu tıkanması** ve buna bağlı kapanmalar
- Eski hermetik modellerde **fan ve presostat** arızaları, baca sızdırmazlığı

Arıza kodlarının anlamlarını [kombi arıza kodları](/tr/blog/kombi-ariza-kodlari-ne-anlama-gelir) yazımızda ayrıntılı bulabilirsiniz.

# Orijinal parça ve garanti

DemirDöküm cihazlarda yalnızca **orijinal yedek parça** kullanıyoruz: pompa, fan, gaz valfi, eşanjör, üç yollu vana, NTC sensör ve elektronik kart. Taktığımız parça ve işçilik yazılı garanti kapsamındadır; parçanın kutusu ve belgesi size teslim edilir.

# Bakım ve dönüşüm

Yıllık bakımda Nitromix ve Atromix'te baca gazı analizörüyle CO₂ ölçümü yaparak yanma ayarını fabrika değerine getiriyoruz; bu, faturayı doğrudan etkileyen adımdır. Eski konvansiyonel DemirDöküm'ünüzü **yoğuşmalı modele dönüştürmek** istiyorsanız keşif, baca ve tesisat uygunluğunu birlikte planlıyoruz.`,
    faq: [
      { title: "DemirDöküm yetkili servisi misiniz?", text: "Hayır. Uzun yıllar DemirDöküm yetkili servisi olarak çalıştık; bugün bağımsız servisiz. Garanti kapsamındaki işlemler için üreticinin yetkili servisine başvurmalısınız; garanti dışı tüm işlemleri biz yapıyoruz." },
      { title: "Nitromix kombim F.28 veriyor, ne yapmalıyım?", text: "Gaz vanası ve sayacı kontrol edip bir kez resetleyin. Kod sürüyorsa ateşleme elektrodu, iyonizasyon ya da gaz valfi kaynaklıdır; ısrarla resetlemeyin, servis çağırın." },
      { title: "DemirDöküm için orijinal parça bulabiliyor musunuz?", text: "Evet. Yaygın modellerin parçalarını stokta tutuyor, diğerlerini kısa sürede temin ediyoruz." },
    ],
  },
  vaillant: {
    lead: "Vaillant yetkili servisi olarak edindiğimiz deneyimle ecoTEC plus, ecoTEC pro, ecoTEC pure, turboTEC ve atmoTEC serilerinde bağımsız arıza, bakım ve montaj hizmeti.",
    heading: "Vaillant'ın hassas ayar isteyen cihazlarında ölçümle çalışan bir servis.",
    body: `${INDEPENDENT_TR("Vaillant")}

Vaillant kombiler yüksek verimli ama ayar ve parça kalitesine duyarlı cihazlardır: gaz-hava oranı analizörsüz "kulaktan" ayarlanırsa verim düşer, muadil parça kullanılırsa kart hata verir. Yıllarca Vaillant yetkili servisi olarak çalışan ekibimiz bu cihazları fabrika prosedürüyle onarır.

# Servis verdiğimiz Vaillant serileri

- **ecoTEC plus / ecoTEC pro / ecoTEC pure** — yoğuşmalı; en yaygın seriler
- **ecoTEC exclusive** — üst segment yoğuşmalı
- **turboTEC pro / plus** — hermetik konvansiyonel
- **atmoTEC** — bacalı konvansiyonel (dönüşüm önerimizdir)
- **aroTHERM** ısı pompaları — bakım ve arıza; kurulum için [ısı pompası](/tr/blog/isi-pompasi-nedir-nasil-calisir) yazımıza bakın

# Vaillant'ta sık karşılaştığımız arızalar

- **F.28 / F.29** — ateşleme başarısız / alev kaybı
- **F.22** — düşük su basıncı; **F.23/F.24** — dolaşım sorunu (pompa, hava, kapalı vana)
- **F.75** — pompa çalışırken basınç değişimi algılanmıyor
- **F.61–F.64** — gaz valfi ve kart elektroniği
- **F.27** — yanlış alev sinyali (elektrot/iyonizasyon)
- ecoTEC'te **yoğuşma sifonu ve baca sensörü** kaynaklı kapanmalar

# Kalibrasyon ve parça

Vaillant'ta bakımın kalbi **baca gazı analizi**dir: CO₂ değerini serinin belirttiği aralığa getirmeden yapılan bakım eksiktir. Parçada yalnızca orijinal Vaillant yedek parçası kullanıyoruz; kart, gaz valfi ve pompa gibi elektronik bileşenlerde muadil parça cihazın ömrünü kısaltır.`,
    faq: [
      { title: "Vaillant yetkili servisi misiniz?", text: "Hayır; uzun yıllar Vaillant yetkili servisi olarak çalıştık, bugün bağımsız servisiz. Garanti işlemleri için üreticinin yetkili servisine başvurmalısınız." },
      { title: "ecoTEC kombim sık sık F.22 veriyor.", text: "Basıncı 1–1,5 bar'a getirin. Birkaç günde tekrar düşüyorsa genleşme tankı ya da tesisatta kaçak vardır; sürekli su basmak kireçlenmeyi artırır, servis çağırın." },
      { title: "Vaillant bakımında baca gazı ölçümü yapıyor musunuz?", text: "Evet; her bakımda analizörle CO₂ ölçümü yapılır ve rapora yazılır." },
    ],
  },
  baymak: {
    lead: "Baymak Lectus, Lectus Plus, Iridium ve Idee serilerinde arıza, bakım, orijinal parça ve montaj — İstanbul Avrupa Yakası'nda aynı gün.",
    heading: "Türkiye'nin en yaygın kombisi için hızlı, parça stoklu servis.",
    body: `${INDEPENDENT_TR("Baymak")}

Baymak, hizmet bölgemizde en çok karşılaştığımız markalardan biri. Yaygınlığı sayesinde parçalarını stokta tutuyor, çoğu arızayı tek ziyarette çözüyoruz.

# Servis verdiğimiz Baymak serileri

- **Lectus / Lectus Plus** — yoğuşmalı; en yaygın seri
- **Iridium** — yoğuşmalı üst segment
- **Idee** — kompakt yoğuşmalı
- **Brötje** serisi ve eski nesil hermetik modeller

# Baymak'ta sık karşılaştığımız arızalar

- **E01** — alev oluşmadı: gaz, elektrot, ateşleme trafosu
- **E02** — aşırı ısınma: pompa, eşanjör kireci, dolaşım
- **E03** — fan / baca / presostat
- **E10** — düşük su basıncı
- Lectus'ta **yoğuşma sifonu** ve **NTC sensör** kaynaklı kapanmalar
- Eski modellerde **üç yollu vana motoru** ve sıcak su dalgalanması

Kodların ayrıntısı için [kombi arıza kodları](/tr/blog/kombi-ariza-kodlari-ne-anlama-gelir) yazımıza bakın.

# Bakım ve parça

Yıllık bakımda eşanjör temizliği, gaz-hava ayarı, baca sızdırmazlık ve emniyet testleri yapılır; ölçümler raporlanır. Değişen her parça orijinal Baymak yedek parçasıdır ve yazılı garantilidir.`,
    faq: [
      { title: "Baymak yetkili servisi misiniz?", text: "Hayır, bağımsız servisiz. Garanti kapsamındaki cihazlar için Baymak yetkili servisine başvurun; garanti dışı tüm işlemleri yapıyoruz." },
      { title: "Lectus kombim E01 veriyor.", text: "Gaz vanası ve sayacı kontrol edip bir kez resetleyin. Sürüyorsa elektrot ya da gaz valfi kaynaklıdır; servis çağırın." },
      { title: "Baymak parçası ne kadar sürede gelir?", text: "Yaygın parçalar stokta; çoğu onarım aynı ziyarette tamamlanır." },
    ],
  },
  protherm: {
    lead: "Protherm Lynx, Panther, Gepard ve Jaguar serilerinde arıza, bakım ve montaj. Vaillant grubu cihazlarda uzman ekip.",
    heading: "Protherm: Vaillant grubunun ekonomik serisi, aynı titizlikle.",
    body: `${INDEPENDENT_TR("Protherm")}

Protherm, Vaillant grubunun markasıdır; kod yapısı, parça mimarisi ve ayar prosedürleri Vaillant'la büyük ölçüde ortaktır. Vaillant yetkili servisi olarak edindiğimiz bilgi Protherm cihazlarda doğrudan işimize yarar.

# Servis verdiğimiz Protherm serileri

- **Lynx Condens** — yoğuşmalı; en yaygın seri
- **Panther Condens / Panther** — yoğuşmalı ve konvansiyonel
- **Gepard** — hermetik konvansiyonel
- **Jaguar** — kompakt hermetik

# Protherm'de sık karşılaştığımız arızalar

- **F.28 / F.29** — ateşleme ve alev kaybı
- **F.22** — düşük su basıncı; **F.23/F.24** — dolaşım
- **F.75** — pompa / basınç sensörü
- **F.61–F.63** — gaz valfi ve kart
- Lynx'te **yoğuşma sifonu** tıkanması, **NTC sensör** hataları
- Gepard/Jaguar'da **fan ve presostat** arızaları

# Bakım ve parça

Yoğuşmalı Protherm modellerinde baca gazı analiziyle CO₂ ayarı yapıyor, konvansiyonel modellerde baca çekiş ve sızdırmazlık testini atlamıyoruz. Parçada orijinal Protherm/Vaillant grubu yedek parçası kullanılır; yazılı garanti verilir.`,
    faq: [
      { title: "Protherm yetkili servisi misiniz?", text: "Hayır, bağımsız servisiz. Garanti işlemleri için Protherm yetkili servisine başvurun; garanti dışı tüm arıza, bakım ve montajı yapıyoruz." },
      { title: "Protherm ile Vaillant parçaları aynı mı?", text: "Birçok bileşen aynı gruptan gelir ancak model bazında farklılık vardır; cihazınızın seri numarasına göre doğru parça temin edilir." },
      { title: "Lynx kombim F.75 veriyor, parça değişir mi?", text: "Çoğu zaman basınç sensörü temizliği ya da tesisattaki havanın alınmasıyla çözülür; pompa arızası varsa onayınızla değiştirilir." },
    ],
  },
};

const BRAND_EN: Record<BrandKind, BrandCopy> = {
  demirdokum: {
    lead: "For many years from 1994 we were the DemirDöküm Bahçelievler authorised service. Today, as an independent service, we repair, maintain and install the Nitromix, Atromix, Atron, Vintage, Nepto and Adamix ranges.",
    heading: "One of the teams that knows DemirDöküm boilers best: we were their authorised service for years.",
    body: `${INDEPENDENT_EN("DemirDöküm")}

Our founder began as a DemirDöküm apprentice in 1976 and from 1994 ran the **DemirDöküm Bahçelievler authorised service** with a 25-person team. We know each range's characteristic faults, parts and settings at technician level.

# Ranges we service

- **Nitromix** (condensing) — exchanger cleaning, gas/air setting, condensate-trap maintenance
- **Atromix / Atron** — condensing and conventional
- **Vintage** — room-sealed conventional; exchanger and fan faults
- **Nepto, Adamix** and older **Isımax** models

# Frequent faults

- **F.28 / F.29** ignition and flame loss · **F.22** low pressure · **F.75** pump/pressure sensor · **F.61 / F.62** gas valve
- Condensate-trap blockages on Nitromix; fan and pressure-switch faults on older room-sealed models

# Genuine parts and guarantee

Only genuine DemirDöküm parts — pump, fan, gas valve, exchanger, diverter valve, NTC, PCB — with written guarantee and the part's box handed over. Annual maintenance includes flue-gas CO₂ analysis to restore factory combustion settings.`,
    faq: [
      { title: "Are you DemirDöküm's authorised service?", text: "No. We were for many years; today we are independent. For in-warranty work contact the manufacturer's authorised service; we handle everything out of warranty." },
    ],
  },
  vaillant: {
    lead: "With experience gained as Vaillant authorised service, independent repair, maintenance and installation for ecoTEC plus, ecoTEC pro, ecoTEC pure, turboTEC and atmoTEC.",
    heading: "A measurement-driven service for Vaillant's precision-tuned boilers.",
    body: `${INDEPENDENT_EN("Vaillant")}

Vaillant boilers are efficient but sensitive to settings and part quality. Our team, formerly Vaillant authorised service, repairs them to factory procedure.

# Ranges we service

- **ecoTEC plus / pro / pure / exclusive** — condensing
- **turboTEC pro / plus** — room-sealed conventional
- **atmoTEC** — open-flue conventional (conversion recommended)
- **aroTHERM** heat pumps — maintenance and faults

# Frequent faults

- **F.28 / F.29** ignition and flame loss · **F.22** low pressure · **F.23 / F.24** circulation · **F.75** pressure sensor · **F.61–F.64** gas valve and PCB · **F.27** false flame signal
- Condensate-trap and flue-sensor shutdowns on ecoTEC

# Calibration and parts

Flue-gas analysis is the heart of a Vaillant service: CO₂ must be set to the range's specification. Only genuine Vaillant parts are used.`,
    faq: [
      { title: "Are you Vaillant's authorised service?", text: "No — we were for many years; today we are independent. In-warranty work goes to the manufacturer's authorised service." },
    ],
  },
  baymak: {
    lead: "Repair, maintenance, genuine parts and installation for Baymak Lectus, Lectus Plus, Iridium and Idee — same day on Istanbul's European side.",
    heading: "Fast, parts-in-stock service for Turkey's most common boiler.",
    body: `${INDEPENDENT_EN("Baymak")}

Baymak is one of the most common brands in our area; we keep its parts in stock and resolve most faults in one visit.

# Ranges we service

- **Lectus / Lectus Plus** — condensing · **Iridium** — premium condensing · **Idee** — compact condensing · **Brötje** and older room-sealed models

# Frequent faults

- **E01** no flame · **E02** overheat · **E03** fan / flue / pressure switch · **E10** low pressure
- Condensate-trap and NTC shutdowns on Lectus; diverter-valve motor faults on older models

# Maintenance and parts

Annual maintenance covers exchanger cleaning, gas/air setting, flue and safety tests with a measurement report. Only genuine Baymak parts, with written guarantee.`,
    faq: [
      { title: "Are you Baymak's authorised service?", text: "No, we are an independent service. For in-warranty appliances contact Baymak's authorised service." },
    ],
  },
  protherm: {
    lead: "Repair, maintenance and installation for Protherm Lynx, Panther, Gepard and Jaguar — by a team expert in Vaillant-group appliances.",
    heading: "Protherm: the Vaillant group's value range, serviced with the same care.",
    body: `${INDEPENDENT_EN("Protherm")}

Protherm is a Vaillant-group brand; its codes, parts and procedures largely match Vaillant's, so our Vaillant experience applies directly.

# Ranges we service

- **Lynx Condens** · **Panther Condens / Panther** · **Gepard** · **Jaguar**

# Frequent faults

- **F.28 / F.29** ignition and flame loss · **F.22** low pressure · **F.23 / F.24** circulation · **F.75** pressure sensor · **F.61–F.63** gas valve and PCB
- Condensate-trap and NTC faults on Lynx; fan and pressure-switch faults on Gepard/Jaguar

# Maintenance and parts

CO₂ set by flue-gas analysis on condensing models; draught and leak tests on conventional ones. Genuine Protherm/Vaillant-group parts with written guarantee.`,
    faq: [
      { title: "Are you Protherm's authorised service?", text: "No, we are independent. In-warranty work goes to Protherm's authorised service." },
    ],
  },
};

const BRAND_SERVICES_TR = [
  { title: "Arıza tespiti ve onarım", text: "Arıza kodu ve ölçümle kök neden analizi; çoğu onarım tek ziyarette." },
  { title: "Yıllık bakım", text: "Eşanjör ve brülör temizliği, baca gazı analizi, emniyet testleri, ölçüm raporu." },
  { title: "Orijinal yedek parça", text: "Markanın orijinal parçası, kutu ve belge teslimi, yazılı garanti." },
  { title: "Montaj ve dönüşüm", text: "Kapasite ve baca uygunluğu, yoğuşmalıya geçiş, ilk çalıştırma ve eğitim." },
  { title: "Petek ve tesisat temizliği", text: "Isınmayan petekler için makineyle tesisat yıkama." },
  { title: "7/24 acil servis", text: "Gece, hafta sonu ve bayramda ulaşılabilir hat." },
];
const BRAND_SERVICES_EN = [
  { title: "Diagnosis and repair", text: "Code and measurement-based root cause; most repairs in one visit." },
  { title: "Annual maintenance", text: "Exchanger and burner cleaning, flue-gas analysis, safety tests, report." },
  { title: "Genuine spare parts", text: "Manufacturer parts, box and documents handed over, written guarantee." },
  { title: "Installation and conversion", text: "Capacity and flue suitability, condensing conversion, commissioning." },
  { title: "Radiator and system flush", text: "Power-flushing for cold radiators." },
  { title: "24/7 emergency service", text: "Reachable nights, weekends and holidays." },
];

function brandLanding(kind: BrandKind, locale: "tr" | "en"): ServiceLanding {
  const name = BRAND_NAME[kind];
  const c = (locale === "tr" ? BRAND_TR : BRAND_EN)[kind];
  if (locale === "tr") {
    return {
      heroEyebrow: `${name.toLocaleUpperCase("tr")} KOMBİ SERVİSİ · BAĞIMSIZ SERVİS`,
      heroTitle: `${name} kombi servisi.`,
      heroAccent: "Arıza, bakım, orijinal parça, montaj.",
      heroLead: c.lead,
      heroImage: "/gallery/kombi-servisi-teknisyen-2.webp",
      heroImageAlt: `${name} kombi servisi — Kayahan Isı teknisyeni`,
      introLabel: `${name.toLocaleUpperCase("tr")} VE KAYAHAN`,
      introHeading: c.heading,
      body: c.body,
      servicesLabel: `${name.toLocaleUpperCase("tr")} HİZMETLERİMİZ`,
      servicesHeading: "Garanti dışı her ihtiyaç için.",
      services: BRAND_SERVICES_TR,
      faqLabel: "SIK SORULAN SORULAR",
      faqHeading: `${name} servisi hakkında.`,
      faq: [...c.faq, ...COMMON_FAQ_TR.slice(0, 2), COMMON_FAQ_TR[3]],
      ...AREAS_TR,
      ctaHeading: `${name} kombiniz için servis talebi oluşturun.`,
    };
  }
  return {
    heroEyebrow: `${name.toUpperCase()} BOILER SERVICE · INDEPENDENT`,
    heroTitle: `${name} boiler service.`,
    heroAccent: "Repair, maintenance, genuine parts, installation.",
    heroLead: c.lead,
    heroImage: "/gallery/kombi-servisi-teknisyen-2.webp",
    heroImageAlt: `${name} boiler service — Kayahan Isı technician`,
    introLabel: `${name.toUpperCase()} AND KAYAHAN`,
    introHeading: c.heading,
    body: c.body,
    servicesLabel: `OUR ${name.toUpperCase()} SERVICES`,
    servicesHeading: "For every out-of-warranty need.",
    services: BRAND_SERVICES_EN,
    faqLabel: "FAQ",
    faqHeading: `About ${name} service.`,
    faq: [...c.faq, ...COMMON_FAQ_EN.slice(0, 2), COMMON_FAQ_EN[3]],
    ...AREAS_EN,
    ctaHeading: `Book a service visit for your ${name} boiler.`,
  };
}

export const brandDefaults = Object.fromEntries(BRAND_KINDS.map((k) => [k, brandLanding(k, "tr")])) as Record<BrandKind, ServiceLanding>;
export const brandDefaultsEn = Object.fromEntries(BRAND_KINDS.map((k) => [k, brandLanding(k, "en")])) as Record<BrandKind, ServiceLanding>;
