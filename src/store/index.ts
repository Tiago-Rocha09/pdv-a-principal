import { create } from 'zustand'
import { createLoginSlice, LoginSlice } from './loginSlice'
import { createSalesSlice, SalesSlice } from './salesSlice'
import { createProductSlice, ProductSlice } from './productSlice'
import { createCustomerSlice, CustomerSlice } from './customerSlice'

export const useStore = create<LoginSlice & SalesSlice & ProductSlice & CustomerSlice>()((...a) => ({
  ...createLoginSlice(...a),
  ...createSalesSlice(...a),
  ...createProductSlice(...a),
  ...createCustomerSlice(...a),
}))
