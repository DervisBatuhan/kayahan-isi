import type { NextConfig } from "next";

// Content-Security-Policy. `script-src` keeps 'unsafe-inline' because there is no
// nonce pipeline yet (Next's bootstrap + the JSON-LD blocks are inline); the rest
// of the policy still adds real defense-in-depth. GA endpoints are allow-listed.
// React's dev build needs eval() for debugging; production never does.
const scriptSrc =
  "'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com" +
  (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.public.blob.vercel-storage.com",
  "font-src 'self' data:",
  // Vercel Blob client uploads: the browser fetches the SDK API at vercel.com,
  // then reads/writes the file at *.public.blob.vercel-storage.com.
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com https://vercel.com https://blob.vercel-storage.com https://*.public.blob.vercel-storage.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * The previous site (kombiservisdemirdokum.com) is being retired. Once that
 * domain is attached to this Vercel project every old URL 301s to its closest
 * equivalent here, so existing rankings, bookmarks and backlinks carry over.
 * Host-matched, so the rules are inert for kayahanisi.com itself.
 */
const OLD_HOST = { type: "host" as const, value: "(www\\.)?kombiservisdemirdokum\\.com" };
const OLD_SITE_MAP: [string, string][] = [
  ["/", "/tr/kombi-servisi"],
  ["/hakkimizda", "/tr/kurumsal/hakkimizda"],
  ["/sayfa/hakkimizda", "/tr/kurumsal/hakkimizda"],
  ["/hizmetler", "/tr/kombi-servisi"],
  ["/hizmet/kombi-hizmetlerimiz", "/tr/kombi-servisi"],
  ["/hizmet/klima-hizmetlerimiz", "/tr/klima-servisi"],
  ["/hizmet/sofben-hizmetlerimiz", "/tr/sofben-servisi"],
  ["/hizmet-noktalarimiz", "/tr/servis/bahcelievler"],
  ["/galeriler", "/tr/galeri"],
  ["/galeri", "/tr/galeri"],
  ["/galeri/bizden-kareler", "/tr/galeri"],
  ["/galeri/sertifikalarimiz", "/tr/kurumsal/sertifikalarimiz"],
  ["/iletisim", "/tr/iletisim"],
  ["/cerez-politikasi", "/tr"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.kayahanisi.com";
    // Trailing-slash variants need no rules: Next normalises them first.
    const exact = OLD_SITE_MAP.map(([from, to]) => ({
      source: from,
      has: [OLD_HOST],
      destination: `${base}${to}`,
      permanent: true,
    }));
    return [
      ...exact,
      // Anything else on the old host → Turkish home.
      { source: "/:path*", has: [OLD_HOST], destination: `${base}/tr`, permanent: true },
    ];
  },
};

export default nextConfig;
