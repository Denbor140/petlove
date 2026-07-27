"use client";

import css from "./NoticesItem.module.css";
import { useModal } from "../ModalProvider/ModalProvider";
import { useAuthStore } from "@/lib/store/authStore";
import { Notice } from "@/types/notice";
import {
  addNoticesToFavorites,
  removeNoticesFromFavorites,
} from "@/lib/api/clientApi";

interface FavoritesButtonProps {
  notice: Notice;
  onToggleFavorite?: (notice: Notice) => void;
  isFavoriteInitial: boolean;
}

export default function FavoritesButton({
  notice,
  isFavoriteInitial,
  onToggleFavorite,
}: FavoritesButtonProps) {
  const { openModal } = useModal();
  const { isAuthenticated } = useAuthStore();
  const addFavorite = useAuthStore((state) => state.addFavorite);
  const removeFavorite = useAuthStore((state) => state.removeFavorite);
  const isFavorite = isFavoriteInitial;

  const handleClick = async () => {
    if (!isAuthenticated) {
      openModal("attention");
      return;
    }

    if (isFavorite) {
      await removeNoticesFromFavorites(notice._id);
      removeFavorite(notice._id);
    } else {
      await addNoticesToFavorites(notice._id);
      addFavorite(notice);
    }

    onToggleFavorite?.(notice);
  };

  return (
    <button
      type="button"
      className={css.notice_favorites_btn}
      onClick={handleClick}
    >
      <svg
        width={18}
        height={18}
        className={`${css.notice_favorites_icon} ${
          isFavorite ? css.favorites_icon_active : ""
        }`}
      >
        <use href="/icons.svg#icon-heart"></use>
      </svg>
    </button>
  );
}
