import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import continueWatchingRoutes from "./routes/continueWatching.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import subscriptionRoutes from "./routes/subscription.route.js";
import myListRoutes from "./routes/myList.route.js";
import recommendationRoutes from "./routes/recommendation.route.js";

const app = express();
app.use(
	cors({
		origin:
			"https://netflix-saas-platform.vercel.app",
		credentials: true,
	})
);

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use(
	"/api/v1/continue-watching",
	continueWatchingRoutes
);
app.use(
	"/api/v1/subscription",
	subscriptionRoutes
);
app.use(
	"/api/v1/recommendations",
	recommendationRoutes
);

app.use("/api/v1/mylist", myListRoutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
//5tXl07ozfZYGAhbh
//mongodb+srv://vajrapusunandhamani_db_user:5tXl07ozfZYGAhbh@cluster0.nhh5mwx.mongodb.net/?appName=Cluster0