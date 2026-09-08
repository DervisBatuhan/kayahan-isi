import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Minimal Vitest setup for the pure/synchronous modules under `lib/`.
 * Node environment is enough — no jsdom, no React rendering here.
 * The `@/` alias mirrors tsconfig `paths` so `lib/**` imports resolve.
 */
const rootDir = fileURLToPath(new URL(".", import.meta.url)).replace(/\/$/, "");

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
});
