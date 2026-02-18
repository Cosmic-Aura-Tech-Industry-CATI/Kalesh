import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { JobService } from "../services/job.service";

/**
 * Fetch all jobs
 */
export const useGetAllJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: JobService.getAllJobs,
  });
};

/**
 * Fetch job by id
 */
export const useGetJobById = (id) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => JobService.getJobById(id),
    enabled: !!id,
  });
};

/**ca
 * Create job
 */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => JobService.createJob(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

/**
 * Update job
 */
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => JobService.updateJob(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

/**
 * Delete job
 */
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => JobService.deleteJob(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
};
