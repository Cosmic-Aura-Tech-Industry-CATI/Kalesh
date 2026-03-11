import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApplicationService } from "../services/application.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * Get application by token
 */
export const useGetApplicationByToken = (token) => {
  return useQuery({
    queryKey: ["application", token],
    queryFn: () => ApplicationService.getApplicationByToken(token),
    enabled: !!token,
  });
};

/**
 * Get applications by job id (admin)
 */
export const useGetApplicationsByJobId = (jobId) => {
  return useQuery({
    queryKey: ["applications", jobId],
    queryFn: () => ApplicationService.getApplicationsByJobId(jobId),
    enabled: !!jobId,
  });
};

/**
 * Submit application
 */
export const useSubmitApplication = () => {
  return useMutation({
    /**
     * Submit application to the API.
     * @param {Object} payload - The application data to be submitted.
     * @returns {Promise<Object>} - The result of the submission.
     */
    mutationFn: (payload) => ApplicationService.submitApplication(payload),
    /**
     * Called when the application submission is successful.
     * Displays a success toast message.
     */
    onSuccess: () => {
      toastSuccess("Application submitted successfully");
    },

    /**
     * Called when the application submission fails.
     * Displays an error toast message with the error message, if available.
     * Logs the error to the console for debugging purposes.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      toastError(err.response?.data?.message || "Failed to submit application");
      console.error(err);
    },
  });
};

/**
 * Update application
 */
export const useUpdateApplication = () => {
  return useMutation({
    /**
     * A function that updates an application by token.
     * It takes an object with two properties: token and payload.
     * The token is the unique identifier for the application to be updated.
     * The payload is the application data to be updated.
     * It calls the updateApplication function from the ApplicationService and returns the result.
     */
    mutationFn: ({ token, payload }) =>
      ApplicationService.updateApplication(token, payload),
    /**
     * Called when the application update is successful.
     * Displays a success toast message.
     */
    onSuccess: () => {
      toastSuccess("Application updated successfully");
    },

    /**
     * Called when the application update fails.
     * Displays an error toast message with the error message, if available.
     * Logs the error to the console for debugging purposes.
     * @param {Object} err - The error object returned from the API.
     **/
    onError: (err) => {
      toastError(err.response?.data?.message || "Failed to update application");
      console.error(err);
    },
  });
};

/**
 * Accept application
 */
export const useAcceptApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * A function that accepts an application by its id.
     * It calls the acceptApplication function from the ApplicationService and returns the result.
     * @param {number} id - The id of the application to be accepted.
     * @returns {Promise<Object>} - The result of the acceptance.
     */
    mutationFn: (id) => ApplicationService.acceptApplication(id),

    /**
     * Called when the application acceptance is successful.
     * Invalidates the cache for the applications query and displays a success toast message.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      toastSuccess("Application accepted successfully");
    },

    /**
     * Called when the application acceptance fails.
     * Displays an error toast message with the error message, if available.
     * Logs the error to the console for debugging purposes.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      toastError(err.response?.data?.message || "Failed to accept application");
      console.error(err);
    },
  });
};

/**
 * Reject application
 */
export const useRejectApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * A function that rejects an application by its id.
     * It calls the rejectApplication function from the ApplicationService and returns the result.
     * @param {number} id - The id of the application to be rejected.
     * @returns {Promise<Object>} - The result of the rejection.
     */
    mutationFn: (id) => ApplicationService.rejectApplication(id),

    /**
     * Called when the application rejection is successful.
     * Invalidates the cache for the applications query and displays a success toast message.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      toastSuccess("Application rejected successfully");
    },

    /**
     * Called when the application rejection fails.
     * Displays an error toast message with the error message, if available.
     * Logs the error to the console for debugging purposes.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      toastError(err.response?.data?.message || "Failed to reject application");
      console.error(err);
    },
  });
};

/**
 * Download applications
 */
export const useDownloadApplications = () => {
  return useMutation({
    mutationFn: (jobId) => ApplicationService.downloadApplications(jobId),
    /**
     * Called when the application download is successful.
     * Creates a link to download the application data as an Excel file
     * and displays a success toast message.
     * @param {Blob} data - The application data to be downloaded.
     * @param {number} jobId - The id of the job for which the applications are being downloaded.
     */
    onSuccess: (data, jobId) => {
      toastSuccess("Applications downloaded successfully");
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `applications_job_${jobId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    /**
     * Called when the application download fails.
     * Displays an error toast message with the error message, if available.
     * Logs the error to the console for debugging purposes.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      toastError(
        err.response?.data?.message || "Failed to download applications"
      );
      console.errro(err);
    },
  });
};
