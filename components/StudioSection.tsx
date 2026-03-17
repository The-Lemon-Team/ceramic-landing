"use client";

import { useState, useEffect, Fragment, useCallback } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

type StudioPhoto = {
  src: string;
  alt: string;
};

const studioPhotos: StudioPhoto[] = [
  {
    src: "/images/studio/photo_2026-02-16_03-33-52.jpg",
    alt: "Студия керамики",
  },
];

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function StudioPhotoCard({
  photo,
  onOpen,
}: {
  photo: StudioPhoto;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full aspect-[20/23] overflow-hidden rounded-2xl border border-white/10 bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 56vw, 224px"
        priority={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
    </button>
  );
}

function StudioGalleryModal({
  photos,
  index,
  isOpen,
  onClose,
  onChange,
}: {
  photos: StudioPhoto[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onChange: (nextIndex: number) => void;
}) {
  const current = photos[index];
  const hasMultiple = photos.length > 1;

  const goPrev = useCallback(() => {
    onChange(index <= 0 ? photos.length - 1 : index - 1);
  }, [index, photos.length, onChange]);

  const goNext = useCallback(() => {
    onChange(index >= photos.length - 1 ? 0 : index + 1);
  }, [index, photos.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-6xl">
            <Dialog.Panel className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Закрыть"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="p-4 md:p-6">
                <div className="relative rounded-2xl border border-white/10 bg-black overflow-hidden">
                  <div className="relative w-full h-[70vh] min-h-[420px]">
                    {current && (
                      <Image
                        src={current.src}
                        alt={current.alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    )}
                  </div>

                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        aria-label="Предыдущее"
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
                      <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        aria-label="Следующее"
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
                    </>
                  )}
                </div>

                {hasMultiple && (
                  <div className="mt-4 carousel-scroll carousel-scroll-thin flex gap-2 overflow-x-auto pb-2">
                    {photos.map((p, i) => (
                      <button
                        key={p.src}
                        type="button"
                        onClick={() => onChange(i)}
                        className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          i === index
                            ? "border-amber-400"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Открыть ${i + 1}`}
                      >
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function StudioSection({ photos }: { photos?: StudioPhoto[] }) {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const effectivePhotos = photos && photos.length > 0 ? photos : studioPhotos;
  const slides = chunk(effectivePhotos, 6);
  const coverPhoto = effectivePhotos[0] ?? studioPhotos[0];

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
      className="w-full bg-background-dark md:px-6 md:py-12 font-sans text-white relative overflow-hidden"
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="/images/studio/background.jpg"
          alt=""
          fill
          className="object-cover opacity-40 scale-105 blur-sm"
          sizes="100vw"
          priority
          aria-hidden
        />
      </div>

      {/* Основной контейнер — совпадает с отступами других секций */}
      <div className="relative z-10 max-w-7xl px-6 mx-auto">
        <div className="w-full md:bg-black/40 md:backdrop-blur-3xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:border md:border-white/10 md:shadow-2xl">
          {/* ЛЕВАЯ КОЛОНКА: фото (только md+, на мобилке фото встроено в контент ниже) */}
          <div className="hidden md:block w-full md:w-1/2 order-1 aspect-square md:aspect-auto overflow-hidden shrink-0 relative">
            <Image
              src={coverPhoto.src}
              alt={coverPhoto.alt}
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
                src={coverPhoto.src}
                alt={coverPhoto.alt}
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
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 md:p-4">
                <div className="carousel-scroll carousel-scroll-thin flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-2">
                  {slides.map((items, slideIndex) => (
                    <div
                      key={`slide-${slideIndex}`}
                      className="shrink-0 w-full min-w-full snap-start px-1 first:pl-0 last:pr-0"
                    >
                      <div className="mx-auto w-4/5 grid grid-cols-3 grid-rows-2 gap-3">
                        {items.map((photo, idx) => {
                          const absoluteIndex = slideIndex * 6 + idx;
                          return (
                            <StudioPhotoCard
                              key={`${photo.src}-${absoluteIndex}`}
                              photo={photo}
                              onOpen={() => setOpenedIndex(absoluteIndex)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
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

      <StudioGalleryModal
        photos={effectivePhotos}
        index={openedIndex ?? 0}
        isOpen={openedIndex !== null}
        onClose={() => setOpenedIndex(null)}
        onChange={(i) => setOpenedIndex(i)}
      />
    </section>
  );
}
