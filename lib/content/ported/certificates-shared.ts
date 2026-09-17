/**
 * Certificate item shape + helpers. Pure module — safe to import from both
 * client components and server code. No side effects, no server-only deps.
 *
 * Also reused as-is for solution-partner logos (same title/fileUrl shape via
 * the generic "fileCardList" editor field) — see `PartnerItem` below.
 */

export type CertItem = {
  title: string;
  /** Vercel Blob public URL, or "" when no file has been uploaded yet. */
  fileUrl: string;
  /** Original filename, shown in the panel and used as the download name. */
  fileName: string;
  /** MIME type, e.g. "application/pdf" or "image/png". */
  contentType: string;
};

/** The design's item list used to be a plain `string[]` (names only). Accept
 *  both that legacy shape and the current object shape so old DB rows and the
 *  static defaults keep rendering. */
export function normalizeCertItems(items: unknown): CertItem[] {
  if (!Array.isArray(items)) return [];
  return items.map((x) => {
    if (typeof x === "string") {
      return { title: x, fileUrl: "", fileName: "", contentType: "" };
    }
    const o = (x ?? {}) as Record<string, unknown>;
    return {
      title: typeof o.title === "string" ? o.title : "",
      fileUrl: typeof o.fileUrl === "string" ? o.fileUrl : "",
      fileName: typeof o.fileName === "string" ? o.fileName : "",
      contentType: typeof o.contentType === "string" ? o.contentType : "",
    };
  });
}

export const CERT_ACCEPT = ".pdf,image/png,image/jpeg,image/webp,image/svg+xml";
export const CERT_ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
] as const;
export const CERT_MAX_BYTES = 15 * 1024 * 1024;

export function isImageType(contentType: string): boolean {
  return contentType.startsWith("image/");
}

/** Guard for deletes: only ever touch files that live in our Blob store. */
export function isBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

/** Solution-partner logo item — identical shape to a certificate item. */
export type PartnerItem = CertItem;
export const normalizePartnerItems = normalizeCertItems;

/* ── news media (image or video per press item) ─────────────────────────── */
export const MEDIA_ACCEPT = "image/png,image/jpeg,image/webp,video/mp4,video/webm,video/quicktime";
export const MEDIA_ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;
export const MEDIA_MAX_BYTES = 200 * 1024 * 1024;

export function isVideoType(contentType: string): boolean {
  return contentType.startsWith("video/");
}

/** YouTube / Vimeo page URL → privacy-friendly embed URL, or null if unrecognised. */
export function toEmbedUrl(input: string): string | null {
  let u: URL;
  try {
    u = new URL(input.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.replace(/^www\.|^m\./, "");
  const ytId = (id: string | null) => (id && /^[\w-]{6,20}$/.test(id) ? id : null);
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id =
      ytId(u.searchParams.get("v")) ??
      ytId(u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1] ?? null);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "youtu.be") {
    const id = ytId(u.pathname.slice(1));
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = u.pathname.match(/(\d{6,12})/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  return null;
}
