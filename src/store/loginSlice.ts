import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_USER } from "@/constants";
import { StateCreator } from "zustand";

export type LoginSlice = {
  accessToken: string;
  user: {
    id: number | null;
    name: string;
  };
  setAccessToken: (accessToken: LoginSlice["accessToken"]) => void;
  setUser: (user: LoginSlice["user"]) => void;
};

const initialState = {
  user: { id: null, name: "" },
  accessToken: "",
};

export const createLoginSlice: StateCreator<LoginSlice, [], [], LoginSlice> = (
  set
) => {
  const storedUser = window.localStorage.getItem(STORAGE_KEY_USER);
  const storedAccessToken = window.localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);

  return {
    user: storedUser ? JSON.parse(storedUser) : initialState.user,
    accessToken: storedAccessToken || initialState.accessToken,
    setAccessToken: (accessToken: LoginSlice["accessToken"]) => {
      set(() => ({ accessToken }));
    },
    setUser: (user: LoginSlice["user"]) => {
      set(() => ({ user }));
    },
  };
};
