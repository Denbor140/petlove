"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import { ModalMode } from "../ModalProvider/ModalProvider";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";
import { Notice } from "@/types/notice";

interface ChooseModalProps {
  notice?: Notice;
  initialMode: ModalMode;
  onClose: () => void;
}

export default function ChooseModal({
  notice,
  initialMode,
  onClose,
}: ChooseModalProps) {
  const [mode] = useState<ModalMode>(initialMode);

  return (
    <Modal onClose={onClose}>
      {(close) => (
        <>
          {mode === "attention" && <ModalAttention onClose={close} />}

          {mode === "pet" && notice && (
            <ModalNotice notice={notice} onClose={close} />
          )}
        </>
      )}
    </Modal>
  );
}
