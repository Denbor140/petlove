"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentUserFull } from "@/lib/api/clientApi";
import Cookies from "js-cookie";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const finishChecking = useAuthStore((state) => state.finishChecking);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        finishChecking();
        return;
      }

      if (!Cookies.get("token")) {
        Cookies.set("token", token, { expires: 7, path: "/" });
      }

      try {
        const user = await getCurrentUserFull();
        setUser(user);
      } catch {
        logout();
      }
    };

    restoreSession();
  }, [setUser, logout, finishChecking]);

  return children;
}
