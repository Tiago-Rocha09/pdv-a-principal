import { Customer } from "@/types/customer";
import { StateCreator } from "zustand";

export type SalesSlice = {
  sales: {
    isLoading: boolean;
    activeStep: number;
    selectedCustomer: Customer | null;
    selectedSaleType: number | null;
    setActiveStep: (activeStep: SalesSlice["sales"]["activeStep"]) => void;
    setSelectedCustomer: (selectedUser: Customer) => void;
    setSelectedSaleType: (
      selectedSaleType: SalesSlice["sales"]["selectedSaleType"]
    ) => void;
    setIsLoading: (isLoading: boolean) => void;
  };
};

const initialState = {
  activeStep: 0,
  selectedCustomer: null,
  selectedSaleType: null,
  isLoading: false,
};

export const createSalesSlice: StateCreator<SalesSlice, [], [], SalesSlice> = (
  set
) => {
  return {
    sales: {
      activeStep: initialState.activeStep,
      selectedCustomer: initialState.selectedCustomer,
      isLoading: initialState.isLoading,
      selectedSaleType: initialState.selectedSaleType,
      setActiveStep: (activeStep: SalesSlice["sales"]["activeStep"]) => {
        set((state) => ({ sales: { ...state.sales, activeStep } }));
      },
      setSelectedCustomer: (selectedCustomer: Customer) => {
        set((state) => ({ sales: { ...state.sales, selectedCustomer } }));
      },
      setIsLoading: (isLoading: boolean) => {
        set((state) => ({ sales: { ...state.sales, isLoading } }));
      },
      setSelectedSaleType: (
        selectedSaleType: SalesSlice["sales"]["selectedSaleType"]
      ) => {
        set((state) => ({ sales: { ...state.sales, selectedSaleType } }));
      },
    },
  };
};
