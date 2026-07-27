import Link from "next/link";
import css from "./ModalAttention.module.css";

interface ModalAttentionProps {
  onClose: () => void;
}

export default function ModalAttention({ onClose }: ModalAttentionProps) {
  return (
    <>
      <button type="button" className={css.close_btn} onClick={onClose}>
        <svg width={24} height={24} className={css.close_icon}>
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.ellipses} />
      <h2 className={css.title}>Attention</h2>
      <p className={css.subtitle}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={css.link_container}>
        <Link
          href={"/auth/login"}
          className={css.log_in_link}
          onClick={onClose}
        >
          Log In
        </Link>
        <Link
          href={"/auth/register"}
          className={css.register_link}
          onClick={onClose}
        >
          Registration
        </Link>
      </div>
    </>
  );
}
