import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";

const MyListPage = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetchMyList();
	}, []);

	const fetchMyList = async () => {
		try {
			const res = await axios.get(
				"/api/v1/mylist",
				{ withCredentials: true }
			);

			setMovies(res.data.myList);
		} catch (error) {
			console.log(error);
		}
	};

	const removeFromList = async (id) => {
		try {
			await axios.delete(
				`/api/v1/mylist/${id}`,
				{ withCredentials: true }
			);

			setMovies(movies.filter((movie) => movie.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='bg-black min-h-screen text-white p-10'>
			<h1 className='text-4xl font-bold mb-10'>
				My List
			</h1>

			<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
				{movies.map((movie) => (
					<div key={movie.id}>
						<Link to={`/watch/${movie.id}`}>
							<img
								src={
									SMALL_IMG_BASE_URL +
									movie.backdrop_path
								}
								alt='movie'
								className='rounded-lg'
							/>
						</Link>

						<p className='mt-2'>
							{movie.title || movie.name}
						</p>

						<button
							onClick={() =>
								removeFromList(movie.id)
							}
							className='mt-2 bg-red-600 px-3 py-1 rounded'
						>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyListPage;