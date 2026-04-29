import Image from "next/image";
import { VkPost } from "@/types/vk-post";

const borderMuted = "border-[#dce6ee] dark:border-white/10";
const vkBlue = "#0077ff";

const statItems = [
  { key: "likes", label: "Нравится" },
  { key: "comments", label: "Комментарии" },
  { key: "reposts", label: "Репосты" },
  { key: "views", label: "Просмотры" },
] as const;

interface VkPostCardProps {
  post: VkPost;
}

export default function VkPostCard({ post }: VkPostCardProps) {
  const mainImage = post.images[0];
  const extraImages = post.images.slice(1, 4);

  return (
    <article
      className={`min-w-[280px] md:min-w-[380px] max-w-[380px] snap-start bg-white dark:bg-[#0b0f10] rounded-2xl shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/20 transition-shadow flex flex-col border ${borderMuted} overflow-hidden`}
    >
      <div className="p-4 flex items-center gap-3 border-b border-[#eef3f8] dark:border-white/10">
        <a
          href={post.communityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#e5ebf1]"
          aria-label={post.communityName}
        >
          {post.communityAvatar ? (
            <Image
              src={post.communityAvatar}
              alt={post.communityName}
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-base font-bold text-[#0077ff]">
              VK
            </span>
          )}
        </a>
        <div className="min-w-0 flex-1">
          <a
            href={post.communityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm font-semibold text-[#0d191b] hover:text-[#0077ff] dark:text-white"
          >
            {post.communityName}
          </a>
          <time
            dateTime={post.publishedAt}
            className="text-xs text-[#6f7985] dark:text-[#9aa6b2]"
          >
            {post.timestamp}
          </time>
        </div>
        <span
          className="rounded-full px-2 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: vkBlue }}
          aria-hidden
        >
          VK
        </span>
      </div>

      <div className="p-4 flex flex-1 flex-col gap-4">
        <p className="text-sm leading-relaxed text-[#0d191b] dark:text-[#d1d5db] line-clamp-6 whitespace-pre-line">
          {post.text}
        </p>

        {mainImage && (
          <div className="grid gap-1 overflow-hidden rounded-xl bg-[#eef3f8] dark:bg-white/5">
            <div className="relative h-52 md:h-64">
              <Image
                src={mainImage.src}
                alt={mainImage.alt || post.text}
                fill
                className="object-cover"
              />
            </div>
            {extraImages.length > 0 && (
              <div className="grid grid-cols-3 gap-1">
                {extraImages.map((image) => (
                  <div key={image.id} className="relative h-20">
                    <Image
                      src={image.src}
                      alt={image.alt || post.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className={`mt-auto border-t ${borderMuted} pt-3`}>
          <div className="mb-3 flex items-center gap-3 text-xs text-[#6f7985] dark:text-[#9aa6b2]">
            {statItems.map(({ key, label }) => {
              const value = post.stats?.[key];
              if (!value) return null;

              return (
                <span key={key} aria-label={`${label}: ${value}`}>
                  {value}
                </span>
              );
            })}
          </div>
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0077ff] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0067dd]"
          >
            Открыть во ВКонтакте
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
