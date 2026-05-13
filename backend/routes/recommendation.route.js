import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import {
	generateRecommendations,
} from "../controllers/recommendation.controller.js";

const router = express.Router();

router.get(
	"/",
	protectRoute,
	generateRecommendations
);

export default router;