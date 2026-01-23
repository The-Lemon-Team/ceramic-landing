"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TelegramPost } from "@/types/telegram-post";

// Статические данные для демонстрации
const posts: TelegramPost[] = [
  {
    id: "1",
    category: "Update",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2guR4wp9a-etalotMq2RwggsPyDXRRA4iePnCVoZs5d-DJLHTYgijl951QLLHMyg4JHkLkIhexoJZxDe7ekDmngtbrY7hE5PkicvmxAP7XyxbzHf-3SLbm3_PY1Fe4wVF_0YPAXVWe1vZUnNndquWBoQ64kA8OR0e1fUrY9lg5GC22_4PhILwHrKIvUVdshfwDT8ybPS2ygGoSF8jbi3c9HSse7PlkvsDrGT22OyQzppkh-Q9Sl-5L4W_4bJsDZfJ0hWYqIdmPoY",
    text: "Только что закончила смешивать новую партию глазури 'Морская пена'. Не могу дождаться, чтобы увидеть, как она будет выглядеть на высоких вазах завтра утром!",
    timestamp: "2 часа назад",
  },
  {
    id: "2",
    category: "Workshop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbBaWx8xpV1-cjtlhf7H1NFfslZKmqZF37_ZMeuaS1jY3OxGKjoDgGvO15VLPLSxQ0jhWqf_PJtpVhLpVrI8seuQvvRVbsk0NEnXBKnBGGTWvk85GhjawEkNpNUazH3ItNvM0hNc5mMb6b1fb_H7EH6hGSu5PCRMUgQGtzUvF-gFodOOEo5ofoK3BJ_OoBY2EJgdtacR9nTS2Jy2ajy0VBCTFGMroQoFsQSLjoWQmwDZwEMc1s0px7z7xFcX6znT3e60VeiqjxpB8",
    text: "Открылось несколько мест на наш субботний утренний мастер-класс по работе на гончарном круге. Успейте забрать их, пока они не закончились!",
    timestamp: "Вчера",
  },
  {
    id: "3",
    category: "Process",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7HCE23Y5wFltilZM9QPBYe7c5wEUMFIy43zKIerGWNPpD3jniXUBA76b8_9Zv5CWdhlPlNR4-9RSlAYD_tBWcODFaviIHnWbdWPBEZ3OVW0cRSC-N_6bWEiZafNIb3HjKwUoORgg7plAZ_OL851XVzZ7cWXSx3nmOXpkv0fwwubsalSqprvKZ4MrGRfMngZktY1ct3ojGcI3nptW_wqwfYAy_hYIx8dDUaJyDD9GDO1vdbMlfJcolqifF6QU-DH-8z3Pjlg8Ns_8",
    text: "Обжиг завершен! Разгружаем коллекцию 'Летняя серия'. Следите за обновлениями, фотографии готовых изделий появятся позже сегодня.",
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
    <section className="bg-[#f0f5f6] dark:bg-[#0c181a] py-16 mt-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#4c8d9a] dark:text-[#0088cc]">
                Лента сообщества
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2">Прямо из студии</h3>
            <p className="text-[#4c8d9a] dark:text-[#7ab8c4] max-w-lg">
              Присоединяйтесь к нашему Telegram-каналу, чтобы получать ежедневные
              обновления об обжигах, новых релизах и заглянуть в наш процесс.
            </p>
          </div>
          <a
            className="flex items-center gap-2 bg-[#0088cc] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#0077b5] transition-colors shadow-lg shadow-[#0088cc]/20 self-start md:self-auto"
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
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
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x pb-4 scroll-smooth"
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="min-w-[300px] md:min-w-[350px] snap-start bg-white dark:bg-[#15272a] border border-[#e7f1f3] dark:border-[#1e2f33] rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {post.image ? (
                  <div className="h-48 w-full relative rounded-t-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.text}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="p-5 flex flex-col flex-1 gap-4 justify-center bg-primary/5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">
                        {post.category === "Announcement"
                          ? "Объявление"
                          : post.category}
                      </span>
                      <span className="text-[11px] text-[#4c8d9a] font-medium">
                        {post.timestamp}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <svg
                        className="w-10 h-10 text-[#0088cc]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                      </svg>
                      <p className="text-base font-semibold leading-snug text-[#0d191b] dark:text-white">
                        {post.text}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[#e7f1f3] dark:border-[#1e2f33]">
                      <Link
                        href={post.telegramUrl || "#"}
                        className="text-[#0088cc] text-xs font-bold flex items-center gap-1 group/link"
                      >
                        Посмотреть в Telegram
                        <svg
                          className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#0088cc] bg-[#0088cc]/10 px-2 py-1 rounded uppercase tracking-wider">
                        {post.category === "Update"
                          ? "Обновление"
                          : post.category === "Workshop"
                          ? "Мастер-класс"
                          : post.category === "Process"
                          ? "Процесс"
                          : "Объявление"}
                      </span>
                      <span className="text-[11px] text-[#4c8d9a] font-medium">
                        {post.timestamp}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed line-clamp-3 text-[#0d191b] dark:text-[#d1d5db]">
                      {post.text}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#e7f1f3] dark:border-[#1e2f33]">
                      <Link
                        href={post.telegramUrl || "#"}
                        className="text-[#0088cc] text-xs font-bold flex items-center gap-1 group/link"
                      >
                        Посмотреть в Telegram
                        <svg
                          className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
