"use client";

import Link from "next/link";
import css from "./Nav.module.css";
import { usePathname } from "next/navigation";

export default function Nav({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className={css.nav}>
      <Link
        href={"/news"}
        className={`${css.nav_link} ${pathname === "/news" ? css.nav_link_active : ""}`}
        onClick={onClose}
      >
        News
      </Link>
      <Link
        href={"/notices"}
        className={`${css.nav_link} ${pathname === "/notices" ? css.nav_link_active : ""}`}
        onClick={onClose}
      >
        Find pet
      </Link>
      <Link
        href={"/friends"}
        className={`${css.nav_link} ${pathname === "/friends" ? css.nav_link_active : ""}`}
        onClick={onClose}
      >
        Our friends
      </Link>
    </nav>
  );
}
