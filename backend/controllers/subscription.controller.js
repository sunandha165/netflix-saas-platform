import { User } from "../models/user.model.js";

export async function upgradeSubscription(
	req,
	res
) {
	try {
		const user = await User.findById(
			req.user._id
		);

		user.subscription = "premium";

		await user.save();

		res.status(200).json({
			success: true,
			subscription:
				user.subscription,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server Error",
		});
	}
}