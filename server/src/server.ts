import app from "./app";
import { db } from "./database";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await db.connect();
	console.log(`http://localhost:${PORT}`);
});
