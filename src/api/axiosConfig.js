import axios from "axios";
import { logoutAndRedirect } from "../utils/logoutAndRedirect";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401 || status === 403) {
                logoutAndRedirect();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
