import type { SVGProps } from "react";
import type { FeatureIconKey } from "@/lib/content/types";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.7 3 4 5.9 4 9s-1.3 6-4 9c-2.7-3-4-5.9-4-9s1.3-6 4-9Z" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Team(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 7a3 3 0 0 1 0 6" />
      <path d="M17 14a5.5 5.5 0 0 1 3.5 5" />
    </svg>
  );
}

export function Badge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 4c0 8-4 13-12 13H4c0-8 4-13 12-13Z" />
      <path d="M4 20c2-6 6-9 12-11" />
    </svg>
  );
}

export function Gauge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="m12 15 4-4" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function Ruler(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="8" width="18" height="8" rx="1" transform="rotate(-45 12 12)" />
      <path d="M9 9.5 10.5 11M12 6.5 13.5 8M15 3.5 16.5 5" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

export function Wrench(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15 6a4 4 0 0 0-5.3 5.3L4 17l3 3 5.7-5.7A4 4 0 0 0 18 9l-2.5 2.5L13 9l2.5-2.5Z" />
    </svg>
  );
}

export function Airflow(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 12h15a3 3 0 1 1-3 3" />
      <path d="M3 16h8a2.5 2.5 0 1 1-2.5 2.5" />
    </svg>
  );
}

export function Efficiency(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
    </svg>
  );
}

export function Control(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8" />
      <circle cx="12" cy="16" r="1.6" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21c4-4 7-7.5 7-11a7 7 0 0 0-14 0c0 3.5 3 7 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MessageCircle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 22 10.5 22 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21H9V9Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 12s0-3.6-.46-5.33a2.78 2.78 0 0 0-1.94-1.94C18.88 4.27 12 4.27 12 4.27s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.67C1 8.4 1 12 1 12s0 3.6.46 5.33a2.78 2.78 0 0 0 1.94 1.94c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.94C23 15.6 23 12 23 12ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function XSocial(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 2H21l-6.5 7.43L22 22h-6.2l-4.86-6.35L5.4 22H2.64l6.95-7.95L2 2h6.36l4.4 5.82L18.24 2Zm-1.09 18h1.7L7.02 3.9H5.2L17.15 20Z" />
    </svg>
  );
}

export function Cap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4 22 9 12 14 2 9 12 4Z" />
      <path d="M6 11v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5" />
      <path d="M22 9v5" />
    </svg>
  );
}

export function Scale(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v18M5 21h14M6 6.5 12 5l6 1.5" />
      <path d="M6 6.5 3 13a3 3 0 0 0 6 0L6 6.5ZM18 6.5 15 13a3 3 0 0 0 6 0L18 6.5Z" />
    </svg>
  );
}

export function Broadcast(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M5.8 5.8a9 9 0 0 0 0 12.4M18.2 5.8a9 9 0 0 1 0 12.4" />
    </svg>
  );
}

export function Institution(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 9 12 4l9 5M4 9h16M3 21h18" />
      <path d="M6 9v8M10 9v8M14 9v8M18 9v8" />
    </svg>
  );
}

export function Partners(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11.5 6.5 13 5a4 4 0 0 1 5.7 5.7L17 12.4" />
      <path d="M12.5 17.5 11 19a4 4 0 0 1-5.7-5.7L7 11.6" />
    </svg>
  );
}

export function Flag(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 21V4M6 4c3-1.6 6 1.6 9 0 2-1 3-1 4 0v9c-1-1-2-1-4 0-3 1.6-6-1.6-9 0" />
    </svg>
  );
}

export function BarChart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20h16" />
      <rect x="6" y="12" width="3.2" height="6" />
      <rect x="11" y="8" width="3.2" height="10" />
      <rect x="16" y="5" width="3.2" height="13" />
    </svg>
  );
}

export function Cube(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}

export function Refresh(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11a8 8 0 1 0-.9 5" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

export function Target(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const milestoneIcons = [Flag, BarChart, Cube, Globe, Refresh, Target];

export const featureIcon: Record<
  FeatureIconKey,
  (props: IconProps) => React.JSX.Element
> = {
  shield: Shield,
  team: Team,
  badge: Badge,
  leaf: Leaf,
  globe: Globe,
  gauge: Gauge,
  ruler: Ruler,
  search: Search,
  wrench: Wrench,
  airflow: Airflow,
  efficiency: Efficiency,
  control: Control,
  cap: Cap,
  scale: Scale,
  broadcast: Broadcast,
  institution: Institution,
  partners: Partners,
};

export const socialIcon = {
  linkedin: LinkedIn,
  instagram: Instagram,
  youtube: YouTube,
  x: XSocial,
} as const;
