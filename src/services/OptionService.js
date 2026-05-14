import apiClient from "./apiClient";

export const getOptionById = (id) => apiClient.get(`/options/${id}`);
