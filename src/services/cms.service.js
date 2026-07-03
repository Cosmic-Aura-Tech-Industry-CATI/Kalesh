import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class CMSService {
  // ===============================
  // Get All Pages
  // ===============================

  static async getAllPages(params) {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.APP_PAGES.GET_ALL, {
      params,
    });

    return res.data;
  }

  // ===============================
  // Get By Category
  // ===============================

  static async getPageByCategory(category) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.APP_PAGES.GET_BY_CATEGORY(category),
    );

    return res.data;
  }

  // ===============================
  // Get By Id
  // ===============================

  static async getPageById(id) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.APP_PAGES.GET_BY_ID(id),
    );

    return res.data;
  }

  // ===============================
  // Create
  // ===============================

  static async createPage(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.APP_PAGES.CREATE,
      payload,
    );

    return res.data;
  }

  // ===============================
  // Update
  // ===============================

  static async updatePage(id, payload) {
    const res = await axiosInstance.put(
      API_ENDPOINTS.ADMIN.APP_PAGES.UPDATE(id),
      payload,
    );

    return res.data;
  }

  // ===============================
  // Delete
  // ===============================

  static async deletePage(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.APP_PAGES.DELETE(id),
    );

    return res.data;
  }
}
