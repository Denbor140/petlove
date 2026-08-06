import css from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className={css.main}>
      <div className="container">
        <Hero />{" "}
        <Image
          src="/hero-mob-x2.webp"
          alt="human-with-animal"
          className={`${css.hero_img} ${css.mobile_only}`}
          width={335}
          height={402}
          loading="eager"
          quality={90}
        />
        <Image
          src="/hero-tab-x2.webp"
          alt="human-with-animal"
          className={`${css.hero_img} ${css.tab_only}`}
          width={704}
          height={496}
          loading="eager"
          quality={90}
        />
        <Image
          src="/hero-x2.webp"
          alt="human-with-animal"
          className={`${css.hero_img} ${css.desk_only}`}
          width={1216}
          height={384}
          loading="eager"
          quality={90}
        />
      </div>
    </main>
  );
}
