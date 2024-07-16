import { api } from "./api";

export const customerService = {
  getCustomers: async (searchTerm: string, codLoja: number) => {
    const result = await api
      .get("/pdv/customer", {
        params: {
          searchTerm,
          codLoja,
        },
      })
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
