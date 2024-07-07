import express from "express";
import { createSubscription, getAllSubscriptions, getSubscriptionById } from "../controller/subscription.js";

const router = express.Router();

router.post("/", createSubscription);
router.get("/", getAllSubscriptions);
router.get("/:id", getSubscriptionById);

export default router;
