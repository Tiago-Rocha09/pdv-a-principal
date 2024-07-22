import { api } from "./api";

export const productService = {
  getProducts: async (
    searchTerm: string,
    codLoja: number,
    local: number,
    tabPrice: number
  ) => {
    const result = await api
      .get("/pdv/product", {
        params: {
          searchTerm,
          codLoja,
          local,
          tabPrice,
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
  getProductStock: async (codLoja: number, codProd: string) => {
    const result = await api
      .get(`/pdv/product/${codProd}`, {
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
  getProductImages: async (codLoja: number, codProd: string) => {
    const result = await api
      .get(`/pdv/product/${codProd}/images`, {
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
