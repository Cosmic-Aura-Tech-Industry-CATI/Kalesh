import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useEffect } from "react";

import { API_ENDPOINTS } from "../../lib/apiEndpoints";
import { AuthService } from "../../services/auth.service";

const EventSubscriber = ({ currentUserId }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!currentUserId) return;

    const token = AuthService.getToken();
    if (!token) return;

    const abortController = new AbortController();
    const baseUrl = import.meta.env.VITE_API_URL || "";
    const sseUrl = `${baseUrl}${API_ENDPOINTS.ADMIN.SUBSCRIBE_EVENT.STREAM}?userId=${encodeURIComponent(currentUserId)}`;

    fetchEventSource(sseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: abortController.signal,

      async onopen(response) {
        if (
          response.ok &&
          response.headers.get("content-type")?.includes("text/event-stream")
        ) {
          return; // Connected successfully
        }
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Auth error ${response.status}`);
        }
      },

      onmessage(event) {
        try {
          const data = JSON.parse(event.data);
          if (data.event && data.event.endsWith("_image_live")) {
            const type = data.event.split("_")[0];
            const entityName = type.toUpperCase();
            toast.success(`${entityName} image is live!`, {
              duration: 6000,
            });
            queryClient.invalidateQueries({ queryKey: [type] });
            if (type === "highlight") {
              queryClient.invalidateQueries({ queryKey: ["highlights"] });
            }
          } else if (data.event && data.event.includes("upload_failed")) {
            toast.error(`Upload Failed: ${data.message || "Unknown error"}`);
          }
        } catch (e) {
          console.error("Error parsing SSE event data:", e);
        }
      },

      onerror(err) {
        if (abortController.signal.aborted) {
          return;
        }
        console.warn("SSE Connection issue:", err?.message || err);
        if (err?.message?.includes("Auth error")) {
          throw err; // Stop retrying on auth failure
        }
      },
    });

    return () => {
      abortController.abort();
    };
  }, [currentUserId, queryClient]);

  return null;
};

export default EventSubscriber;
