import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
		"https://netflix-saas-platform.onrender.com",
	withCredentials: true,
});

export default axiosInstance;