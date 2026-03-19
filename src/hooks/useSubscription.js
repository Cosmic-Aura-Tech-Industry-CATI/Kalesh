import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscriptionService } from "../services/subscription.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all subscription plans from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetAllPlans = () => {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: SubscriptionService.getAllPlans,
  });
};

/**
 * A hook that creates a new subscription plan.
 * Invalidates the "subscription-plans" cache and shows a toast on success.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => SubscriptionService.createPlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription-plans"],
      });
      toastSuccess("Plan created successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to create plan");
      console.error(err);
    },
  });
};

/**
 * A hook that updates an existing subscription plan.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => SubscriptionService.updatePlan(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription-plans"],
      });
      toastSuccess("Plan updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update plan");
      console.error(err);
    },
  });
};

/**
 * A hook that updates the price of an existing subscription plan.
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useUpdatePrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => SubscriptionService.updatePrice(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription-plans"],
      });
      toastSuccess("Plan price updated successfully");
    },
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update plan price");
      console.error(err);
    },
  });
};

/**
 * A hook that fetches all users currently subscribed to any plan.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetSubscribedUsers = () => {
  return useQuery({
    queryKey: ["subscribed-users"],
    queryFn: SubscriptionService.getSubscribedUsers,
  });
};