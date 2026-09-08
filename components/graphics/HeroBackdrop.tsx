/**
 * Hero backdrop — a modern building drawn as a 3D wireframe in perspective with
 * vivid "energy" ribbons flowing across it (blue → cyan → yellow → orange → red).
 * Stylised interpretation of the reference mockup's CGI render.
 */
export function HeroBackdrop({ className = "" }: { className?: string }) {
  const ribbons = Array.from({ length: 26 }).map((_, i) => {
    const t = i / 25;
    const y0 = 470 - t * 360; // start heights, lower-left → upper area
    const y1 = 330 - t * 300; // end heights, sweeping up-right
    const cy1 = y0 - 40 - Math.sin(t * Math.PI) * 60;
    const cy2 = y1 + 30 + Math.cos(t * Math.PI) * 50;
    return {
      d: `M-60 ${y0} C 240 ${cy1}, 560 ${cy2}, 1080 ${y1}`,
      w: 1 + (i % 4 === 0 ? 1.4 : 0.4),
      o: 0.28 + (i % 3 === 0 ? 0.4 : 0.16),
      glow: i % 5 === 0,
    };
  });

  return (
    <svg
      className={className}
      viewBox="0 0 1000 620"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hb-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f7fd1" stopOpacity="0" />
          <stop offset="0.12" stopColor="#2f7fd1" />
          <stop offset="0.4" stopColor="#55c0e6" />
          <stop offset="0.62" stopColor="#fdb913" />
          <stop offset="0.82" stopColor="#f58220" />
          <stop offset="1" stopColor="#d71920" />
        </linearGradient>
        <linearGradient id="hb-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f7fd1" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2f7fd1" stopOpacity="0.02" />
        </linearGradient>
        <filter id="hb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* perspective ground grid */}
      <g stroke="#cdddee" strokeWidth="1">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`gv${i}`} x1={140 + i * 52} y1="150" x2={-260 + i * 190} y2="620" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`gh${i}`} x1={70 - i * 10} y1={250 + i * 46} x2={980 + i * 12} y2={250 + i * 46} />
        ))}
      </g>

      {/* --- Building: 3D wireframe --- */}
      {/* roof */}
      <polygon points="300,112 620,150 800,92 480,52" fill="url(#hb-glass)" stroke="#1f5fa8" strokeWidth="1.3" strokeOpacity="0.7" />
      {/* front face */}
      <polygon points="300,112 620,150 620,470 300,430" fill="url(#hb-glass)" stroke="#1f5fa8" strokeWidth="1.3" strokeOpacity="0.7" />
      {/* right face */}
      <polygon points="620,150 800,92 800,410 620,470" fill="#2f7fd1" fillOpacity="0.05" stroke="#2f7fd1" strokeWidth="1.2" strokeOpacity="0.55" />

      {/* front-face floor slabs */}
      <g stroke="#3a86cf" strokeWidth="1" strokeOpacity="0.4">
        {[0.16, 0.33, 0.5, 0.67, 0.84].map((f) => (
          <line
            key={`ff${f}`}
            x1={300}
            y1={112 + (430 - 112) * f}
            x2={620}
            y2={150 + (470 - 150) * f}
          />
        ))}
        {/* front-face mullions */}
        {Array.from({ length: 9 }).map((_, i) => {
          const p = (i + 1) / 10;
          return (
            <line
              key={`fm${i}`}
              x1={300 + 320 * p}
              y1={112 + 38 * p}
              x2={300 + 320 * p}
              y2={430 + 40 * p}
            />
          );
        })}
      </g>

      {/* right-face floor slabs + mullions */}
      <g stroke="#2f7fd1" strokeWidth="1" strokeOpacity="0.35">
        {[0.16, 0.33, 0.5, 0.67, 0.84].map((f) => (
          <line
            key={`rf${f}`}
            x1={620}
            y1={150 + (470 - 150) * f}
            x2={800}
            y2={92 + (410 - 92) * f}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => {
          const p = (i + 1) / 6;
          return (
            <line
              key={`rm${i}`}
              x1={620 + 180 * p}
              y1={150 - 58 * p}
              x2={620 + 180 * p}
              y2={470 - 60 * p}
            />
          );
        })}
      </g>

      {/* a lower secondary block on the left */}
      <g stroke="#2f7fd1" strokeWidth="1.1" strokeOpacity="0.45" fill="none">
        <polygon points="150,300 300,270 300,470 150,520" fill="url(#hb-glass)" />
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={`lf${f}`} x1={150} y1={300 + 220 * f} x2={300} y2={270 + 200 * f} />
        ))}
        <line x1={225} y1={285} x2={225} y2={495} strokeOpacity="0.3" />
      </g>

      {/* --- Energy ribbons --- */}
      <g fill="none">
        {ribbons.map((r, i) => (
          <path
            key={i}
            d={r.d}
            stroke="url(#hb-ribbon)"
            strokeWidth={r.w}
            strokeOpacity={r.o}
            strokeLinecap="round"
            filter={r.glow ? "url(#hb-glow)" : undefined}
          />
        ))}
      </g>

      {/* particles */}
      <g>
        {[
          [250, 300, "#2f7fd1"],
          [430, 260, "#55c0e6"],
          [620, 210, "#fdb913"],
          [780, 180, "#f58220"],
          [900, 210, "#d71920"],
          [520, 330, "#55c0e6"],
        ].map(([x, y, c], i) => (
          <circle key={i} cx={x as number} cy={y as number} r={i % 2 ? 2.4 : 3.2} fill={c as string} />
        ))}
      </g>
    </svg>
  );
}
