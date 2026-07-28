"use client";

import MyNotices from "@/components/MyNotices/MyNotices";
import UserCard from "@/components/UserCard/UserCard";
import { useAuthStore } from "@/lib/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <main>
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
