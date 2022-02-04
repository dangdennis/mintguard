import app, { db } from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await db.connect();
	console.log(`http://localhost:${PORT}`);
});
