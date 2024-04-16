import { PrismaClient } from "@prisma/client";

type Mode = "development" | "production" | "test";

let env = process.env.NODE_ENV;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      // @ts-expect-error
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// @ts-expect-error
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;