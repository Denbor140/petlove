import Image from "next/image";
import css from "./ModalNotice.module.css";
import { Notice } from "@/types/notice";
import Link from "next/link";
import ToogleFavoritesButton from "./ToogleFavoritesButton";
import { useMemo } from "react";
import { useAuthStore } from "@/lib/store/authStore";

interface ModalNoticeProps {
  notice: Notice;
  onClose: () => void;
  onToggleFavorite?: (notice: Notice) => void;
}

export default function ModalNotice({
  notice,
  onToggleFavorite,
  onClose,
}: ModalNoticeProps) {
  const user = useAuthStore((state) => state.user);

  const STARS_COUNT = 5;
  const filledStars = Math.min(
    Math.floor(notice.popularity / 100),
    STARS_COUNT,
  );

  const favoriteNotice = useMemo(
    () => new Set(user?.noticesFavorites.map((n) => n._id) ?? []),
    [user?.noticesFavorites],
  );

  return (
    <>
      {" "}
      <button type="button" className={css.close_btn} onClick={onClose}>
        <svg width={24} height={24} className={css.close_icon}>
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.notice_img_container}>
        <span className={css.notice_category}>{notice.category}</span>
        <Image
          src={notice.imgURL}
          alt={notice.name}
          width={120}
          height={120}
          loading="eager"
          className={css.notice_img}
        />
      </div>
      <div className={css.notices_title_container}>
        <h2 className={css.notices_title}>{notice.title}</h2>
        <div className={css.notices_popular_container}>
          {" "}
          {Array.from({ length: STARS_COUNT }, (_, index) => {
            const isFilled = index < filledStars;

            return (
              <svg
                key={index}
                width={16}
                height={16}
                className={isFilled ? css.star_filled : css.star_empty}
              >
                <use href="/icons.svg#icon-star"></use>
              </svg>
            );
          })}
          <span className={css.notices_popular}>{notice.popularity}</span>
        </div>
      </div>
      <div className={css.notices_bio_container}>
        <h3 className={css.notice_name}>
          <span>Name</span> {notice.name}
        </h3>
        <h3 className={css.notice_birthday}>
          <span>Birthday</span>{" "}
          {notice.birthday
            ? notice.birthday.split("-").reverse().join(".")
            : "Unknown"}
        </h3>
        <h3 className={css.notice_sex}>
          <span>Sex</span>{" "}
          {notice.sex.charAt(0).toLocaleUpperCase() + notice.sex.slice(1)}
        </h3>
        <h3 className={css.notice_species}>
          <span>Species</span>{" "}
          {notice.species.charAt(0).toLocaleUpperCase() +
            notice.species.slice(1)}
        </h3>
      </div>
      <p className={css.notice_comment}>{notice.comment}</p>
      {notice.price ? <p className={css.notice_price}>${notice.price}</p> : ""}
      <div className={css.notice_btn_container}>
        <ToogleFavoritesButton
          notice={notice}
          onToggleFavorite={onToggleFavorite}
          isFavoriteInitial={favoriteNotice.has(notice._id)}
        />
        <Link href={"/friends"} className={css.contact} onClick={onClose}>
          Contact
        </Link>
      </div>
    </>
  );
}
