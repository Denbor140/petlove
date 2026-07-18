import Link from "next/link";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={css.auth_nav_container}>
      <Link href={"/login"} className={css.btn_log_in}>
        Log In
      </Link>
      <Link href={"/register"} className={css.btn_registration}>
        Registration
      </Link>
    </div>
  );
}
