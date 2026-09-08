import type { AccentKey, FeatureIconKey } from "./types";

/** Labels for the admin panel — keep in sync with `types.ts` unions. */

export const ACCENT_OPTIONS: { value: AccentKey; label: string }[] = [
  { value: "lacivert", label: "Lacivert" },
  { value: "turkuaz", label: "Turkuaz" },
  { value: "kirmizi", label: "Kırmızı" },
  { value: "turuncu", label: "Turuncu" },
  { value: "sari", label: "Sarı" },
];

export const ICON_OPTIONS: { value: FeatureIconKey; label: string }[] = [
  { value: "shield", label: "Kalkan" },
  { value: "team", label: "Ekip" },
  { value: "badge", label: "Rozet" },
  { value: "leaf", label: "Yaprak" },
  { value: "globe", label: "Dünya" },
  { value: "gauge", label: "Gösterge" },
  { value: "ruler", label: "Cetvel" },
  { value: "search", label: "Arama" },
  { value: "wrench", label: "Anahtar" },
  { value: "airflow", label: "Hava Akışı" },
  { value: "efficiency", label: "Verimlilik" },
  { value: "control", label: "Kontrol" },
  { value: "cap", label: "Kep" },
  { value: "scale", label: "Terazi" },
  { value: "broadcast", label: "Yayın" },
  { value: "institution", label: "Kurum" },
  { value: "partners", label: "Ortaklar" },
];

export const SOCIAL_ICON_OPTIONS: { value: "linkedin" | "instagram" | "youtube" | "x"; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X" },
];
