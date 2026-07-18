"use client";

import Link from "next/link";
import css from "./header.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from "react";

export default function Header() {
  const [open, isOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <Link href={"/"}>
            <svg className={css.logo}>
              <use href="/icons.svg#icon-logo"></use>
            </svg>
          </Link>
          <button
            type="button"
            className={css.burger_btn}
            onClick={() => isOpen(true)}
          >
            <svg className={css.burger_icon}>
              <use href="/icons.svg#icon-burger-menu"></use>
            </svg>
          </button>
          {open && <BurgerMenu onClose={() => isOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
