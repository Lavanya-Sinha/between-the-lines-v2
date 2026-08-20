import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";

const caPath = "/etc/secrets/aiven-ca.pem";

const ssl = fs.existsSync(caPath)
    ? {
          ca: fs.readFileSync(caPath, "utf8"),
          rejectUnauthorized: true,
      }
    : undefined;

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    ...(ssl && { ssl }),
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;