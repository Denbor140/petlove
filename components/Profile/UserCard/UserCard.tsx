import css from "./UserCard.module.css";
import EditUserBtn from "@/components/EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import { UserFull } from "@/types/user";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "@/components/LogOutBtn/LogOutBtn";

interface UserCardProps {
  user: UserFull;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <section className={css.user_card_section}>
      <div className={css.user_card_container}>
        <div className={css.user_name_container}>
          <p className={css.user_name}>
            {user.name}
            <svg width={18} height={18} fill="#fff" stroke="#fff">
              <use href="/icons.svg#icon-user"></use>
            </svg>
          </p>
          <EditUserBtn user={user} />
        </div>
        <UserBlock user={user} />
        <PetsBlock pets={user.pets} />
        <LogOutBtn />
      </div>
    </section>
  );
}
