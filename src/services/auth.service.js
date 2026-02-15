import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class AuthService {
  /**
   * Logs in a user to the application.
   * @param {Object} payload - an object containing the user's credentials.
   * @returns {Promise<Object>} - a promise that resolves to the logged in user's data.
   * @example
   * const payload = {
   *   username: "johnDoe",
   *   password: "mySecretPassword",
   * };
   * const userData = await AuthService.login(payload);
   * console.log(userData);
   */
  static async login(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  }

  /**
   * Logs out the currently logged in user from the application.
   * It attempts to call the logout API and then removes the token from local storage.
   * If the logout API call fails, it logs an error to the console and still removes the token.
   * @returns {Promise<boolean>} - a promise that resolves to true if the logout is successful.
   * @example
   * const isLoggedIn = await AuthService.logout();
   * console.log(isLoggedIn); // true
   */
  static async logout() {
    try {
      if (API_ENDPOINTS.AUTH.LOGOUT) {
        await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
      }
    } catch (error) {
      console.log("Logout API error", error);
    }
    localStorage.removeItem("token");
    return true;
  }

  /**
   * Retrieves the token from local storage.
   * @returns {string|null} - The token from local storage, or null if it doesn't exist.
   */
  static getToken() {
    return localStorage.getItem("token");
  }

/**
 * Checks if a user is authenticated.
 * It checks if a token exists in local storage.
 * @returns {boolean} - true if a user is authenticated, false otherwise.
 */
  static isAuthenticated() {
    return !!localStorage.getItem("token");
  }
}
