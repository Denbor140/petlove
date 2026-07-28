import css from "./UserCard.module.css";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import { UserFull } from "@/types/user";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

interface UserCardProps {
  user: UserFull;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <section className={css.user_card_section}>
      <div className={css.user_card_container}>
        <EditUserBtn />
        <UserBlock user={user} />
        <PetsBlock pets={user.pets} />
        <LogOutBtn />
      </div>
    </section>
  );
}
