"use client";

import { UserFull } from "@/types/user";
import css from "./UserBlock.module.css";
import Image from "next/image";
import { useModal } from "@/components/Providers/ModalProvider/ModalProvider";

interface UserBlockProps {
  user: UserFull;
}

export default function UserBlock({ user }: UserBlockProps) {
  const { openModal } = useModal();

  return (
    <div className={css.user_info_container}>
      {user && user.avatar ? (
        <Image
          src={user.avatar}
          width={94}
          height={94}
          alt={user.name}
          loading="eager"
          className={css.user_avatar}
        />
      ) : (
        <div className={css.user_avatar_container}>
          <div className={css.user_avatar_default}>
            <svg width={40} height={40} fill="#f6b83d" stroke="#f6b83d">
              <use href="/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button
            type="button"
            className={css.upload_btn}
            onClick={() => openModal("user", { user })}
          >
            Upload photo
          </button>
        </div>
      )}
      <div className={css.my_info_container}>
        <h2 className={css.info_title}>My information</h2>
        <div className={css.user_info}>
          <p
            className={`${css.user_name} ${user.name ? css.user_info_fill : ""}`}
          >
            {user.name ? user.name : "Name"}
          </p>
          <p
            className={`${css.user_email} ${user.email ? css.user_info_fill : ""}`}
          >
            {user.email ? user.email : "name@gmail.com"}
          </p>
          <p
            className={`${css.user_phone} ${user.phone ? css.user_info_fill : ""}`}
          >
            {user.phone ? user.phone : "+380"}
          </p>
        </div>
      </div>
    </div>
  );
}
