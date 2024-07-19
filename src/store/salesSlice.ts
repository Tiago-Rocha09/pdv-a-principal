import { Customer } from "@/types/customer";
import { CartProduct } from "@/types/product";
import { SaleConfigurationResponse } from "@/types/sales";
import { StateCreator } from "zustand";

export type SalesSlice = {
  sales: {
    isLoading: boolean;
    activeStep: number;
    selectedCustomer: Customer | null;
    selectedProduct: CartProduct | null;
    selectedSaleType: number | null;
    configuration: SaleConfigurationResponse | null;
    selectedTabPrice: number | null;
    cartItems: CartProduct[];
    setActiveStep: (activeStep: SalesSlice["sales"]["activeStep"]) => void;
    setSelectedCustomer: (selectedUser: Customer | null) => void;
    setConfiguration: (configuration: SaleConfigurationResponse | null) => void;
    setSelectedProduct: (selectedProduct: CartProduct | null) => void;
    setSelectedSaleType: (
      selectedSaleType: SalesSlice["sales"]["selectedSaleType"]
    ) => void;
    setSelectedTabPrice: (
      selectedTabPrice: SalesSlice["sales"]["selectedTabPrice"]
    ) => void;
    setIsLoading: (isLoading: boolean) => void;
    setCartItems: (cartItems: CartProduct[]) => void;
  };
};

const initialState = {
  activeStep: 0,
  selectedCustomer: null,
  selectedProduct: null,
  selectedSaleType: null,
  selectedTabPrice: null,
  configuration: null,
  isLoading: false,
  cartItems: [],
};

export const createSalesSlice: StateCreator<SalesSlice, [], [], SalesSlice> = (
  set
) => {
  return {
    sales: {
      activeStep: initialState.activeStep,
      selectedCustomer: initialState.selectedCustomer,
      selectedProduct: initialState.selectedProduct,
      isLoading: initialState.isLoading,
      selectedSaleType: initialState.selectedSaleType,
      selectedTabPrice: initialState.selectedTabPrice,
      cartItems: initialState.cartItems,
      configuration: initialState.configuration,
      setActiveStep: (activeStep: SalesSlice["sales"]["activeStep"]) => {
        set((state) => ({ sales: { ...state.sales, activeStep } }));
      },
      setSelectedCustomer: (selectedCustomer: Customer | null) => {
        set((state) => ({ sales: { ...state.sales, selectedCustomer } }));
      },
      setSelectedProduct: (selectedProduct: CartProduct | null) => {
        set((state) => ({ sales: { ...state.sales, selectedProduct } }));
      },
      setIsLoading: (isLoading: boolean) => {
        set((state) => ({ sales: { ...state.sales, isLoading } }));
      },
      setConfiguration: (configuration: SaleConfigurationResponse | null) => {
        set((state) => ({ sales: { ...state.sales, configuration } }));
      },
      setSelectedSaleType: (
        selectedSaleType: SalesSlice["sales"]["selectedSaleType"]
      ) => {
        set((state) => ({ sales: { ...state.sales, selectedSaleType } }));
      },
      setSelectedTabPrice: (
        selectedTabPrice: SalesSlice["sales"]["selectedTabPrice"]
      ) => {
        set((state) => ({ sales: { ...state.sales, selectedTabPrice } }));
      },
      setCartItems: (cartItems: SalesSlice["sales"]["cartItems"]) => {
        set((state) => ({ sales: { ...state.sales, cartItems } }));
      },
    },
  };
};
