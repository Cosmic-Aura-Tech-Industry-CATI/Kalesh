import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApplicationService } from "../services/application.service";


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
    mutationFn: (payload) =>
      ApplicationService.submitApplication(payload),

    onError: (err) => {
      console.log(err);
    },
  });
};


/**
 * Update application
 */
export const useUpdateApplication = () => {
  return useMutation({
    mutationFn: ({ token, payload }) =>
      ApplicationService.updateApplication(token, payload),

    onError: (err) => {
      console.log(err);
    },
  });
};


/**
 * Accept application
 */
export const useAcceptApplication = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      ApplicationService.acceptApplication(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
};


/**
 * Reject application
 */
export const useRejectApplication = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      ApplicationService.rejectApplication(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
};


/**
 * Download applications
 */
export const useDownloadApplications = () => {
  return useMutation({
    mutationFn: (jobId) => ApplicationService.downloadApplications(jobId),
    onSuccess: (data, jobId) => {
      console.log('Applications downloaded successfully');
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `applications_job_${jobId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }    ,
    onError: (err) => {
      console.log(err);
    },
  });
};
