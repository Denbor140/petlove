"use client";

import { createContext, useContext, useState } from "react";
import ChooseModal from "@/components/ChooseModal/ChooseModal";
import { Notice } from "@/types/notice";

export type ModalMode = "pet" | "attention" | "congrats" | "leaving";

interface ModalContextType {
  openModal: (
    mode: ModalMode,
    options?: { redirect?: string; notice?: Notice },
  ) => void;
  closeModal: () => void;
  redirectPath: string | null;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const openModal = (
    mode: ModalMode,
    options?: { redirect?: string; notice?: Notice },
  ) => {
    setRedirectPath(options?.redirect ?? null);
    setSelectedNotice(options?.notice ?? null);
    setMode(mode);
  };

  const closeModal = () => {
    setMode(null);
    setRedirectPath(null);
    setSelectedNotice(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, redirectPath }}>
      {children}

      {mode && (
        <ChooseModal
          initialMode={mode}
          onClose={closeModal}
          notice={selectedNotice ?? undefined}
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
}
