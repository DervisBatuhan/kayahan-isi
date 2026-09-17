/** Form layout for the design-page editors. Safe to import on the client. */

export type ObjectListColumn = {
  key: string;
  label: string;
  /** `media`: an image/video upload stored as `<key>Url`, `<key>Type`, `<key>Name`. */
  kind?: "text" | "textarea" | "media";
  hint?: string;
};

export type FieldSpec =
  | { key: string; label: string; type: "text"; hint?: string }
  | { key: string; label: string; type: "textarea"; hint?: string }
  | {
      key: string;
      label: string;
      type: "stringList";
      itemLabel: string;
      multiline?: boolean;
      hint?: string;
    }
  | {
      key: string;
      label: string;
      type: "namedTextList";
      itemLabel: string;
      hint?: string;
    }
  | {
      key: string;
      label: string;
      type: "linkCardList";
      itemLabel: string;
      hint?: string;
    }
  | {
      key: string;
      label: string;
      type: "objectList";
      itemLabel: string;
      columns: ObjectListColumn[];
      hint?: string;
      /** Hard cap on rows (the "add" button disables at the limit). */
      max?: number;
    }
  | {
      key: string;
      label: string;
      type: "fileCardList";
      itemLabel: string;
      /** `accept` attribute for the file input, e.g. ".pdf,image/png". */
      accept: string;
      hint?: string;
      /** Logo-only lists (e.g. partners) skip the per-row title input. */
      hideTitle?: boolean;
    };

export type SectionSpec = { title: string; description?: string; fields: FieldSpec[] };

/* ── shared heroes ─────────────────────────────────────────────────────── */

const heroTitleFields: FieldSpec[] = [
  { key: "index", label: "Numara / etiket", type: "text" },
  { key: "titleTop", label: "Başlık — üst satır", type: "text" },
  { key: "titleAccent", label: "Başlık — vurgulu satır", type: "text" },
  { key: "lead", label: "Giriş metni", type: "textarea" },
];

/* ── activity ──────────────────────────────────────────────────────────── */

const activitySpec: SectionSpec[] = [
  {
    title: "Hero",
    description: "Sayfanın üst bölümü.",
    fields: [
      { key: "index", label: "Numara / etiket", type: "text", hint: "ör. 01 / İKLİMLENDİRME" },
      { key: "titleTop", label: "Başlık — üst satır", type: "text" },
      { key: "titleAccent", label: "Başlık — vurgulu satır", type: "text" },
      { key: "lead", label: "Giriş metni", type: "textarea" },
      { key: "ctaLabel", label: "Buton metni", type: "text" },
      { key: "asset", label: "Görsel yolu", type: "text", hint: "public/ içindeki yol" },
      { key: "assetAlt", label: "Görsel alt metni", type: "text" },
    ],
  },
  {
    title: "Mühendislik yaklaşımı",
    fields: [
      { key: "statement", label: "Ana cümle", type: "textarea" },
      { key: "detail", label: "Açıklama", type: "textarea" },
    ],
  },
  {
    title: "Performans bileşenleri",
    description: "Kartlar — sıralanabilir.",
    fields: [
      { key: "pillars", label: "Bileşenler", type: "namedTextList", itemLabel: "Bileşen" },
    ],
  },
  {
    title: "Süreç adımları",
    description: "Alt şerit — sıralanabilir.",
    fields: [{ key: "process", label: "Adımlar", type: "stringList", itemLabel: "Adım" }],
  },
  {
    title: "Uygulama alanları",
    fields: [
      { key: "usesHeading", label: "Bölüm başlığı", type: "text" },
      { key: "uses", label: "Alanlar", type: "stringList", itemLabel: "Alan" },
    ],
  },
];

/* ── solution ──────────────────────────────────────────────────────────── */

const solutionSpec: SectionSpec[] = [
  {
    title: "Hero",
    fields: [
      { key: "index", label: "Numara / etiket", type: "text" },
      { key: "titleTop", label: "Başlık — üst satır", type: "text" },
      { key: "titleAccent", label: "Başlık — vurgulu satır", type: "text" },
      { key: "lead", label: "Giriş metni", type: "textarea" },
      { key: "ctaLabel", label: "Buton metni", type: "text" },
      { key: "asset", label: "Görsel yolu", type: "text" },
      { key: "assetAlt", label: "Görsel alt metni", type: "text" },
    ],
  },
  {
    title: "Çözüm prensibi",
    fields: [
      { key: "thesis", label: "Ana cümle", type: "textarea" },
      { key: "text", label: "Açıklama", type: "textarea" },
    ],
  },
  {
    title: "Uçtan uca süreç",
    description: "Aşamalar — sıralanabilir.",
    fields: [{ key: "stages", label: "Aşamalar", type: "namedTextList", itemLabel: "Aşama" }],
  },
  {
    title: "Çözüm kapsamı",
    description: "Çıktılar — sıralanabilir.",
    fields: [{ key: "outputs", label: "Çıktılar", type: "stringList", itemLabel: "Çıktı" }],
  },
];

/* ── hub ───────────────────────────────────────────────────────────────── */

const hubSpec: SectionSpec[] = [
  {
    title: "Hero",
    fields: [
      { key: "eyebrow", label: "Üst etiket", type: "text" },
      { key: "titleTop", label: "Başlık — üst satır", type: "text" },
      { key: "titleAccent", label: "Başlık — vurgulu satır", type: "text" },
      { key: "lead", label: "Giriş metni", type: "textarea" },
      { key: "image", label: "Görsel yolu", type: "text" },
      { key: "imageAlt", label: "Görsel alt metni", type: "text" },
    ],
  },
  {
    title: "Kart ızgarası",
    description: "Alt sayfa kartları — sıralanabilir, eklenebilir, çıkarılabilir.",
    fields: [
      { key: "gridHeadLabel", label: "Bölüm etiketi", type: "text" },
      { key: "gridHeadTitle", label: "Bölüm başlığı", type: "text" },
      { key: "items", label: "Kartlar", type: "linkCardList", itemLabel: "Kart" },
    ],
  },
  {
    title: "Alt bant",
    fields: [
      { key: "band", label: "Bant metni", type: "textarea" },
      { key: "ctaLabel", label: "Buton metni", type: "text" },
      { key: "ctaHref", label: "Buton adresi", type: "text" },
    ],
  },
];

/* ── corporate (per kind) ──────────────────────────────────────────────── */

const numTitleText: ObjectListColumn[] = [
  { key: "num", label: "No" },
  { key: "title", label: "Başlık" },
  { key: "text", label: "Açıklama", kind: "textarea" },
];
const iconTitleText: ObjectListColumn[] = [
  { key: "icon", label: "İkon anahtarı" },
  { key: "title", label: "Başlık" },
  { key: "text", label: "Açıklama", kind: "textarea" },
];

const corporateAbout: SectionSpec[] = [
  { title: "Hero", fields: heroTitleFields },
  {
    title: "Biz kimiz?",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeading", label: "Başlık", type: "text" },
      { key: "introBody", label: "Metin", type: "textarea" },
      { key: "statValue", label: "Sayı", type: "text" },
      { key: "statSuffix", label: "Sayı eki", type: "text" },
      { key: "statLabel", label: "Sayı etiketi", type: "text" },
    ],
  },
  {
    title: "1976'dan bugüne",
    fields: [
      { key: "storyLabel", label: "Üst etiket", type: "text" },
      { key: "storyHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "storyHeadingAccent", label: "Başlık — alt satır", type: "text" },
      {
        key: "storyItems",
        label: "Adımlar",
        type: "objectList",
        itemLabel: "Adım",
        columns: numTitleText,
      },
    ],
  },
  {
    title: "Kurumsal omurga",
    fields: [
      { key: "valuesLabel", label: "Üst etiket", type: "text" },
      { key: "valuesHeading", label: "Başlık", type: "text" },
      {
        key: "valuesItems",
        label: "Değerler",
        type: "objectList",
        itemLabel: "Değer",
        columns: iconTitleText,
      },
    ],
  },
];

const corporateMission: SectionSpec[] = [
  { title: "Hero", fields: heroTitleFields },
  {
    title: "Misyon & Vizyon",
    fields: [
      {
        key: "dual",
        label: "Bloklar",
        type: "objectList",
        itemLabel: "Blok",
        columns: [
          { key: "tag", label: "Etiket" },
          { key: "headingTop", label: "Başlık — üst" },
          { key: "headingBottom", label: "Başlık — alt" },
          { key: "body", label: "Metin", kind: "textarea" },
        ],
      },
    ],
  },
  {
    title: "Nasıl ilerliyoruz?",
    fields: [
      { key: "principlesLabel", label: "Üst etiket", type: "text" },
      { key: "principlesHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "principlesHeadingAccent", label: "Başlık — alt satır", type: "text" },
      {
        key: "principlesItems",
        label: "İlkeler",
        type: "objectList",
        itemLabel: "İlke",
        columns: numTitleText,
      },
    ],
  },
  {
    title: "Kapanış cümlesi",
    fields: [
      { key: "statementLine1", label: "Birinci satır", type: "text" },
      { key: "statementLine2", label: "İkinci satır", type: "text" },
    ],
  },
];

const corporateQuality: SectionSpec[] = [
  { title: "Hero", fields: heroTitleFields },
  {
    title: "Kalite yaklaşımımız",
    fields: [
      { key: "systemLabel", label: "Üst etiket", type: "text" },
      { key: "systemHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "systemHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "systemBody", label: "Metin", type: "textarea" },
      { key: "ringLabels", label: "Halka etiketleri", type: "stringList", itemLabel: "Etiket" },
      { key: "ringCenter", label: "Halka merkezi", type: "text" },
    ],
  },
  {
    title: "Politikamız",
    fields: [
      { key: "commitLabel", label: "Üst etiket", type: "text" },
      {
        key: "commitItems",
        label: "Maddeler",
        type: "objectList",
        itemLabel: "Madde",
        columns: numTitleText,
      },
    ],
  },
  {
    title: "Kapanış bandı",
    fields: [
      { key: "bannerTag", label: "Etiket", type: "text" },
      { key: "bannerHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "bannerHeadingAccent", label: "Başlık — alt satır", type: "text" },
    ],
  },
];

const corporateSustain: SectionSpec[] = [
  { title: "Hero", fields: heroTitleFields },
  {
    title: "Sorumlu mühendislik",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "introHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "introBody", label: "Metin", type: "textarea" },
    ],
  },
  {
    title: "Bileşenler",
    fields: [
      {
        key: "gridItems",
        label: "Kartlar",
        type: "objectList",
        itemLabel: "Kart",
        columns: [
          { key: "icon", label: "İkon anahtarı" },
          { key: "num", label: "No" },
          { key: "title", label: "Başlık" },
          { key: "text", label: "Açıklama", kind: "textarea" },
        ],
      },
    ],
  },
  {
    title: "Denge",
    fields: [
      { key: "balanceArt", label: "Görsel yolu", type: "text" },
      { key: "balanceArtAlt", label: "Görsel alt metni", type: "text" },
      { key: "balanceEquation", label: "Denklem parçaları", type: "stringList", itemLabel: "Parça" },
      { key: "balanceLabel", label: "Üst etiket", type: "text" },
      { key: "balanceHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "balanceHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "balanceBody", label: "Metin", type: "textarea" },
    ],
  },
];

/* ── expansion (per kind) ──────────────────────────────────────────────── */

const expansionHero: FieldSpec[] = [
  { key: "heroEyebrow", label: "Üst etiket", type: "text" },
  { key: "heroTitle", label: "Başlık", type: "text" },
  { key: "heroAccent", label: "Başlık — vurgulu satır", type: "text" },
];

const expansionBoard: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Yönetim Kurulu",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "introHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "chairMonogram", label: "Monogram", type: "text" },
      { key: "chairRole", label: "Unvan", type: "text" },
      { key: "chairName", label: "İsim", type: "text" },
      { key: "chairText", label: "Metin", type: "textarea" },
    ],
  },
  {
    title: "İlkeler",
    fields: [
      {
        key: "governance",
        label: "İlkeler",
        type: "objectList",
        itemLabel: "İlke",
        columns: numTitleText,
      },
    ],
  },
];

const expansionMessage: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Mesaj",
    fields: [
      { key: "lead", label: "Öne çıkan cümle", type: "textarea" },
      { key: "paragraphs", label: "Paragraflar", type: "stringList", itemLabel: "Paragraf", multiline: true },
      { key: "signatureName", label: "İmza — isim", type: "text" },
      { key: "signatureRole", label: "İmza — unvan", type: "text" },
    ],
  },
];

const expansionCertificates: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Kurumsal yeterlilik",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "introHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "introBody", label: "Metin", type: "textarea" },
      {
        key: "items",
        label: "Belgeler",
        type: "fileCardList",
        itemLabel: "Belge",
        accept: ".pdf,image/png,image/jpeg,image/webp",
        hint: "Her belge için bir başlık girin ve PDF ya da görsel yükleyin. Sırayı ok tuşlarıyla değiştirebilirsiniz.",
      },
    ],
  },
];

const mediaColumns: ObjectListColumn[] = [
  { key: "media", label: "Görsel / video", kind: "media", hint: "PNG, JPG, WebP ya da MP4/WebM. Video için YouTube bağlantısı da kullanabilirsiniz." },
  { key: "embedUrl", label: "YouTube / Vimeo bağlantısı (isteğe bağlı)" },
];

const expansionGallery: SectionSpec[] = [
  {
    title: "Hero",
    fields: [
      ...expansionHero,
      {
        key: "heroMedia",
        label: "Hero kutuları (sağdaki 3 kutu)",
        type: "objectList",
        itemLabel: "Kutu",
        max: 3,
        hint: "1. kutu büyük (sol), 2. ve 3. sağda üst üste. Boş bırakılan kutu dekoratif kalır. Videolar sessiz ve döngüde oynar.",
        columns: mediaColumns,
      },
    ],
  },
  {
    title: "Görseller ve videolar",
    description: "Sıralanabilir. 1. ve 4. öğe geniş gösterilir. Tümü kaldırılabilir; liste boşken aşağıdaki mesaj gösterilir.",
    fields: [
      {
        key: "items",
        label: "Öğeler",
        type: "objectList",
        itemLabel: "Öğe",
        columns: [
          ...mediaColumns,
          { key: "title", label: "Başlık" },
          { key: "caption", label: "Alt yazı" },
        ],
      },
    ],
  },
  {
    title: "Boş durum",
    description: "Galeri listesi boşken gösterilen mesaj.",
    fields: [
      { key: "emptyLabel", label: "Üst etiket", type: "text" },
      { key: "emptyBody", label: "Metin", type: "textarea" },
    ],
  },
];

const expansionPress: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Öne çıkan",
    fields: [
      { key: "newsIndexValue", label: "Büyük sayı", type: "text" },
      { key: "newsIndexSuffix", label: "Büyük sayı — üst simge (ör. +)", type: "text" },
      { key: "newsIndexLabel", label: "Büyük sayı altındaki etiket", type: "text" },
      { key: "featureLabel", label: "Üst etiket", type: "text" },
      { key: "featureHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "featureHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "featureBody", label: "Metin", type: "textarea" },
      { key: "featureCtaLabel", label: "Buton metni", type: "text" },
      { key: "featureCtaHref", label: "Buton adresi", type: "text" },
    ],
  },
  {
    title: "Haberler",
    description: "Basın ve TV görünümleri, duyurular. Sırayı ok tuşlarıyla değiştirebilirsiniz; en üstteki en yeni.",
    fields: [
      {
        key: "news",
        label: "Haberler",
        type: "objectList",
        itemLabel: "Haber",
        columns: [
          { key: "date", label: "Tarih (ör. 12 Mart 2026)" },
          { key: "source", label: "Kaynak (ör. CNN Türk)" },
          { key: "title", label: "Başlık" },
          { key: "text", label: "Özet", kind: "textarea" },
          { key: "href", label: "Bağlantı (isteğe bağlı, https://…)" },
          ...mediaColumns,
        ],
      },
    ],
  },
  {
    title: "Haber arşivi (boş durum)",
    description: "Haber listesi boşken gösterilen mesaj.",
    fields: [
      { key: "emptyLabel", label: "Üst etiket", type: "text" },
      { key: "emptyBody", label: "Metin", type: "textarea" },
    ],
  },
];

const expansionCareer: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Kayahan Isı'da kariyer",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "introHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "introBody", label: "Metin", type: "textarea" },
      { key: "applyLabel", label: "Başvuru butonu metni", type: "text" },
      { key: "applyHref", label: "Başvuru adresi", type: "text", hint: "ör. mailto:..." },
    ],
  },
  {
    title: "Değerler",
    fields: [
      {
        key: "values",
        label: "Değerler",
        type: "objectList",
        itemLabel: "Değer",
        columns: iconTitleText,
      },
    ],
  },
  {
    title: "Açık pozisyonlar (boş durum)",
    fields: [
      { key: "openLabel", label: "Üst etiket", type: "text" },
      { key: "openHeading", label: "Başlık", type: "text" },
      { key: "openBody", label: "Metin", type: "textarea" },
    ],
  },
];

const projectStack: ObjectListColumn[] = [
  { key: "icon", label: "İkon anahtarı" },
  { key: "num", label: "No" },
  { key: "title", label: "Başlık" },
];

const expansionProjects: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Proje yaklaşımı",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "introHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "introBody", label: "Metin", type: "textarea" },
      { key: "ctaLabel", label: "Buton metni", type: "text" },
      { key: "ctaHref", label: "Buton adresi", type: "text" },
    ],
  },
  {
    title: "Süreç adımları",
    fields: [
      { key: "stack", label: "Adımlar", type: "objectList", itemLabel: "Adım", columns: projectStack },
    ],
  },
];

const expansionPartners: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "İş ortakları",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "introHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "introBody", label: "Metin", type: "textarea" },
      { key: "searchPlaceholder", label: "Arama kutusu — yer tutucu", type: "text" },
      { key: "searchEmpty", label: "Arama — sonuç yok mesajı", type: "text" },
      {
        key: "items",
        label: "Markalar",
        type: "fileCardList",
        itemLabel: "Marka",
        accept: ".png,.jpg,.jpeg,.webp,.svg",
        hint: "Her marka için logo yükleyin ve marka adını yazın — ad, sayfadaki arama kutusunda kullanılır. Sırayı ok tuşlarıyla değiştirebilirsiniz.",
      },
    ],
  },
];

const knowledgeSpec: SectionSpec[] = [
  {
    title: "Hero",
    fields: [
      { key: "heroIndex", label: "Numara / etiket", type: "text", hint: "ör. 01 / BİLGİ MERKEZİ" },
      { key: "heroTitleTop", label: "Başlık — üst satır", type: "text" },
      { key: "heroTitleAccent", label: "Başlık — vurgulu satır", type: "text" },
      { key: "heroLead", label: "Giriş metni", type: "textarea" },
    ],
  },
  {
    title: "İçerik",
    fields: [
      { key: "contentEyebrow", label: "Üst etiket", type: "text" },
      {
        key: "items",
        label: "Kartlar (kaydırmalı)",
        type: "objectList",
        itemLabel: "Kart",
        columns: [
          { key: "title", label: "Başlık" },
          { key: "text", label: "Metin", kind: "textarea" },
        ],
        hint: "Sırayı ok tuşlarıyla değiştirebilirsiniz. Liste boşsa aşağıdaki yer tutucu mesaj gösterilir.",
      },
    ],
  },
  {
    title: "Boş durum mesajı",
    description: "Kart listesi boş olduğunda gösterilen mesaj.",
    fields: [
      { key: "emptyHeading", label: "Başlık", type: "text" },
      { key: "emptyBody", label: "Metin", type: "textarea" },
    ],
  },
];

/** The blog page lists real posts (admin → Blog Yazıları), so its card list
 *  field is dropped here; only the hero + empty-state copy stay editable. */
const knowledgeBlogSpec: SectionSpec[] = knowledgeSpec.map((section) =>
  section.title === "İçerik"
    ? { ...section, fields: section.fields.filter((f) => f.key !== "items") }
    : section.title === "Boş durum mesajı"
      ? { ...section, description: "Henüz yayınlanmış yazı yokken gösterilen mesaj." }
      : section,
);

/** Kombi/klima/şofben service pages and the district pages share one shape. */
const serviceLandingSpec: SectionSpec[] = [
  {
    title: "Hero",
    fields: [
      { key: "heroEyebrow", label: "Üst etiket", type: "text" },
      { key: "heroTitle", label: "Başlık", type: "text" },
      { key: "heroAccent", label: "Başlık — vurgulu satır", type: "text" },
      { key: "heroLead", label: "Giriş metni", type: "textarea" },
      { key: "heroImage", label: "Sağ görsel yolu", type: "text", hint: "public/ içindeki yol, ör. /gallery/vip-kurumsal-servis-araci.webp — boş bırakılırsa soyut grafik gösterilir." },
      { key: "heroImageAlt", label: "Görsel alt metni", type: "text" },
    ],
  },
  {
    title: "Ana metin",
    description: "Markdown: # başlık, - liste, **kalın**, [metin](/tr/…) bağlantı.",
    fields: [
      { key: "introLabel", label: "Üst etiket", type: "text" },
      { key: "introHeading", label: "Başlık", type: "text" },
      { key: "body", label: "Gövde (Markdown)", type: "textarea" },
    ],
  },
  {
    title: "Hizmet kartları",
    fields: [
      { key: "servicesLabel", label: "Üst etiket", type: "text" },
      { key: "servicesHeading", label: "Başlık", type: "text" },
      {
        key: "services",
        label: "Kartlar",
        type: "objectList",
        itemLabel: "Hizmet",
        columns: [
          { key: "title", label: "Başlık" },
          { key: "text", label: "Açıklama", kind: "textarea" },
        ],
      },
    ],
  },
  {
    title: "Sık sorulan sorular",
    description: "Google'da açılır soru-cevap (FAQ) sonucu olarak görünür.",
    fields: [
      { key: "faqLabel", label: "Üst etiket", type: "text" },
      { key: "faqHeading", label: "Başlık", type: "text" },
      {
        key: "faq",
        label: "Sorular",
        type: "objectList",
        itemLabel: "Soru",
        columns: [
          { key: "title", label: "Soru" },
          { key: "text", label: "Cevap", kind: "textarea" },
        ],
      },
    ],
  },
  {
    title: "Hizmet bölgeleri ve çağrı",
    fields: [
      { key: "areasLabel", label: "Bölgeler — üst etiket", type: "text" },
      { key: "areasHeading", label: "Bölgeler — başlık", type: "text" },
      { key: "areasText", label: "Bölgeler — metin", type: "textarea" },
      { key: "ctaHeading", label: "Çağrı — başlık", type: "text" },
      { key: "ctaText", label: "Çağrı — metin", type: "textarea" },
      { key: "ctaLabel", label: "Çağrı — buton", type: "text" },
    ],
  },
];

const legalSpec: SectionSpec[] = [
  {
    title: "Yasal metin",
    description: "Markdown: # başlık, - liste, **kalın**, [metin](/tr/…) bağlantı. [gözden geçirin] işaretli bölümleri hukuk danışmanınızla kontrol edin.",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "updated", label: "Güncelleme satırı", type: "text", hint: "ör. Son güncelleme: Eylül 2026" },
      { key: "intro", label: "Giriş", type: "textarea" },
      { key: "body", label: "Metin (Markdown)", type: "textarea" },
    ],
  },
];

const utilityReferences: SectionSpec[] = [
  { title: "Hero", fields: [
    { key: "eyebrow", label: "Üst etiket", type: "text" },
    { key: "h1a", label: "Başlık — üst satır", type: "text" },
    { key: "h1b", label: "Başlık — vurgulu satır", type: "text" },
  ] },
  { title: "Sektör kartları", fields: [
    { key: "sectors", label: "Kartlar", type: "objectList", itemLabel: "Sektör", columns: [
      { key: "num", label: "No" }, { key: "title", label: "Başlık" }, { key: "text", label: "Açıklama", kind: "textarea" },
    ] },
  ] },
  { title: "Kanıt bandı", fields: [
    { key: "proofSince", label: "Üst etiket", type: "text" },
    { key: "proofValue", label: "Büyük sayı", type: "text" },
    { key: "proofSuffix", label: "Sayı eki (ör. +)", type: "text" },
    { key: "proofa", label: "Metin — 1. satır", type: "text" },
    { key: "proofb", label: "Metin — 2. satır", type: "text" },
  ] },
];
const utilityContact: SectionSpec[] = [
  { title: "Hero", fields: [
    { key: "eyebrow", label: "Üst etiket", type: "text" },
    { key: "h1a", label: "Başlık — üst satır", type: "text" },
    { key: "h1b", label: "Başlık — vurgulu satır", type: "text" },
  ] },
  { title: "Yan blok", fields: [
    { key: "asideLabel", label: "Üst etiket", type: "text" },
    { key: "asideH2a", label: "Başlık — üst satır", type: "text" },
    { key: "asideH2b", label: "Başlık — alt satır", type: "text" },
  ] },
  { title: "Form", description: "Alan etiketleri sabittir; konu seçenekleri ve başlıklar buradan.", fields: [
    { key: "formHead", label: "Form üst etiketi", type: "text" },
    { key: "formSub", label: "Form alt başlığı", type: "text" },
    { key: "subjectOpts", label: "Konu seçenekleri", type: "stringList", itemLabel: "Konu" },
    { key: "okLabel", label: "Başarı — üst etiket", type: "text" },
    { key: "okH2a", label: "Başarı — 1. satır", type: "text" },
    { key: "okH2b", label: "Başarı — 2. satır", type: "text" },
  ] },
];
const utilityQuote: SectionSpec[] = [
  { title: "Hero", fields: [
    { key: "eyebrow", label: "Üst etiket", type: "text" },
    { key: "h1a", label: "Başlık — üst satır", type: "text" },
    { key: "h1b", label: "Başlık — vurgulu satır", type: "text" },
    { key: "steps", label: "Adımlar (hero)", type: "stringList", itemLabel: "Adım" },
  ] },
  { title: "Proje briefi", fields: [
    { key: "briefLabel", label: "Üst etiket", type: "text" },
    { key: "briefH2a", label: "Başlık — üst satır", type: "text" },
    { key: "briefH2b", label: "Başlık — alt satır", type: "text" },
    { key: "briefP", label: "Metin", type: "textarea" },
    { key: "briefTag1", label: "Etiket 1", type: "text" },
    { key: "briefTag2", label: "Etiket 2", type: "text" },
  ] },
  { title: "Form", description: "Alan etiketleri sabittir; bölüm başlıkları ve seçenekler buradan.", fields: [
    { key: "head1", label: "1. bölüm etiketi", type: "text" },
    { key: "head1sub", label: "1. bölüm alt başlığı", type: "text" },
    { key: "head2", label: "2. bölüm etiketi", type: "text" },
    { key: "head2sub", label: "2. bölüm alt başlığı", type: "text" },
    { key: "projectTypeOpts", label: "Proje türü seçenekleri", type: "stringList", itemLabel: "Tür" },
    { key: "fields", label: "İlgi alanı seçenekleri", type: "stringList", itemLabel: "Alan" },
    { key: "detailPh", label: "Proje detayı yer tutucu", type: "text" },
    { key: "okLabel", label: "Başarı — üst etiket", type: "text" },
    { key: "okH2a", label: "Başarı — 1. satır", type: "text" },
    { key: "okH2b", label: "Başarı — 2. satır", type: "text" },
  ] },
];

export const PORTED_EDITOR_SPEC: Record<string, SectionSpec[]> = {
  "utility:references": utilityReferences,
  "utility:contact": utilityContact,
  "utility:quote": utilityQuote,
  legal: legalSpec,
  service: serviceLandingSpec,
  district: serviceLandingSpec,
  brand: serviceLandingSpec,
  "knowledge:blog": knowledgeBlogSpec,
  activity: activitySpec,
  solution: solutionSpec,
  hub: hubSpec,
  "corporate:about": corporateAbout,
  "corporate:mission": corporateMission,
  "corporate:quality": corporateQuality,
  "corporate:sustainability": corporateSustain,
  "expansion:board": expansionBoard,
  "expansion:message": expansionMessage,
  "expansion:certificates": expansionCertificates,
  "expansion:gallery": expansionGallery,
  "expansion:press": expansionPress,
  "expansion:projects": expansionProjects,
  "expansion:career": expansionCareer,
  "expansion:partners": expansionPartners,
  knowledge: knowledgeSpec,
};

const SEO_SECTION: SectionSpec = {
  title: "SEO (Google görünümü)",
  description:
    "Boş bırakılırsa sistemdeki varsayılan başlık ve açıklama kullanılır. Başlık ≤ 60, açıklama 120–160 karakter idealdir; site adı (\"| Kayahan Isı\") otomatik eklenir.",
  fields: [
    { key: "seoTitle", label: "Google başlığı", type: "text", hint: "Arama sonucundaki mavi başlık." },
    { key: "seoDescription", label: "Google açıklaması", type: "textarea", hint: "Başlığın altındaki gri açıklama; sosyal paylaşımlarda da görünür." },
  ],
};

export function getEditorSpec(family: string, kind: string): SectionSpec[] {
  const base = PORTED_EDITOR_SPEC[`${family}:${kind}`] ?? PORTED_EDITOR_SPEC[family] ?? [];
  return [...base, SEO_SECTION];
}
