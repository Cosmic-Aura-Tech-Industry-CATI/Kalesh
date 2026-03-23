import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export const ReportsService = {
  /**
   * Fetches all reports from the admin panel.
   * @param {string} [type] - Optional report type to filter by (e.g. "poll", "comment", "user").
   * @returns {Promise<any>} The response data containing all reports.
   */
  getAllReports: async (type) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.REPORTS.GET_ALL,
      {
        params: { type },
      }
    );
    return response.data;
  },

  /**
   * Fetches a specific report by its ID.
   * @param {string|number} id - The ID of the report to fetch.
   * @returns {Promise<any>} The response data containing the report details.
   */
  getReportById: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.REPORTS.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Takes action on a specific report.
   * @param {string|number} id - The ID of the report.
   * @param {Object} payload - The action details/payload (e.g., action type, notes).
   * @returns {Promise<any>} The response data after taking the action.
   */
  takeAction: async (id, payload) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.REPORTS.TAKE_ACTION(id),
      payload
    );
    return response.data;
  },
};
