"use client";

import css from "./EditUserBtn.module.css";
import { useModal } from "../ModalProvider/ModalProvider";

export default function EditUserBtn() {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      className={css.edit_btn}
      onClick={() => openModal("user")}
    >
      <svg width={18} height={18}>
        <use href="/icons.svg#icon-edit"></use>
      </svg>
    </button>
  );
}
