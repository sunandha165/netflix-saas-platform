import express from "express";

import {
	saveContinueWatching,
	getContinueWatching,
} from "../controllers/continueWatching.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post(
	"/",
	protectRoute,
	saveContinueWatching
);

router.get(
	"/",
	protectRoute,
	getContinueWatching
);

export default router;