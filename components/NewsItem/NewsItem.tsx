import css from "./NewsItem.module.css";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

interface NewsItemProps {
  news: News[];
}

export default function NewsItem({ news }: NewsItemProps) {
  return (
    <ul className={css.news_list}>
      {news.map((n) => (
        <li key={n._id} className={css.news_item}>
          <Image
            src={n.imgUrl}
            alt={n.title}
            width={335}
            height={190}
            loading="eager"
            className={css.news_img}
          />
          <div className={css.news_info_container}>
            <h2 className={css.news_title}>{n.title}</h2>
            <p className={css.news_text}>{n.text}</p>
            <div className={css.news_date_container}>
              <span className={css.news_date}>
                {n.date.slice(0, 10).split("-").reverse().join("/")}
              </span>

              <Link href={n.url} target="_blank" className={css.read_more_link}>
                Read more
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
