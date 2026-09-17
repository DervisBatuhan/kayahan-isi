import { describe, expect, it } from "vitest";
import { toEmbedUrl, isVideoType } from "@/lib/content/ported/certificates-shared";
import { pressSchema } from "@/lib/content/ported/expansion";
import { expansionDefaults } from "@/lib/content/ported/expansion";

describe("press news media", () => {
  it("turns YouTube / Vimeo page links into privacy embeds", () => {
    expect(toEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
    expect(toEmbedUrl("https://youtu.be/dQw4w9WgXcQ?t=10")).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
    expect(toEmbedUrl("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
    expect(toEmbedUrl("https://vimeo.com/123456789")).toBe("https://player.vimeo.com/video/123456789");
  });
  it("rejects anything that is not a known video host", () => {
    expect(toEmbedUrl("https://evil.example/embed/x")).toBeNull();
    expect(toEmbedUrl("http://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(toEmbedUrl("javascript:alert(1)")).toBeNull();
    expect(toEmbedUrl("not a url")).toBeNull();
  });
  it("classifies uploaded media", () => {
    expect(isVideoType("video/mp4")).toBe(true);
    expect(isVideoType("image/webp")).toBe(false);
  });
  it("news items accept optional media fields and default them", () => {
    const parsed = pressSchema.parse(expansionDefaults.press);
    expect(parsed.news[0]).toMatchObject({ mediaUrl: "", mediaType: "", mediaName: "", embedUrl: "" });
    const withMedia = pressSchema.parse({
      ...expansionDefaults.press,
      news: [{ ...parsed.news[0], mediaUrl: "https://x.public.blob.vercel-storage.com/a.mp4", mediaType: "video/mp4", mediaName: "a.mp4" }],
    });
    expect(withMedia.news[0].mediaType).toBe("video/mp4");
  });
});
