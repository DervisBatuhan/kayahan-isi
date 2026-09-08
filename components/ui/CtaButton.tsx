import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

type Variant = "solid" | "outline" | "light" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  solid: "bg-navy-700 text-white hover:bg-navy-600 border border-navy-700",
  outline:
    "bg-transparent text-navy-700 border border-navy-700 hover:bg-navy-700 hover:text-white",
  light:
    "bg-white text-navy-800 border border-white hover:bg-transparent hover:text-white",
  ghost:
    "bg-white/10 text-white border border-white/30 hover:bg-white hover:text-navy-800",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[12px]",
  sm: "px-4 py-2.5 text-[11px]",
};

export function CtaButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  withArrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-[3px] font-bold uppercase tracking-label transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
