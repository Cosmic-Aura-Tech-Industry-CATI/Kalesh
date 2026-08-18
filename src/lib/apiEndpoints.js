export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    FORGET_PASSWORD: "/auth/forget-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  APPLICATION: {
    CREATE: "/applications",
    UPDATE_BY_TOKEN: (token) => `/applications/${token}`,
    GET_BY_TOKEN: (token) => `/applications/token/${token}`,
    GET_BY_JOB_ID: (jobId) => `/applications/job/${jobId}`,
    GET_BY_ID: (id) => `/applications/${id}`,
    ACCEPT: (id) => `/applications/accept/${id}`,
    REJECT: (id) => `/applications/reject/${id}`,
    DOWNLOAD_APPLICATIONS: (jobId) => `/applications/job/${jobId}/download`,
  },

  PROMOTION: {
    CREATE: "/promotions",
  },

  CONTACT: {
    CREATE: "/contact",
  },

  SUBSCRIBE: {
    CREATE: "/subscribe",
  },

  BLOGS: {
    GET_ALL: "/blogs",
    CREATE: "/blogs",
    GET_BY_SLUG: (slug) => `/blogs/${slug}`,
    UPDATE_BY_SLUG: (slug) => `/blogs/${slug}`,
    DELETE_BY_SLUG: (slug) => `/blogs/${slug}`,
    SHARE_BY_SLUG: (slug) => `/blogs/${slug}/share`,
  },

  JOBS: {
    GET_ALL: "/jobs",
    GET_ADMIN: "/jobs/admin",
    CREATE: "/jobs",
    GET_BY_ID: (id) => `/jobs/${id}`,
    UPDATE_BY_ID: (id) => `/jobs/${id}`,
    DELETE_BY_ID: (id) => `/jobs/${id}/delete`,
    TOGGLE_STATUS_BY_ID: (id) => `/jobs/${id}/toggle-activate`,
  },

  LOGS: {
    GET_LOGS: "/logs",
  },

  ADMIN: {
    USER: {
      GET_ALL: "/admin-panel/users",
      CREATE: "/admin-panel/users",
      GET_BY_ID: (id) => `/admin-panel/users/${id}`,
      UPDATE_BY_ID: (id) => `/admin-panel/users/${id}`,
      DELETE_BY_ID: (id) => `/admin-panel/users/${id}`,
      DIACTIVATE_BY_ID: (id) => `/admin-panel/users/${id}/deactivate`,
      ACTIVATE_BY_ID: (id) => `/admin-panel/users/${id}/activate`,
    },

    ME: {
      GET_PROFILE: "/admin-panel/me",
    },

    REPORTS: {
      GET_ALL: "/admin-panel/reports",
      GET_BY_ID: (id) => `/admin-panel/reports/${id}`,
      TAKE_ACTION: (id) => `/admin-panel/reports/${id}/action`,
    },

    SUBSCRIPTION: {
      GET_ALL: "/admin-panel/subscriptions",
      CREATE: "/admin-panel/subscriptions",
      UPDATE_PRICE_BY_ID: (id) => `/admin-panel/subscriptions/${id}/price`,
      UPDATE_BY_ID: (id) => `/admin-panel/subscriptions/${id}`,
      GET_USERS: "/admin-panel/subscriptions/users",
      GRANT_PLAN: `/admin-panel/subscriptions/grant`,
      REVOKE_PLAN_BY_ID: (id) => `/admin-panel/subscriptions/${id}/revoke`,
      DEACTIVATE_BY_ID: (id) => `/admin-panel/subscriptions/${id}/deactivate`,
    },

    APP_USER: {
      GET_ALL: "/admin-panel/app-users",
      SEARCH: "/admin-panel/app-users/search",
      GET_BY_ID: (id) => `/admin-panel/app-users/${id}`,
      GET_BANNED_USERS: "/admin-panel/app-users/banned",
      BAN_USER: (id) => `/admin-panel/app-users/${id}/ban`,
      UNBAN_USER: (id) => `/admin-panel/app-users/${id}/unban`,
      WARN_USER: (id) => `/admin-panel/app-users/${id}/warn`,
    },

    CONTEST: {
      GET_ALL: "/admin-panel/contests",
      CREATE: "/admin-panel/contests",
      GET_BY_ID: (id) => `/admin-panel/contests/${id}`,
      UPDATE_BY_ID: (id) => `/admin-panel/contests/${id}`,
      DELETE_BY_ID: (id) => `/admin-panel/contests/${id}`,
    },

    HIGHLIGHTS: {
      GET_ALL: "/admin-panel/highlights",
      CREATE: "/admin-panel/highlights",
      UPDATE_BY_ID: (id) => `/admin-panel/highlights/${id}`,
      GET_BY_CATEGORY: (category) => `/admin-panel/highlights/category/${category}`,
      DELETE_BY_ID: (id) => `/admin-panel/highlights/${id}`,
    },

    DASHBOARD: {
      GET_STATS: "/admin-panel/dashboard/stats",
    },

    HIGHLIGHT_CATEGORY: {
      GET_ALL: "/admin-panel/highlight-category",
      CREATE: "/admin-panel/highlight-category",
      UPDATE_BY_ID: (id) => `/admin-panel/highlight-category/${id}`,
      DELETE_BY_ID: (id) => `/admin-panel/highlight-category/${id}`,
    },

    WALLPAPERS: {
      GET_ALL: "/admin-panel/chat-wallpaper",
      CREATE: "/admin-panel/chat-wallpaper",
      UPDATE_BY_ID: (id) => `/admin-panel/chat-wallpaper/${id}`,
      DELETE_BY_ID: (id) => `/admin-panel/chat-wallpaper/${id}/delete`,
      UPDATE_PRICE_BY_ID: (id) => `/admin-panel/chat-wallpaper/${id}/price`,
      SET_DEFAULT_BY_ID: (id) => `/admin-panel/chat-wallpaper/${id}/default`,
    },

    APP_PAGES: {
      GET_ALL: "/admin-panel/app-page",
      GET_BY_CATEGORY: (category) =>
        `/admin-panel/app-page/category/${category}`,
      GET_BY_ID: (id) => `/admin-panel/app-page/${id}`,
      CREATE: "/admin-panel/app-page",
      UPDATE: (id) => `/admin-panel/app-page/${id}`,
      DELETE: (id) => `/admin-panel/app-page/${id}`,
    },

    INTEREST: {
      GET_ALL: "/admin-panel/interest",
      CREATE: "/admin-panel/interest",
      UPDATE: (id) => `/admin-panel/interest/${id}`,
      DELETE: (id) => `/admin-panel/interest/${id}`,
    },
    
    SUBSCRIBE_EVENT: {
      STREAM: "/admin-panel/subscribe-event/updates/stream",
    }
  },
};
