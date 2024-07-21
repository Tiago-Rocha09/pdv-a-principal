import { ProductStock } from "@/types/product";
import { StateCreator } from "zustand";

export type ProductSlice = {
  product: {
    showModalLocalStock: boolean;
    productStock: ProductStock | null;
    isLoading: boolean;
    setShowModalLocalStock: (
      showModalLocalStock: ProductSlice["product"]["showModalLocalStock"]
    ) => void;
    setIsLoading: (isLoading: ProductSlice["product"]["isLoading"]) => void;
    setProductStock: (
      productStock: ProductSlice["product"]["productStock"]
    ) => void;
  };
};

const initialState = {
  showModalLocalStock: false,
  isLoading: false,
  productStock: null,
};

export const createProductSlice: StateCreator<
  ProductSlice,
  [],
  [],
  ProductSlice
> = (set) => {
  return {
    product: {
      showModalLocalStock: initialState.showModalLocalStock,
      isLoading: initialState.isLoading,
      productStock: initialState.productStock,
      setShowModalLocalStock: (
        showModalLocalStock: ProductSlice["product"]["showModalLocalStock"]
      ) => {
        set((state) => ({
          product: { ...state.product, showModalLocalStock },
        }));
      },
      setIsLoading: (isLoading: ProductSlice["product"]["isLoading"]) => {
        set((state) => ({
          product: { ...state.product, isLoading },
        }));
      },
      setProductStock: (
        productStock: ProductSlice["product"]["productStock"]
      ) => {
        set((state) => ({ product: { ...state.product, productStock } }));
      },
    },
  };
};
