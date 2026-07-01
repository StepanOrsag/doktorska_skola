import { apiClient } from "../../../shared/api/base";

export const userService = {
  getProfile: (userId) => apiClient(`/users/${userId}`),
};
