import Image from "next/image";
import css from "./UserBar.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { UserFull } from "@/types/user";

interface UserBarProps {
  user: UserFull;
}

export default function UserBar({ user }: UserBarProps) {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  return (
    <Link href={"/"}>
      {isAuthenticated && !isCheckingAuth && user.avatar ? (
        <Image src={user.avatar} width={40} height={40} alt={user.name} />
      ) : (
        <div className={css.user_avatar_default}>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-user"></use>
          </svg>
        </div>
      )}
    </Link>
  );
}
