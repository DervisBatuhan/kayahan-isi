import { z } from "zod";

export type KnowledgeKind = "blog" | "faq" | "reviews";

const s = z.string().trim();

const cardItem = z.object({ title: s.max(160), text: s.max(400) });

/** Blog / FAQ / Müşteri Yorumları share one shape: a hero, a sliding card
 *  row (post/question/review — title + short text, no image), and a
 *  fallback "coming soon" message shown only while `items` is empty. */
export const knowledgeSchema = z.object({
  heroIndex: s.max(80),
  heroTitleTop: s.max(160),
  heroTitleAccent: s.max(160),
  heroLead: s.max(600),
  contentEyebrow: s.max(80),
  emptyHeading: s.max(160),
  emptyBody: s.max(400),
  items: z.array(cardItem).min(0).max(24),
});

export const knowledgeSchemas: Record<KnowledgeKind, z.ZodType> = {
  blog: knowledgeSchema,
  faq: knowledgeSchema,
  reviews: knowledgeSchema,
};

export const KNOWLEDGE_KIND_LABEL: Record<KnowledgeKind, string> = {
  blog: "Blog",
  faq: "Sıkça Sorulan Sorular",
  reviews: "Müşteri Yorumları",
};

export const KNOWLEDGE_ROUTE: Record<KnowledgeKind, string> = {
  blog: "/tr/blog",
  faq: "/tr/sikca-sorulan-sorular",
  reviews: "/tr/musteri-yorumlari",
};

const PLACEHOLDER_TEXT_TR = "İçerik metni burada yer alacak.";
const PLACEHOLDER_TEXT_EN = "Content text will appear here.";
const PLACEHOLDER_REVIEW_TR = "Bu alanda onaylı müşteri yorumu yer alacak. Gerçek yorumlar panelden eklendiğinde bu örnek kart kaldırılır.";
const PLACEHOLDER_REVIEW_EN = "An approved customer review will appear here. This sample card is removed once real reviews are added from the panel.";

/** Six numbered placeholder cards — generic, not fabricated content — until
 *  real posts/questions/reviews are added from the panel. */
function sixDummyCards(labelTr: string): { title: string; text: string }[] {
  return Array.from({ length: 6 }, (_, i) => ({
    title: `${labelTr} ${String(i + 1).padStart(2, "0")}`,
    text: PLACEHOLDER_TEXT_TR,
  }));
}
function sixDummyCardsEn(labelEn: string): { title: string; text: string }[] {
  return Array.from({ length: 6 }, (_, i) => ({
    title: `${labelEn} ${String(i + 1).padStart(2, "0")}`,
    text: PLACEHOLDER_TEXT_EN,
  }));
}

/** True for the seeded placeholder cards — they must never reach structured data. */
export function isPlaceholderCard(card: { title?: unknown; text?: unknown }): boolean {
  const text = typeof card.text === "string" ? card.text.trim() : "";
  return (
    !text ||
    text === PLACEHOLDER_TEXT_TR ||
    text === PLACEHOLDER_TEXT_EN ||
    text === PLACEHOLDER_REVIEW_TR ||
    text === PLACEHOLDER_REVIEW_EN
  );
}

/** Real (non-placeholder) cards from a knowledge page's `items`. */
export function realCards(items: unknown): { title: string; text: string }[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((x): x is { title: string; text: string } =>
      !!x && typeof x === "object" && typeof (x as { title?: unknown }).title === "string" && typeof (x as { text?: unknown }).text === "string",
    )
    .filter((x) => !isPlaceholderCard(x));
}

export const knowledgeDefaults: Record<KnowledgeKind, Record<string, unknown>> = {
  blog: {
    heroIndex: "BİLGİ MERKEZİ",
    heroTitleTop: "Bilgiyi paylaşır.",
    heroTitleAccent: "Geleceği geliştiririz.",
    heroLead:
      "Sahadan gelen teknik deneyimi, güncel teknolojileri ve mühendislik bakış açısını bir araya getiriyoruz.",
    contentEyebrow: "YAYIN AKIŞI",
    emptyHeading: "Yeni içerikler hazırlanıyor.",
    emptyBody: "Uzmanlık yazılarımız ve teknik rehberlerimiz yakında burada yayınlanacak.",
    items: sixDummyCards("Yazı"),
  },
  faq: {
    heroIndex: "SIKÇA SORULAN SORULAR",
    heroTitleTop: "Sorular netleşir.",
    heroTitleAccent: "Çözümler kolaylaşır.",
    heroLead:
      "Proje, uygulama ve hizmet süreçlerine ilişkin merak edilenleri tek yerde topluyoruz.",
    contentEyebrow: "SORU KÜTÜPHANESİ",
    emptyHeading: "Yanıtlar hazırlanıyor.",
    emptyBody:
      "Sık sorulan sorular, uzman ekibimizin onayladığı yanıtlarla bu alanda yayınlanacak.",
    items: [
      { title: "Kombi bakımı ne zaman yaptırılmalı?", text: "En doğru zaman ısıtma sezonu başlamadan önce, eylül–ekim aylarıdır. Yılda bir kez aksatılmaması önemlidir; bakımlı kombi daha az gaz yakar, daha az arıza yapar ve üretici garantisi çoğu markada bakım şartına bağlıdır." },
      { title: "Hangi ilçelere hizmet veriyorsunuz?", text: "İstanbul Avrupa Yakası'nda Bahçelievler, Bağcılar, Bakırköy, Güngören, Zeytinburnu, Esenler, Bayrampaşa ve Küçükçekmece ilçelerinin tamamına aynı gün servis veriyoruz. Komşu ilçeler için lütfen arayın." },
      { title: "Hangi markalara servis veriyorsunuz?", text: "DemirDöküm, Vaillant, Baymak, Protherm, Bosch, Buderus, E.C.A., Airfel, Ferroli, Viessmann başta olmak üzere tüm kombi, klima ve şofben markalarına. 45 yıl DemirDöküm ve Vaillant yetkili servisi olarak çalıştık; bugün bağımsız servisiz." },
      { title: "Yetkili servis misiniz?", text: "Hayır. Uzun yıllar DemirDöküm ve Vaillant yetkili servisi olarak çalıştık; bugün tüm markalara hizmet veren bağımsız bir teknik servisiz. Garanti kapsamındaki cihazlar için üreticinin yetkili servisine başvurmanız gerekir; garanti dışı tüm işlemleri yapıyoruz." },
      { title: "Servis ücreti nasıl belirleniyor?", text: "Arıza tespiti sonrası yapılacak işlem ve gerekiyorsa parça bedeli, işe başlamadan önce net olarak bildirilir. Onayınız olmadan işlem yapılmaz; taktığımız parçalar orijinaldir ve yazılı garantilidir." },
      { title: "Kombim basınç düşürüyor, ne yapmalıyım?", text: "Basınç 1–1,5 bar aralığında olmalıdır. Su doldurup resetleyebilirsiniz; sık tekrarlıyorsa genleşme tankında ya da tesisatta kaçak vardır. Sürekli su basmak kireçlenmeyi artırır, kaynağın tespiti için servis çağırın." },
      { title: "Klima gazı ne zaman doldurulur?", text: "Sızdırmaz bir klimada gaz azalmaz; azalıyorsa kaçak vardır. Doğru işlem kaçağın azot testiyle bulunup giderilmesi, sistemin vakumlanması ve etiketteki miktarda tartılı dolum yapılmasıdır. Her yıl gaz basmak bir bakım rutini değildir." },
      { title: "Petek ısınmıyor, sorun kombide mi?", text: "Çoğunlukla hayır. Peteğin üstü sıcak altı soğuksa tesisatta tortu vardır ve makineyle tesisat temizliği gerekir; üstü soğuk altı sıcaksa petekte hava vardır ve pürjörden alınır. Teknisyenimiz tek ziyarette kombiyi ve tesisatı birlikte kontrol eder." },
      { title: "Bacalı şofbenim banyoda, güvenli mi?", text: "Bacalı şofbenler banyo ve yatak odasına takılamaz; karbonmonoksit riski taşır. Hermetik (kapalı yanma odalı) modele geçiş hem güvenlik hem verim için önerimizdir; keşifte baca ve havalandırma uygunluğu kontrol edilir." },
      { title: "Gece veya hafta sonu arıza olursa ne yapmalıyım?", text: "Telefon ve WhatsApp hattımız 7/24 açıktır; bölgenizdeki teknisyen yönlendirilir. Gaz kokusu alırsanız önce vanayı kapatın, pencereleri açın, elektrik anahtarına dokunmayın ve dışarıdan arayın." },
      { title: "Site veya işletme için bakım anlaşması yapıyor musunuz?", text: "Evet. Site yönetimleri, ofisler ve mağazalar için sezon öncesi planlı bakım takvimi, sabit fiyat, tek rapor ve öncelikli arıza hattı içeren yıllık sözleşmeler yapıyoruz." },
      { title: "Teknisyenleriniz belgeli mi?", text: "Evet. Ekibimiz MYK Mesleki Yeterlilik ve MEB belgeli teknisyenlerden oluşur; yeni teknisyenler kurucumuz İlhan Kaya'nın eğitmenlik yaptığı AB destekli meslek kurslarından yetişir." },
    ],
  },
  reviews: {
    heroIndex: "MÜŞTERİ YORUMLARI",
    heroTitleTop: "Deneyim konuşur.",
    heroTitleAccent: "Güven kalır.",
    heroLead:
      "Birlikte tamamladığımız projelerin gerçek deneyimlerini şeffaf ve yalın biçimde paylaşacağız.",
    contentEyebrow: "MÜŞTERİ DENEYİMLERİ",
    emptyHeading: "Gerçek hikâyeler yakında.",
    emptyBody: "Onaylı müşteri görüşleri, proje bilgileriyle birlikte bu alanda yer alacak.",
    items: [
      { title: "Örnek yorum — Kombi bakımı, Bahçelievler", text: "Bu alanda onaylı müşteri yorumu yer alacak. Gerçek yorumlar panelden eklendiğinde bu örnek kart kaldırılır." },
      { title: "Örnek yorum — Klima montajı, Bakırköy", text: "Bu alanda onaylı müşteri yorumu yer alacak. Gerçek yorumlar panelden eklendiğinde bu örnek kart kaldırılır." },
      { title: "Örnek yorum — Şofben arızası, Bağcılar", text: "Bu alanda onaylı müşteri yorumu yer alacak. Gerçek yorumlar panelden eklendiğinde bu örnek kart kaldırılır." },
      { title: "Örnek yorum — Site bakım anlaşması, Küçükçekmece", text: "Bu alanda onaylı müşteri yorumu yer alacak. Gerçek yorumlar panelden eklendiğinde bu örnek kart kaldırılır." },
    ],
  },
};

export const knowledgeDefaultsEn: Record<KnowledgeKind, Record<string, unknown>> = {
  blog: {
    heroIndex: "KNOWLEDGE HUB",
    heroTitleTop: "Sharing knowledge.",
    heroTitleAccent: "Advancing the future.",
    heroLead:
      "We bring together field expertise, current technologies and an engineering perspective.",
    contentEyebrow: "EDITORIAL",
    emptyHeading: "New content is being prepared.",
    emptyBody: "Our expert articles and technical guides will be published here soon.",
    items: sixDummyCardsEn("Article"),
  },
  faq: {
    heroIndex: "FREQUENTLY ASKED QUESTIONS",
    heroTitleTop: "Questions clarified.",
    heroTitleAccent: "Solutions simplified.",
    heroLead:
      "We bring together common questions about projects, implementation and services in one place.",
    contentEyebrow: "QUESTION LIBRARY",
    emptyHeading: "Answers are being prepared.",
    emptyBody:
      "Frequently asked questions will be published here with answers approved by our expert team.",
    items: [
      { title: "When should the boiler be serviced?", text: "Ideally before the heating season, in September–October, and once every year. A maintained boiler burns less gas, fails less, and most manufacturer warranties require annual service." },
      { title: "Which districts do you cover?", text: "Same-day service across Bahçelievler, Bağcılar, Bakırköy, Güngören, Zeytinburnu, Esenler, Bayrampaşa and Küçükçekmece on Istanbul's European side. Call us for neighbouring districts." },
      { title: "Which brands do you service?", text: "Every boiler, AC and water-heater brand — DemirDöküm, Vaillant, Baymak, Protherm, Bosch, Buderus, E.C.A., Airfel, Ferroli, Viessmann and more. We spent 45 years as DemirDöküm and Vaillant authorised service; today we are independent." },
      { title: "Are you an authorised service?", text: "No. We were DemirDöküm and Vaillant authorised service for many years; today we are an independent technical service for every brand. In-warranty work goes to the manufacturer's authorised service; we handle everything out of warranty." },
      { title: "How is the service fee set?", text: "After diagnosis, the work and any part cost are quoted clearly before we start. Nothing is done without your approval; parts are genuine and covered by a written guarantee." },
      { title: "My boiler keeps losing pressure — what now?", text: "Pressure should sit at 1–1.5 bar. Top up and reset; if it keeps dropping there is a leak in the expansion vessel or pipework. Constant topping-up increases scaling, so book a visit." },
      { title: "When does an AC need refrigerant?", text: "A sealed system never loses refrigerant; if it is low there is a leak. The right job is a nitrogen leak test, repair, vacuum and a weighed charge to the label amount. Yearly 'top-ups' are not maintenance." },
      { title: "Radiators are cold — is it the boiler?", text: "Usually not. Hot top and cold bottom means sludge in the system (power-flush); cold top and hot bottom means air (bleed). Our technician checks boiler and system together in one visit." },
      { title: "My open-flue water heater is in the bathroom — is that safe?", text: "Open-flue units may not be installed in bathrooms or bedrooms; they carry a carbon-monoxide risk. Switching to a room-sealed model is our recommendation; flue and ventilation are checked on site." },
      { title: "What if a fault happens at night or on the weekend?", text: "Our phone and WhatsApp line is open 24/7 and the nearest technician is dispatched. If you smell gas: close the valve, open windows, do not touch switches, call from outside." },
      { title: "Do you offer maintenance contracts?", text: "Yes — annual contracts for site managements, offices and shops with a pre-season calendar, fixed price, single report and priority fault line." },
      { title: "Are your technicians certified?", text: "Yes. The team holds MYK vocational-qualification and Ministry of Education certificates; new technicians come through the EU-funded vocational course our founder İlhan Kaya teaches." },
    ],
  },
  reviews: {
    heroIndex: "CLIENT STORIES",
    heroTitleTop: "Experience speaks.",
    heroTitleAccent: "Trust remains.",
    heroLead:
      "We will share authentic experiences from completed projects with clarity and transparency.",
    contentEyebrow: "CLIENT EXPERIENCES",
    emptyHeading: "Authentic stories coming soon.",
    emptyBody: "Approved client feedback will appear here alongside project details.",
    items: [
      { title: "Sample review — Boiler maintenance, Bahçelievler", text: "An approved customer review will appear here. This sample card is removed once real reviews are added from the panel." },
      { title: "Sample review — AC installation, Bakırköy", text: "An approved customer review will appear here. This sample card is removed once real reviews are added from the panel." },
      { title: "Sample review — Water-heater fault, Bağcılar", text: "An approved customer review will appear here. This sample card is removed once real reviews are added from the panel." },
      { title: "Sample review — Site maintenance contract, Küçükçekmece", text: "An approved customer review will appear here. This sample card is removed once real reviews are added from the panel." },
    ],
  },
};
