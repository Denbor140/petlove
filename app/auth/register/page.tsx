import css from "./RegisterPage.module.css";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className={css.main}>
      <div className="container">
        <section className={css.register_img_container}>
          <Image
            src={"/jack.webp"}
            alt="cat Jack"
            width={335}
            height={280}
            loading="eager"
            className={css.register_img}
          />
          <svg className={css.rectangle_icon}>
            <use href="/icons.svg#rectangle"></use>
          </svg>
        </section>
        <RegistrationForm />
      </div>
    </main>
  );
}
