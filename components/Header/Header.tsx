"use client";

import Link from "next/link";
import css from "./header.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import UserBar from "../UserBar/UserBar";

export default function Header() {
  const pathname = usePathname();
  const [open, isOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header
      className={`${css.header} ${pathname === "/" ? css.header : css.header_primary}`}
    >
      <div className="container">
        <div className={css.header_container}>
          <Link href={"/"}>
            {pathname === "/" ? (
              <svg className={css.logo}>
                <use href="/icons.svg#icon-logo"></use>
              </svg>
            ) : (
              <svg className={css.logo}>
                <use href="/icons.svg#icon-logo-primary"></use>
              </svg>
            )}
          </Link>
          <div className={css.user_nav_container}>
            {isAuthenticated && user && <UserBar user={user} />}
            <button
              type="button"
              className={css.burger_btn}
              onClick={() => isOpen(true)}
            >
              <svg
                className={`${css.burger_icon} ${pathname === "/" ? css.burger_icon : css.burger_icon_primary}`}
              >
                <use href="/icons.svg#icon-burger-menu"></use>
              </svg>
            </button>
          </div>
          {open && <BurgerMenu onClose={() => isOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
