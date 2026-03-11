import toast from "react-hot-toast";

/**
 * Displays a success toast notification with the given message.
 * The toast will have a dark blue background, light green text, and a light green border.
 * The toast icon will be light green with a dark blue secondary color.
 *
 * @param {string} message - The message to be displayed in the toast.
 */
export const toastSuccess = (message) => {
  toast.success(message, {
    style: {
      background: "#0b0b0b",
      color: "#00ff9c",
      border: "1px solid #00ff9c",
    },
    iconTheme: {
      primary: "#00ff9c",
      secondary: "#0b0b0b",
    },
  });
};

/**
 * Displays an error toast notification with the given message.
 * The toast will have a dark blue background, red text, and a red border.
 * The toast icon will be red with a dark blue secondary color.
 *
 * @param {string} message - The message to be displayed in the toast.
 */
export const toastError = (message) => {
  toast.error(message, {
    style: {
      background: "#0b0b0b",
      color: "#ff3b3b",
      border: "1px solid #ff3b3b",
    },
    iconTheme: {
      primary: "#ff3b3b",
      secondary: "#0b0b0b",
    },
  });
};

/**
 * Displays a warning toast notification with the given message.
 * The toast will have a dark blue background, orange text, and an orange border.
**/
export const toastWarning = (message) => {
  toast(message, {
    icon: "⚠️",
    style: {
      background: "#0b0b0b",
      color: "#ffb020",
      border: "1px solid #ffb020",
    },
  });
};