import app from "./app";
import { db } from "./database";

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, "0.0.0.0", async () => {
	await db.connect();
	if (process.env.NODE_ENV !== "production") {
		console.log(`server listening on http://localhost:3000/`);
	} else {
		console.log(`server listening on port ${PORT}`);
	}
});
