import { productService } from "@/services/products";
import { useStore } from "@/store";
import { Customer } from "@/types/customer";
import {
  Product,
  ProductStock,
  ProductStockResponseApi,
} from "@/types/product";
import { useState } from "react";

export const useProduct = () => {
  const storeId = useStore((state) => state.login.user?.storeId) as number;
  const tabPrice = useStore((state) => state.sales.selectedTabPrice) as number;

  const [products, setProducts] = useState<Product[]>([]);
  const [productStock, setProductStock] = useState<ProductStock[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const listProducts = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const response = await productService.getProducts(
        searchTerm,
        storeId,
        storeId,
        tabPrice
      );
      setIsLoading(false);
      console.log({ response });

      if (response.status === 200) {
        return setProducts(response.data);
      }
      setProducts([]);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);

      setProducts([]);
    }
  };

  const getProductStock = async (codProd: string) => {
    try {
      setIsLoading(true);
      const response = await productService.getProductStock(storeId, codProd);
      console.log({ response });

      setIsLoading(false);
      if (response.status === 200) {
        const productStock: ProductStockResponseApi[] = response.data;
        console.log(
          productStock.map((item) => ({
            codLocal: item.CodLocal,
            nomeLocal: item.NomeLocal,
            estoque: item.Estoque,
          }))
        );

        return setProductStock(
          productStock.map((item) => ({
            codLocal: item.CodLocal,
            nomeLocal: item.NomeLocal,
            estoque: item.Estoque,
          }))
        );
      }
      setProductStock([]);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);

      setProductStock([]);
    }
  };

  const totalProducts = () => {
    if (!products.length) {
      return "Nenhum produto encontrado";
    } else if (products.length === 1) {
      return "1 produto encontrado";
    } else {
      return `${products.length} produtos encontrados`;
    }
  };

  return {
    products,
    isLoading,
    listProducts,
    totalProducts,
    getProductStock,
  };
};
