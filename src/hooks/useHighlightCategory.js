import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HighlightCategoryService } from "../services/highlightCategory.service";
import { toastError, toastSuccess } from "../lib/toast";

const QUERY_KEY = ["highlightCategory"];

/**
 * A hook that fetches all highlight categories from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetAllHighlightCategories = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: HighlightCategoryService.getAllHighlightCategories,
  });
};

/**
 * A hook for creating a new highlight category.
 * Invalidates the highlight categories query on success.
 * @returns {UseMutationResult}
 */
export const useCreateHighlightCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      HighlightCategoryService.createHighlightCategory(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      toastSuccess("Highlight category created successfully");
    },
    onError: (err) => {
      toastError(
        err?.response?.data?.message || "Failed to create highlight category",
      );
      console.error(err);
    },
  });
};

/**
 * A hook for updating an existing highlight category.
 * Invalidates the highlight categories query on success.
 * @returns {UseMutationResult}
 */
export const useUpdateHighlightCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      HighlightCategoryService.updateHighlightCategory(id, payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      toastSuccess("Highlight category updated successfully");
    },
    onError: (err) => {
      toastError(
        err?.response?.data?.message || "Failed to update highlight category",
      );
      console.error(err);
    },
  });
};

/**
 * A hook for deleting a highlight category.
 * Invalidates the highlight categories query on success.
 * @returns {UseMutationResult}
 */
export const useDeleteHighlightCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => HighlightCategoryService.deleteHighlightCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      toastSuccess("Highlight category deleted successfully");
    },
    onError: (err) => {
      toastError(
        err?.response?.data?.message || "Failed to delete highlight category",
      );
      console.error(err);
    },
  });
};
