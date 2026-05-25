import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class ContestService {
  /**
   * Fetches all contests from the API.
   * @returns {Promise<Array<any>>} Resolves with an array of contest objects.
   */
  static async getAllContests() {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.CONTEST.GET_ALL);
    return res.data;
  }

  /**
   * Creates a new contest.
   * @param {FormData|Object} payload - The contest data to be created (FormData for image upload).
   * @returns {Promise<Object>} Resolves with the created contest object.
   */
  static async createContest(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.CONTEST.CREATE,
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
   * Fetches a contest by its id from the API.
   * @param {string} id - The id of the contest to be fetched.
   * @returns {Promise<Object>} Resolves with the contest object.
   */
  static async getContestById(id) {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.CONTEST.GET_BY_ID(id)
    );
    return res.data;
  }

  /**
   * Updates an existing contest.
   * @param {string} id - The id of the contest to be updated.
   * @param {FormData|Object} payload - The contest data to be updated.
   * @returns {Promise<Object>} Resolves with the updated contest object.
   */
  static async updateContest(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.CONTEST.UPDATE_BY_ID(id),
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
   * Deletes a contest by its id.
   * @param {string} id - The id of the contest to be deleted.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async deleteContest(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.CONTEST.DELETE_BY_ID(id)
    );
    return res.data;
  }
}