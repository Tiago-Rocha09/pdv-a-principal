import { create } from "zustand";
import { createLoginSlice, LoginSlice } from "./loginSlice";
import { createSalesSlice, SalesSlice } from "./salesSlice";
import { createProductSlice, ProductSlice } from "./productSlice";

export const useStore = create<LoginSlice & SalesSlice & ProductSlice>()(
  (...a) => ({
    ...createLoginSlice(...a),
    ...createSalesSlice(...a),
    ...createProductSlice(...a),
  })
);
