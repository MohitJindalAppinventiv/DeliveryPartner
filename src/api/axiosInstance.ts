import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:3003",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);


export default axiosInstance;
