import { axiosInstance } from "../config/axiosInstance";

// Get list from wishlist
export const getAllOrders = () => {
    return axiosInstance.get("pyment/get-all-orders")
  }
  