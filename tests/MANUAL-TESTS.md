# Kayahan Isı — Manuel Test Kılavuzu

Bu tur eklenen değişiklikler için elle doğrulama adımları. Otomatik testler
(`npm test`) yalnızca saf modülleri kapsar; aşağıdaki senaryolar DB, redirect ve
görsel render gibi uçtan uca davranışları doğrular.

## 0. Hazırlık

- [ ] `rm -rf .next && npm run dev`
      (Prisma modeli `Lead` bu turda genişledi; migration sonrası `.next`
      içindeki Prisma client cache'i bayat kalabiliyor, bu yüzden `.next`
      silinmeden dev sunucu açılmamalı.)
- [ ] Tarayıcı konsolunda ve terminalde hata/uyarı olmadığını kontrol et.
- [ ] Admin paneline giriş yap (`/admin/login`) — sonraki panel adımları için gerekli.

---

## 1. Talep formları (public)

### 1.1 Teklif Al — `/tr/teklif-al`

- [ ] Formu boş bırakıp gönder → sayfa yenilenmeden alan altı (inline) hata
      mesajları çıkıyor: ad, e-posta, telefon, proje türü, mesaj.
- [ ] Geçersiz e-posta (`abc`) yaz, diğer alanları doldur → "Geçerli bir e-posta
      adresi girin." hatası.
- [ ] Mesaj alanına 10 karakterden kısa bir şey yaz → "Lütfen en az 10
      karakterlik bir açıklama yazın." hatası.
- [ ] Telefonu boş bırak (teklifte zorunlu) → "Geçerli bir telefon numarası
      girin." hatası.
- [ ] Proje türünü seçmeden gönder → "Proje türünü seçin." hatası.
- [ ] Tüm alanları geçerli doldur, (varsa) ilgi alanı seçeneklerinden birkaçını
      işaretle → gönder → başarı ekranı / teşekkür mesajı görünüyor, form
      resetleniyor.
- [ ] (Gizli honeypot testi — geliştirici konsolu) `company_url` adlı gizli
      input'a DOM'dan bir değer yazıp gönder → istek sessizce "başarılı" gibi
      davranıyor ama `/admin/leads` listesinde YENİ kayıt OLUŞMUYOR.

### 1.2 İletişim — `/tr/iletisim`

- [ ] Boş gönder → inline hatalar (ad, e-posta, mesaj). Telefon burada zorunlu
      DEĞİL, boş bırakılınca hata vermemeli.
- [ ] Geçersiz e-posta → hata.
- [ ] Kısa mesaj (<10 karakter) → hata.
- [ ] Geçerli gönderim → başarı ekranı.

### 1.3 Panelde kaydın görünmesi — `/admin/leads`

- [ ] 1.1 ve 1.2'de oluşturduğun geçerli talepler listede görünüyor; tür
      (contact/quote), ad, e-posta, tarih doğru.
- [ ] Bir kaydın durumunu değiştir (ör. "yeni" → "iletişime geçildi") → liste
      anında güncelleniyor, sayfa yenilendiğinde durum korunuyor.
- [ ] `/admin/leads/[id]` detay sayfasını aç → tüm alanlar (şirket, proje türü,
      lokasyon, ilgi alanları `fields`, mesaj) eksiksiz görünüyor.
- [ ] Detayda bir not (`notes`) ekle → kaydet → sayfa yenile → not duruyor,
      `updatedAt` güncellenmiş.
- [ ] Detaydan kaydı sil → `/admin/leads` listesinden kayboluyor.

---

## 2. Dil seçici (EN kaldırıldı)

- [ ] Ana sayfa header'ındaki dil dropdown: "TR" aktif/işaretli, "EN — Yakında"
      pasif (tıklanamaz / disabled).
- [ ] İç sayfa header'ındaki (ör. `/tr/kurumsal/hakkimizda`) dil dropdown: aynı
      davranış.
- [ ] TopBar'daki dil seçici: aynı davranış.
- [ ] Tarayıcıda `/en/kurumsal/hakkimizda` adresine git → kalıcı redirect ile
      `/tr/kurumsal/hakkimizda` açılıyor.
- [ ] `/en` → `/tr` redirect.
- [ ] `/en/teklif-al` → `/tr/teklif-al` redirect.
- [ ] Not: proxy.ts bu redirect'leri HTTP 308 (Permanent Redirect) ile yapıyor
      (görev metninde "301" geçiyordu; kod 308 kullanıyor — fonksiyonel olarak
      eşdeğer, ama beklenti kesin 301 ise geliştiriciye danış).

---

## 3. Panel → Tasarım Sayfaları — `/admin/design-pages`

Her aile için en az bir sayfada dene (faaliyet, çözüm, kurumsal, genişleme):

- [ ] Bir **faaliyet** sayfası aç (ör. İklimlendirme): bir metin alanını değiştir
      + "Performans bileşenleri" / "Süreç adımları" listesinde bir öğeyi ↑/↓ ile
      taşı + yeni öğe ekle + bir öğe sil → **Kaydet**.
- [ ] İlgili public sayfayı aç (kaydın `route` değeri, ör.
      `/tr/faaliyet-alanlari/iklimlendirme`) → değişiklikler yansımış, sıralama
      doğru.
- [ ] Aynı editörde **Varsayılana döndür** → public sayfa eski (default) içeriğe
      dönüyor.
- [ ] Bir **çözüm** sayfasında (ör. Sistem Çözümleri) aynı akış: metin + liste
      taşıma/ekleme/silme + Kaydet + public doğrulama + Varsayılana döndür.
- [ ] Bir **kurumsal** sayfasında (ör. Hakkımızda): "1976'dan bugüne" adımları
      veya "Kurumsal omurga" değerleri listesinde taşı/ekle/sil + Kaydet +
      `/tr/kurumsal/hakkimizda` doğrulama + Varsayılana döndür.
- [ ] Bir **genişleme** sayfasında (ör. Yönetim Kurulu / Galeri / Basında Biz):
      liste öğesi (ilke / görsel / vb.) taşı/ekle/sil + Kaydet + public doğrulama
      + Varsayılana döndür.
- [ ] Zorunlu alanı boş bırakıp kaydetmeyi dene → validasyon hatası, kayıt
      olmuyor (server action Zod ile doğruluyor).

---

## 4. Panel → Ana Sayfa İçeriği → Ana Sayfa Bantları — `/admin/home`

- [ ] "Ana Sayfa Bantları" bölümünü aç: **Hakkımızda**, **Projelerimiz**,
      **Sertifikalar**, **Galeri/Medya** bantları düzenlenebiliyor.
- [ ] Her bantta bir başlık/metin/CTA değiştir; Projelerimiz'de "facts"
      (değer/etiket) listesine öğe ekle; Sertifikalar'da "items" listesini
      düzenle → **Kaydet**.
- [ ] Ana sayfayı (`/tr`) aç → dört bandın da güncel içerikle render olduğunu
      doğrula (görsel yolları, CTA linkleri çalışıyor).
- [ ] Geçersiz/eksik alanla kaydetmeyi dene → `siteContentSchema` reddediyor,
      hata mesajı görünüyor.

---

## 5. Görsel regresyon — iç sayfalar bozulmamış

Bu turda içerik katmanına taşınan sayfalar, tasarım olarak öncekiyle birebir
aynı görünmeli. Aşağıdakileri masaüstü + mobil genişlikte gözle karşılaştır
(mümkünse `localhost-3000-audit/` altındaki referanslarla):

- [ ] `/tr/kurumsal` (hub) ve alt sayfaları:
      - [ ] `/tr/kurumsal/hakkimizda`
      - [ ] `/tr/kurumsal/misyon-vizyon`
      - [ ] `/tr/kurumsal/kalite-politikasi`
      - [ ] `/tr/kurumsal/surdurulebilirlik`
      - [ ] `/tr/kurumsal/yonetim-kurulu`
      - [ ] `/tr/kurumsal/yonetim-kurulu-mesaji`
      - [ ] `/tr/kurumsal/sertifikalarimiz`
- [ ] `/tr/faaliyet-alanlari` (hub) + 5 alt sayfa (iklimlendirme, ısıtma,
      soğutma, yalıtım, enerji).
- [ ] `/tr/cozumler` (hub) + 4 alt sayfa (sistem çözümleri, otomasyon,
      verimlilik, servis).
- [ ] `/tr/galeri`
- [ ] `/tr/basinda-biz`
- [ ] `/tr/insan-kaynaklari`
- [ ] Her sayfada: hero düzeni, kart ızgaraları, ikonlar, tipografi, boşluklar,
      alt bantlar önceki tasarımla aynı; kayma/taşma yok; görseller yükleniyor.

---

## 6. Regresyon kontrol listesi

- [ ] `npm test` → tüm otomatik testler geçiyor.
- [ ] `npx tsc --noEmit` → hata yok.
- [ ] `npx next build` → başarıyla tamamlanıyor.
- [ ] `/robots.txt` ve `/sitemap.xml` yalnızca `/tr` URL'leri içeriyor (EN yok).
