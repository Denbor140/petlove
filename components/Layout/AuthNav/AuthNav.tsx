import Link from "next/link";
import css from "./AuthNav.module.css";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNav() {
  const pathname = usePathname();
  const { isCheckingAuth } = useAuthStore();

  return (
    <>
      {!isCheckingAuth && (
        <div className={css.auth_nav_container}>
          <Link
            href={"/auth/login"}
            className={`${css.btn_log_in} ${pathname === "/" ? css.log_in_home : ""}`}
          >
            Log In
          </Link>
          <Link href={"/auth/register"} className={css.btn_registration}>
            Registration
          </Link>
        </div>
      )}
    </>
  );
}
