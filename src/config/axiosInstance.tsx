import axios from "axios";

console.log(import.meta.env.VITE_API_URL); // should now log the correct value

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/app`,
  withCredentials: true,
});