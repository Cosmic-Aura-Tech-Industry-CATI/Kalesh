import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class CMSService {
  /**
   * Get all CMS pages
   */
  static async getAllPages() {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.APP_PAGES.GET_ALL);

    return res.data;
  }

  /**
   * Get page by category
   * @param {string} category
   */
  static async getPageByCategory(category) {
    if (!category) return null;

    // Pehle sari pages lao
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.APP_PAGES.GET_ALL);

    const pages = res.data?.data?.pages || [];

    // Category match karo
    const page = pages.find((item) => item.category === category);

    if (!page) return null;

    // Ab slug se full page lao
    const detail = await axiosInstance.get(
      `/admin-panel/app-pages/page/${page.slug}`,
    );

    return detail.data;
  }

  /**
   * Create new page
   * @param {Object} payload
   */
  static async createPage(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.APP_PAGES.CREATE,
      payload,
    );

    return res.data;
  }

  /**
   * Update existing page
   * @param {string} id
   * @param {Object} payload
   */
  static async updatePage(id, payload) {
    const res = await axiosInstance.put(
      API_ENDPOINTS.ADMIN.APP_PAGES.UPDATE(id),
      payload,
    );

    return res.data;
  }

  /**
   * Delete page
   * @param {string} id
   */
  static async deletePage(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.APP_PAGES.DELETE(id),
    );

    return res.data;
  }
}
