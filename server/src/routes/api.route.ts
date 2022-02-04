import express from "express";
import { db } from "../database";
const router = express.Router();

router.get("/", async (req, res, next) => {
	const result = (await db.query("select 5 + 5 as sum")).rows[0];
	res.send({ message: result.sum });
});

export default router;
