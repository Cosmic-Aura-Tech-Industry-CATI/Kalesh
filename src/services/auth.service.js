import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class AuthService {

  /**
   * Logs in a user to the application.
   */
  static async login(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );

    console.log("LOGIN RESPONSE:", res.data);

    if (res.data?.token) {
      // 🔐 Save Token
      localStorage.setItem(
        "thekalesh.com-admin-token",
        res.data.token
      );

      // 👤 Save Admin Details
      if (res.data?.user) {
        localStorage.setItem(
          "thekalesh.com-admin",
          JSON.stringify(res.data.user)
        );
      }
    }

    return res.data;
  }

  /**
   * Logs out the currently logged in user
   */
  static async logout() {
    try {
      localStorage.removeItem("thekalesh.com-admin-token");
      localStorage.removeItem("thekalesh.com-admin");
      return true;
    } catch (error) {
      console.error("Logout failed", error);
      return false;
    }
  }

  /**
   * Retrieves the token
   */
  static getToken() {
    return localStorage.getItem("thekalesh.com-admin-token");
  }

  /**
   * Get Current Logged Admin
   */
  static getCurrentUser() {
    const admin = localStorage.getItem("thekalesh.com-admin");
    return admin ? JSON.parse(admin) : null;
  }

  /**
   * Checks if user authenticated
   */
  static isAuthenticated() {
    return !!localStorage.getItem("thekalesh.com-admin-token");
  }

}