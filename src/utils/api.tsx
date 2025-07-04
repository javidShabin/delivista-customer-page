import { axiosInstance } from "../config/axiosInstance";

export const checkUserAuth = async () => {
  try {
    const response = await axiosInstance.get("/authentication/verify-auth");
    return response.data.user;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
};
