/**
 * Certificate item shape + helpers. Pure module — safe to import from both
 * client components and server code. No side effects, no server-only deps.
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

export const CERT_ACCEPT = ".pdf,image/png,image/jpeg,image/webp";
export const CERT_ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
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
