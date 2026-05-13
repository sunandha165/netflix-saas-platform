import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import {
	upgradeSubscription,
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post(
	"/upgrade",
	protectRoute,
	upgradeSubscription
);

export default router;