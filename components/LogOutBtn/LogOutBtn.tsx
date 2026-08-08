"ise client";

import css from "./LogOutBtn.module.css";
import { useModal } from "../Providers/ModalProvider/ModalProvider";
import { usePathname } from "next/navigation";

export default function LogOutBtn() {
  const { openModal } = useModal();
  const pathname = usePathname();

  return (
    <button
      type="button"
      className={`${pathname === "/profile" ? css.logout_btn_profile : css.logout_btn}`}
      onClick={() => openModal("leaving")}
    >
      Log out
    </button>
  );
}
