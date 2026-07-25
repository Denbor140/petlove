import css from "./NoticesItem.module.css";
import { Notice } from "@/types/notice";
import Image from "next/image";

interface NoticesItemProps {
  notices: Notice[];
}

export default function NoticesItem({ notices }: NoticesItemProps) {
  return (
    <ul className={css.notices_list}>
      {notices.map((notice) => (
        <li key={notice._id} className={css.notices_item}>
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
                    <svg width={16} height={16}>
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
            <div className={css.notice_bottom_container}>
              {notice.price ? (
                <p className={css.notice_price}>${notice.price}</p>
              ) : (
                ""
              )}
              <div className={css.notice_btn_container}>
                <button type="button" className={css.notice_more_btn}>
                  Learn more
                </button>
                <button type="button" className={css.notice_favorites_btn}>
                  <svg width={18} height={18}>
                    <use href="/icons.svg#icon-heart"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
