"use client";

import css from "./BurgerMenu.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AuthNav";

export default function BurgerMenu({ onClose }: { onClose: () => void }) {
  const [open, isOpen] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => isOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const closeForBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      isOpen(false);
    }
  };

  return createPortal(
    <div
      className={`${css.backdrop} ${open ? css.backdrop_open : ""}`}
      onClick={closeForBackDrop}
    >
      <div
        className={`${css.burger_menu} ${open ? css.burger_menu_open : ""}`}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && !open) {
            onClose();
          }
        }}
      >
        <button
          type="button"
          onClick={() => isOpen(false)}
          className={css.close_btn}
        >
          <svg width={32} height={32} stroke="#262626">
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>

        <div className={css.nav_container}>
          <Nav onClose={() => isOpen(false)} />
        </div>

        <div onClick={() => isOpen(false)}>
          <AuthNav />
        </div>
      </div>
    </div>,
    document.body,
  );
}
