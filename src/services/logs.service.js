import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class LogsService {
  /**
   * Fetches admin logs from the API.
   * @param {Object} params - Query parameters for filtering and pagination.
   * @returns {Promise<Object>} Resolves with the logs data.
   */
  static async getLogs(params = {}) {
    const res = await axiosInstance.get(API_ENDPOINTS.LOGS.GET_LOGS, {
      params,
    });
    return res.data;
  }
}
