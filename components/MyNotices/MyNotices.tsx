"use client";

import css from "./MyNotices.module.css";
import { Notice } from "@/types/notice";
import NoticesList from "../NoticesList/NoticesList";
import { useState } from "react";

interface MyNoticesProps {
  favoriteNotices: Notice[];
  viewedNotices: Notice[];
}

export type Tab = "favorite" | "viewed";

export default function MyNotices({
  favoriteNotices,
  viewedNotices,
}: MyNoticesProps) {
  const [activeTab, setActiveTab] = useState<Tab>("favorite");

  return (
    <section className={css.my_notices_section}>
      <div className={css.my_notices_btn}>
        <button
          type="button"
          className={`${css.favorite_btn} ${
            activeTab === "favorite" ? css.active_btn : ""
          }`}
          onClick={() => setActiveTab("favorite")}
        >
          My favorite pets
        </button>
        <button
          type="button"
          className={`${css.viewed_btn} ${
            activeTab === "viewed" ? css.active_btn : ""
          }`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
      {activeTab === "favorite" ? (
        <NoticesList notices={favoriteNotices} tab={activeTab} />
      ) : (
        <NoticesList notices={viewedNotices} tab={activeTab} />
      )}
    </section>
  );
}
