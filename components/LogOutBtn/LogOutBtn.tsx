import { useAuthStore } from "@/lib/store/authStore";
import css from "./LogOutBtn.module.css";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/lib/api/clientApi";

export default function LogOutBtn() {
  const logout = useAuthStore((state) => state.logout);

  const mutation = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => logout(),
    onError: () => {
      logout();
    },
  });

  const handleLogOut = () => {
    mutation.mutate();
  };

  return (
    <button type="button" className={css.logout_btn} onClick={handleLogOut}>
      {mutation.isPending ? "Logging out..." : "Log out"}
    </button>
  );
}
