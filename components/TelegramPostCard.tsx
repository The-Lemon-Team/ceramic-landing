import Image from "next/image";
import Link from "next/link";
import { TelegramPost } from "@/types/telegram-post";

const borderMuted = "border-[#e7f1f3] dark:border-[#1e2f33]";
const timestampClasses = "text-[10px] text-[#4c8d9a] font-medium shrink-0";
const telegramLinkClasses =
  "text-[#0088cc] text-[11px] font-bold flex items-center gap-1 group/link";
const telegramLinkIcon =
  "w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform";

const formatCategory = (category: TelegramPost["category"]) => {
  const map: Record<TelegramPost["category"], string> = {
    Update: "Обновление",
    Workshop: "Мастер-класс",
    Process: "Процесс",
    Announcement: "Объявление",
  };
  return map[category];
};

interface TelegramPostCardProps {
  post: TelegramPost;
}

export default function TelegramPostCard({ post }: TelegramPostCardProps) {
  return (
    <div
      className={`min-w-[260px] md:min-w-[360px] snap-start bg-white dark:bg-[#15272a] rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col border ${borderMuted}`}
    >
      {post.image ? (
        <div className="h-48 md:h-72 w-full relative rounded-t-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.text}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="p-4 flex flex-col flex-1 gap-3 justify-center bg-primary/5 rounded-t-lg">
          <div className="flex justify-between items-center gap-2">
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {formatCategory(post.category)}
            </span>
            <span className={timestampClasses}>{post.timestamp}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <svg
              className="w-8 h-8 text-[#0088cc]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
            <p className="text-sm font-semibold leading-snug text-[#0d191b] dark:text-white line-clamp-2">
              {post.text}
            </p>
          </div>
          <div className={`mt-auto pt-3 border-t ${borderMuted}`}>
            <Link
              href={post.telegramUrl || "#"}
              className={telegramLinkClasses}
            >
              В Telegram
              <svg
                className={telegramLinkIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
      {post.image && (
        <div className="p-3 md:p-5 flex flex-col flex-1 gap-2 md:gap-3 min-h-[9rem] md:min-h-[12rem]">
          <div className="flex justify-between items-center gap-2">
            <span className="text-[10px] font-bold text-[#0088cc] bg-[#0088cc]/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {formatCategory(post.category)}
            </span>
            <span className={timestampClasses}>{post.timestamp}</span>
          </div>
          <p className="text-xs md:text-sm leading-snug md:leading-loose line-clamp-4 md:line-clamp-6 text-[#0d191b] dark:text-[#d1d5db] flex-1 min-h-0">
            {post.text}
          </p>
          <div className={`mt-auto pt-2 md:pt-3 border-t ${borderMuted}`}>
            <Link
              href={post.telegramUrl || "#"}
              className={telegramLinkClasses}
            >
              В Telegram
              <svg
                className={telegramLinkIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
