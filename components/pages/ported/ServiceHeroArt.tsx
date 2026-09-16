/**
 * Line-art "technical schematic" illustrations for the service pages' hero
 * right side. Deliberately a different visual language from the CGI renders
 * used elsewhere: navy panel, cyan/ice strokes, one warm accent, a faint
 * grid — plus a couple of data chips so the panel reads as an instrument, not
 * a picture. Pure SVG, no runtime cost; animation is CSS and respects
 * prefers-reduced-motion (see _service.scss).
 */
import type { Locale } from "@/lib/i18n/config";

export type HeroArtVariant = "kombi" | "klima" | "sofben" | "district" | "brand";

const STROKE = "#9fd8ea";
const CYAN = "#00a7d6";
const WARM = "#f47b20";
const ICE = "#e6f3f9";

function Grid() {
  return (
    <g className="sv-art-grid" stroke="#ffffff" strokeOpacity=".06">
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="400" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="480" y2={i * 50} />
      ))}
    </g>
  );
}

function Flame({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    // Outer <g> carries the SVG transform; the animated class lives on an inner
    // <g>, because a CSS `transform` animation would otherwise override the
    // attribute and pull the shape to the origin.
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <g className="sv-art-flame">
        <path d="M0 -26 C 10 -16, 14 -8, 12 2 C 10 12, 2 16, 0 16 C -2 16, -10 12, -12 2 C -14 -8, -10 -16, 0 -26 Z" stroke={WARM} />
        <path d="M0 -12 C 5 -7, 7 -3, 6 2 C 5 7, 2 9, 0 9 C -2 9, -5 7, -6 2 C -7 -3, -5 -7, 0 -12 Z" stroke={WARM} fill={WARM} fillOpacity=".55" />
      </g>
    </g>
  );
}

function Chip({ x, y, label, value }: { x: number; y: number; label: string; value: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="118" height="44" rx="2" fill="#041b37" stroke={CYAN} strokeOpacity=".5" />
      <text x="12" y="17" fill={CYAN} fontSize="8" fontWeight="800" letterSpacing="1.6" fontFamily="Arial, Helvetica, sans-serif">{label}</text>
      <text x="12" y="34" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">{value}</text>
    </g>
  );
}

function Kombi({ locale }: { locale: Locale }) {
  return (
    <>
      {/* wall-hung boiler */}
      <g fill="none" stroke={STROKE} strokeWidth="2" strokeLinejoin="round">
        <rect x="70" y="60" width="150" height="190" rx="10" />
        <rect x="90" y="80" width="110" height="48" rx="4" stroke={CYAN} />
        <line x1="100" y1="96" x2="150" y2="96" stroke={CYAN} strokeWidth="3" />
        <line x1="100" y1="110" x2="130" y2="110" stroke={CYAN} strokeOpacity=".6" />
        <circle cx="182" cy="104" r="7" stroke={CYAN} />
        <rect x="96" y="146" width="98" height="78" rx="6" strokeOpacity=".6" />
      </g>
      <Flame x={145} y={190} s={1.15} />
      {/* pipes */}
      <g fill="none" strokeWidth="2.2" strokeLinecap="round">
        {[98, 122, 146, 170, 194].map((x, i) => (
          <line key={x} x1={x} y1="250" x2={x} y2="330" stroke={i === 2 ? WARM : i === 0 ? "#ffd166" : STROKE} strokeOpacity={i === 0 ? 0.9 : 0.8} />
        ))}
        {[98, 122, 146, 170, 194].map((x) => (
          <circle key={`v${x}`} cx={x} cy="290" r="5" stroke={STROKE} fill="#041b37" />
        ))}
      </g>
      {/* flow loop to radiator */}
      <g fill="none" strokeWidth="2.2" strokeLinecap="round">
        <path className="sv-art-flow" d="M146 330 L146 350 L330 350 L330 250" stroke={WARM} />
        <path className="sv-art-flow sv-art-flow--back" d="M330 120 L330 96 L170 96" stroke={CYAN} strokeOpacity=".0" />
        <path className="sv-art-flow sv-art-flow--back" d="M194 330 L194 368 L400 368 L400 250" stroke={CYAN} />
      </g>
      {/* radiator */}
      <g fill="none" stroke={STROKE} strokeWidth="2">
        <rect x="300" y="130" width="130" height="120" rx="6" />
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={318 + i * 19} y1="142" x2={318 + i * 19} y2="238" strokeOpacity=".7" />
        ))}
        <path className="sv-art-heat" d="M320 112 c4 -8 8 -8 12 0 s8 8 12 0" stroke={WARM} strokeOpacity=".8" />
        <path className="sv-art-heat" d="M360 112 c4 -8 8 -8 12 0 s8 8 12 0" stroke={WARM} strokeOpacity=".6" />
        <path className="sv-art-heat" d="M400 112 c4 -8 8 -8 12 0 s8 8 12 0" stroke={WARM} strokeOpacity=".4" />
      </g>
      <Chip x={312} y={30} label={locale === "tr" ? "GİDİŞ / DÖNÜŞ" : "FLOW / RETURN"} value="70 °C · 50 °C" />
      <Chip x={40} y={340} label={locale === "tr" ? "BASINÇ" : "PRESSURE"} value="1,5 bar" />
    </>
  );
}

function Klima({ locale }: { locale: Locale }) {
  return (
    <>
      {/* indoor unit */}
      <g fill="none" stroke={STROKE} strokeWidth="2" strokeLinejoin="round">
        <path d="M60 70 h230 a14 14 0 0 1 14 14 v46 a14 14 0 0 1 -14 14 h-230 a14 14 0 0 1 -14 -14 v-46 a14 14 0 0 1 14 -14 z" />
        <line x1="70" y1="118" x2="290" y2="118" stroke={CYAN} strokeOpacity=".7" />
        <line x1="70" y1="128" x2="290" y2="128" stroke={CYAN} strokeOpacity=".45" />
        <line x1="70" y1="138" x2="290" y2="138" stroke={CYAN} strokeOpacity=".25" />
        <circle cx="270" cy="92" r="5" stroke={CYAN} />
      </g>
      {/* airflow */}
      <g fill="none" strokeWidth="2.2" strokeLinecap="round" stroke={CYAN}>
        <path className="sv-art-air" d="M120 160 c -20 30, -30 60, -60 90" strokeOpacity=".9" />
        <path className="sv-art-air" d="M180 160 c -20 40, -40 70, -80 110" strokeOpacity=".6" />
        <path className="sv-art-air" d="M240 160 c -20 45, -50 80, -100 130" strokeOpacity=".35" />
      </g>
      {/* snowflake */}
      <g transform="translate(150 250)" stroke={ICE} strokeWidth="2" strokeLinecap="round" fill="none">
        <g className="sv-art-snow">
          {[0, 60, 120].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <line x1="-26" y1="0" x2="26" y2="0" />
              <path d="M-18 0 l-6 -6 M-18 0 l-6 6 M18 0 l6 -6 M18 0 l6 6" />
            </g>
          ))}
        </g>
      </g>
      {/* outdoor unit */}
      <g fill="none" stroke={STROKE} strokeWidth="2">
        <rect x="300" y="200" width="140" height="150" rx="8" />
        <circle cx="370" cy="275" r="46" stroke={CYAN} strokeOpacity=".8" />
        <g transform="translate(370 275)" stroke={CYAN}>
          <g className="sv-art-fan">
            {[0, 72, 144, 216, 288].map((a) => (
              <path key={a} transform={`rotate(${a})`} d="M0 0 c 10 -14, 26 -20, 38 -10 c -10 8, -24 10, -38 10 z" fill={CYAN} fillOpacity=".25" />
            ))}
            <circle r="5" fill="#041b37" />
          </g>
        </g>
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1="312" y1={214 + i * 8} x2="428" y2={214 + i * 8} strokeOpacity=".25" />
        ))}
      </g>
      {/* copper lines */}
      <g fill="none" strokeWidth="2.2" strokeLinecap="round">
        <path className="sv-art-flow" d="M290 130 L340 130 L340 200" stroke={WARM} strokeOpacity=".9" />
        <path className="sv-art-flow sv-art-flow--back" d="M290 112 L356 112 L356 200" stroke={CYAN} />
      </g>
      <Chip x={40} y={330} label={locale === "tr" ? "HEDEF SICAKLIK" : "SET POINT"} value="22 °C" />
      <Chip x={322} y={30} label={locale === "tr" ? "SOĞUTUCU" : "REFRIGERANT"} value="R32 · 0,8 kg" />
    </>
  );
}

function Sofben({ locale }: { locale: Locale }) {
  return (
    <>
      {/* flue */}
      <g fill="none" stroke={STROKE} strokeWidth="2">
        <rect x="128" y="24" width="34" height="56" rx="4" strokeOpacity=".8" />
        <path className="sv-art-heat" d="M138 14 c3 -8 8 -8 11 0" stroke={ICE} strokeOpacity=".6" />
        <path className="sv-art-heat" d="M132 6 c3 -8 8 -8 11 0 M150 6 c3 -8 8 -8 11 0" stroke={ICE} strokeOpacity=".35" />
      </g>
      {/* heater body */}
      <g fill="none" stroke={STROKE} strokeWidth="2" strokeLinejoin="round">
        <rect x="90" y="80" width="110" height="200" rx="12" />
        <rect x="106" y="98" width="78" height="34" rx="4" stroke={CYAN} />
        <line x1="116" y1="115" x2="160" y2="115" stroke={CYAN} strokeWidth="3" />
        <circle cx="174" cy="115" r="5" stroke={CYAN} />
        <path d="M106 150 h78" strokeOpacity=".4" />
        <path d="M106 236 h78" strokeOpacity=".4" />
      </g>
      <Flame x={145} y={196} s={1.3} />
      {/* water in (cold) / out (hot) */}
      <g fill="none" strokeWidth="2.2" strokeLinecap="round">
        <path className="sv-art-flow sv-art-flow--back" d="M60 380 L60 300 L112 300 L112 280" stroke={CYAN} />
        <path className="sv-art-flow" d="M178 280 L178 300 L300 300 L300 150 L360 150" stroke={WARM} />
        <circle cx="112" cy="300" r="5" stroke={STROKE} fill="#041b37" />
        <circle cx="178" cy="300" r="5" stroke={STROKE} fill="#041b37" />
      </g>
      {/* shower */}
      <g fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round">
        <path d="M360 150 L390 150 L390 172" />
        <path d="M368 176 h44 a6 6 0 0 1 6 6 v4 h-56 v-4 a6 6 0 0 1 6 -6 z" />
        <g className="sv-art-drops" stroke={CYAN}>
          {[372, 384, 396, 408].map((x, i) => (
            <line key={x} x1={x} y1="196" x2={x} y2={208 + (i % 2) * 8} />
          ))}
        </g>
      </g>
      {/* safety shield */}
      <g transform="translate(400 300)" fill="none" stroke={ICE} strokeWidth="2" strokeLinejoin="round">
        <path d="M0 -26 l24 9 v18 c0 16 -11 27 -24 33 c-13 -6 -24 -17 -24 -33 v-18 z" />
        <path d="M-9 2 l7 7 l12 -14" stroke={CYAN} strokeWidth="2.6" />
      </g>
      <Chip x={40} y={30} label={locale === "tr" ? "BACA ÇEKİŞİ" : "FLUE DRAUGHT"} value="OK ✓" />
      <Chip x={312} y={336} label={locale === "tr" ? "SICAK SU" : "HOT WATER"} value="11 L/dk · 55 °C" />
    </>
  );
}

function District({ name, locale }: { name: string; locale: Locale }) {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return [240 + Math.cos(a) * 118, 200 + Math.sin(a) * 118] as const;
  });
  return (
    <>
      <g className="sv-art-rings" fill="none" stroke={CYAN}>
        <circle cx="240" cy="200" r="150" strokeOpacity=".18" />
        <circle cx="240" cy="200" r="118" strokeOpacity=".28" strokeDasharray="4 6" />
        <circle cx="240" cy="200" r="72" strokeOpacity=".4" />
        <circle className="sv-art-pulse" cx="240" cy="200" r="30" strokeOpacity=".6" />
      </g>
      <g fill="none" stroke={STROKE} strokeOpacity=".5" strokeWidth="1.5">
        <path d="M120 200 H360 M240 80 V320" strokeDasharray="2 8" />
      </g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 6 : 4} fill={i === 0 ? WARM : ICE} fillOpacity={i === 0 ? 1 : 0.7} />
      ))}
      {/* pin */}
      <g transform="translate(240 200)" fill="none" stroke={WARM} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M0 10 c -14 -16 -20 -26 -20 -36 a20 20 0 0 1 40 0 c 0 10 -6 20 -20 36 z" fill="#041b37" />
        <circle cy="-26" r="7" />
      </g>
      <g transform="translate(240 260)">
        <rect x="-78" y="0" width="156" height="34" rx="2" fill="#041b37" stroke={CYAN} strokeOpacity=".6" />
        <text x="0" y="22" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif">{name}</text>
      </g>
      <Chip x={40} y={30} label={locale === "tr" ? "MÜDAHALE" : "RESPONSE"} value={locale === "tr" ? "Aynı gün" : "Same day"} />
      <Chip x={322} y={336} label={locale === "tr" ? "HİZMET HATTI" : "SERVICE LINE"} value="7 / 24" />
    </>
  );
}

function Brand({ name, locale }: { name: string; locale: Locale }) {
  return (
    <>
      <g fill="none" stroke={STROKE} strokeWidth="2" strokeLinejoin="round">
        <rect x="150" y="70" width="180" height="210" rx="12" />
        <rect x="172" y="92" width="136" height="52" rx="4" stroke={CYAN} />
        <line x1="184" y1="110" x2="250" y2="110" stroke={CYAN} strokeWidth="3" />
        <line x1="184" y1="126" x2="226" y2="126" stroke={CYAN} strokeOpacity=".6" />
        <circle cx="288" cy="118" r="8" stroke={CYAN} />
        <rect x="178" y="164" width="124" height="90" rx="6" strokeOpacity=".6" />
      </g>
      <Flame x={240} y={214} s={1.3} />
      <g fill="none" strokeWidth="2.2" strokeLinecap="round">
        {[180, 210, 240, 270, 300].map((x, i) => (
          <line key={x} x1={x} y1="280" x2={x} y2="330" stroke={i === 2 ? WARM : STROKE} strokeOpacity=".8" />
        ))}
      </g>
      {/* diagnostic ring */}
      <g fill="none" stroke={CYAN} strokeOpacity=".35">
        <circle className="sv-art-rings" cx="240" cy="180" r="160" strokeDasharray="3 9" />
      </g>
      <g transform="translate(240 356)">
        <rect x="-92" y="-16" width="184" height="34" rx="2" fill="#041b37" stroke={WARM} strokeOpacity=".7" />
        <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="1" fontFamily="Arial, Helvetica, sans-serif">
          {name.toUpperCase()}
        </text>
      </g>
      <Chip x={40} y={30} label={locale === "tr" ? "PARÇA" : "PARTS"} value={locale === "tr" ? "Orijinal" : "Genuine"} />
      <Chip x={40} y={90} label={locale === "tr" ? "SERVİS" : "SERVICE"} value={locale === "tr" ? "Bağımsız" : "Independent"} />
    </>
  );
}

export function ServiceHeroArt({
  variant,
  name = "",
  locale,
}: {
  variant: HeroArtVariant;
  /** District or brand name shown inside the illustration. */
  name?: string;
  locale: Locale;
}) {
  return (
    <div className={`sv-art sv-art--${variant}`} aria-hidden="true">
      <svg viewBox="0 0 480 400" role="presentation" focusable="false">
        <defs>
          <linearGradient id="sv-art-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0a3f86" />
            <stop offset="1" stopColor="#031b3c" />
          </linearGradient>
          <radialGradient id="sv-art-glow" cx="70%" cy="30%" r="60%">
            <stop offset="0" stopColor="#00a7d6" stopOpacity=".35" />
            <stop offset="1" stopColor="#00a7d6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="480" height="400" fill="url(#sv-art-bg)" />
        <rect width="480" height="400" fill="url(#sv-art-glow)" />
        <Grid />
        {variant === "kombi" && <Kombi locale={locale} />}
        {variant === "klima" && <Klima locale={locale} />}
        {variant === "sofben" && <Sofben locale={locale} />}
        {variant === "district" && <District name={name} locale={locale} />}
        {variant === "brand" && <Brand name={name} locale={locale} />}
      </svg>
    </div>
  );
}
