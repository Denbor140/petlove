"use client";

import css from "./NoticesItem.module.css";
import { Notice } from "@/types/notice";
import Image from "next/image";
import LearnMoreButton from "./LearnMoreButton";
import FavoritesButton from "./FavoritesButton";
import { useAuthStore } from "@/lib/store/authStore";
import { useMemo } from "react";
import { Tab } from "../MyNotices/MyNotices";
import { usePathname } from "next/navigation";

interface NoticesItemProps {
  notices: Notice[];
  tab: Tab;
  onToggleFavorite?: (notice: Notice) => void;
}

export default function NoticesItem({
  notices,
  tab,
  onToggleFavorite,
}: NoticesItemProps) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";

  const favoriteNotice = useMemo(
    () => new Set(user?.noticesFavorites.map((n) => n._id) ?? []),
    [user?.noticesFavorites],
  );

  return (
    <ul
      className={`${css.notices_list} ${isProfilePage ? css.notices_list_profile : ""}`}
    >
      {notices.map((notice) => (
        <li
          key={notice._id}
          className={`${css.notices_item} ${isProfilePage ? css.notices_item_profile : ""}`}
        >
          <Image
            src={notice.imgURL}
            alt={notice.name}
            width={287}
            height={178}
            loading="eager"
            className={css.notices_img}
          />

          <div className={css.notices_info_container}>
            <div className={css.notices_info_top}>
              <div className={css.notices_top_container}>
                <div className={css.notices_title_container}>
                  <h2 className={css.notices_title}>{notice.title}</h2>
                  <div className={css.notices_popular_container}>
                    {" "}
                    <svg width={16} height={16} className={css.star_icon}>
                      <use href="/icons.svg#icon-star"></use>
                    </svg>
                    <span className={css.notices_popular}>
                      {notice.popularity}
                    </span>
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
                    {notice.sex.charAt(0).toLocaleUpperCase() +
                      notice.sex.slice(1)}
                  </h3>
                  <h3 className={css.notice_species}>
                    <span>Species</span>{" "}
                    {notice.species.charAt(0).toLocaleUpperCase() +
                      notice.species.slice(1)}
                  </h3>
                  <h3 className={css.notice_category}>
                    <span>Category</span>{" "}
                    {notice.category.charAt(0).toLocaleUpperCase() +
                      notice.category.slice(1)}
                  </h3>
                </div>
              </div>
              <p className={css.notice_comment}>{notice.comment}</p>
            </div>
          </div>
          <div className={css.notice_bottom_container}>
            {notice.price ? (
              <p className={css.notice_price}>${notice.price}</p>
            ) : (
              ""
            )}
            <div className={css.notice_btn_container}>
              <LearnMoreButton notice={notice} tab={tab} />

              {tab !== "viewed" && (
                <FavoritesButton
                  notice={notice}
                  onToggleFavorite={onToggleFavorite}
                  isFavoriteInitial={favoriteNotice.has(notice._id)}
                />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
