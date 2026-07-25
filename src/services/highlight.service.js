import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class HighlightService {
  /**
   * Fetches all highlights from the API.
   * @returns {Promise<Array<any>>} Resolves with an array of highlight objects.
   */
  static async getAllHighlights() {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.HIGHLIGHTS.GET_ALL);
    return res.data;
  }

  /**
   * Fetches highlights by category from the API.
   * @param {string} category - The category of the highlights to be fetched.
   * @returns {Promise<Array<any>>} Resolves with an array of highlight objects.
   */
  static async getHighlightsByCategory(category) {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.HIGHLIGHTS.GET_BY_CATEGORY(category));
    return res.data;
  }
  /**
   * Creates a new highlight.
   * @param {FormData|Object} payload - The highlight data to be created (FormData for file upload).
   * @returns {Promise<Object>} Resolves with the created highlight object.
   */
  static async createHighlight(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.HIGHLIGHTS.CREATE,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }

  /**
   * Updates an existing highlight.
   * @param {string} id - The id of the highlight to be updated.
   * @param {FormData|Object} payload - The highlight data to be updated.
   * @returns {Promise<Object>} Resolves with the updated highlight object.
   */
  static async updateHighlight(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.HIGHLIGHTS.UPDATE_BY_ID(id),
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }

  /**
   * Deletes a highlight by its id.
   * @param {string} id - The id of the highlight to be deleted.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async deleteHighlight(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.HIGHLIGHTS.DELETE_BY_ID(id)
    );
    return res.data;
  }
}