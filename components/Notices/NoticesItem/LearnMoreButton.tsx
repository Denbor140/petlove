import { useAuthStore } from "@/lib/store/authStore";
import { useModal } from "@/components/Providers/ModalProvider/ModalProvider";
import css from "./NoticesItem.module.css";
import { Notice } from "@/types/notice";
import { getNoticesById } from "@/lib/api/clientApi";
import { useMutation } from "@tanstack/react-query";
import { Tab } from "@/components/Profile/MyNotices/MyNotices";
import { usePathname } from "next/navigation";

interface LearnMoreButtonProps {
  notice: Notice;
  tab?: Tab;
}

export default function LearnMoreButton({ notice, tab }: LearnMoreButtonProps) {
  const { openModal } = useModal();
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";

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
      className={`${css.notice_more_btn} ${tab === "viewed" ? css.more_btn_viewed : ""} ${isProfilePage ? css.notice_more_btn_profile : ""}`}
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Loading..." : "Learn more"}
    </button>
  );
}
