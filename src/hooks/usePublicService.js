import { useMutation } from "@tanstack/react-query";
import { PublicService } from "../services/public.service";
// import toast from "react-hot-toast";

/**
 * Create Application Hook
 */
export const useCreateApplication = () => {
  return useMutation({
    mutationFn: PublicService.createApplication,
    onSuccess: () => {
        console.log("Application submitted successfully");
        // toast.success("Application submitted successfully");
    },
    onError: (err) => {
        console.error("Error submitting application:", err);
        // toast.error(
        //   err?.response?.data?.message || "Failed to submit application"
        // );
    },
  });
};

/**
 * Create Promotion Hook
 */
export const useCreatePromotion = () => {
  return useMutation({
    mutationFn: PublicService.createPromotion,
    onSuccess: () => {
        console.log("Promotion submitted successfully");
        // toast.success("Promotion submitted successfully");
    },
    onError: (err) => {
        console.error("Error submitting promotion:", err);
    //   toast.error(
    //     err?.response?.data?.message || "Failed to submit promotion"
    //   );
    },
  });
};

/**
 * Create Contact Hook
 */
export const useCreateContact = () => {
  return useMutation({
    mutationFn: PublicService.createContact,
    onSuccess: () => {
    //   toast.success("Message sent successfully");
        console.log("Contact submitted successfully");
    },
    onError: (err) => {
        console.error("Error submitting contact:", err);
    //   toast.error(
    //     err?.response?.data?.message || "Failed to send message"
    //   );
    },
  });
};

/**
 * Create Subscribe Hook
 */
export const useSubscribe = () => {
  return useMutation({
    mutationFn: PublicService.createSubscribe,
    onSuccess: () => {
    //   toast.success("Subscribed successfully");
        console.log("Subscribed successfully");
    },
    onError: (err) => {
        console.error("Error subscribing:", err);
        //   toast.error(
    //     err?.response?.data?.message || "Subscription failed"
    //   );
    },
  });
};
