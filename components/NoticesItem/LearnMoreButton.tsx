import { useAuthStore } from "@/lib/store/authStore";
import { useModal } from "../ModalProvider/ModalProvider";
import css from "./NoticesItem.module.css";
import { Notice } from "@/types/notice";
import { getNoticesById } from "@/lib/api/clientApi";
import { useMutation } from "@tanstack/react-query";

interface LearnMoreButtonProps {
  notice: Notice;
}

export default function LearnMoreButton({ notice }: LearnMoreButtonProps) {
  const { openModal } = useModal();
  const { isAuthenticated } = useAuthStore();

  const mutation = useMutation({
    mutationFn: () => getNoticesById(notice._id),
    onSuccess: (noticeInfo) => {
      openModal("pet", { notice: noticeInfo });
    },
  });

  const handleClick = async () => {
    if (!isAuthenticated) {
      openModal("attention");
      return;
    }

    mutation.mutate();
  };

  return (
    <button
      type="button"
      className={css.notice_more_btn}
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Loading..." : "Learn more"}
    </button>
  );
}
