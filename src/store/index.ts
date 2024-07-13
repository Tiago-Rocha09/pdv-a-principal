import { create } from "zustand";
import { createLoginSlice, LoginSlice } from "./loginSlice";

export const useStore = create<LoginSlice>()((...a) => ({
  ...createLoginSlice(...a),
}));
