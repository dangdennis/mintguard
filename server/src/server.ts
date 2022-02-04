import app from "./app";
import { db, prisma } from "./database";

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, async () => {
	await db.connect();
	if (process.env.NODE_ENV !== "production") {
		console.log(`server listening on http://localhost:3000/`);
	} else {
		console.log(`server listening on port ${PORT}`);
	}
});
