export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
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

  JOBS: {
    GET_ALL: "/jobs",
    GET_ADMIN: "/jobs/admin",
    CREATE: "/jobs",
    GET_BY_ID: (id) => `/jobs/${id}`,
    UPDATE_BY_ID: (id) => `/jobs/${id}`,
    DELETE_BY_ID: (id) => `/jobs/${id}`,
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

    SUBSCRIPTION: {
      GET_ALL: "/admin-panel/subscriptions",
      CREATE: "/admin-panel/subscriptions",
      UPDATE_PRICE_BY_ID: (id) => `/admin-panel/subscriptions/${id}/price`,
      UPDATE_BY_ID: (id) => `/admin-panel/subscriptions/${id}`,
      GET_USERS: "/admin-panel/subscriptions/users"
    },

    APP_USER: {
      GET_ALL: "/admin-panel/app-users",
      GET_BY_ID: (id) => `/admin-panel/app-users/${id}`,
    },
  },
};
