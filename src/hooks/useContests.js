import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContestService } from "../services/contest.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all contests from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetAllContests = () => {
  return useQuery({
    queryKey: ["contest"],
    queryFn: ContestService.getAllContests,
  });
};

/**
 * A hook that fetches a contest by its id from the API.
 * @param {string} id - The id of the contest to be fetched.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetContestById = (id) => {
  return useQuery({
    queryKey: ["contests", id],
    queryFn: () => ContestService.getContestById(id),
    enabled: !!id,
  });
};

/**
 * A hook that creates a new contest.
 * Invalidates the "contests" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useCreateContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => ContestService.createContest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contest"],
      });
      toastSuccess("Contest created successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to create contest");
      console.error(err);
    },
  });
};

/**
 * A hook that updates an existing contest.
 * Invalidates the "contests" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUpdateContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => ContestService.updateContest(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["contest"],
      });
      // Also invalidate the specific contest query
      queryClient.invalidateQueries({
        queryKey: ["contests", variables.id],
      });
      toastSuccess("Contest updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update contest");
      console.error(err);
    },
  });
};

/**
 * A hook that deletes a contest.
 * Invalidates the "contests" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useDeleteContest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ContestService.deleteContest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contest"],
      });
      toastSuccess("Contest deleted successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to delete contest");
      console.error(err);
    },
  });
};