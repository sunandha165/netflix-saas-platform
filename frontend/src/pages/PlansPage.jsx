import axios from "../axios";
import toast from "react-hot-toast";

const PlansPage = () => {

	const subscribe = async (plan) => {
		try {

			await axios.post(
				"/api/v1/subscription/upgrade",
				{},
				{
					withCredentials: true,
				}
			);

			toast.success(
				`${plan} Plan Activated`
			);

			setTimeout(() => {
				window.location.href =
					"/profile";
			}, 1500);

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='min-h-screen bg-black text-white p-10'>

			<h1 className='text-5xl font-bold text-center mb-14'>
				Choose Your Plan
			</h1>

			<div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>

				{/* MOBILE PLAN */}
				<div className='border border-gray-700 rounded-xl p-8 bg-zinc-900'>
					<h2 className='text-3xl font-bold mb-4'>
						Mobile
					</h2>

					<p className='text-4xl font-bold mb-6'>
						₹149
					</p>

					<ul className='space-y-3 mb-8 text-gray-300'>
						<li>✔ 480p Quality</li>
						<li>✔ Mobile Only</li>
						<li>✔ 1 Device</li>
					</ul>

					<button
						onClick={() =>
							subscribe("Mobile")
						}
						className='w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold'
					>
						Choose Plan
					</button>
				</div>

				{/* STANDARD */}
				<div className='border-2 border-red-600 rounded-xl p-8 bg-zinc-900 scale-105'>
					<h2 className='text-3xl font-bold mb-4'>
						Standard
					</h2>

					<p className='text-4xl font-bold mb-6'>
						₹499
					</p>

					<ul className='space-y-3 mb-8 text-gray-300'>
						<li>✔ 1080p Quality</li>
						<li>✔ TV + Mobile</li>
						<li>✔ 2 Devices</li>
					</ul>

					<button
						onClick={() =>
							subscribe("Standard")
						}
						className='w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold'
					>
						Choose Plan
					</button>
				</div>

				{/* PREMIUM */}
				<div className='border border-gray-700 rounded-xl p-8 bg-zinc-900'>
					<h2 className='text-3xl font-bold mb-4'>
						Premium
					</h2>

					<p className='text-4xl font-bold mb-6'>
						₹649
					</p>

					<ul className='space-y-3 mb-8 text-gray-300'>
						<li>✔ 4K Quality</li>
						<li>✔ All Devices</li>
						<li>✔ 4 Devices</li>
					</ul>

					<button
						onClick={() =>
							subscribe("Premium")
						}
						className='w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold'
					>
						Choose Plan
					</button>
				</div>

			</div>
		</div>
	);
};

export default PlansPage;