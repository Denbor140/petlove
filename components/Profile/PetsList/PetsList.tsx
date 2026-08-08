import css from "./PetsList.module.css";
import { Pet } from "@/types/pet";
import PetsItem from "../PetsItem/PetsItem";

interface PetsListProps {
  pets: Pet[];
}

export default function PetsList({ pets }: PetsListProps) {
  return (
    <ul className={css.pets_list}>
      <PetsItem pets={pets} />
    </ul>
  );
}
