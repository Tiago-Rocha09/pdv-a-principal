import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_USER } from "@/constants";
import { StateCreator } from "zustand";

export type LoginSlice = {
  login: {
    accessToken: string | null;
    user: {
      id: number | null;
      name: string | null;
      storeId: number | null;
    };
    setAccessToken: (accessToken: LoginSlice["login"]["accessToken"]) => void;
    setUser: (user: LoginSlice["login"]["user"]) => void;
  };
};

const initialState = {
  user: { id: null, name: "", storeId: null },
  accessToken: "",
};

export const createLoginSlice: StateCreator<LoginSlice, [], [], LoginSlice> = (
  set
) => {
  let storedUser = null;
  let storedAccessToken = null;

  if (typeof window !== "undefined") {
    storedUser = window.localStorage.getItem(STORAGE_KEY_USER);
    storedAccessToken = window.localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
  }

  return {
    login: {
      user: storedUser ? JSON.parse(storedUser) : initialState.user,
      accessToken: storedAccessToken || initialState.accessToken,
      setAccessToken: (accessToken: LoginSlice["login"]["accessToken"]) => {
        set((state) => ({ ...state, accessToken }));
      },
      setUser: (user: LoginSlice["login"]["user"]) => {
        set((state) => ({ ...state, user }));
      },
    },
  };
};
