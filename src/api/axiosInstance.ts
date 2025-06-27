import axios from "axios";
import { ToastError } from "../utils/toast";

const apiUrl=import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
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

axiosInstance.interceptors.response.use(
  response=>response,
  error=>{
    if(error.response && error.response.status===401){
      ToastError("Session Expired, Please Login Again");
      localStorage.removeItem("authToken");
      window.location.href=`/login`;
    }
    return Promise.reject(error);
  },
)


export default axiosInstance;
