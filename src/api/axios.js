import axios from "axios";

const api = axios.create({
  baseURL: "YOUR_API_BASE_URL",
});

// 👉 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 👉 global event fire karo
      window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default api;