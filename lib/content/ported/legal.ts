import { z } from "zod";

/**
 * Legal pages (cookie policy, KVKK notice, privacy, terms). One shape: a
 * title, an "last updated" line and a Markdown body — editable in the panel,
 * rendered with the blog Markdown renderer.
 *
 * DRAFTS: the texts below are templates filled with the company's registered
 * details. They must be reviewed by the company's legal advisor before
 * publishing; sections marked [gözden geçirin] need a decision.
 */
const s = z.string().trim();

export const legalSchema = z.object({
  title: s.max(160),
  updated: s.max(60),
  intro: s.max(600),
  body: s.max(40_000),
});
export type LegalPage = z.infer<typeof legalSchema>;

export type LegalKind = "cerez-politikasi" | "kvkk-aydinlatma-metni" | "gizlilik-politikasi" | "kullanim-kosullari";
export const LEGAL_KINDS: LegalKind[] = ["cerez-politikasi", "kvkk-aydinlatma-metni", "gizlilik-politikasi", "kullanim-kosullari"];

export const LEGAL_LABEL: Record<LegalKind, { tr: string; en: string }> = {
  "cerez-politikasi": { tr: "Çerez Politikası", en: "Cookie Policy" },
  "kvkk-aydinlatma-metni": { tr: "KVKK Aydınlatma Metni", en: "Personal Data Protection Notice (KVKK)" },
  "gizlilik-politikasi": { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  "kullanim-kosullari": { tr: "Kullanım Koşulları", en: "Terms of Use" },
};
export const LEGAL_ROUTE = (k: LegalKind) => `/tr/${k}`;

const COMPANY = "Kayahan Isıtma Sistemleri Teknik Bakım Onarım İnş. San. Tic. Ltd. Şti.";
const ADDRESS = "Fevzi Çakmak Cd. No: 13/1, 34180 Bahçelievler / İstanbul";
const EMAIL = "info@kayahanisi.com";
const PHONE = "+90 212 441 88 88";
const SITE = "www.kayahanisi.com";
const UPDATED_TR = "Son güncelleme: Eylül 2026";
const UPDATED_EN = "Last updated: September 2026";

export const legalDefaults: Record<LegalKind, LegalPage> = {
  "cerez-politikasi": {
    title: "Çerez Politikası",
    updated: UPDATED_TR,
    intro: `${SITE} adresli web sitemizde kullanılan çerezler, amaçları ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.`,
    body: `# Çerez nedir?

Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Siteyi çalıştırmak, tercihlerinizi hatırlamak ve sitenin nasıl kullanıldığını anlamak için kullanılır.

# Hangi çerezleri kullanıyoruz?

## Zorunlu çerezler (her zaman açık)

Sitenin temel işlevleri için gereklidir; kapatılamaz.

- **kh_consent** — Çerez tercihlerinizi saklar. Süre: 6 ay.
- **kh_session** — Yalnızca yönetim paneline giriş yapan yetkili kullanıcılar için oturum çerezi. Süre: oturum.
- **NEXT_LOCALE** — Dil tercihinizi (TR/EN) hatırlar. Süre: 1 yıl.
- **Cloudflare Turnstile (cf_*)** — İletişim ve teklif formlarını otomatik gönderimlere (bot) karşı korur. Süre: oturum / kısa süreli.

## Analitik çerezler (onayınızla)

Sitenin nasıl kullanıldığını anlamamıza yardımcı olur; kimliğinizi belirlemez.

- **_ga, _ga_\\*** — Google Analytics 4. Ziyaret edilen sayfalar, oturum süresi ve cihaz türü gibi toplu istatistikler. IP adresi anonimleştirilir. Süre: 2 yıl.

Analitik çerezler yalnızca siz **“Tümünü kabul et”** seçeneğini ya da tercih penceresinde analitik kategorisini açtığınızda çalışır. Onay vermeden önce hiçbir analitik çerez yerleştirilmez (Google Consent Mode).

# Tercihlerinizi nasıl yönetirsiniz?

- Sayfanın altındaki **“Çerez Tercihleri”** bağlantısından kararınızı istediğiniz zaman değiştirebilirsiniz.
- Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz; zorunlu çerezlerin engellenmesi bazı işlevlerin (dil seçimi, formlar) çalışmamasına yol açabilir.

# Üçüncü taraflar

Google Analytics (Google Ireland Ltd.) ve Cloudflare Turnstile (Cloudflare, Inc.) hizmetleri, kendi gizlilik politikalarına tabidir. Bu hizmetlerin veri işleme şartları için ilgili sağlayıcıların politikalarına bakınız.

# İletişim

Çerezler hakkında sorularınız için: **${EMAIL}** · ${PHONE}

Veri sorumlusu: **${COMPANY}**, ${ADDRESS}. Kişisel verilerinizin işlenmesine ilişkin ayrıntılar için [KVKK Aydınlatma Metni](/tr/kvkk-aydinlatma-metni) sayfasına bakınız.`,
  },
  "kvkk-aydinlatma-metni": {
    title: "Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni",
    updated: UPDATED_TR,
    intro: "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca veri sorumlusu sıfatıyla yaptığımız bilgilendirme.",
    body: `# Veri sorumlusu

**${COMPANY}**
${ADDRESS}
E-posta: ${EMAIL} · Telefon: ${PHONE}

# Hangi kişisel verilerinizi işliyoruz?

- **Kimlik ve iletişim bilgileri:** ad-soyad, telefon, e-posta, firma adı (iletişim ve teklif formları, telefon/WhatsApp görüşmeleri)
- **Hizmet bilgileri:** cihaz marka/modeli, adres, arıza açıklaması, proje türü ve konumu, talep mesajınız
- **İşlem güvenliği bilgileri:** IP adresi, tarayıcı bilgisi, form gönderim zamanı (bot koruması ve güvenlik kayıtları)
- **Kullanım verileri (onayınızla):** ziyaret edilen sayfalar, oturum süresi (analitik çerezler — bkz. [Çerez Politikası](/tr/cerez-politikasi))

# İşleme amaçlarımız

- Servis, bakım, montaj ve keşif taleplerinizi almak, planlamak ve yerine getirmek
- Teklif hazırlamak ve sizinle iletişim kurmak
- Yasal yükümlülüklerimizi (fatura, garanti, servis kaydı, muhasebe) yerine getirmek
- Web sitemizin güvenliğini sağlamak ve kötüye kullanımı önlemek
- Onay vermeniz hâlinde web sitemizin kullanımını analiz ederek hizmetlerimizi geliştirmek

# Hukuki sebepler

KVKK md. 5/2 kapsamında: **(c)** sözleşmenin kurulması veya ifası, **(ç)** hukuki yükümlülüğümüzün yerine getirilmesi, **(f)** meşru menfaatimiz (güvenlik, iletişim); analitik çerezler için ise KVKK md. 5/1 kapsamında **açık rızanız**.

# Verilerinizi kimlere aktarıyoruz?

- Servis planlaması için sahadaki teknisyen ekibimize
- Yasal zorunluluk hâlinde yetkili kamu kurum ve kuruluşlarına
- Hizmet aldığımız tedarikçilere, yalnızca hizmetin gerektirdiği ölçüde: web barındırma ve form altyapısı (Vercel Inc., Turso), bot koruması (Cloudflare Inc.), e-posta hizmeti, onayınız varsa analitik (Google Ireland Ltd.). Bu sağlayıcıların sunucuları yurt dışında bulunabilir; aktarım KVKK md. 9'a uygun olarak yapılır. [gözden geçirin]

# Toplama yöntemi

Kişisel verileriniz web sitemizdeki formlar, e-posta, telefon, WhatsApp ve yüz yüze servis görüşmeleri aracılığıyla, otomatik ve otomatik olmayan yollarla toplanır.

# Saklama süresi

Servis ve teklif kayıtları, ilgili mevzuatın öngördüğü süreler boyunca (ticari defter ve fatura kayıtları için 10 yıl, tüketici işlemleri için 3 yıl zamanaşımı) saklanır; süre sonunda silinir, yok edilir veya anonim hâle getirilir. Web sitesi güvenlik kayıtları en fazla 2 yıl tutulur. [gözden geçirin]

# KVKK md. 11 kapsamındaki haklarınız

- Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme
- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
- Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
- Eksik veya yanlış işlenmişse düzeltilmesini isteme
- KVKK md. 7 şartları çerçevesinde silinmesini veya yok edilmesini isteme
- Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme
- Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme
- Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme

# Başvuru

Haklarınıza ilişkin taleplerinizi, kimliğinizi tespit edici belgelerle birlikte **${ADDRESS}** adresine yazılı olarak veya **${EMAIL}** adresine e-posta ile iletebilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.`,
  },
  "gizlilik-politikasi": {
    title: "Gizlilik Politikası",
    updated: UPDATED_TR,
    intro: `${SITE} web sitesini ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda gizliliğinizi nasıl koruduğumuz.`,
    body: `# Kapsam

Bu politika, ${COMPANY} tarafından işletilen ${SITE} web sitesi ve sunduğumuz kombi, klima, şofben servisi ile mekanik tesisat hizmetleri kapsamında topladığımız bilgileri kapsar. Kişisel verilerinizin işlenmesine ilişkin yasal bilgilendirme [KVKK Aydınlatma Metni](/tr/kvkk-aydinlatma-metni) sayfasındadır.

# Topladığımız bilgiler

- **Sizin verdikleriniz:** İletişim ve teklif formlarında girdiğiniz ad, telefon, e-posta, firma, adres ve mesaj bilgileri; telefon veya WhatsApp üzerinden paylaştığınız servis bilgileri.
- **Otomatik toplananlar:** Sunucu günlükleri (IP adresi, tarih/saat, istenen sayfa), form güvenliği için bot koruma verileri ve — yalnızca onayınızla — analitik çerezler. Ayrıntılar için [Çerez Politikası](/tr/cerez-politikasi).

# Bilgileri nasıl kullanıyoruz?

Taleplerinize yanıt vermek, servis randevusu ve teklif oluşturmak, hizmet sonrası iletişim kurmak, yasal kayıtları tutmak ve sitemizi güvenli ve verimli çalıştırmak için.

# Bilgilerinizi satmıyoruz

Kişisel bilgilerinizi üçüncü taraflara satmıyor, kiralamıyor ve pazarlama amacıyla paylaşmıyoruz. Yalnızca hizmeti sunmak için gerekli tedarikçilerimizle (barındırma, güvenlik, e-posta) ve yasal zorunluluk hâlinde yetkili kurumlarla paylaşırız.

# Güvenlik

Web sitemiz HTTPS ile şifrelenir; formlar bot koruması ile korunur; yönetim paneline erişim yetkili kullanıcılarla sınırlıdır ve parola ile korunur. Hiçbir internet aktarımı %100 güvenli değildir; makul teknik ve idari tedbirleri uygularız.

# Üçüncü taraf bağlantıları

Sitemizde üçüncü taraf sitelere (marka siteleri, sosyal medya, WhatsApp) bağlantılar bulunabilir. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz.

# Çocuklar

Web sitemiz 18 yaş altındaki kişilere yönelik değildir ve bilerek çocuklardan kişisel veri toplamayız.

# Değişiklikler

Bu politika güncellenebilir; güncel sürüm her zaman bu sayfada yayınlanır ve üstteki “son güncelleme” tarihiyle belirtilir.

# İletişim

Sorularınız için: **${EMAIL}** · ${PHONE} · ${ADDRESS}`,
  },
  "kullanim-kosullari": {
    title: "Kullanım Koşulları",
    updated: UPDATED_TR,
    intro: `${SITE} web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.`,
    body: `# Site sahibi

Bu web sitesi **${COMPANY}** (“Kayahan Isı”) tarafından işletilmektedir. Adres: ${ADDRESS}. E-posta: ${EMAIL}.

# İçeriğin niteliği

Sitedeki teknik yazılar, arıza kodu açıklamaları ve bakım önerileri genel bilgilendirme amaçlıdır; cihazınıza özgü bir teşhis veya talimat niteliği taşımaz. Gaz yakan cihazlara müdahale yetkili teknisyen gerektirir; **gaz kokusu hâlinde vanayı kapatın, ortamı havalandırın ve servisi arayın**. Yazılardaki bilgilere dayanarak yapılan müdahalelerden doğan zararlardan Kayahan Isı sorumlu tutulamaz.

# Teklif ve fiyat bilgileri

Sitede yer alan bilgiler bağlayıcı bir teklif değildir. Servis ücreti, parça bedeli ve montaj kapsamı yerinde tespit sonrasında yazılı olarak bildirilir ve onayınızla kesinleşir.

# Fikri mülkiyet

Sitedeki metinler, görseller, illüstrasyonlar ve yazılım Kayahan Isı'ya aittir; kaynak gösterilerek alıntı yapılabilir, ticari amaçla kopyalanamaz. Sitede adı geçen üretici markaları (DemirDöküm, Vaillant, Baymak, Protherm ve diğerleri) ilgili sahiplerinin tescilli markalarıdır; yalnızca servis verdiğimiz cihazları tanımlamak amacıyla kullanılmıştır. Kayahan Isı, aksi açıkça belirtilmedikçe bu markaların yetkili servisi değildir.

# Formlar ve iletişim

İletişim ve teklif formlarını doldururken doğru bilgi vermeyi kabul edersiniz. Otomatik gönderimler, spam ve kötüye kullanım engellenir; bu tür girişimlerden doğan zararlar için hukuki yollara başvurma hakkımız saklıdır.

# Sorumluluğun sınırı

Siteye kesintisiz ve hatasız erişim garanti edilmez. Sitenin kullanımından, üçüncü taraf bağlantılardan veya içerikteki olası hatalardan doğan dolaylı zararlardan Kayahan Isı sorumlu değildir.

# Uygulanacak hukuk

Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir; uyuşmazlıklarda İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir. Tüketicilerin, Tüketici Hakem Heyetleri ve Tüketici Mahkemelerine başvuru hakları saklıdır. [gözden geçirin]

# Değişiklikler

Koşullar önceden bildirilmeksizin güncellenebilir; güncel sürüm bu sayfada yayınlanır.`,
  },
};

export const legalDefaultsEn: Record<LegalKind, LegalPage> = {
  "cerez-politikasi": {
    title: "Cookie Policy",
    updated: UPDATED_EN,
    intro: `Which cookies ${SITE} uses, why, and how to manage your preferences.`,
    body: `# What is a cookie?

Small text files placed in your browser by websites you visit, used to run the site, remember your preferences and understand how the site is used.

# Cookies we use

## Necessary (always on)

- **kh_consent** — stores your cookie choice. 6 months.
- **kh_session** — admin login session for authorised staff only. Session.
- **NEXT_LOCALE** — remembers your language (TR/EN). 1 year.
- **Cloudflare Turnstile (cf_*)** — protects the contact and quote forms from bots. Session / short-lived.

## Analytics (with your consent)

- **_ga, _ga_\\*** — Google Analytics 4: aggregated statistics such as pages visited, session length and device type; IP anonymised. 2 years.

Analytics cookies run only after you choose **“Accept all”** or enable the analytics category. Nothing is set before consent (Google Consent Mode).

# Managing preferences

Use the **“Cookie Preferences”** link in the footer at any time, or your browser settings. Blocking necessary cookies may break language selection and forms.

# Third parties

Google Analytics (Google Ireland Ltd.) and Cloudflare Turnstile (Cloudflare, Inc.) are subject to their own privacy policies.

# Contact

**${EMAIL}** · ${PHONE}. Data controller: **${COMPANY}**, ${ADDRESS}. See the [Personal Data Protection Notice](/en/kvkk-aydinlatma-metni).`,
  },
  "kvkk-aydinlatma-metni": {
    title: "Personal Data Protection Notice (KVKK)",
    updated: UPDATED_EN,
    intro: "Information provided as data controller under Article 10 of Turkey's Personal Data Protection Law No. 6698 (KVKK).",
    body: `# Data controller

**${COMPANY}** — ${ADDRESS} · ${EMAIL} · ${PHONE}

# Data we process

- **Identity and contact:** name, phone, e-mail, company (contact/quote forms, phone and WhatsApp)
- **Service details:** appliance brand/model, address, fault description, project type and location, your message
- **Security data:** IP address, browser information, submission time (bot protection, security logs)
- **Usage data (with consent):** pages visited, session length (analytics cookies — see the [Cookie Policy](/en/cerez-politikasi))

# Purposes

Receiving, planning and delivering service, maintenance and installation requests; preparing quotes and communicating with you; meeting legal obligations (invoicing, warranty, service records, accounting); keeping the website secure; and, with your consent, analysing site usage to improve our services.

# Legal bases

KVKK Art. 5/2 (c) performance of a contract, (ç) legal obligation, (f) legitimate interest (security, communication); for analytics cookies, your explicit consent under Art. 5/1.

# Recipients

Our field technicians for scheduling; public authorities where legally required; service providers strictly as needed — hosting and form infrastructure (Vercel Inc., Turso), bot protection (Cloudflare Inc.), e-mail, and, with consent, analytics (Google Ireland Ltd.). Providers' servers may be located abroad; transfers are made in line with KVKK Art. 9. [review]

# Retention

Service and quote records are kept for the periods required by law (10 years for commercial books and invoices, 3 years for consumer transactions) and then deleted, destroyed or anonymised. Website security logs are kept for up to 2 years. [review]

# Your rights (KVKK Art. 11)

To learn whether your data is processed and request information; to learn the purpose and whether it is used accordingly; to know recipients in Turkey or abroad; to request correction, deletion or destruction; to have these notified to recipients; to object to results produced solely by automated analysis; and to claim compensation for damage caused by unlawful processing.

# Applications

Submit requests with proof of identity in writing to **${ADDRESS}** or by e-mail to **${EMAIL}**. Requests are answered free of charge within 30 days.`,
  },
  "gizlilik-politikasi": {
    title: "Privacy Policy",
    updated: UPDATED_EN,
    intro: `How we protect your privacy when you visit ${SITE} and use our services.`,
    body: `# Scope

This policy covers ${SITE}, operated by ${COMPANY}, and our boiler, AC, water-heater and mechanical-installation services. The statutory notice on personal data is the [KVKK Notice](/en/kvkk-aydinlatma-metni).

# Information we collect

- **Provided by you:** name, phone, e-mail, company, address and message in the contact and quote forms; service details shared by phone or WhatsApp.
- **Collected automatically:** server logs (IP, time, requested page), bot-protection data for forms and — only with consent — analytics cookies. See the [Cookie Policy](/en/cerez-politikasi).

# How we use it

To answer requests, schedule service and prepare quotes, follow up after service, keep legal records, and run the site securely and efficiently.

# We do not sell your data

We do not sell, rent or share personal information for marketing. We share it only with providers needed to deliver the service (hosting, security, e-mail) and with authorities where legally required.

# Security

HTTPS encryption, bot protection on forms, password-protected admin access limited to authorised staff. No internet transmission is 100% secure; we apply reasonable technical and organisational measures.

# Third-party links, children, changes

We are not responsible for third-party sites we link to. The site is not aimed at people under 18. This policy may be updated; the current version is always published here.

# Contact

**${EMAIL}** · ${PHONE} · ${ADDRESS}`,
  },
  "kullanim-kosullari": {
    title: "Terms of Use",
    updated: UPDATED_EN,
    intro: `By using ${SITE} you accept the terms below.`,
    body: `# Site owner

This website is operated by **${COMPANY}** (“Kayahan Isı”), ${ADDRESS}, ${EMAIL}.

# Nature of the content

Technical articles, error-code explanations and maintenance tips are general information, not a diagnosis or instruction for your specific appliance. Gas appliances must be handled by certified technicians; **if you smell gas, close the valve, ventilate and call service**. Kayahan Isı is not liable for damage arising from actions taken on the basis of the articles.

# Quotes and prices

Nothing on the site is a binding offer. Service fees, part prices and installation scope are stated in writing after an on-site assessment and become final with your approval.

# Intellectual property

Texts, images, illustrations and software belong to Kayahan Isı; quoting with attribution is allowed, commercial copying is not. Manufacturer brands named on the site (DemirDöküm, Vaillant, Baymak, Protherm and others) are registered trademarks of their owners, used solely to identify the appliances we service. Unless expressly stated, Kayahan Isı is not an authorised service of these brands.

# Forms and contact

You agree to provide accurate information. Automated submissions, spam and abuse are blocked; we reserve the right to pursue legal remedies for resulting damage.

# Limitation of liability

Uninterrupted, error-free access is not guaranteed. Kayahan Isı is not liable for indirect damage arising from use of the site, third-party links or possible errors in content.

# Governing law

These terms are governed by the laws of the Republic of Turkey; Istanbul (Çağlayan) courts and enforcement offices have jurisdiction, without prejudice to consumers' rights before Consumer Arbitration Committees and Consumer Courts. [review]

# Changes

Terms may be updated without notice; the current version is published here.`,
  },
};
