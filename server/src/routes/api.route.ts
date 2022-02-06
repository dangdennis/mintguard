import express from "express";
import { db } from "../database";
import axios from "axios";

const covalent = axios.create({
	baseURL: "https://api.covalenthq.com/v1",
	params: {
		format: "JSON",
		key: process.env.COVALENT_KEY,
	},
});

type TProject = {
	id: string;
	project_name: string;
	contract_address?: string;
	website?: string;
	discord?: string;
	twitter?: string;
	instagram?: string;
	email?: string;
	team_doxxed: boolean;
	risk_score: number;
	upvotes: number;
	downvotes: number;
	chain_id: number;
};

const router = express.Router();

router.post("/projects", async (req, res, next) => {
	const body: {
		website: string;
		upvoted?: boolean;
		downvoted?: boolean;
	} = req.body;

	if (!body.website) {
		res.status(400).send({ message: "website missing" });
		return;
	}

	try {
		const [project] = (
			await db.query<TProject>(`select * from public."Project" where website = $1`, [
				body.website,
			])
		).rows;

		if (project) {
			console.log("existing proj", project);

			// Use the covalent API to check if the address has NFT tokens
			let alteredRisk = 0;
			if (project.contract_address) {
				const {
					data,
				}: {
					data: {
						updated_at: string;
						items: any[];
						pagination: {
							has_more: boolean;
							page_number: number;
							page_size: number;
							total_count: number;
						};
					};
				} = (
					await covalent.get(
						`${project.chain_id}/tokens/${project.contract_address}/nft_token_ids/`
					)
				).data;

				console.log("res", res);

				if (data.pagination.total_count < 50) {
					alteredRisk = 100;
				}
			}

			const [updatedProj] = (
				await db.query(
					`update public."Project" set upvotes=$1, downvotes=$2, risk_score=$3 where website = $4 returning *;`,
					[
						project.upvotes + (body.upvoted ? 1 : 0),
						project.downvotes + (body.downvoted ? 1 : 0),
						alteredRisk,
						body.website,
					]
				)
			).rows;

			console.log("updatedProj", updatedProj);

			res.send({
				data: {
					website: updatedProj.website,
					risk_score: updatedProj.risk_score,
					upvoted: updatedProj.upvotes,
					downvoted: updatedProj.downvotes,
				},
			});

			return;
		} else {
			const [newProj] = (
				await db.query(
					`insert into public."Project" (project_name, website, upvotes, downvotes) values ($1, $2, $3, $4) returning *;`,
					[body.website, body.website, body.upvoted ? 1 : 0, body.downvoted ? 1 : 0]
				)
			).rows;

			console.log("newProj", newProj);

			res.send({
				data: {
					website: newProj.website,
					risk_score: newProj.risk_score,
					upvoted: newProj.upvotes,
					downvoted: newProj.downvotes,
				},
			});

			return;
		}
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "bad" });
	}
});

router.get("/projects", async (req, res, next) => {
	const query = req.query;
	const website = query["website"];

	console.log({
		website,
	});

	if (website) {
		const projects = await db.query(`select * from public."Project" where website = $1`, [
			website,
		]);
		res.send({ data: projects.rows });
		return;
	} else {
		const projects = await db.query(`select * from public."Project" limit 100;`);
		res.send({ data: projects.rows });
	}
});

router.get("/", async (req, res, next) => {
	const result = (await db.query("select 5 + 5 as sum")).rows[0];
	res.send({ message: result.sum });
});

export default router;
