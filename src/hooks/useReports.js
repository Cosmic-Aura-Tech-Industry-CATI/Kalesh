import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportsService } from "../services/reports.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * A hook that fetches all reports from the API.
 * @param {string} [type] - Optional report type filter.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 */
export const useGetAllReports = (type) => {
  return useQuery({
    queryKey: ["reports", type],
    queryFn: () => ReportsService.getAllReports(type),
  });
};

/**
 * A hook that fetches a specific report by its ID from the API.
 * @param {string|number} id - The ID of the report to be fetched.
 * @returns {UseQueryResult} - The result of the useQuery hook.
 * The query will only run if the id is truthy.
 */
export const useGetReportById = (id) => {
  return useQuery({
    queryKey: ["reports", id],
    queryFn: () => ReportsService.getReportById(id),
    enabled: !!id,
  });
};

/**
 * A hook that wraps the useMutation hook to take action on a report.
 * After a successful mutation, it sets a success toast message and invalidates the cache for the reports query.
 * If the mutation fails, it sets an error toast message.
 *
 * @returns {UseMutationResult} - The result of the useMutation hook.
 */
export const useTakeAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => ReportsService.takeAction(id, payload),
    /**
     * Called when the mutation is successful.
     * Invalidates the "reports" query to refetch the latest data and shows a success toast message.
     */
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
      // Invalidate the specific report query as well
      queryClient.invalidateQueries({
        queryKey: ["reports", variables.id],
      });
      toastSuccess("Action taken successfully");
    },
    /**
     * Called when the mutation fails.
     * Shows an error toast message with the error message, if available, and logs the error to the console.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to take action");
      console.error(err);
    },
  });
};
