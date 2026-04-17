import axios from "axios";
import { AuthService } from "../services/auth.service";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ REQUEST INTERCEPTOR (already correct)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅🔥 YEH ADD KARO (MOST IMPORTANT)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("INTERCEPTOR HIT"); // debug

    if (error.response?.status === 401) {
      console.log("401 DETECTED"); // debug

      // 👉 global event fire
      window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;