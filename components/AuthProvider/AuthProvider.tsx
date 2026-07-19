"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentUserFull } from "@/lib/api/clientApi";

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
