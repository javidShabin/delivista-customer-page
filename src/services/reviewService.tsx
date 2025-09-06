import { axiosInstance } from "../config/axiosInstance";

// Submit restaurant review and rating
export const submitRestaurantReview = (data: {
  sellerId: string;
  menuItemId: string;
  orderId: string;
  rating: number;
  review: string;
}) => {
  return axiosInstance.post("/review/restaurant-review", data);
};
