import apiClient from "./apiClient";

export const saveProgress = (data) => apiClient.post("/progress", data);

export const getProgressForUser = (userId) =>
    apiClient.get(`/progress/user/${userId}`);

export const getProgressForUserInAdventure = (userId, adventureId) =>
    apiClient.get(`/progress/user/${userId}/adventure/${adventureId}`);
