import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero_section}>
      <div className={css.hero_container}>
        <div className="container">
          <h1 className={css.hero_title}>
            Take good <span>care</span> of your small pets
          </h1>
          <p className={css.hero_subtitle}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </div>
    </section>
  );
}
