import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_PUBLIC_API_URL}/app`,
  withCredentials: true,
});
