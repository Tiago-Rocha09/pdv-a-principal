import { api } from "./api";

export const salesService = {
  getSaleTypes: async (codLoja: number) => {
    const result = await api
      .get("/pdv/sales/type", {
        params: {
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
  getConfiguration: async (codLoja: number) => {
    const result = await api
      .get("/pdv/sales/configuration", {
        params: {
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
  getPaymentType: async (codLoja: number) => {
    const result = await api
      .get("/pdv/sales/payment-type", {
        params: {
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
