/**
 * Line-drawn building cross-section with supply (blue) and return (red) HVAC
 * runs — used in the "engineering-driven solutions" section.
 */
export function BuildingDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 380"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* shell */}
      <g stroke="#9aa8bf" strokeWidth="1.2">
        <path d="M70 70 L400 70 L450 112 L450 340 L70 340 Z" />
        <path d="M70 70 L70 340 M120 70 L120 340" />
        <path d="M70 112 L450 112 M70 168 L450 168 M70 224 L450 224 M70 280 L450 280" />
        <path d="M400 70 L400 340 M450 112 L400 112" strokeOpacity="0.5" />
      </g>

      {/* rooms + windows */}
      <g stroke="#c2ccdc" strokeWidth="1">
        {[128, 184, 240, 296].map((y) =>
          [150, 205, 260, 315, 370].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="30" height="26" />
          )),
        )}
        <path d="M120 112 L120 340" strokeDasharray="3 4" strokeOpacity="0.6" />
      </g>

      {/* roof AHU */}
      <g stroke="#9aa8bf" strokeWidth="1.2">
        <rect x="235" y="44" width="80" height="26" />
        <path d="M248 44 L248 34 L302 34 L302 44" />
        <circle cx="262" cy="57" r="6" />
        <circle cx="288" cy="57" r="6" />
      </g>

      {/* supply air — blue */}
      <g stroke="#2f7fd1" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M40 140 L150 140 L150 200 L360 200" />
        <path d="M150 140 L150 262 L300 262" />
        <path d="M360 200 L360 150 M300 262 L300 210 M240 200 L240 240" />
      </g>
      <g fill="#2f7fd1">
        {[[150, 140], [360, 150], [300, 210], [240, 240]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.6" />
        ))}
      </g>

      {/* return air — red */}
      <g stroke="#d71920" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M470 312 L380 312 L380 250 L210 250" />
        <path d="M380 312 L380 132 L235 132" />
        <path d="M210 250 L210 290 M235 132 L235 172 M330 250 L330 210" />
      </g>
      <g fill="#d71920">
        {[[380, 312], [210, 290], [235, 172], [330, 210]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.6" />
        ))}
      </g>
    </svg>
  );
}
