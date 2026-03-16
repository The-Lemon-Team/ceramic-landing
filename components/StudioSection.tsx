"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ArtsGalleryModal from "./ArtsGalleryModal";
import type { ArtsTheme } from "@/data/artsThemes";
import { assetUrl } from "@/lib/assetUrl";

interface StudioSectionProps {
  artsItems: ArtsTheme[];
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
      className="group relative block w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={assetUrl(theme.cover)}
          alt={theme.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/50" />

      <div className="pointer-events-none absolute inset-0 flex items-end p-4">
        <p className="opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 text-sm md:text-base font-serif text-white/95 drop-shadow-sm">
          {theme.title}
        </p>
      </div>
    </button>
  );
}

export default function StudioSection({ artsItems }: StudioSectionProps) {
  const [openedTheme, setOpenedTheme] = useState<ArtsTheme | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash === "studio" || hash === "gallery") {
      document
        .getElementById("studio")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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
            <div className="shrink-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {artsItems.slice(0, 6).map((theme) => (
                  <GalleryCard
                    key={theme.id}
                    theme={theme}
                    onOpen={() => setOpenedTheme(theme)}
                  />
                ))}
              </div>
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
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-orange-600 transition-colors"
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
