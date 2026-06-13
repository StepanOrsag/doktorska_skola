import { apiClient } from "../../../shared/api/base";

export const userService = {
  getProfile: (userId) => apiClient(`/users/${userId}`),

  login: (credentials) => apiClient("/auth/login", {
    body: credentials
  }),
};
