import express from "express";
import { changePassword, signin, signup } from "../controller/user.js";

const router = express.Router();

// User routes
router.post("/signup", signup);
router.post("/login", signin);
router.put("/changePassword", changePassword);

export default router;
