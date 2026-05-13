import { User } from "../models/user.model.js";

export async function saveContinueWatching(req, res) {
	try {
		const { movie, progress } = req.body;

		const user = await User.findById(req.user._id);

		const existingMovie =
			user.continueWatching.find(
				(item) => item.id === movie.id
			);

		if (existingMovie) {
			existingMovie.progress = progress;
		} else {
			user.continueWatching.push({
				...movie,
				progress,
			});
		}

		await user.save();

		res.status(200).json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
}

export async function getContinueWatching(req, res) {
	try {
		const user = await User.findById(req.user._id);

		res.status(200).json({
			success: true,
			continueWatching:
				user.continueWatching,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
}