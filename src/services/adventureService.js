import apiClient from "./apiClient";

export const getAdventures = () => apiClient.get("/adventures");
export const getAdventureById = (id) => apiClient.get(`/adventures/${id}`);
export const getScenesFromAdventure = (id) =>
    apiClient.get(`/adventures/${id}/scenes`);
export const getSceneById = (id) => apiClient.get(`/scenes/${id}`);
export const getOptionsFromScene = (id) =>
    apiClient.get(`/scenes/${id}/options`);
