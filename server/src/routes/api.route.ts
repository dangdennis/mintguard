import express from "express";
import { db, prisma } from "../database";

const router = express.Router();

router.post("/projects", async (req, res, next) => {
	const body: {
		website: string;
		upvoted?: boolean;
		downvoted?: boolean;
	} = req.body;

	try {
		// todo some additional work here to calculate risk score

		const project = await prisma.project.findFirst({
			where: {
				website: {
					contains: body.website,
				},
			},
		});

		const d = await prisma.project.upsert({
			create: {
				project_name: body.website,
				website: body.website,
			},
			update: {
				upvotes: (project?.upvotes ?? 0) + (body.upvoted ? 1 : 0),
				downvotes: (project?.downvotes ?? 0) + (body.downvoted ? 1 : 0),
			},
			where: {
				website: body.website,
			},
		});

		res.send({
			data: {
				website: d.website,
				risk_score: d.risk_score,
				upvoted: d.upvotes,
				downvoted: d.downvotes,
			},
			message: "thanks",
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "bad" });
	}
});

router.get("/projects", async (req, res, next) => {
	const query = req.query;
	const addr = query["address"];
	const website = query["website"];

	console.log({
		addr,
		website,
	});

	if (addr && website) {
		const result = await db.query(
			`select * from "Project" where contract_address = $1 or website ilike $2`,
			[addr, `%${query["website"]?.toString()}%`]
		);
		res.send({ data: result.rows });
		return;
	} else if (addr) {
		const projects = await prisma.project.findMany({
			take: 10,
			where: {
				contract_address: addr.toString(),
			},
		});
		res.send({ data: projects });
		return;
	} else if (website) {
		const projects = await prisma.project.findMany({
			take: 10,
			where: {
				website: {
					contains: website.toString(),
				},
			},
		});
		res.send({ data: projects });
		return;
	} else {
		const projects = await prisma.project.findMany({
			take: 100,
		});
		res.send({ data: projects });
	}
});

router.get("/", async (req, res, next) => {
	const result = (await db.query("select 5 + 5 as sum")).rows[0];
	res.send({ message: result.sum });
});

export default router;
