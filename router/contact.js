import express from "express";
import { createContact, getAllContacts, getContactById } from "../controller/contact.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);

export default router;