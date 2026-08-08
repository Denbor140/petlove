import { Friends } from "@/types/friends";
import FriendsItem from "../FriendsItem/FriendsItem";

interface FriendsListProps {
  friends: Friends[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  return <FriendsItem friends={friends} />;
}
