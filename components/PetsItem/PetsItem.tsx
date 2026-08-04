import Image from "next/image";
import css from "./PetsItem.module.css";
import { Pet } from "@/types/pet";
import PetDeleteButton from "./PetDeleteButton";

interface PetsItemProps {
  pets: Pet[];
}

export default function PetsItem({ pets }: PetsItemProps) {
  return (
    <>
      {pets.map((pet) => (
        <li key={pet._id} className={css.pet_item}>
          <Image
            src={pet.imgURL}
            alt={pet.name}
            width={66}
            height={66}
            loading="eager"
            className={css.pet_img}
          />
          <div>
            <h2 className={css.pet_title}>{pet.title}</h2>
            <div className={css.pet_info}>
              <h3 className={css.pet_name}>
                <span>Name</span>
                {pet.name}
              </h3>
              <h3 className={css.pet_birthday}>
                <span>Birthday</span>
                {pet.birthday.split("-").reverse().join(".")}
              </h3>
              <h3 className={css.pet_sex}>
                <span>Sex</span>
                {pet.sex.charAt(0).toLocaleUpperCase() + pet.sex.slice(1)}
              </h3>
              <h3 className={css.pet_species}>
                <span>Species</span>
                {pet.species.charAt(0).toLocaleUpperCase() +
                  pet.species.slice(1)}
              </h3>
            </div>
          </div>
          <PetDeleteButton petId={pet._id} />
        </li>
      ))}
    </>
  );
}
