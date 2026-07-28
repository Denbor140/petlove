import css from "./PetsItem.module.css";
import { Pet } from "@/types/pet";

interface PetsItemProps {
  pets: Pet[];
}

export default function PetsItem({ pets }: PetsItemProps) {
  return (
    <>
      {pets.map((pet) => (
        <li key={pet._id}>
          <p>{pet.title}</p>
        </li>
      ))}
    </>
  );
}
