import { User } from "../models/user.model.js";

export async function addToMyList(req, res) {
	try {
		const { movie } = req.body;

		const user = await User.findById(req.user._id);

		const alreadyExists = user.myList.find(
			(item) => item.id === movie.id
		);

		if (alreadyExists) {
			return res.status(400).json({
				success: false,
				message: "Movie already in list",
			});
		}

		user.myList.push(movie);

		await user.save();

		res.status(200).json({
			success: true,
			myList: user.myList,
		});
	} catch (error) {
		console.log(error.message);

		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

export async function getMyList(req, res) {
	try {
		const user = await User.findById(req.user._id);

		res.status(200).json({
			success: true,
			myList: user.myList,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}

export async function removeFromMyList(req, res) {
	try {
		const { id } = req.params;

		const user = await User.findById(req.user._id);

		user.myList = user.myList.filter(
			(movie) => movie.id.toString() !== id
		);

		await user.save();

		res.status(200).json({
			success: true,
			myList: user.myList,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
}