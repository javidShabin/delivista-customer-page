import { axiosInstance } from "../config/axiosInstance";

// Get list from wishlist
export const getAllOrders = () => {
    return axiosInstance.get("pyment/get-all-orders")
  }

// Get single order by ID
export const getOrderById = (orderId: string) => {
    return axiosInstance.get(`pyment/single-order/${orderId}`)

}
  