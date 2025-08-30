import { axiosInstance } from "../config/axiosInstance";

// Add item to wishlist
export const addToWishlist = (menuId: string) =>
  axiosInstance.post("/wishlist/add", { menuId });

// Get list from wishlist
export const getFavorites = () => {
  return axiosInstance.get("/wishlist/get-list")
}

// Remove item from wishlist
export const removeFavitem = (menuId: string) => {
  axiosInstance.delete('/wishlist/remove', )
}