import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
	res.send({ message: "Awesome it works" });
});

import TestRoute from "./routes/api.route";

app.use("/api", TestRoute);

app.use((req, res, next) => {
	next(new createError.NotFound());
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		status: err.status || 500,
		message: err.message,
	});
});

export default app;
