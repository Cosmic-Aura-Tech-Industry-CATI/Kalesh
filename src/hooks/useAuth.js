import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../lib/toast";

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
  return useMutation({
    mutationFn: (payload) => AuthService.login(payload),
    /**
     * Called when the mutation is successful.
     * @param {Object} data - The data returned from the mutation function.
     * It should contain the token and user data.
     * Logs a success toast message.
     * */
    onSuccess: (data) => {
      toastSuccess("Login successful");
    },
    /**
     * Called when the mutation fails.
     * @param {Error} error - The error returned from the mutation function.
     * Logs the error to the console.
     */
    onError: (error) => {
      toastError(error.response?.data?.message || "Login failed");
      console.error("Login failed:", error);
    },
  });
};

/**
 * useForgetPassword hook
 *
 * A hook that wraps the useMutation hook from react-query.
 * It is used to request a password reset link or OTP.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (payload) => AuthService.forgetPassword(payload),
    onSuccess: () => {
      toastSuccess("Password reset instructions sent successfully");
    },
    onError: (error) => {
      toastError(error.response?.data?.message || "Failed to send reset instructions");
      console.error("Forget password failed:", error);
    },
  });
};

/**
 * useResetPassword hook
 *
 * A hook that wraps the useMutation hook from react-query.
 * It is used to reset the user's password using a token or OTP.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload) => AuthService.resetPassword(payload),
    onSuccess: () => {
      toastSuccess("Password reset successfully");
    },
    onError: (error) => {
      toastError(error.response?.data?.message || "Failed to reset password");
      console.error("Reset password failed:", error);
    },
  });
};

/**
 * useChangePassword hook
 *
 * A hook that wraps the useMutation hook from react-query.
 * It is used to change the currently logged-in user's password.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload) => AuthService.changePassword(payload),
    onSuccess: () => {
      toastSuccess("Password changed successfully");
    },
    onError: (error) => {
      toastError(error.response?.data?.message || "Failed to change password");
      console.error("Change password failed:", error);
    },
  });
};

/**
 * useVerifyOtp hook
 *
 * A hook that wraps the useMutation hook from react-query.
 * It is used to verify the OTP.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => AuthService.verifyOtp(payload),
    /**
     * Called when the mutation is successful.
     * @param {Object} data - The data returned from the mutation function.
     * It should contain the token and user data.
     * Stores the token in local storage and sets the user data in the query client.
     * Navigates to the admin dashboard page.
     */
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toastSuccess("OTP verified successfully");
    },
    /**
     * Called when the mutation fails.
     * @param {Error} error - The error returned from the mutation function.
     * Logs the error to the console.
     **/
    onError: (error) => {
      toastError(error.response?.data?.message || "OTP verification failed");
      console.error("Verify OTP failed:", error);
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
        replace: true,
      });
      toastSuccess("Logout successful");
    },

    onError: (error) => {
      toastError("Logout failed");
      console.error("Logout failed:", error);
    },
  });
};
