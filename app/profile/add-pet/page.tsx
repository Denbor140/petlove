"use client";

import AddPetForm from "@/components/AddPetForm/AddPetForm";
import css from "./AddPetPage.module.css";
import Image from "next/image";

export default function AddPetPage() {
  return (
    <main>
      <div className="container">
        <div className={css.add_pet_img_container}>
          <Image
            src={"/add-pet-img.webp"}
            alt="Dog in add pet page"
            width={297}
            height={248}
            loading="eager"
            className={css.add_pet_img}
          />
          <svg className={css.rectangle_icon}>
            <use href="/icons.svg#rectangle"></use>
          </svg>
        </div>

        <AddPetForm />
      </div>
    </main>
  );
}
