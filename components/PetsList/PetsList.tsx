import { Pet } from "@/types/pet";
import PetsItem from "../PetsItem/PetsItem";

interface PetsListProps {
  pets: Pet[];
}

export default function PetsList({ pets }: PetsListProps) {
  return (
    <ul>
      <PetsItem pets={pets} />
    </ul>
  );
}
