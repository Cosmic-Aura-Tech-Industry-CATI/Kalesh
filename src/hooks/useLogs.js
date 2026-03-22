import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { LogsService } from "../services/logs.service";

/**
 * A hook that fetches admin logs from the API.
 * It returns the result of the useQuery hook.
 * @param {Object} params - Query parameters for filtering and pagination.
 */
export const useGetLogs = (params = {}) => {
  return useQuery({
    queryKey: ["logs", params],
    queryFn: () => LogsService.getLogs(params),
    placeholderData: keepPreviousData,
  });
};
