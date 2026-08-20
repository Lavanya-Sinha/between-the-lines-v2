import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";

let ssl;

try {
    ssl = {
        ca: fs.readFileSync(
            "/etc/secrets/aiven-ca.pem",
            "utf8"
        ),
        rejectUnauthorized: true,
    };
} catch {
    ssl = undefined;
}

const adapter = new PrismaPg({
    connectionString:
        process.env.DATABASE_URL,
    ...(ssl && { ssl }),
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;