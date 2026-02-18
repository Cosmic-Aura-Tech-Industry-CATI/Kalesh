import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

/**
 * useLogin hook
 *
 * A hook that wraps the useMutation hook from react-query.
 * It is used to login a user and store the token in local storage.
 * After a successful login, it sets the user data in the query client
 * and navigates to the admin dashboard page.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => AuthService.login(payload),
/**
 * Called when the mutation is successful.
 * @param {Object} data - The data returned from the mutation function.
 * It should contain the token and user data.
 * Stores the token in local storage and sets the user data in the query client.
 * Navigates to the admin dashboard page.
 */
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/admin/dashboard");
    },
/**
 * Called when the mutation fails.
 * @param {Error} error - The error returned from the mutation function.
 * Logs the error to the console.
 */
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

/**
 * useLogout hook
 *
 * A hook that wraps the useMutation hook from react-query.
 * It is used to logout a user and remove the token from local storage.
 * After a successful logout, it removes the user data from the query client
 * and navigates to the login page.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthService.logout,
/**
 * Called when the mutation is successful.
 * Removes the token from local storage, removes the user data from the query client,
 * and navigates to the login page, replacing the current page in the browser history.
 */
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/admin/login", {
        replace: true
      });
    },

    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};