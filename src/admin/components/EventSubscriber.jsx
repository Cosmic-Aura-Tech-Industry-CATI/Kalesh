import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import React, { useEffect, useState } from "react";

import { API_ENDPOINTS } from "../../lib/apiEndpoints";
import { AuthService } from "../../services/auth.service";

const EventSubscriber = ({ currentUserId }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!currentUserId) return;

    const token = AuthService.getToken();
    const abortController = new AbortController();

    fetchEventSource(
      `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.ADMIN.SUBSCRIBE_EVENT.STREAM}?userId=${currentUserId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal,

        onmessage(event) {
          const data = JSON.parse(event.data);
          if (data.event.endsWith("_image_live")) {
            const type = data.event.split("_")[0];
            const entityName = type.toUpperCase();
            toast.success(`${entityName} image is live!`, {
              duration: 6000,
            });
            queryClient.invalidateQueries({ queryKey: [`${type}`] });
          } else if (data.event.includes("upload_failed")) {
            alert(`Upload Failed: ${data.message}`);
          }
        },
        onerror(err) {
          console.error("SSE Connection lost", err);
        },
      },
    );

    return () => {
      abortController.abort();
    };
  }, [currentUserId]);

  return null;
};

export default EventSubscriber;
