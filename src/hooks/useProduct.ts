import { productService } from "@/services/products";
import { useStore } from "@/store";
import { Customer } from "@/types/customer";
import { Product } from "@/types/product";
import { useState } from "react";

export const useProduct = () => {
  const storeId = useStore((state) => state.login.user?.storeId) as number;
  const tabPrice = useStore((state) => state.sales.selectedTabPrice) as number;

  const [products, setProducts] = useState<Product[]>([]);
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
      setProducts(response.data);
      console.log(response);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);

      setProducts([]);
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
  };
};
