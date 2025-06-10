import axios from "axios";
// import { store } from "../store/store";
// import { logout } from "../store/authSlice";

const axiosInstance = axios.create({
  baseURL: "",
});

// Flag to prevent multiple refresh requests
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

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

// Handle 401 errors by refreshing token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("No refresh token found");

//         const res = await axios.post(
//           "http://localhost:3000/api/refresh-token",
//           {
//             refreshToken,
//           }
//         );

//         const newToken = res.data.accessToken;
//         localStorage.setItem("authToken", newToken);

//         processQueue(null, newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("refreshToken");

//         // Use this if you're using Redux
//         store.dispatch(logout());

//         // Optional: redirect to login
//         window.location.href = "/login";

//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
