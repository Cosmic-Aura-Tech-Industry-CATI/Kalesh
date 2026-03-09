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
}
