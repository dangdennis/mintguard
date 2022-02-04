import express from "express";
const router = express.Router();
router.get("/", async (req, res, next) => {
    res.send({ message: "Ok api is working 🚀" });
});
export default router;
