import apiClient from "./apiClient";

export const login = (data) => apiClient.post("/login", data);
export const register = (data) => apiClient.post("/users", data);