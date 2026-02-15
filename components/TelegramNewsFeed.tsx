"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TelegramPost } from "@/types/telegram-post";

import photo1 from "./telegram_posters/photo-1.jpg";
import photo2 from "./telegram_posters/photo-2.jpg";
import photo3 from "./telegram_posters/photo-3.jpg";

// Статические данные для демонстрации (посты 1–3 с локальными фото)
const posts: TelegramPost[] = [
  {
    id: "1",
    category: "Update",
    image: photo1.src,
    text: `В мастерской сейчас так❤️: тишина после творчества, готовые работы на полке ждут своих хозяев, а за окном холодная метель и манят домашние огни🥺`,
    timestamp: "2 часа назад",
  },
  {
    id: "2",
    category: "Update",
    image: photo2.src,
    text: `❤️Совсем скоро весенние праздники❤️

А значит, отличный повод дарить что-то особенное интерьерное📍

Тарелочки с росписью — гранат, лимон, ботаника — каждая уникальна и расписана вручную.
#керамика #ручнаяработа 

Эти тарелочки уже готовы 💌
Забронировать можно прямо в сообщениях💌`,
    timestamp: "Вчера",
  },
  {
    id: "3",
    category: "Update",
    image: photo3.src,
    text: `Пара преподавателей говорили мне: «Рисуй так, как надо, как сказали!»

​Говорили: «У тебя штриховка — "солома", твои работы видно за версту, можешь даже не подписывать. Много теней, рефлексов — перебор!»

​А я стояла и думала: а пусть эту штриховку даже с космоса видно будет🌟`,
    timestamp: "22 ноя",
  },
  {
    id: "4",
    category: "Announcement",
    text: "Теперь доступна доставка по всему миру для наших праздничных коллекций!",
    timestamp: "20 ноя",
    telegramUrl: "#",
  },
];

export default function TelegramNewsFeed() {
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
    <section id="news" className="bg-[#f0f5f6] dark:bg-[#0c181a] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="section-label-wrap flex items-center gap-2 mb-2">
              <span className="section-label text-[#4c8d9a] dark:text-[#0088cc]">
                Лента сообщества
              </span>

              <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
            </div>
            <h2 className="section-title text-[#0d191b] dark:text-white mb-4">
              Прямо из студии
            </h2>
            <p className="section-subtitle text-[#4c8d9a] dark:text-[#7ab8c4] max-w-lg">
              Обжиги, новые работы и закулисье студии — в нашем Telegram-канале.
            </p>
          </div>
          <a
            className="flex items-center gap-2 bg-[#0088cc] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#0077b5] transition-colors shadow-lg shadow-[#0088cc]/20 self-start md:self-auto"
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.71-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.13.11.17.26.18.37 0 .09.01.19-.01.28z"></path>
            </svg>
            Присоединиться к каналу
          </a>
        </div>

        {/* Scrollable Row of Cards */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4 scroll-smooth"
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="min-w-[260px] md:min-w-[300px] snap-start bg-white dark:bg-[#15272a] border border-[#e7f1f3] dark:border-[#1e2f33] rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {post.image ? (
                  <div className="h-36 w-full relative rounded-t-lg overflow-hidden">
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
                        {post.category === "Announcement"
                          ? "Объявление"
                          : post.category}
                      </span>
                      <span className="text-[10px] text-[#4c8d9a] font-medium shrink-0">
                        {post.timestamp}
                      </span>
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
                    <div className="mt-auto pt-3 border-t border-[#e7f1f3] dark:border-[#1e2f33]">
                      <Link
                        href={post.telegramUrl || "#"}
                        className="text-[#0088cc] text-[11px] font-bold flex items-center gap-1 group/link"
                      >
                        В Telegram
                        <svg
                          className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
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
                  <div className="p-5 flex flex-col flex-1 gap-3 min-h-[7.5rem]">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] font-bold text-[#0088cc] bg-[#0088cc]/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {post.category === "Update"
                          ? "Обновление"
                          : post.category === "Workshop"
                          ? "Мастер-класс"
                          : post.category === "Process"
                          ? "Процесс"
                          : "Объявление"}
                      </span>
                      <span className="text-[10px] text-[#4c8d9a] font-medium shrink-0">
                        {post.timestamp}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-4 text-[#0d191b] dark:text-[#d1d5db] flex-1 min-h-0">
                      {post.text}
                    </p>
                    <div className="mt-auto pt-3 border-t border-[#e7f1f3] dark:border-[#1e2f33]">
                      <Link
                        href={post.telegramUrl || "#"}
                        className="text-[#0088cc] text-[11px] font-bold flex items-center gap-1 group/link"
                      >
                        В Telegram
                        <svg
                          className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
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
            ))}
          </div>

          {/* Scroll Hint Arrows (Desktop only) */}
          {showLeftArrow && (
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-4 items-center">
              <button
                onClick={() => scroll("left")}
                className="bg-white dark:bg-[#1a2e32] shadow-lg border border-[#e7f1f3] dark:border-[#1e2f33] rounded-full p-2 hover:bg-primary hover:text-white transition-colors"
                aria-label="Прокрутить влево"
              >
                <svg
                  className="w-5 h-5"
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
                className="bg-white dark:bg-[#1a2e32] shadow-lg border border-[#e7f1f3] dark:border-[#1e2f33] rounded-full p-2 hover:bg-primary hover:text-white transition-colors"
                aria-label="Прокрутить вправо"
              >
                <svg
                  className="w-5 h-5"
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
