import express from "express";

import {
	addToMyList,
	getMyList,
	removeFromMyList,
} from "../controllers/myList.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addToMyList);

router.get("/", protectRoute, getMyList);

router.delete("/:id", protectRoute, removeFromMyList);

export default router;