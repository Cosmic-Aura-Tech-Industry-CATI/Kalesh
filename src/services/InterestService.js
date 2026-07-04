import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class InterestService {
  /**
   * Get all interests
   */
  static async getAllInterests(params = {}) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.INTEREST.GET_ALL,
      {
        params,
      }
    );

    return res.data;
  }

  /**
   * Create new interest
   */
  static async createInterest(data) {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.iconUrl) {
      formData.append("iconUrl", data.iconUrl);
    }

    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.INTEREST.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  }

  /**
   * Update interest
   */
  static async updateInterest(id, data) {
    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.iconUrl) {
      formData.append("iconUrl", data.iconUrl);
    }

    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.INTEREST.UPDATE(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  }

  /**
   * Delete interest
   */
  static async deleteInterest(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.INTEREST.DELETE(id)
    );

    return res.data;
  }
}