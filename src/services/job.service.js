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

  /**
   * Create a new job
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  static async createJob(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.JOBS.CREATE,
      payload
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
    const res = await axiosInstance.patch(
      API_ENDPOINTS.JOBS.UPDATE_BY_ID(payload.id),
      payload
    );
    return res.data;
  }

  /**
   * Delete job
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async deleteJob(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.JOBS.DELETE_BY_ID(id)
    );
    return res.data;
  }
}
