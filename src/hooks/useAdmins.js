import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminUserService } from "../services/admins.service";

/**
 * A hook that fetches all users from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 */
export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: AdminUserService.getAllAdmins,
  });
};

/**
 * A hook that fetches a user by its id from the API.
 * @param {string} id - The id of the user to be fetched.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 * The query will only run if the id exists.
 */
export const useGetAdminsById = (id) => {
  return useQuery({
    queryKey: ["admin-users", id],
    queryFn: () => AdminUserService.getAdminById(id),
    enabled: !!id,
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to create a new admin user.
 * After a successful creation, it sets a success toast message and invalidates the cache for the admin users query.
 * If the creation fails, it sets an error toast message.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 * It contains the data returned from the mutation function, the status of the mutation,
 * and functions to refresh the mutation and check if the data is loading.
 */
export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => AdminUserService.createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

/**
 * A hook that wraps the useMutation hook from react-query.
 * It is used to update an existing admin user.
 * After a successful update, it sets a success toast message and invalidates the cache for the admin users query.
 * If the update fails, it sets an error toast message.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 * It contains the data returned from the mutation function, the status of the mutation,
 * and functions to refresh the mutation and check if the data is loading.
 */
export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => AdminUserService.updateAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

/**
 * A hook that deletes an admin user by its id from the API.
 * It returns the result of the useMutation hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 * The query will only run if the id exists.
 * When the mutation is successful, it shows a success toast and invalidates the query cache for the admin users.
 * When the mutation fails, it shows an error toast.
 */
export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => AdminUserService.deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
