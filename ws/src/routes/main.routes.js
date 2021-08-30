import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	try {
		res.json([]);
	} catch (err) {
		res.json({ error: true, message: err.message });
	}
});

export default router;
