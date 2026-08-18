import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InterestService } from "../services/InterestService";

/**
 * Get All Interests
 */
export const useGetInterests = () => {
  return useQuery({
    queryKey: ["interest"],
    queryFn: () => InterestService.getAllInterests(),
    keepPreviousData: true,
  });
};

/**
 * Create Interest
 */
export const useCreateInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: InterestService.createInterest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interest"],
      });
    },
  });
};

/**
 * Update Interest
 */
export const useUpdateInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => InterestService.updateInterest(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interest"],
      });
    },
  });
};

/**
 * Delete Interest
 */
export const useDeleteInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: InterestService.deleteInterest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interest"],
      });
    },
  });
};
