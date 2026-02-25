"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import ArtsGalleryModal from "./ArtsGalleryModal";
import type { ArtsTheme } from "@/data/artsThemes";
import { assetUrl } from "@/lib/assetUrl";

interface StudioSectionProps {
  artsItems: ArtsTheme[];
}

const hasImages = (theme: ArtsTheme) =>
  theme.media.some((m) => m.type === "image");
const hasVideos = (theme: ArtsTheme) =>
  theme.media.some((m) => m.type === "video");

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function GalleryCard({
  theme,
  onOpen,
}: {
  theme: ArtsTheme;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="gallery-item group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded-xl w-full min-w-0 flex flex-col h-full"
    >
      <div className="aspect-[3/4] w-full min-h-[96px] max-h-[132px] sm:min-h-[112px] relative overflow-hidden rounded-xl bg-zinc-900 border border-white/5 shrink-0">
        <Image
          src={assetUrl(theme.cover)}
          alt={theme.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />
        <div className="absolute bottom-1.5 right-1.5 flex gap-1">
          {hasImages(theme) && (
            <span
              className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center"
              title="Изображения"
              aria-hidden
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </span>
          )}
          {hasVideos(theme) && (
            <span
              className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center"
              title="Видео"
              aria-hidden
            >
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 px-0.5 shrink-0 flex flex-col gap-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-300 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {theme.title}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-0.5">
          {theme.media.length}{" "}
          {theme.media.length === 1
            ? "файл"
            : theme.media.length < 5
            ? "файла"
            : "файлов"}
        </p>
      </div>
    </button>
  );
}

export default function StudioSection({
  artsItems,
}: StudioSectionProps) {
  const [openedTheme, setOpenedTheme] = useState<ArtsTheme | null>(null);
  const galleryMobileRef = useRef<HTMLDivElement>(null);
  const galleryDesktopRef = useRef<HTMLDivElement>(null);
  const [galleryShowPrev, setGalleryShowPrev] = useState(false);
  const [galleryShowNext, setGalleryShowNext] = useState(true);

  const galleryItems = useMemo(
    () => [...artsItems, ...artsItems, ...artsItems, ...artsItems],
    [artsItems]
  );
  const mobileSlides = useMemo(() => chunk(galleryItems, 4), [galleryItems]);
  const desktopSlides = useMemo(() => chunk(galleryItems, 8), [galleryItems]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash === "studio" || hash === "gallery") {
      galleryMobileRef.current?.scrollTo({ left: 0 });
      galleryDesktopRef.current?.scrollTo({ left: 0 });
    }
  }, []);

  const updateGalleryArrows = () => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const el = (isDesktop ? galleryDesktopRef : galleryMobileRef).current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setGalleryShowPrev(scrollLeft > 5);
    setGalleryShowNext(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    updateGalleryArrows();
    window.addEventListener("resize", updateGalleryArrows);
    return () => window.removeEventListener("resize", updateGalleryArrows);
  }, []);

  const scrollGallery = (dir: "prev" | "next") => {
    const ref =
      typeof window !== "undefined" && window.innerWidth >= 768
        ? galleryDesktopRef
        : galleryMobileRef;
    const el = ref?.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    const delta = dir === "prev" ? -slideWidth : slideWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      id="studio"
      className="w-full bg-[#1a1612] md:px-6 md:py-12 font-sans text-white relative overflow-hidden"
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="/images/studio/background.jpg"
          alt=""
          fill
          className="object-cover opacity-30 scale-105 blur-sm"
          sizes="100vw"
          priority
          aria-hidden
        />
      </div>

      {/* Основной контейнер — совпадает с отступами других секций */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="w-full md:bg-black/40 md:backdrop-blur-3xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:border md:border-white/10 md:shadow-2xl">
          {/* ЛЕВАЯ КОЛОНКА: фото (только md+, на мобилке фото встроено в контент ниже) */}
          <div className="hidden md:block w-full md:w-1/2 order-1 aspect-square md:aspect-auto overflow-hidden shrink-0 relative">
            <Image
              src="/images/studio/photo_2026-02-16_03-33-52.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
              priority
              aria-hidden
            />
          </div>

          {/* ПРАВАЯ КОЛОНКА: контент. На мобилке порядок: заголовок → изображение → табы → контент */}
          <div className="w-full md:w-1/2 flex flex-col order-2 min-h-0 overflow-hidden p-4 md:pt-8 pt-12">
            {/* Заголовок: Студия (иконка) + Студия (заголовок) */}
            <div className="mb-4 md:mb-6 shrink-0">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
                  Студия
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white">
                Студия
              </h2>
            </div>

            {/* Изображение: только на мобилке, между заголовком и табами */}
            <div className="block md:hidden w-full aspect-square overflow-hidden shrink-0 relative rounded-xl mb-5">
              <Image
                src="/images/studio/photo_2026-02-16_03-33-52.jpg"
                alt="Студия керамики"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            {/* Описание */}
            <p className="text-gray-300 leading-relaxed text-sm font-light mb-5 shrink-0">
              Авторская керамика ручной работы в Санкт-Петербурге. В студии
              создаём ограниченные серии: от эскиза до обжига. Работаем с
              разными массами и глазурями, часть процесса снимаем на видео. Ниже
              — галерея артов и набросков.
            </p>

            {/* Галерея */}
            <div className="flex-1 max-h-[380px] flex flex-col overflow-hidden relative">
                {/* Мобильная карусель */}
                <div
                  ref={galleryMobileRef}
                  onScroll={updateGalleryArrows}
                  className="carousel-scroll carousel-scroll-thin flex md:hidden overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex-1 min-h-0 w-full pb-2"
                >
                  {mobileSlides.map((slideThemes, slideIndex) => (
                    <div
                      key={`m-${slideIndex}`}
                      className="shrink-0 w-full min-w-full grid grid-cols-2 grid-rows-2 gap-3 content-start auto-rows-fr snap-start px-2 first:pl-0 last:pr-0"
                      style={{ minHeight: "min(280px, 50vw)" }}
                    >
                      {slideThemes.map((theme, idx) => (
                        <GalleryCard
                          key={`${theme.id}-m-${slideIndex}-${idx}`}
                          theme={theme}
                          onOpen={() => setOpenedTheme(theme)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {/* Десктопная карусель */}
                <div
                  ref={galleryDesktopRef}
                  onScroll={updateGalleryArrows}
                  className="carousel-scroll carousel-scroll-thin hidden md:flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex-1 min-h-0 w-full pb-2"
                >
                  {desktopSlides.map((slideThemes, slideIndex) => (
                    <div
                      key={`d-${slideIndex}`}
                      className="shrink-0 w-full min-w-full grid grid-cols-4 grid-rows-2 gap-3 content-start auto-rows-fr snap-start px-2 first:pl-0 last:pr-0"
                      style={{ minHeight: "240px" }}
                    >
                      {slideThemes.map((theme, idx) => (
                        <GalleryCard
                          key={`${theme.id}-d-${slideIndex}-${idx}`}
                          theme={theme}
                          onOpen={() => setOpenedTheme(theme)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {/* Кнопки навигации */}
                {galleryShowPrev && (
                  <button
                    type="button"
                    onClick={() => scrollGallery("prev")}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                    aria-label="Предыдущий слайд"
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
                )}
                {galleryShowNext && (
                  <button
                    type="button"
                    onClick={() => scrollGallery("next")}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                    aria-label="Следующий слайд"
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
                )}
              </div>

            {/* Блок Индивидуальные заказы */}
            <div className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10 shrink-0">
              <h3 className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">
                Индивидуальные заказы
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                В этой студии мы создаём вещи по вашим идеям. Хотите уникальную
                вазу, тарелку с вашим рисунком или плитку под интерьер? Напишите
                нам — обсудим и сделаем.
              </p>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Обсудить заказ
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ArtsGalleryModal
        theme={openedTheme}
        isOpen={!!openedTheme}
        onClose={() => setOpenedTheme(null)}
      />
    </section>
  );
}
