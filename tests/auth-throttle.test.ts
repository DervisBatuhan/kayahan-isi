import { describe, it, expect, vi, beforeEach } from "vitest";

// `lib/auth.ts` starts with `import "server-only"`, which throws outside a
// Next Server Component module graph. Stub it so the module loads under Vitest.
vi.mock("server-only", () => ({}));

/**
 * `lib/auth.ts` pulls in `next/headers` (via other exports) and a real
 * PrismaClient at import time. We only exercise the brute-force throttle
 * helpers here, so `@/lib/db` is mocked and `next/headers` never needs to be
 * touched by these two functions.
 */
const findMany = vi.fn();
const create = vi.fn();
const deleteMany = vi.fn();
vi.mock("@/lib/db", () => ({
  prisma: {
    loginAttempt: { findMany, create, deleteMany },
  },
}));

describe("lib/auth — checkLoginThrottle", () => {
  beforeEach(() => {
    findMany.mockReset();
    create.mockReset();
    deleteMany.mockReset();
  });

  it("never locks out an empty IP", async () => {
    const { checkLoginThrottle } = await import("@/lib/auth");
    const res = await checkLoginThrottle("");
    expect(res).toEqual({ locked: false, retryAfterSec: 0 });
    expect(findMany).not.toHaveBeenCalled();
  });

  it("does not lock when failures are under the 5-attempt threshold", async () => {
    findMany.mockResolvedValueOnce([
      { createdAt: new Date() },
      { createdAt: new Date() },
    ]);
    const { checkLoginThrottle } = await import("@/lib/auth");
    const res = await checkLoginThrottle("1.2.3.4");
    expect(res.locked).toBe(false);
  });

  it("locks once 5+ failures land inside the 15-minute window", async () => {
    const now = Date.now();
    findMany.mockResolvedValueOnce(
      Array.from({ length: 5 }, (_, i) => ({ createdAt: new Date(now - i * 1000) })),
    );
    const { checkLoginThrottle } = await import("@/lib/auth");
    const res = await checkLoginThrottle("1.2.3.4");
    expect(res.locked).toBe(true);
    expect(res.retryAfterSec).toBeGreaterThan(0);
  });

  it("fails open (does not lock) when the DB query throws", async () => {
    findMany.mockRejectedValueOnce(new Error("db down"));
    const { checkLoginThrottle } = await import("@/lib/auth");
    const res = await checkLoginThrottle("1.2.3.4");
    expect(res).toEqual({ locked: false, retryAfterSec: 0 });
  });
});

describe("lib/auth — recordLoginAttempt", () => {
  beforeEach(() => {
    findMany.mockReset();
    create.mockReset();
    deleteMany.mockReset();
    create.mockResolvedValue({});
    deleteMany.mockResolvedValue({ count: 0 });
  });

  it("records a failed attempt and does not clear the IP's slate", async () => {
    const { recordLoginAttempt } = await import("@/lib/auth");
    await recordLoginAttempt("1.2.3.4", "user@example.com", false);
    expect(create).toHaveBeenCalledWith({
      data: { ip: "1.2.3.4", email: "user@example.com", ok: false },
    });
    // only the stale-row prune runs, not the "clear this IP" prune
    expect(deleteMany).toHaveBeenCalledTimes(1);
  });

  it("clears the IP's failure history on a successful login", async () => {
    const { recordLoginAttempt } = await import("@/lib/auth");
    await recordLoginAttempt("1.2.3.4", "user@example.com", true);
    // one prune for the IP's failures, one prune for stale rows
    expect(deleteMany).toHaveBeenCalledTimes(2);
    expect(deleteMany).toHaveBeenNthCalledWith(1, { where: { ip: "1.2.3.4", ok: false } });
  });

  it("falls back to 'unknown' for a blank IP and truncates a long email", async () => {
    const { recordLoginAttempt } = await import("@/lib/auth");
    const longEmail = "a".repeat(200) + "@example.com";
    await recordLoginAttempt("", longEmail, false);
    const args = create.mock.calls[0][0];
    expect(args.data.ip).toBe("unknown");
    expect(args.data.email.length).toBe(160);
  });

  it("swallows a DB error instead of throwing", async () => {
    create.mockRejectedValueOnce(new Error("db down"));
    const { recordLoginAttempt } = await import("@/lib/auth");
    await expect(recordLoginAttempt("1.2.3.4", "user@example.com", false)).resolves.toBeUndefined();
  });
});
