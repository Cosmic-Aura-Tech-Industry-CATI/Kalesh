import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HighlightService } from "../services/highlight.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all highlights from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetAllHighlights = () => {
  return useQuery({
    queryKey: ["highlights"],
    queryFn: HighlightService.getAllHighlights,
  });
};

/**
 * A hook that fetches highlights by category from the API.
 * @param {string} category - The category of the highlights to be fetched.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetHighlightsByCategory = (category) => {
  return useQuery({
    queryKey: ["highlights", "category", category],
    queryFn: () => HighlightService.getHighlightsByCategory(category),
    enabled: !!category,
  });
};

/**
 * A hook that creates a new highlight.
 * Invalidates the "highlights" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useCreateHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => HighlightService.createHighlight(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["highlights"],
      });
      toastSuccess("Highlight created successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to create highlight");
      console.error(err);
    },
  });
};

/**
 * A hook that updates an existing highlight.
 * Invalidates the "highlights" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUpdateHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => HighlightService.updateHighlight(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["highlights"],
      });
      // Also invalidate the specific highlight query
      queryClient.invalidateQueries({
        queryKey: ["highlights", variables.id],
      });
      toastSuccess("Highlight updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update highlight");
      console.error(err);
    },
  });
};

/**
 * A hook that deletes a highlight.
 * Invalidates the "highlights" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useDeleteHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => HighlightService.deleteHighlight(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["highlights"],
      });
      toastSuccess("Highlight deleted successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to delete highlight");
      console.error(err);
    },
  });
};