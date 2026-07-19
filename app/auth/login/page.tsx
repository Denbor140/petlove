import css from "./LoginPage.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className={css.main}>
      <div className="container">
        <div className={css.login_img_container}>
          <Image
            src={"/rich.webp"}
            alt="Dog Rich"
            width={335}
            height={280}
            loading="eager"
            className={css.login_img}
          />
          <svg className={css.rectangle_icon}>
            <use href="/icons.svg#rectangle"></use>
          </svg>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
