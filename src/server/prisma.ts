import { PrismaClient } from "@prisma/client";
import { prisma } from "./database";

export interface Context {
  prisma: PrismaClient;
}

export const createContext = async () => ({
  prisma: prisma,
});
