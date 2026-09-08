import type { AccentKey } from "@/lib/content/types";

const stroke: Record<AccentKey, string> = {
  lacivert: "#16377d",
  turkuaz: "#2f7fd1",
  kirmizi: "#d71920",
  turuncu: "#f58220",
  sari: "#d99b0a",
};
const strokeSoft: Record<AccentKey, string> = {
  lacivert: "#9db0d3",
  turkuaz: "#a7c9ea",
  kirmizi: "#f0a9ad",
  turuncu: "#f8c79a",
  sari: "#f0d59a",
};

type Props = { variant: number; accent: AccentKey; className?: string };

export function LineArt({ variant, accent, className = "" }: Props) {
  const c = stroke[accent];
  const s = strokeSoft[accent];
  const common = {
    className,
    viewBox: "0 0 200 120",
    fill: "none",
    "aria-hidden": true as const,
    preserveAspectRatio: "xMidYMid meet" as const,
  };

  // 0 — İklimlendirme: air streams through a perspective box
  if (variant === 0) {
    return (
      <svg {...common}>
        <path d="M46 26 L150 20 L172 34 L172 92 L150 100 L46 96 Z" stroke={s} strokeWidth="1" />
        <path d="M46 26 L46 96 M150 20 L150 100 M46 40 L150 34 M46 82 L150 78" stroke={s} strokeWidth="0.8" opacity="0.7" />
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 34 + i * 8;
          return (
            <path
              key={i}
              d={`M14 ${y} C 60 ${y - 12}, 120 ${y + 14}, 190 ${y - 4}`}
              stroke={i === 3 ? c : i % 2 ? c : s}
              strokeWidth={i === 3 ? 2 : 1}
              strokeLinecap="round"
              opacity={0.35 + i * 0.09}
            />
          );
        })}
        <circle cx="100" cy="58" r="2.4" fill={c} />
      </svg>
    );
  }

  // 1 — Isıtma: rising heat curves in a frame
  if (variant === 1) {
    return (
      <svg {...common}>
        <path d="M40 100 L160 100 M40 100 L40 24 M160 100 L160 24" stroke={s} strokeWidth="1" />
        {[52, 68, 84, 100, 116, 132, 148].map((x, i) => (
          <path
            key={x}
            d={`M${x} 100 C ${x - 14} 74, ${x + 16} 58, ${x} 34 C ${x - 12} 20, ${x + 8} 12, ${x} 4`}
            stroke={i % 2 ? c : s}
            strokeWidth={i === 3 ? 2 : 1.1}
            strokeLinecap="round"
            opacity={0.4 + i * 0.08}
          />
        ))}
        <circle cx="100" cy="30" r="2.4" fill={c} />
      </svg>
    );
  }

  // 2 — Soğutma: radial converging lines in a box + snow rays
  if (variant === 2) {
    return (
      <svg {...common}>
        <path d="M50 18 L150 18 L168 32 L168 88 L150 102 L50 102 L32 88 L32 32 Z" stroke={s} strokeWidth="1" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 10}
              y1={60 + Math.sin(a) * 10}
              x2={100 + Math.cos(a) * 52}
              y2={60 + Math.sin(a) * 40}
              stroke={i % 4 === 0 ? c : s}
              strokeWidth={i % 4 === 0 ? 1.6 : 0.9}
              strokeLinecap="round"
              opacity={i % 4 === 0 ? 0.9 : 0.5}
            />
          );
        })}
        <circle cx="100" cy="60" r="9" stroke={c} strokeWidth="1.6" />
        <circle cx="100" cy="60" r="2" fill={c} />
      </svg>
    );
  }

  // 3 — Yalıtım: isometric stacked layers
  if (variant === 3) {
    return (
      <svg {...common}>
        {[0, 1, 2, 3, 4].map((k) => {
          const y = 30 + k * 13;
          return (
            <path
              key={k}
              d={`M44 ${y} L100 ${y - 12} L156 ${y} L100 ${y + 12} Z`}
              stroke={k === 2 ? c : s}
              strokeWidth={k === 2 ? 1.8 : 1}
              opacity={0.55 + k * 0.08}
            />
          );
        })}
        <path d="M44 30 L44 78 M156 30 L156 78 M100 18 L100 96" stroke={s} strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="56" r="2.4" fill={c} />
      </svg>
    );
  }

  // 4 — Enerji: sun burst + orbit rings
  return (
    <svg {...common}>
      <ellipse cx="100" cy="60" rx="58" ry="34" stroke={s} strokeWidth="0.9" opacity="0.6" />
      <ellipse cx="100" cy="60" rx="40" ry="24" stroke={s} strokeWidth="0.9" opacity="0.5" />
      <circle cx="100" cy="60" r="15" stroke={c} strokeWidth="1.8" />
      {Array.from({ length: 20 }).map((_, i) => {
        const a = (i / 20) * Math.PI * 2;
        const r1 = 19;
        const r2 = i % 2 ? 40 : 30;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={60 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2}
            y2={60 + Math.sin(a) * (r2 * 0.62)}
            stroke={i % 2 ? c : s}
            strokeWidth={i % 2 ? 1.5 : 0.9}
            strokeLinecap="round"
            opacity={i % 2 ? 0.9 : 0.5}
          />
        );
      })}
      <circle cx="158" cy="60" r="2.2" fill={c} />
      <circle cx="42" cy="60" r="2.2" fill={c} />
    </svg>
  );
}
