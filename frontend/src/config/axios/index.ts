import axios from "axios";

/**
 * Create axios instance
 */

const storedToken = localStorage.getItem("user");
const parsedToken = storedToken ? JSON.parse(storedToken) : null;

const axiosClient = axios.create({
    baseURL: "http://localhost:3002/api",
    timeout: 30000,
    withCredentials: true,
    validateStatus: status => status < 400,
    headers: {
        Authorization: `Bearer ${parsedToken?.token}`
    }
});

export default axiosClient;
