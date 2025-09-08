import { axiosInstance } from "../config/axiosInstance";

// Get all revies for restaurant
export const getAllRatings = (sellerId: any) => {
    return axiosInstance.post(`review/get-all-review`, {
        sellerId
    })
}