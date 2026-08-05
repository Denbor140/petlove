"use client";
import Loader from "@/components/Loader/Loader";
import css from "./ProfilePage.module.css";
import MyNotices from "@/components/MyNotices/MyNotices";
import UserCard from "@/components/UserCard/UserCard";
import { useAuthStore } from "@/lib/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <Loader isLoading={true} />;
  if (!user) return null;

  return (
    <main className={css.main}>
      <div className="container">
        <UserCard user={user} />
        <MyNotices
          favoriteNotices={user.noticesFavorites}
          viewedNotices={user.noticesViewed}
        />
      </div>
    </main>
  );
}
