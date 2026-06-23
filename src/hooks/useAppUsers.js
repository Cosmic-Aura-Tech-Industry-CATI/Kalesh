import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppUsersService } from "../services/appUsers.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all application users from the API.
 * It returns the result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 * The query will only run if the id exists.
 */
export const useGetAllAppUsers = (page = 1) => {
  return useQuery({
    queryKey: ["app-users", page],
    queryFn: () => AppUsersService.getAllAppUsers(page),
    keepPreviousData: true,
  });
};

/**
 * A hook that fetches an application user by its id from the API.
 * It returns the result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 * The query will only run if the id exists.
 */
export const useGetAppUserById = (id) => {
  return useQuery({
    queryKey: ["app-users", id],
    queryFn: () => AppUsersService.getAppUserById(id),
    enabled: !!id,
  });
};

/**
 * A hook that fetches all banned application users from the API.
 * It returns the result of the useQuery hook.
 */
export const useGetBannedUsers = () => {
  return useQuery({
    queryKey: ["banned-users"],
    queryFn: AppUsersService.getBannedUsers,
  });
};

/**
 * A hook that bans an application user.
 * It invalidates both "app-users" and "banned-users" queries upon success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => AppUsersService.banUser(id, payload),
    /**
     * Called when the mutation is successful.
     * Invalidates both "app-users" and "banned-users" queries and shows a success toast message.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["banned-users"],
      });
      toastSuccess("User banned successfully");
    },
    /**
     * Called when the mutation fails.
     * Shows an error toast message with the error message, if available, and logs the error to the console for debugging purposes.
     * @param {Error} err - The error returned from the mutation function.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to ban user");
      console.error(err);
    },
  });
};

/**
 * A hook that unbans an application user.
 * It invalidates both "app-users" and "banned-users" queries upon success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUnbanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => AppUsersService.unbanUser(id),
    /**
     * Called when the mutation is successful.
     * Invalidates both "app-users" and "banned-users" queries and shows a success toast message.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["banned-users"],
      });
      toastSuccess("User unbanned successfully");
    },
    /**
     * Called when the mutation fails.
     * Shows an error toast message with the error message, if available, and logs the error to the console for debugging purposes.
     * @param {Error} err - The error returned from the mutation function.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to unban user");
      console.error(err);
    },
  });
};

/**
 * A hook that warns an application user.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useWarnUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => AppUsersService.warnUser(id, payload),
    /**
     * Called when the mutation is successful.
     * Invalidates the "app-users" query and shows a success toast message.
     * If you want the warning status to be reflected in the user list,
     * uncomment the invalidation block inside this function.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app-users"],
      });
      toastSuccess("User warned successfully");
    },
    /**
     * Called when the mutation fails.
     * Shows an error toast message with the error message, if available, and logs the error to the console for debugging purposes.
     * @param {Error} err - The error returned from the mutation function.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to warn user");
      console.error(err);
    },
  });
};
