import { Customer } from '@/types/customer'
import { StateCreator } from 'zustand'

export type CustomerSlice = {
  customer: {
    customers: Customer[]
    isLoading: boolean
    setIsLoading: (isLoading: CustomerSlice['customer']['isLoading']) => void
    setCustomers: (customers: CustomerSlice['customer']['customers']) => void
  }
}

const initialState = {
  isLoading: false,
  customers: [],
}

export const createCustomerSlice: StateCreator<CustomerSlice, [], [], CustomerSlice> = (set) => {
  return {
    customer: {
      isLoading: initialState.isLoading,
      customers: initialState.customers,
      setIsLoading: (isLoading: CustomerSlice['customer']['isLoading']) => {
        set((state) => ({
          customer: { ...state.customer, isLoading },
        }))
      },
      setCustomers: (customers: CustomerSlice['customer']['customers']) => {
        set((state) => ({ customer: { ...state.customer, customers } }))
      },
    },
  }
}
