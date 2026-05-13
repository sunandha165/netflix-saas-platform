import { useAuthStore } from "../store/authUser";
import { useEffect, useState } from "react";
import axios from "../axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const ProfilePage = () => {
	const { user, logout } = useAuthStore();

	const [myList, setMyList] = useState([]);
  const [continueWatching, setContinueWatching] =
	useState([]);
	const [recommended, setRecommended] =
	useState([]);

	useEffect(() => {
		getMyList();
    getContinueWatching();
		getRecommendations();
	}, []);

	const getMyList = async () => {
		try {
			const res = await axios.get(
				"/api/v1/mylist",
				{ withCredentials: true }
			);

			setMyList(res.data.myList);
		} catch (error) {
			console.log(error);
		}
	};
  const getContinueWatching = async () => {
	try {
		const res = await axios.get(
			"/api/v1/continue-watching",
			{
				withCredentials: true,
			}
		);

		setContinueWatching(
			res.data.continueWatching
		);
	} catch (error) {
		console.log(error);
	}
};
const getRecommendations = async () => {
	try {
		const res = await axios.get(
			"/api/v1/recommendations",
			{
				withCredentials: true,
			}
		);

		setRecommended(
			res.data.content
		);
	} catch (error) {
		console.log(error);
	}
};


	return (
		<div className='bg-black text-white min-h-screen p-10'>
			{/* USER INFO */}
			<div className='flex items-center gap-5 mb-10'>
				<img
					src={user.image}
					alt='profile'
					className='w-24 rounded'
				/>

				<div>
					<h1 className='text-4xl font-bold'>
						{user.username}
					</h1>

					<p className='text-gray-400'>
						{user.email}
					</p>

					<p className='mt-2 text-red-500'>
	{user.subscription === "premium"
		? "Premium Plan"
		: "Free Plan"}
</p>
{user.subscription !== "premium" && (
	<Link to='/plans'>
		<button
			className='mt-4 bg-yellow-500 text-black px-4 py-2 rounded font-bold'
		>
			Upgrade to Premium
		</button>
	</Link>
)}
					<button
						onClick={logout}
						className='mt-4 bg-red-600 px-4 py-2 rounded'
					>
						Logout
					</button>
				</div>
			</div>

			{/* MY LIST */}
			<div className='mb-14'>
				<h2 className='text-3xl font-bold mb-6'>
					My List
				</h2>

				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
					{myList.map((movie) => (
						<Link
							to={`/watch/${movie.id}`}
							key={movie.id}
						>
							<img
								src={
									SMALL_IMG_BASE_URL +
									movie.backdrop_path
								}
								className='rounded-lg hover:scale-105 transition'
							/>

							<p className='mt-2'>
								{movie.title || movie.name}
							</p>
						</Link>
					))}
				</div>
			</div>
{/* CONTINUE WATCHING */}
<div className='mb-14'>
	<h2 className='text-3xl font-bold mb-6'>
		Continue Watching
	</h2>

	<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
		{continueWatching.map((movie) => (
			<Link
				to={`/watch/${movie.id}`}
				key={movie.id}
			>
				<img
					src={
						SMALL_IMG_BASE_URL +
						movie.backdrop_path
					}
					alt='movie'
					className='rounded-lg hover:scale-105 transition'
				/>

				<p className='mt-2'>
					{movie.title || movie.name}
				</p>
			</Link>
		))}
	</div>
</div>
{/* RECOMMENDED */}
<div className='mb-14'>
	<h2 className='text-3xl font-bold mb-6'>
		Recommended For You
	</h2>

	<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
		{recommended.map((movie) => (
			<Link
				to={`/watch/${movie.id}`}
				key={movie.id}
			>
				<img
					src={
						SMALL_IMG_BASE_URL +
						movie.backdrop_path
					}
					alt='movie'
					className='rounded-lg hover:scale-105 transition'
				/>

				<p className='mt-2'>
					{movie.title || movie.name}
				</p>
			</Link>
		))}
	</div>
</div>

			{/* DOWNLOADS */}
			<div>
				<h2 className='text-3xl font-bold mb-6'>
					Downloads
				</h2>

				<p className='text-gray-400'>
					Coming Soon...
				</p>
			</div>
		</div>
	);
};

export default ProfilePage;