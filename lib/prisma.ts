import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as {
	prisma?: PrismaClient;
};

const db_url = process.env.DEV_DB ?? process.env.DIRECT_URL;
if (!db_url) {
	throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
	connectionString: db_url,
});

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		adapter,
		log:
			process.env.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export const dynamic = "force-dynamic";
