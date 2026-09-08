import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";

/**
 * Official Kayahan Isı logo, cropped from the supplied artwork
 * (public/assets/kayahan-logo-source.png) to the wordmark + sun, matted onto
 * a transparent background (not a flattened white box):
 *   - kayahan-logo.png         full colour, for light surfaces (header)
 *   - kayahan-logo-footer.png  navy "KAYA" recoloured white, for the dark footer
 */

const LOGO_W = 837;
const LOGO_H = 330;

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
        src={isLight ? "/brand/kayahan-logo-footer.png" : "/brand/kayahan-logo.png"}
        alt={`${brand.name} ${brand.tagline}`}
        width={LOGO_W}
        height={LOGO_H}
        priority={!isLight}
        className={isLight ? "h-11 w-auto" : "h-[42px] w-auto sm:h-[46px]"}
      />
    </Link>
  );
}
