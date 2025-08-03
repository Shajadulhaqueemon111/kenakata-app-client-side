import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }
    config.headers["Cache-Control"] = "no-store";
    return config;
  },
  (error) => Promise.reject(error)
);

export default authAxiosInstance;
