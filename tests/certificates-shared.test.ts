import { describe, it, expect } from "vitest";
import {
  normalizeCertItems,
  isImageType,
  isBlobUrl,
  CERT_ALLOWED_TYPES,
  CERT_MAX_BYTES,
} from "@/lib/content/ported/certificates-shared";

describe("lib/content/ported/certificates-shared — normalizeCertItems", () => {
  it("returns an empty array for non-array input", () => {
    expect(normalizeCertItems(undefined)).toEqual([]);
    expect(normalizeCertItems(null)).toEqual([]);
    expect(normalizeCertItems("nope")).toEqual([]);
  });

  it("upgrades legacy string items into the full CertItem shape", () => {
    expect(normalizeCertItems(["TSE Belgesi"])).toEqual([
      { title: "TSE Belgesi", fileUrl: "", fileName: "", contentType: "" },
    ]);
  });

  it("passes through a well-formed object item", () => {
    const item = { title: "ISO 9001", fileUrl: "https://x/y.pdf", fileName: "iso.pdf", contentType: "application/pdf" };
    expect(normalizeCertItems([item])).toEqual([item]);
  });

  it("fills missing/invalid keys on a partial object with safe defaults", () => {
    expect(normalizeCertItems([{ title: "Only title", fileUrl: 42 }])).toEqual([
      { title: "Only title", fileUrl: "", fileName: "", contentType: "" },
    ]);
  });

  it("handles null entries inside the array without throwing", () => {
    expect(normalizeCertItems([null])).toEqual([
      { title: "", fileUrl: "", fileName: "", contentType: "" },
    ]);
  });
});

describe("lib/content/ported/certificates-shared — isImageType", () => {
  it("recognises image/* content types", () => {
    expect(isImageType("image/png")).toBe(true);
    expect(isImageType("image/jpeg")).toBe(true);
  });

  it("rejects non-image content types", () => {
    expect(isImageType("application/pdf")).toBe(false);
    expect(isImageType("")).toBe(false);
  });
});

describe("lib/content/ported/certificates-shared — isBlobUrl", () => {
  it("accepts a Vercel Blob public storage URL", () => {
    expect(isBlobUrl("https://abc123.public.blob.vercel-storage.com/cert.pdf")).toBe(true);
  });

  it("rejects a non-Blob host", () => {
    expect(isBlobUrl("https://evil.example.com/cert.pdf")).toBe(false);
  });

  it("rejects a malformed URL instead of throwing", () => {
    expect(isBlobUrl("not-a-url")).toBe(false);
    expect(isBlobUrl("")).toBe(false);
  });
});

describe("lib/content/ported/certificates-shared — constants", () => {
  it("only allows the five documented content types", () => {
    expect(CERT_ALLOWED_TYPES).toEqual([
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ]);
  });

  it("caps uploads at 15MB", () => {
    expect(CERT_MAX_BYTES).toBe(15 * 1024 * 1024);
  });
});
