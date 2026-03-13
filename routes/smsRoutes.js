import express from "express";
import { sendSMS } from "../controllers/smsController.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.post("/send", apiKeyAuth, sendSMS);

export default router;