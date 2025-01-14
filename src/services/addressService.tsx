import { axiosInstance } from "../config/axiosInstance";

export const addressStatusAPI = () => {
    return axiosInstance.get("/address/status-address")
}