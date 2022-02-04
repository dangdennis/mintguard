import { PrismaClient } from "@prisma/client";
import pg from "pg";

export const prisma = new PrismaClient();

export const db = new pg.Client({
	connectionString: process.env.MINTGUARD_DATABASE_URL,
});
