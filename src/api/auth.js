import apiClient from "./client";

export const authApi = {
  /** POST /auth/login */
  login: (credentials) =>
    apiClient.post("/auth/login", credentials).then((r) => r.data),

  /** POST /users */
  register: (userData) =>
    apiClient.post("/users", userData).then((r) => r.data),

  /** GET /auth/profile */
  getProfile: () =>
    apiClient.get("/auth/profile").then((r) => r.data),
};
