import express from "express";
import { db, prisma } from "../database";

const router = express.Router();

router.get("/projects", async (req, res, next) => {
	const projects = await prisma.project.findMany();
	console.log({ projects });
	res.send({ data: projects });
});

router.get("/", async (req, res, next) => {
	const result = (await db.query("select 5 + 5 as sum")).rows[0];
	res.send({ message: result.sum });
});

export default router;
