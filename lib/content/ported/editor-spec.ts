/** Form layout for the design-page editors. Safe to import on the client. */

export type ObjectListColumn = {
  key: string;
  label: string;
  kind?: "text" | "textarea";
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
    }
  | {
      key: string;
      label: string;
      type: "fileCardList";
      itemLabel: string;
      /** `accept` attribute for the file input, e.g. ".pdf,image/png". */
      accept: string;
      hint?: string;
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

const expansionGallery: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Görseller",
    description: "Sıralanabilir.",
    fields: [
      {
        key: "items",
        label: "Görseller",
        type: "objectList",
        itemLabel: "Görsel",
        columns: [
          { key: "src", label: "Görsel yolu" },
          { key: "title", label: "Başlık" },
          { key: "caption", label: "Alt yazı" },
        ],
      },
    ],
  },
];

const expansionPress: SectionSpec[] = [
  { title: "Hero", fields: expansionHero },
  {
    title: "Öne çıkan",
    fields: [
      { key: "featureImage", label: "Görsel yolu", type: "text" },
      { key: "featureImageAlt", label: "Görsel alt metni", type: "text" },
      { key: "featureLabel", label: "Üst etiket", type: "text" },
      { key: "featureHeadingTop", label: "Başlık — üst satır", type: "text" },
      { key: "featureHeadingAccent", label: "Başlık — alt satır", type: "text" },
      { key: "featureBody", label: "Metin", type: "textarea" },
      { key: "featureCtaLabel", label: "Buton metni", type: "text" },
      { key: "featureCtaHref", label: "Buton adresi", type: "text" },
    ],
  },
  {
    title: "Haber arşivi (boş durum)",
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

export const PORTED_EDITOR_SPEC: Record<string, SectionSpec[]> = {
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
  "expansion:career": expansionCareer,
};

export function getEditorSpec(family: string, kind: string): SectionSpec[] {
  return PORTED_EDITOR_SPEC[`${family}:${kind}`] ?? PORTED_EDITOR_SPEC[family] ?? [];
}
