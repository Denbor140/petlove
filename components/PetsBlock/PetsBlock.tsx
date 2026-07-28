import { Pet } from "@/types/pet";
import PetsList from "../PetsList/PetsList";
import AddPet from "./AddPet";
import css from "./PetsBlock.module.css";

interface PetsBlockProps {
  pets: Pet[];
}

export default function PetsBlock({ pets }: PetsBlockProps) {
  return (
    <div className={css.pets_block_container}>
      <div className={css.pets_block_top}>
        <h3 className={css.pets_block_title}>My pets</h3>
        <AddPet />
      </div>
      <PetsList pets={pets} />
    </div>
  );
}
