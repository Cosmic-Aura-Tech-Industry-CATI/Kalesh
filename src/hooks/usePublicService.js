import { useMutation } from "@tanstack/react-query";
import { PublicService } from "../services/public.service";
import { toastError, toastSuccess } from "../lib/toast";

/**
 * Create Application Hook
 */
export const useCreateApplication = () => {
  return useMutation({
    mutationFn: PublicService.createApplication,
    /**
     * Called when the application submission is successful.
     * Displays a success toast message.
     */
    onSuccess: () => {
      toastSuccess("Application submitted successfully");
    },
    /**
     * Called when the application submission fails.
     * Logs the error to the console and displays an error toast message.
     * The toast message will be the error message from the server response, or a generic
     * error message if no response is available.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      console.error("Error submitting application:", err);
      toastError(
        err?.response?.data?.message || "Failed to submit application"
      );
    },
  });
};

/**
 * Create Promotion Hook
 */
export const useCreatePromotion = () => {
  return useMutation({
    mutationFn: PublicService.createPromotion,
    /**
     * Called when the promotion submission is successful.
     * Displays a success toast message indicating that the promotion was submitted successfully.
     */
    onSuccess: () => {
      toastSuccess("Promotion submitted successfully");
    },
    /**
     * Called when the promotion submission fails.
     * Logs the error to the console and displays an error toast message.
     * The toast message will be the error message from the server response, or a generic
     * error message if no response is available.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      console.error("Error submitting promotion:", err);
      toastError(err?.response?.data?.message || "Failed to submit promotion");
    },
  });
};

/**
 * Create Contact Hook
 */
export const useCreateContact = () => {
  return useMutation({
    mutationFn: PublicService.createContact,
    /**
     * Called when the contact submission is successful.
     * Displays a success toast message indicating that the message was sent successfully.
     */
    onSuccess: () => {
      toastSuccess("Message sent successfully");
    },
    /**
     * Called when the contact submission fails.
     * Logs the error to the console and displays an error toast message.
     * The toast message will be the error message from the server response, or a generic
     * error message if no response is available.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      console.error("Error submitting contact:", err);
      toastError(err?.response?.data?.message || "Failed to send message");
    },
  });
};

/**
 * Create Subscribe Hook
 */
export const useSubscribe = () => {
  return useMutation({
    mutationFn: PublicService.createSubscribe,
    /**
     * Called when the subscription is successful.
     * Displays a success toast message indicating that the user has been subscribed successfully.
     */
    onSuccess: () => {
      toastSuccess("Subscribed successfully");
    },
    /**
     * Called when the subscription fails.
     * Logs the error to the console and displays an error toast message.
     * The toast message will be the error message from the server response, or a generic
     * error message if no response is available.
     * @param {Object} err - The error object returned from the API.
     */
    onError: (err) => {
      console.error("Error subscribing:", err);
      toastError(err?.response?.data?.message || "Failed to subscribe");
    },
  });
};
