import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class AdminUserService {
  /**
   * Fetches all admins from the API.
   * @returns {Promise<Array<any>>} Resolves with an array of admin objects.
   */
  static async getAllAdmins() {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.USER.GET_ALL);
    return res.data;
  }

  /**
   * Creates a new admin user.
   * @param {Object} payload - The admin user data to be created.
   * @returns {Promise<Object>} - Resolves with the created admin user object.
   */
  static async createAdmin(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.USER.CREATE,
      payload,
    );
    return res.data;
  }

  /**
   * Fetches an admin user by its id from the API.
   * @param {string} id - The id of the admin user to be fetched.
   * @returns {Promise<Object>} - Resolves with the admin user object.
   */
  static async getAdminById(id) {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.USER.GET_BY_ID(id));
    return res.data;
  }

  /**
   * Updates an existing admin user.
   * @param {Object} payload - The admin user data to be updated.
   * @property {string} id - The id of the admin user to be updated.
   * @property {Object} data - The admin user data to be updated.
   * @returns {Promise<Object>} - Resolves with the updated admin user object.
   */
  static async updateAdmin(payload) {
    const res = await axiosInstance.put(
      API_ENDPOINTS.ADMIN.USER.UPDATE_BY_ID(payload.id),
      payload,
    );
    return res.data;
  }

  /**
   * Deletes an admin user by its id from the API.
   * @param {string} id - The id of the admin user to be deleted.
   * @returns {Promise<Object>} - Resolves with the deleted admin user object.
   */
  static async deleteAdmin(id) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.ADMIN.USER.DELETE_BY_ID(id),
    );
    return res.data;
  }

  static async activateAdmin(id) {
    const res = await axiosInstance.patch(`/admin/activate/${id}`);
    return res.data;
  }

  static async disableAdmin(id) {
    const res = await axiosInstance.patch(`/admin/disable/${id}`);
    return res.data;
  }

  static async deleteAdmin(id) {
    const res = await axiosInstance.delete(`/admin/delete/${id}`);
    return res.data;
  }
}
