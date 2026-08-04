import { useAuthStore } from "@/lib/store/authStore";
import css from "./ModalNotice.module.css";
import { Notice } from "@/types/notice";
import {
  addNoticesToFavorites,
  removeNoticesFromFavorites,
} from "@/lib/api/clientApi";

interface ToogleFavoritesButtonProps {
  notice: Notice;
  onToggleFavorite?: (notice: Notice) => void;
  isFavoriteInitial: boolean;
}

export default function ToogleFavoritesButton({
  notice,
  onToggleFavorite,
  isFavoriteInitial,
}: ToogleFavoritesButtonProps) {
  const addFavorite = useAuthStore((state) => state.addFavorite);
  const removeFavorite = useAuthStore((state) => state.removeFavorite);
  const isFavorite = isFavoriteInitial;

  const handleClick = async () => {
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
    <button type="button" className={css.add_favorite} onClick={handleClick}>
      {isFavorite ? "Remove from" : "Add to"}
      <svg width={18} height={18} className={css.favotire_icon}>
        <use href="/icons.svg#icon-heart"></use>
      </svg>
    </button>
  );
}
