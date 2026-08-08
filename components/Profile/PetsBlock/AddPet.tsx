import css from "./PetsBlock.module.css";
import Link from "next/link";

export default function AddPet() {
  return (
    <Link href={"/profile/add-pet"} className={css.add_pet_link}>
      Add pet{" "}
      <svg width={18} height={18}>
        <use href="/icons.svg#icon-plus"></use>
      </svg>
    </Link>
  );
}
