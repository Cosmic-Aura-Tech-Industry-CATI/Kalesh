import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class SubscriptionService {
/**
 * Fetches all subscriptions from the API.
 * @returns {Promise<Array<any>>} Resolves with an array of subscription objects.
 */
  static async getAllPlans() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.SUBSCRIPTION.GET_ALL
    );
    return res.data;
  }

  /**
   * Creates a new subscription.
   * @param {Object} payload - The subscription data to be created.
   * @returns {Promise<Object>} - Resolves with the created subscription object.
   */
  static async createPlan(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.SUBSCRIPTION.CREATE,
      payload
    );
    return res.data;
  }

  /**
   * Updates an existing subscription by its id.
   * @param {string} id - The id of the subscription to be updated.
   * @param {Object} payload - The subscription data to be updated.
   * @returns {Promise<Object>} - Resolves with the updated subscription object.
   */
  static async updatePlan(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.SUBSCRIPTION.UPDATE_BY_ID(id),
      payload
    );
    return res.data;
  }

  /**
   * Updates the price of an existing subscription by its id.
   * @param {string} id - The id of the subscription to be updated.
   * @param {Object} payload - The subscription data to be updated.
   * @returns {Promise<Object>} - Resolves with the updated subscription object.
   */
  static async updatePrice(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.SUBSCRIPTION.UPDATE_PRICE_BY_ID(id),
      payload
    );
    return res.data;
  }

  /**
   * Retrieves all users that are currently subscribed to any plan.
   * @returns {Promise<Array<any>>} Resolves with an array of user objects.
   */
  static async getSubscribedUsers() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN.SUBSCRIPTION.GET_USERS
    );
    return res.data;
  }
}
