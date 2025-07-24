import { axiosInstance } from "../config/axiosInstance";

// Add item to wishlist
export const addToWishlist = (menuId: string) =>
  axiosInstance.post("/wishlist/add", { menuId });