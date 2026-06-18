import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class WallpaperService {
  /**
   * Fetches all wallpapers from the API.
   * @returns {Promise<Array<any>>} Resolves with an array of wallpaper objects.
   */
  static async getAllWallpapers() {
    const res = await axiosInstance.get(API_ENDPOINTS.ADMIN.WALLPAPERS.GET_ALL);
    return res.data;
  }

  /**
   * Creates a new wallpaper.
   * @param {FormData|Object} payload - The wallpaper data to be created (FormData for file upload).
   * @returns {Promise<Object>} Resolves with the created wallpaper object.
   */
  static async createWallpaper(payload) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.ADMIN.WALLPAPERS.CREATE,
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
   * Updates an existing wallpaper.
   * @param {string} id - The id of the wallpaper to be updated.
   * @param {FormData|Object} payload - The wallpaper data to be updated.
   * @returns {Promise<Object>} Resolves with the updated wallpaper object.
   */
  static async updateWallpaper(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.WALLPAPERS.UPDATE_BY_ID(id),
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
   * Deletes a wallpaper by its id.
   * @param {string} id - The id of the wallpaper to be deleted.
   * @returns {Promise<Object>} Resolves with the response data.
   */
  static async deleteWallpaper(id) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.WALLPAPERS.DELETE_BY_ID(id)
    );
    return res.data;
  }

  /**
   * Updates the price of a wallpaper.
   */
  static async updatePrice(id, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.WALLPAPERS.UPDATE_PRICE_BY_ID(id),
      payload
    );
    return res.data;
  }

  static async setDefault(id) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ADMIN.WALLPAPERS.SET_DEFAULT_BY_ID(id)
    );
    return res.data;
  }
}