import axiosInstance from "../lib/axiosInstace";
import { API_ENDPOINTS } from "../lib/apiEndpoints";

export class BlogService {
  /**
   * Fetches all blogs from the API.
   * @returns {Promise<Array<Object>>} Resolves with an array of blog objects.
   */
  static async getAllBlogs() {
    const res = await axiosInstance.get(API_ENDPOINTS.BLOGS.GET_ALL);
    return res.data;
  }

  /**
   * Creates a new blog entry.
   * @param {Object} payload - The blog data to be created.
   * @returns {Promise<Object>} - Resolves with the created blog object.
   * @example
   * const payload = {
   *   title: "Blog Title",
   *   slug: "blog-title",
   *   content: "Blog content",
   *   image: "https://example.com/blog-image.jpg",
   * };
   * const blogData = await BlogService.createBlog(payload);
   * console.log(blogData);
   */
  static async createBlog(formData) {
    const res = await axiosInstance.post(API_ENDPOINTS.BLOGS.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  /**
   * Retrieves a blog by its slug.
   * @param {string} slug - The slug of the blog to be retrieved.
   * @returns {Promise<Object>} - Resolves with the retrieved blog object.
   */
  static async getBlogBySlug(slug) {
    const res = await axiosInstance.get(API_ENDPOINTS.BLOGS.GET_BY_SLUG(slug));
    return res.data;
  }

  /**
   * Updates an existing blog entry.
   * @param {string} slug - The slug of the blog to be updated.
   * @param {Object} payload - The blog data to be updated.
   * @returns {Promise<Object>} - Resolves with the updated blog object.
   */
  static async updateBlog(slug, payload) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.BLOGS.UPDATE_BY_SLUG(slug),
      payload,
    );
    return res.data;
  }

  /**
   * Deletes a blog by its slug.
   * @param {string} slug - The slug of the blog to be deleted.
   * @returns {Promise<Object>} - Resolves with the deleted blog object.
   */
  static async deleteBlog(slug) {
    const res = await axiosInstance.delete(
      API_ENDPOINTS.BLOGS.DELETE_BY_SLUG(slug),
    );
    return res.data;
  }
}
