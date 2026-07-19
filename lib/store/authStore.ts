import { UserFull } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  user: UserFull | null;
  setUser: (user: UserFull) => void;
  logout: () => void;
  finishChecking: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  isCheckingAuth: true,
  user: null,
  setUser: (user: UserFull) =>
    set(() => ({ user, isAuthenticated: true, isCheckingAuth: false })),
  logout: () => {
    localStorage.removeItem("token");
    set(() => ({ user: null, isAuthenticated: false, isCheckingAuth: false }));
  },
  finishChecking: () => set(() => ({ isCheckingAuth: false })),
}));
