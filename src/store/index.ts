import { create } from "zustand";
import { createLoginSlice, LoginSlice } from "./loginSlice";
import { createSalesSlice, SalesSlice } from "./salesSlice";

export const useStore = create<LoginSlice & SalesSlice>()((...a) => ({
  ...createLoginSlice(...a),
  ...createSalesSlice(...a),
}));
