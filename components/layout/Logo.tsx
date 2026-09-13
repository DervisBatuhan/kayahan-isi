import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";

/**
 * Official Kayahan Isı logo — served straight from the supplied vector
 * artwork (public/brand/kayahan-logo-source.svg), cropped to the wordmark +
 * sun and matted onto a transparent background (not a flattened white box):
 *   - kayahan-logo.svg         full colour, for light surfaces (header)
 *   - kayahan-logo-footer.svg  navy "KAYA" recoloured white, for the dark footer
 * `unoptimized` skips Next's raster image pipeline, which doesn't touch SVGs.
 */

const LOGO_W = 1232;
const LOGO_H = 489;

export function Logo({
  brand,
  href,
  tone = "dark",
}: {
  brand: SiteContent["brand"];
  href: string;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <Link
      href={href}
      aria-label={`${brand.name} ${brand.tagline}`}
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={isLight ? "/brand/kayahan-logo-footer.svg" : "/brand/kayahan-logo.svg"}
        alt={`${brand.name} ${brand.tagline}`}
        width={LOGO_W}
        height={LOGO_H}
        priority={!isLight}
        unoptimized
        className={isLight ? "h-11 w-auto" : "h-[42px] w-auto sm:h-[46px]"}
      />
    </Link>
  );
}
