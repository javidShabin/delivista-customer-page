import { axiosInstance } from "../config/axiosInstance";

export const addToCartAPI = (payload: any) =>
  axiosInstance.post("/cart/add-cart", payload);

export const getAllCart = () => 
  axiosInstance.get("/cart/cart-items")