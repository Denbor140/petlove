import Image from "next/image";
import css from "./UserBar.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { UserFull } from "@/types/user";
import { usePathname } from "next/navigation";
import LogOutBtnHeader from "@/components/LogOutBtn/LogOutBtnHeader";

interface UserBarProps {
  user: UserFull;
}

export default function UserBar({ user }: UserBarProps) {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const pathname = usePathname();
  return (
    <div className={css.user_bar_container}>
      {pathname === "/" ? null : <LogOutBtnHeader />}
      <div className={css.user_profile}>
        <Link href={"/profile"}>
          {isAuthenticated && !isCheckingAuth && user.avatar ? (
            <Image
              src={user.avatar}
              width={40}
              height={40}
              alt={user.name}
              className={css.user_avatar}
            />
          ) : (
            <div className={css.user_avatar_default}>
              <svg width={20} height={20} fill="#f6b83d" stroke="#f6b83d">
                <use href="/icons.svg#icon-user"></use>
              </svg>
            </div>
          )}
        </Link>
        <span
          className={`${css.user_name} ${pathname === "/" ? css.user_name_white : ""}`}
        >
          {user.name}
        </span>
      </div>
    </div>
  );
}
