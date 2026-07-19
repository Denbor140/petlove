import css from "./Title.module.css";

interface TitleProps {
  title: string;
  marginBottom?: string;
}

export default function Title({ title, marginBottom }: TitleProps) {
  return (
    <h1
      className={css.title}
      style={marginBottom !== undefined ? { marginBottom } : undefined}
    >
      {title}
    </h1>
  );
}
