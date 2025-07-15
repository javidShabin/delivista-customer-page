import { axiosInstance } from "../config/axiosInstance";

export const fetchAllMenus = (restaurantId: string, page = 1, limit = 8) =>
  axiosInstance.get(`/menu/get-all-menus/${restaurantId}?page=${page}&limit=${limit}`);

export const fetchMenusByCategory = (category: string, restaurantId: string, page = 1, limit = 8) =>
  axiosInstance.get(`/menu/get-menu-by-catagory/${category}?restaurantId=${restaurantId}&page=${page}&limit=${limit}`);

export const fetchMenusBySearch = (keyword: string, restaurantId: string, page = 1, limit = 8) =>
  axiosInstance.get(`/menu/search-menu?restaurantId=${restaurantId}&keyword=${keyword}&page=${page}&limit=${limit}`);

export const fetchMenusByTag = (tag: string, restaurantId: string, page = 1, limit = 8) =>
  axiosInstance.get(`/menu/menu-by-tag?restaurantId=${restaurantId}&tag=${tag}&page=${page}&limit=${limit}`);

export const fetchAvailableMenus = (restaurantId: string, page = 1, limit = 8) =>
  axiosInstance.get(`/app/menu/available-menu?restaurantId=${restaurantId}&isAvailable=true&page=${page}&limit=${limit}`);
