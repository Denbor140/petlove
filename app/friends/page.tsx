"use client";

import Loader from "@/components/Loader/Loader";
import css from "./FriendsPage.module.css";
import FriendsList from "@/components/Friends/FriendsList/FriendsList";
import Title from "@/components/Title/Title";
import { getFriends } from "@/lib/api/clientApi";
import { Friends } from "@/types/friends";
import { useQuery } from "@tanstack/react-query";

export default function FriendsPage() {
  const { data: friends, isLoading } = useQuery<Friends[]>({
    queryKey: ["friends"],
    queryFn: getFriends,
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <main className={css.main}>
      <div className="container">
        <Title title="Our friends" marginBottom="40px" />
        <section>
          <FriendsList friends={friends ?? []} />
        </section>
      </div>
    </main>
  );
}
