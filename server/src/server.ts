import app from "./app";
import { db } from "./database";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await db.connect();
	console.log(`server listening on port:${PORT}`);
});
