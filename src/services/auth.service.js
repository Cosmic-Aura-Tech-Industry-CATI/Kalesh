import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class AuthService {
  /**
   * Logs in a user to the application.
   */
  static async login(payload) {
    const res = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    return res.data;
  }

  /**
   * Verifies an OTP for the currently logged in user.
   * @param {Object} payload - The payload containing the OTP to be verified.
   * @returns {Promise<Object>} - Resolves with the response from the API.
   */
  static async verifyOtp(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      payload
    );

    if (res.data?.token) {
      localStorage.setItem("thekalesh.com-admin-token", res.data.token);

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
   * Requests a password reset link or OTP.
   * @param {Object} payload - The payload containing the user's email.
   * @returns {Promise<Object>} - Resolves with the response from the API.
   */
  static async forgetPassword(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.AUTH.FORGET_PASSWORD,
      payload
    );
    return res.data;
  }

  /**
   * Resets the user's password.
   * @param {Object} payload - The payload containing the new password and reset token/OTP.
   * @returns {Promise<Object>} - Resolves with the response from the API.
   */
  static async resetPassword(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      payload
    );
    return res.data;
  }

  /**
   * Changes the current user's password.
   * @param {Object} payload - The payload containing the old and new passwords.
   * @returns {Promise<Object>} - Resolves with the response from the API.
   */
  static async changePassword(payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      payload
    );
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
