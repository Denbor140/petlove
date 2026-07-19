import { News } from "@/types/news";
import NewsItem from "../NewsItem/NewsItem";

interface NewsListProps {
  news: News[];
}

export default function NewsList({ news }: NewsListProps) {
  return <NewsItem news={news} />;
}
