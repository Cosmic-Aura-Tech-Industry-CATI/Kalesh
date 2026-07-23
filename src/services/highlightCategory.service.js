import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class HighlightCategoryService {
  /**
   * Fetches all highlight categories from the API.
   * @returns {Promise<Array<any>>} Resolves with an array of highlight category objects.
   */
  static async getAllHighlightCategories() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.HIGHLIGHT_CATEGORY.GET_ALL,
    );
    return res.data;
  }

  /**
   * Creates a new highlight category.
   * @param {Object} payload - The highlight category data to be created.
   * @returns {Promise<Object>} Resolves with the created highlight category object.
   */
  static async createHighlightCategory(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.HIGHLIGHT_CATEGORY.CREATE,
      payload,
    );
    return res.data;
  }

  /**
   * Updates an existing highlight category.
   * @param {string} id - The id of the highlight category to be updated.
   * @param {Object} payload - The highlight category data to be updated.
   * @returns {Promise<Object>} Resolves with the updated highlight category object.
   */
  static async updateHighlightCategory(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.HIGHLIGHT_CATEGORY.UPDATE_BY_ID(id),
      payload,
    );
    return res.data;
  }

  /**
   * Deletes a highlight category by its id.
   * @param {string} id - The id of the highlight category to be deleted.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async deleteHighlightCategory(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.HIGHLIGHT_CATEGORY.DELETE_BY_ID(id),
    );
    return res.data;
  }
}
