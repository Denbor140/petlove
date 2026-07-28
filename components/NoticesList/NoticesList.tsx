import { Notice } from "@/types/notice";
import NoticesItem from "../NoticesItem/NoticesItem";
import { Tab } from "../MyNotices/MyNotices";

interface NoticesListProps {
  notices: Notice[];
  tab: Tab;
}

export default function NoticesList({ notices, tab }: NoticesListProps) {
  return <NoticesItem notices={notices} tab={tab} />;
}
