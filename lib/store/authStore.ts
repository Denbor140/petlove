import { Notice } from "@/types/notice";
import { UserFull } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  user: UserFull | null;
  setUser: (user: UserFull) => void;
  logout: () => void;
  finishChecking: () => void;
  addFavorite: (notice: Notice) => void;
  removeFavorite: (noticeId: string) => void;
  removePet: (petId: string) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  isCheckingAuth: true,
  user: null,
  setUser: (user: UserFull) =>
    set(() => ({ user, isAuthenticated: true, isCheckingAuth: false })),
  logout: () => {
    localStorage.removeItem("token");
    Cookies.remove("token", { path: "/" });
    set(() => ({ user: null, isAuthenticated: false, isCheckingAuth: false }));
  },
  finishChecking: () => set(() => ({ isCheckingAuth: false })),
  addFavorite: (notice: Notice) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            noticesFavorites: [...state.user.noticesFavorites, notice],
          }
        : state.user,
    })),
  removeFavorite: (noticeId: string) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            noticesFavorites: state.user.noticesFavorites.filter(
              (n) => n._id !== noticeId,
            ),
          }
        : state.user,
    })),
  removePet: (petId: string) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            pets: state.user.pets.filter((pet) => pet._id !== petId),
          }
        : state.user,
    })),
}));
