import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class PublicService {
  /**
   * Creates a new application.
   * @param {Object} payload - The application data to be created.
   * @returns {Promise<Object>} - Resolves with the created application object.
   */
  static async createApplication(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.APPLICATION.CREATE,
      payload
    );
    return res.data;
  }

  /**
   * Creates a new promotion.
   * @param {Object} payload - The promotion data to be created.
   * @returns {Promise<Object>} - Resolves with the created promotion object.
   * @example
   * const payload = {
   *   title: "Promotion Title",
   *   description: "Promotion Description",
   *   startDate: "2023-01-01",
   *   endDate: "2023-01-31",
   *   image: "https://example.com/promotion-image.jpg",
   * };
   * const promotionData = await PublicService.createPromotion(payload);
   * console.log(promotionData);
   */
  static async createPromotion(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.PROMOTION.CREATE,
      payload
    );
    return res.data;
  }

  /**
   * Creates a new contact entry.
   * @param {Object} payload - The contact data to be created.
   * @returns {Promise<Object>} - Resolves with the created contact object.
   * @example
   * const payload = {
   *   name: "John Doe",
   *   email: "john.doe@example.com",
   *   phone: "+1234567890",
   *   message: "This is a test message",
   * };
   * const contactData = await PublicService.createContact(payload);
   * console.log(contactData);
   */
  static async createContact(payload) {
    const res = await axiosInstance.post(API_ENDPOINTS.CONTACT.CREATE, payload);
    return res.data;
  }

  /**
   * Creates a new subscription.
   * @param {Object} payload - The subscription data to be created.
   * @returns {Promise<Object>} - Resolves with the created subscription object.
   * @example
   * const payload = {
   *   email: "john.doe@example.com",
   * };
   * const subscribeData = await PublicService.createSubscribe(payload);
   * console.log(subscribeData);
   */
  static async createSubscribe(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.SUBSCRIBE.CREATE,
      payload
    );
    return res.data;
  }
}
