import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const db = {
  async checkConnection(): Promise<void> {
    await prisma.user.findMany().then(() => console.log("DB connection ok"));
  },
};
