import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class AppUsersService {
  /**
   * Fetches all app users from the API.
   * @returns {Promise<Array<AppUser>>} Resolves with an array of app user objects.
   */
  static async getAllAppUsers(params) {
    console.log("API Params:", params);

    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.APP_USER.GET_ALL, {
      params,
    });

    return res.data;
  }

  /**
   * Fetches an app user by its id from the API.
   * @param {string} id - The id of the app user to be fetched.
   * @returns {Promise<AppUser>} Resolves with the app user object.
   */
  static async getAppUserById(id) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.APP_USER.GET_BY_ID(id),
    );
    return res.data;
  }

  /**
   * Fetches all banned app users from the API.
   * @returns {Promise<Object>} Resolves with the banned app users data.
   */
  static async getBannedUsers() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.APP_USER.GET_BANNED_USERS,
    );
    return res.data;
  }

  /**
   * Bans an app user by their id.
   * @param {string} id - The id of the app user to ban.
   * @param {Object} [payload] - Optional payload containing the reason for the ban.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async banUser(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.APP_USER.BAN_USER(id),
      payload,
    );
    return res.data;
  }

  /**
   * Unbans an app user by their id.
   * @param {string} id - The id of the app user to unban.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async unbanUser(id) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.APP_USER.UNBAN_USER(id),
    );
    return res.data;
  }

  /**
   * Warns an app user by their id.
   * @param {string} id - The id of the app user to warn.
   * @param {Object} payload - The payload containing the warning message/reason.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async warnUser(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.APP_USER.WARN_USER(id),
      payload,
    );
    return res.data;
  }
}
