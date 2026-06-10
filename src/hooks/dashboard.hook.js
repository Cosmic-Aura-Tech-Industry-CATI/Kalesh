import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../services/dashboard.service";

/**
 * A hook that fetches dashboard statistics from the API.
 * @returns {UseQueryResult} - The result of the useQuery hook containing the stats data.
 */
export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: DashboardService.getStats,
  });
};
