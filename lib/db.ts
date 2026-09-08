import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Local dev uses a plain SQLite file (`DATABASE_URL=file:./dev.db`).
 * Production points at Turso: set `DATABASE_URL=libsql://<db>.turso.io` and
 * `DATABASE_AUTH_TOKEN=<token>` — that switches to the libSQL driver adapter.
 */
function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "";
  const logLevel: ("error" | "warn")[] =
    process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"];

  if (url.startsWith("libsql://") || url.startsWith("https://")) {
    const adapter = new PrismaLibSQL({
      url,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    });
    return new PrismaClient({ adapter, log: logLevel });
  }

  return new PrismaClient({ log: logLevel });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
