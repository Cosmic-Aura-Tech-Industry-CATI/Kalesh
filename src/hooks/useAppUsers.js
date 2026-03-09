import { useQuery } from "@tanstack/react-query";
import { AppUsersService } from "../services/appUsers.service";

/**
 * A hook that fetches all application users from the API.
 * It returns the result of the useQuery hook.
 * It contains the data returned from the query function, the status of the query,
 * and functions to refresh the query and check if the data is loading.
 * The query will only run if the id exists.
 */
export const useGetAllAppUsers = () => {
  return useQuery({
    queryKey: ["app-users"],
    queryFn: AppUsersService.getAllAppUsers,
  });
};
