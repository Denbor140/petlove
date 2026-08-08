"ise client";

import css from "./LogOutBtn.module.css";
import { useModal } from "../Providers/ModalProvider/ModalProvider";

export default function LogOutBtnHeader() {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      className={css.logout_btn_header}
      onClick={() => openModal("leaving")}
    >
      Log out
    </button>
  );
}
