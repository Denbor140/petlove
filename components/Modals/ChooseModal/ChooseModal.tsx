"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import { ModalMode } from "../../Providers/ModalProvider/ModalProvider";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";
import { Notice } from "@/types/notice";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import { UserFull } from "@/types/user";
import ModalEditUser from "../ModalEditUser/ModalEditUser";

interface ChooseModalProps {
  notice?: Notice;
  user?: UserFull;
  initialMode: ModalMode;
  onClose: () => void;
}

export default function ChooseModal({
  notice,
  user,
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

          {mode === "leaving" && <ModalApproveAction onClose={close} />}

          {mode === "user" && <ModalEditUser user={user} onClose={close} />}
        </>
      )}
    </Modal>
  );
}
