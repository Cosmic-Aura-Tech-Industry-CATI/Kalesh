import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

const LegalPageService = {
  // ===========================
  // GET ALL PAGES
  // ===========================

  getAllPages: async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.APP_PAGES.GET_ALL);

    return res.data;
  },

  // ===========================
  // GET SINGLE PAGE (BY SLUG)
  // ===========================

  getPage: async (slug) => {
    const res = await axiosInstance.get(
      `${API_ENDPOINTS.ADMIN.APP_PAGES.GET_ALL}/page/${slug}`,
    );

    return res.data;
  },

  // ===========================
  // CREATE PAGE
  // ===========================

  createPage: async (payload) => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.APP_PAGES.CREATE,
      payload,
    );

    return res.data;
  },

  // ===========================
  // UPDATE PAGE (BY ID)
  // ===========================

  updatePage: async ({ id, payload }) => {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.APP_PAGES.UPDATE(id),
      payload,
    );

    return res.data;
  },

  // ===========================
  // DELETE PAGE
  // ===========================

  deletePage: async (id) => {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.APP_PAGES.DELETE(id),
    );

    return res.data;
  },
};

export default LegalPageService;
