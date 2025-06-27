
import { axiosInstance } from "@/config/axiosInstance";

export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get("/authentication/verify-auth", {
      withCredentials: true, // Ensure cookies are sent with request
    });
    return res.data.user; // assuming backend returns: { user: {...} }
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
};
