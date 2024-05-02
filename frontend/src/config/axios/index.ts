import axios from "axios";

/**
 * Create axios instance
 */

const axiosClient = axios.create({
    baseURL: "http://localhost:3002/api",
    timeout: 30000,
    withCredentials: true,
    validateStatus: status => status < 400,
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export default axiosClient;
