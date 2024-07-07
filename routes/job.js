import express from "express";
import { getblogs, postblog, deleteblogs, getAllblogs,   getblogBySlug } from "../controller/blogs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Define routes
router.get("/", getblogs);
router.get("/getAllblogs", getAllblogs);
router.get("/getLatestblogs", getLatestblogs);
router.get("/:id", getblogById);
router.get("/info/:slug", getblogBySlug);
// router.get("/getLatestblogs", getLatestblogs);
router.post("/", auth, postblog);
router.delete("/:id", auth, deleteblogs);

export default router;
