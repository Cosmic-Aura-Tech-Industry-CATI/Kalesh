import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogService } from "../services/blog.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all blogs from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 */
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAllBlogs,
  });
};

/**
 * A hook that fetches a blog by its slug from the API.
 * @param {string} slug - The slug of the blog to be fetched.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 * The query will only run if the slug exists.
 */
export const useGetBlogBySlug = (slug) => {
  return useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => BlogService.getBlogBySlug(slug),
    enabled: !!slug,
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to create a new blog entry.
 * After a successful creation, it sets a success toast message and invalidates the cache for the blogs query.
 * If the creation fails, it sets an error toast message.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 * It contains the data returned from the mutation function, the status of the mutation,
 * and functions to refresh the mutation and check if the data is loading.
 */
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => BlogService.createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      toastSuccess("Blog created successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to create blog");
      console.error(err);
    },
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to update an existing blog entry.
 * After a successful update, it sets a success toast message and invalidates the cache for the blogs query.
 * If the update fails, it sets an error toast message.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 * It contains the data returned from the mutation function, the status of the mutation,
 * and functions to refresh the mutation and check if the data is loading.
 */
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // Pass an object with { slug, payload } when calling the mutation function
    mutationFn: ({ slug, payload }) => BlogService.updateBlog(slug, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      // Optional: you can invalidate the specific blog's query as well
      queryClient.invalidateQueries({
        queryKey: ["blogs", variables.slug],
      });
      toastSuccess("Blog updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update blog");
      console.error(err);
    },
  });
};

/**
 * A hook that deletes a blog by its slug from the API.
 * It returns the result of the useMutation hook.
 * It contains the data returned from the mutation function, the status of the mutation,
 * and functions to refresh the query and check if the data is loading.
 * When the mutation is successful, it shows a success toast and invalidates the query cache for the blogs.
 * When the mutation fails, it shows an error toast.
 */
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug) => BlogService.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
      toastSuccess("Blog deleted successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to delete blog");
      console.error(err);
    },
  });
};