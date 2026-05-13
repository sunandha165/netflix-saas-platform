import { User } from "../models/user.model.js";

import axios from "axios";

import { ENV_VARS } from "../config/envVars.js";

export async function generateRecommendations(
	req,
	res
) {
	try {
		const user = await User.findById(
			req.user._id
		);

		const source =
			user.continueWatching.length > 0
				? user.continueWatching
				: user.myList;

		if (source.length === 0) {
			return res.status(200).json({
				success: true,
				content: [],
			});
		}

		const randomMovie =
			source[
				Math.floor(
					Math.random() *
						source.length
				)
			];

		const genreIds =
	randomMovie.genre_ids ||
	randomMovie.genres?.map(
		(g) => g.id
	);
		if (!genreIds || genreIds.length === 0) {
			return res.status(200).json({
				success: true,
				content: [],
			});
		}

		const genre =
			genreIds[0];

		const response = await axios.get(
	`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`,
	{
		headers: {
			Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
		},
	}
);

		res.status(200).json({
			success: true,
			content:
				response.data.results,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
}