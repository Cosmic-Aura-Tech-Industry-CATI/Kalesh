import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class ApplicationService {
  /**
   * Submit application
   * multipart/form-data
   */
  static async submitApplication(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.APPLICATION.CREATE,
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
   * Update application by token
   */
  static async updateApplication(token, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.APPLICATION.UPDATE_BY_TOKEN(token),
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
   * Get application by token
   */
  static async getApplicationByToken(token) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.APPLICATION.GET_BY_TOKEN(token)
    );
    return res.data;
  }

  /**
   * Get application by id (admin)
   */
  static async getApplicationById(id) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.APPLICATION.GET_BY_ID(id)
    );
    return res.data;
  }

  /**
   * Get applications by job id (admin)
   */
  static async getApplicationsByJobId(jobId) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.APPLICATION.GET_BY_JOB_ID(jobId)
    );
    return res.data;
  }

  /**
   * Accept application
   */
  static async acceptApplication(id) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.APPLICATION.ACCEPT(id)
    );
    return res.data;
  }

  /**
   * Reject application
   */
  static async rejectApplication(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.APPLICATION.REJECT(id)
    );
    return res.data;
  }

  /**
   * Download applications excel
   * @param {string} jobId
   * @returns {Promise<Blob>}
   */
  static async downloadApplications(jobId) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.APPLICATION.DOWNLOAD_APPLICATIONS(jobId),
      {
        responseType: "blob",
      }
    );
    return res.data;
  }
}
