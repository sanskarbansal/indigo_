// axiosInstance.js
import axios from "axios";

const baseURL = "http://localhost:1337/api/v1";
// Create an Axios instance
let axiosInstance = axios.create({
    baseURL: baseURL, // Replace with your API base URL
});

export function updateToken(token) {
    axiosInstance = axios.create({ baseURL: baseURL, headers: { Authorization: `Bearer ${token}` } });
}
// Add a request interceptor to include the JWT token in the headers
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         console.log(token);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
