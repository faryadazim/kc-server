import express from "express";
import { getblogs, postblog, deleteblogs, getAllblogs, getLatestblogs,getblogById,  getblogBySlug, getFeturedBlogs } from "../controller/blogs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Define routes
router.post("/",  postblog);
router.get("/", getblogs);
router.get("/getAllblogs", getAllblogs);
router.get("/getLatestblogs", getLatestblogs);
router.get("/getFeaturedblogs", getFeturedBlogs);
router.get("/:id", getblogById); 
router.get("/detail/:slug", getblogBySlug);
// router.get("/getLatestblogs", getLatestblogs);
router.delete("/:id", auth, deleteblogs);

export default router;
