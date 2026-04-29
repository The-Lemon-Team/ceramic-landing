"use client";

import { useRef, useState } from "react";
import { VkPost } from "@/types/vk-post";
import Titles from "./Titles";
import VkPostCard from "./VkPostCard";

const borderMuted = "border-[#dce6ee] dark:border-white/10";
const scrollButtonClasses =
  "bg-white dark:bg-[#0b0f10] shadow-lg rounded-full p-2 hover:bg-[#0077ff] hover:text-white transition-colors";
const arrowIconClasses = "w-5 h-5";

interface VkNewsFeedProps {
  items: VkPost[];
}

function VkIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden>
      <path d="M13.162 18.994c-8.203 0-12.875-5.607-13.07-14.934h4.109c.135 6.838 3.154 9.735 5.544 10.333V4.06h3.871v5.903c2.36-.254 4.839-2.942 5.674-5.903h3.871c-.641 3.648-3.334 6.336-5.246 7.442 1.912.897 4.978 3.24 6.082 7.492h-4.26c-.91-2.837-3.178-5.036-6.121-5.335v5.335h-.454Z" />
    </svg>
  );
}

export default function VkNewsFeed({ items }: VkNewsFeedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 420;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section
      id="news"
      className="bg-[#f0f5f6] dark:bg-[rgb(28_26_24)] py-10 px-8 md:px-[8px] overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="md:hidden mb-6">
          <Titles
            overline="ВКонтакте"
            title="Наша лента"
            overlineClassName="text-[0.75rem] uppercase tracking-[0.2em] font-bold text-[#0077ff] dark:text-[#7ab8c4] inline-flex items-center gap-1.5"
            titleClassName="text-3xl font-serif text-[#0d191b] dark:text-white"
            icon={<VkIcon />}
          />
          <p className="text-sm leading-relaxed text-[#4c8d9a] dark:text-[#7ab8c4] max-w-lg">
            Обжиги, новые работы и закулисье студии — в нашем сообществе VK.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <div className="hidden md:block">
            <div className="mb-4">
              <Titles
                overline="ВКонтакте"
                title="Наша лента"
                overlineClassName="text-[0.75rem] uppercase tracking-[0.2em] font-bold text-[#0077ff] dark:text-[#7ab8c4] inline-flex items-center gap-1.5"
                titleClassName="text-3xl md:text-4xl font-serif text-[#0d191b] dark:text-white"
                icon={<VkIcon />}
              />
            </div>
            <p className="text-sm leading-relaxed text-[#4c8d9a] dark:text-[#7ab8c4] max-w-lg">
              Обжиги, новые работы и закулисье студии — в нашем сообществе VK.
            </p>
          </div>
          <a
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-[#0077ff] text-white hover:bg-[#0067dd] transition-colors shadow-lg shadow-black/30 self-start md:self-auto"
            href="https://vk.ru/ceramic.loop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VkIcon className="w-5 h-5" />
            Перейти в сообщество
          </a>
        </div>

        <div className="relative group">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="carousel-scroll flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 scroll-smooth"
          >
            {items.map((post) => (
              <VkPostCard key={post.id} post={post} />
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
