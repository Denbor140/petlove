import { Notice } from "@/types/notice";
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps {
  notices: Notice[];
}

export default function NoticesList({ notices }: NoticesListProps) {
  return <NoticesItem notices={notices} />;
}
