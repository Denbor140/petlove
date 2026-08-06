import { Friends } from "@/types/friends";
import css from "./FriendsItem.module.css";
import Image from "next/image";
import Link from "next/link";
import getWorkDay from "@/_utils/getWorksDay";

interface FriendsItemProps {
  friends: Friends[];
}

export default function FriendsItem({ friends }: FriendsItemProps) {
  return (
    <ul className={css.friends_list}>
      {friends.map((friend) => (
        <li key={friend._id} className={css.friend_item}>
          <div className={css.friend_work_days}>
            <p>{getWorkDay(friend.workDays)}</p>
          </div>
          <div className={css.friend_info_container}>
            <Image
              src={friend.imageUrl}
              alt={friend.title}
              width={80}
              height={80}
              loading="eager"
              className={css.friend_img}
            />
            <div className={css.friend_info}>
              <p className={css.friend_title}>{friend.title}</p>
              <address className={css.friend_contacts}>
                <ul className={css.friend_contacts_list}>
                  <li className={css.friend_email}>
                    {friend.email ? (
                      <Link href={`mailto:${friend.email}`}>
                        <span>Email:</span> {friend.email}
                      </Link>
                    ) : (
                      <Link
                        href={friend.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Email:</span> website only
                      </Link>
                    )}
                  </li>
                  <li className={css.friend_address}>
                    {friend.address ? (
                      <Link
                        href={friend.addressUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Address:</span>{" "}
                        {friend.address
                          .slice(0, 17)
                          .replace(/^(\d+)\s+(.+)$/, "$2, $1")}
                      </Link>
                    ) : friend.url ? (
                      <Link
                        href={friend.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Address:</span> website only
                      </Link>
                    ) : null}
                  </li>
                  <li className={css.friend_phone}>
                    {friend.phone ? (
                      <Link href={`tel:${friend.phone}`}>
                        <span>Phone:</span>{" "}
                        {friend.phone.replace(
                          /^(\+\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/,
                          "$1 $2 $3 $4 $5",
                        )}
                      </Link>
                    ) : (
                      <Link
                        href={
                          friend.email ? `mailto:${friend.email}` : friend.url
                        }
                        target={friend.email ? "" : "_blank"}
                      >
                        <span>Phone:</span> email only
                      </Link>
                    )}
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
