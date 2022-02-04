import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

import APIRoute from "./routes/api.route";

app.use("/", APIRoute);

app.use((req, res, next) => {
	next(new createError.NotFound());
});

app.use((err: any, _req: any, res: any, _next: any) => {
	res.status(err.status || 500);
	res.send({
		status: err.status || 500,
		message: err.message,
	});
});

export default app;
