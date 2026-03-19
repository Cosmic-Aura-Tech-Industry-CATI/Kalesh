import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class AppUsersService {
  /**
   * Fetches all app users from the API.
   * @returns {Promise<Array<AppUser>>} Resolves with an array of app user objects.
   */
  static async getAllAppUsers() {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.APP_USER.GET_ALL);
    return res.data;
  }

  /**
   * Fetches an app user by its id from the API.
   * @param {string} id - The id of the app user to be fetched.
   * @returns {Promise<AppUser>} Resolves with the app user object.
   */
  static async getAppUserById(id) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.APP_USER.GET_BY_ID(id)
    );
    return res.data;
  }
}
