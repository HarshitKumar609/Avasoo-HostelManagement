import express from "express";
import { stripeWebhook } from "../controllers/stripeWebhookController.js";

const router = express.Router();

// Stripe requires RAW body
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

export default router;
