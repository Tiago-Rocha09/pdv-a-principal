import { LoginProps } from "@/types/login";
import { api } from "./api";

export const authService = {
  getBases: async () => {
    const result = await api
      .get("/base/available-bases")
      .then(({ data, status }) => ({
        status,
        data,
      }))
      .catch(({ response }) => ({
        status: response.status,
        data: response.data,
      }));
    return result;
  },
  getBaseStores: async (base: number) => {
    const result = await api
      .get(`/base/${base}/stores`)
      .then(({ data, status }) => ({
        status,
        data,
      }))
      .catch(({ response }) => ({
        status: response.status,
        data: response.data,
      }));
    return result;
  },
  login: async (data: LoginProps) => {
    const result = await api
      .post("/login", data)
      .then(({ data, status }) => ({
        status,
        data,
      }))
      .catch(({ response }) => ({
        status: response.status,
        data: response.data,
      }));
    return result;
  },
};
