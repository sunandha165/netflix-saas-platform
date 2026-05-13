import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

	res.cookie("jwt-netflix", token, {
	httpOnly: true,
	secure: true,
	sameSite: "none",
	maxAge: 15 * 24 * 60 * 60 * 1000,
});

	return token;
};
