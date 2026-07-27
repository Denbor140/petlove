"ise client";

import css from "./LogOutBtn.module.css";
import { useModal } from "../ModalProvider/ModalProvider";

export default function LogOutBtn() {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      className={css.logout_btn}
      onClick={() => openModal("leaving")}
    >
      Log out
    </button>
  );
}
