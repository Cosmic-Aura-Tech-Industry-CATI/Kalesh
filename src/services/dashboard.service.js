import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class DashboardService {
  /**
   * Fetches dashboard statistics from the API.
   * @returns {Promise<Object>} Resolves with the dashboard stats object.
   */
  static async getStats() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.DASHBOARD.GET_STATS
    );
    return res.data;
  }
}
