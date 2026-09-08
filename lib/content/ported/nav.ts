/** Locale-aware sub-navigation for the activity and solution page switchers. */

const ACTIVITY = {
  tr: [
    ["İklimlendirme", "faaliyet-alanlari/iklimlendirme"],
    ["Isıtma", "faaliyet-alanlari/isitma"],
    ["Soğutma", "faaliyet-alanlari/sogutma"],
    ["Yalıtım", "faaliyet-alanlari/yalitim"],
    ["Enerji", "faaliyet-alanlari/enerji"],
  ],
  en: [
    ["Air Conditioning", "faaliyet-alanlari/iklimlendirme"],
    ["Heating", "faaliyet-alanlari/isitma"],
    ["Cooling", "faaliyet-alanlari/sogutma"],
    ["Insulation", "faaliyet-alanlari/yalitim"],
    ["Energy", "faaliyet-alanlari/enerji"],
  ],
} as const;

const SOLUTION = {
  tr: [
    ["Sistem Çözümleri", "cozumler/sistem-cozumleri"],
    ["Bina Otomasyonu", "cozumler/bina-otomasyonu"],
    ["Enerji Verimliliği", "cozumler/enerji-verimliligi"],
    ["Servis & Bakım", "cozumler/servis-bakim"],
  ],
  en: [
    ["System Solutions", "cozumler/sistem-cozumleri"],
    ["Building Automation", "cozumler/bina-otomasyonu"],
    ["Energy Efficiency", "cozumler/enerji-verimliligi"],
    ["Service & Maintenance", "cozumler/servis-bakim"],
  ],
} as const;

export function activityLinks(locale: string): [string, string][] {
  const l = locale === "en" ? "en" : "tr";
  return ACTIVITY[l].map(([label, sub]) => [label, `/${l}/${sub}`]);
}

export function solutionLinks(locale: string): [string, string][] {
  const l = locale === "en" ? "en" : "tr";
  return SOLUTION[l].map(([label, sub]) => [label, `/${l}/${sub}`]);
}
