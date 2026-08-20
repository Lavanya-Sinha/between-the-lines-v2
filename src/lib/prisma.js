import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        ca: fs.readFileSync(
            "/etc/secrets/aiven-ca.pem",
            "utf8"
        ),
        rejectUnauthorized: true,
    },
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;