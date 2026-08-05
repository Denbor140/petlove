"use client";

import { useRouter } from "next/navigation";
import css from "./not-found.module.css";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className={css.main}>
      <div className="container">
        <section className={css.not_found_container}>
          <div className={css.title_container}>
            <span className={css.not_found_title}>4</span>
            <Image
              src={"/not-found.webp"}
              alt="Not Found Image"
              width={116}
              height={117}
              loading="eager"
            />
            <span className={css.not_found_title}>4</span>
          </div>

          <p className={css.not_found_subtitle}>Ooops! This page not found :</p>
          <button
            type="button"
            className={css.not_found_btn}
            onClick={() => router.push("/")}
          >
            To home page
          </button>
        </section>
      </div>
    </main>
  );
}
