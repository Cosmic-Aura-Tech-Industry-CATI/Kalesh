import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class JobService {
  /**
   * Fetch all jobs
   * @returns {Promise<Array>}
   */
  static async getAllJobs() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.JOBS.GET_ALL
    );
    return res.data;
  }

  static async getAdminJobs() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.JOBS.GET_ADMIN
    );
    return res.data;
  }

  /**
   * Create a new job
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  static async createJob(payload) {
    const data = { ...payload };
    if (data.skill && typeof data.skill === "string") {
      data.skill = data.skill.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const res = await axiosInstance.post(
      API_ENDPOINTS.JOBS.CREATE,
      data
    );
    return res.data;
  }

  /**
   * Fetch job by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getJobById(id) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.JOBS.GET_BY_ID(id)
    );
    return res.data;
  }

  /**
   * Update job
   * @param {Object} payload
   * @param {string} payload.id
   * @returns {Promise<Object>}
   */
  static async updateJob(payload) {
    const data = { ...payload };
    if (data.skill && typeof data.skill === "string") {
      data.skill = data.skill.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const res = await axiosInstance.patch(
      API_ENDPOINTS.JOBS.UPDATE_BY_ID(data.id),
      data
    );
    return res.data;
  }

  /**
   * Delete job
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async deleteJob(id) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.JOBS.DELETE_BY_ID(id)
    );
    return res.data;
  }

  /**
   * Toggle job status (activate/deactivate)
   * @param {string} id
   * @param {boolean} isActive
   * @returns {Promise<Object>}
   */
  static async toggleJobStatus(id, isActive) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.JOBS.TOGGLE_STATUS_BY_ID(id),
      { isActive }
    );
    return res.data;
  }
}
