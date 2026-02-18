export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  APPLICATION: {
    CREATE: "/applications",
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
  ADMIN: {
    USER: {
      GET_ALL: "/admin-panel/users",
      CREATE: "/admin-panel/users",
      GET_BY_ID: (id) => `/admin-panel/users/${id}`,
      UPDATE_BY_ID: (id) => `/admin-panel/users/${id}`,
      DELETE_BY_ID: (id) => `/admin-panel/users/${id}`,
    },
  },
};
