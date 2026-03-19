"use client";

import { useRef, useState } from "react";
import { TelegramPost } from "@/types/telegram-post";
import TelegramPostCard from "./TelegramPostCard";

const borderMuted = "border-[#e7f1f3] dark:border-white/10";
const scrollButtonClasses =
  "bg-white dark:bg-[#0b0f10] shadow-lg rounded-full p-2 hover:bg-primary hover:text-white transition-colors";
const arrowIconClasses = "w-5 h-5";

interface TelegramNewsFeedProps {
  items: TelegramPost[];
}

export default function TelegramNewsFeed({ items }: TelegramNewsFeedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section
      id="news"
      className="bg-[#f0f5f6] dark:bg-[rgb(28_26_24)] py-12 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:hidden mb-6">
          <span className="mb-2 block">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1f6f8b] dark:text-[#7ab8c4] inline-flex items-center gap-1.5">
              Телеграм
              <svg
                className="w-3 h-3 shrink-0 fill-current"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.71-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.13.11.17.26.18.37 0 .09.01.19-.01.28z" />
              </svg>
            </span>
          </span>
          <h2 className="text-3xl font-serif text-[#0d191b] dark:text-white mb-3">
            Наша лента
          </h2>
          <p className="text-sm leading-relaxed text-[#4c8d9a] dark:text-[#7ab8c4] max-w-lg">
            Обжиги, новые работы и закулисье студии — в нашем Telegram-канале.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="hidden md:block">
            <span className="mb-2 block">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1f6f8b] dark:text-[#7ab8c4] inline-flex items-center gap-1.5">
                Телеграм
                <svg
                  className="w-3 h-3 shrink-0 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.71-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.13.11.17.26.18.37 0 .09.01.19-.01.28z" />
                </svg>
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0d191b] dark:text-white mb-4">
              Наша лента
            </h2>
            <p className="text-sm leading-relaxed text-[#4c8d9a] dark:text-[#7ab8c4] max-w-lg">
              Обжиги, новые работы и закулисье студии — в нашем Telegram-канале.
            </p>
          </div>
          <a
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-[#1f6f8b] text-white hover:bg-[#195d74] transition-colors shadow-lg shadow-black/30 self-start md:self-auto"
            href="https://t.me/ceramic_loop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.71-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.13.11.17.26.18.37 0 .09.01.19-.01.28z"></path>
            </svg>
            Присоединиться к каналу
          </a>
        </div>

        <div className="relative group">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="carousel-scroll flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 scroll-smooth"
          >
            {items.map((post) => (
              <TelegramPostCard key={post.id} post={post} />
            ))}
          </div>

          {showLeftArrow && (
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 items-center">
              <button
                onClick={() => scroll("left")}
                className={`${scrollButtonClasses} border ${borderMuted}`}
                aria-label="Прокрутить влево"
              >
                <svg
                  className={arrowIconClasses}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          )}
          {showRightArrow && (
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-4 items-center">
              <button
                onClick={() => scroll("right")}
                className={`${scrollButtonClasses} border ${borderMuted}`}
                aria-label="Прокрутить вправо"
              >
                <svg
                  className={arrowIconClasses}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
