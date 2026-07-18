import css from "./page.module.css";
import Hero from "@/components/Hero/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <Hero />{" "}
      <Image
        src="/hero-mob.webp"
        alt="human-with-animal"
        className={css.hero_img}
        width={335}
        height={402}
      />
    </div>
  );
}
