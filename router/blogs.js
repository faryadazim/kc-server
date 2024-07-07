import express from "express";
import { getblogs, postblog, deleteblogs, getAllblogs, getLatestblogs,getblogById,  getblogBySlug } from "../controller/blogs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Define routes
router.post("/", auth, postblog);
router.get("/", getblogs);
router.get("/getAllblogs", getAllblogs);
router.get("/getLatestblogs", getLatestblogs);
router.get("/:id", getblogById);
router.get("/info/:slug", getblogBySlug);
// router.get("/getLatestblogs", getLatestblogs);
router.delete("/:id", auth, deleteblogs);

export default router;
