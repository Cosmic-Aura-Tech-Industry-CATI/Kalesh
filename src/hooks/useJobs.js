import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { JobService } from "../services/job.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * Fetch all jobs
 */
export const useGetAllJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: JobService.getAllJobs,
  });
};

export const useGetAdminJobs = () => {
  return useQuery({
    queryKey: ["admin-jobs"],
    queryFn: JobService.getAdminJobs,
  });
}

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

    /**
     * Called when the job creation is successful.
     * Invalidates the cache for the jobs query.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-jobs"],
      });
      toastSuccess("Job created successfully");
    },

    /**
     * Called when the job creation fails.
     * Displays an error toast with the error message from the server response,
     * or a generic error message if no response is available.
     * Logs the error to the console.
     * @param {Error} err - The error returned from the mutation function.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to create job");
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

    /**
     * Called when the job update is successful.
     * Invalidates the cache for the jobs query.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-jobs"],
      });
      toastSuccess("Job updated successfully");
    },

    /**
     * Called when the job update fails.
     * Displays an error toast with the error message from the server response,
     * or a generic error message if no response is available.
     * Logs the error to the console.
     * @param {Error} err - The error returned from the mutation function.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to update job");
      console.error(err);
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

    /**
     * Called when the job deletion is successful.
     * Invalidates the cache for the jobs query and displays a success toast message.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toastSuccess("Job deleted successfully");
    },

    /**
     * Called when the job deletion fails.
     * Displays an error toast with the error message from the server response,
     * or a generic error message if no response is available.
     * Logs the error to the console.
     * @param {Error} err - The error returned from the mutation function.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to delete job");
      console.error(err);
    },
  });
};

export const useToggleJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }) => JobService.toggleJobStatus(id, isActive),

    /**
     * Called when the job status is toggled successfully.
     * Invalidates the cache for the jobs queries and displays a success toast message.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toastSuccess("Job status toggled successfully");
    },

    /**
     * Called when the job status toggle fails.
     */
    onError: (err) => {
      toastError(err?.response?.data?.message || "Failed to toggle job status");
      console.error(err);
    },
  });
};