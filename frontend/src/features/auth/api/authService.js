import { apiClient } from "../../../shared/api/base";

export const authService = {
  login: (credentials) => apiClient("/auth/login", {
    body: credentials
  }),
};
