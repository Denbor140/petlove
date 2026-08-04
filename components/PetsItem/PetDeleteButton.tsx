import { useAuthStore } from "@/lib/store/authStore";
import css from "./PetsItem.module.css";
import { useMutation } from "@tanstack/react-query";
import { deletePet } from "@/lib/api/clientApi";

interface PetDeleteButtonProps {
  petId: string;
}

export default function PetDeleteButton({ petId }: PetDeleteButtonProps) {
  const removePet = useAuthStore((state) => state.removePet);

  const mutation = useMutation({
    mutationFn: () => deletePet(petId),
    onSuccess: () => {
      removePet(petId);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      type="button"
      className={css.pet_delete_btn}
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      <svg width={16} height={16}>
        <use href="/icons.svg#icon-trash"></use>
      </svg>
    </button>
  );
}
