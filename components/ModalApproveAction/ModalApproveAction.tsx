import { useAuthStore } from "@/lib/store/authStore";
import css from "./ModalApproveAction.module.css";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

interface ModalApproveActionProps {
  onClose: () => void;
}

export default function ModalApproveAction({
  onClose,
}: ModalApproveActionProps) {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => logout(),
    onError: () => {
      logout();
    },
  });

  const handleLogOut = () => {
    mutation.mutate();
    onClose();
    router.push("/");
  };

  return (
    <>
      <button type="button" className={css.close_btn} onClick={onClose}>
        <svg width={24} height={24} className={css.close_icon}>
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.ellipses} />
      <h2 className={css.title}>Already leaving?</h2>
      <div className={css.btn_container}>
        <button type="button" className={css.btn_yes} onClick={handleLogOut}>
          Yes
        </button>
        <button type="button" className={css.btn_cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
}
