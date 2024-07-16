import { STORAGE_KEY_ACCESS_TOKEN } from "@/constants";
import axios from "axios";

async function getToken() {
  const accessToken = window.localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
  return accessToken;
}

export const api = axios.create({
  // baseURL: 'http://localhost:10101/v2/'
  baseURL: "https://api.prod.aprincipalbb.com.br/api/v2",
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        console.log("Token found:", token);
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("No token found");
      }
      config.headers["Current-Path"] = window.location.pathname;
      console.log("Config headers:", config.headers);
      return config;
    } catch (error) {
      console.error("Interceptor error", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);
