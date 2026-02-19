"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { ProductModal } from "@/ui-lib";
import ArtsGalleryModal from "./ArtsGalleryModal";
import type { ArtsTheme } from "@/data/artsThemes";
import type { Product } from "@/types/product";
import { assetUrl } from "@/lib/assetUrl";

type TabId = "gallery" | "products" | "directions";

export interface DirectionsData {
  title: string;
  address: string;
  mapUrl: string;
  text: string;
}

interface StudioSectionProps {
  artsItems: ArtsTheme[];
  productsItems: Product[];
  directions: DirectionsData;
}

const TABS: { id: TabId; label: string }[] = [
  { id: "gallery", label: "Галерея" },
  { id: "products", label: "Изделия" },
  { id: "directions", label: "Как добраться" },
];

// export default function StudioSection() {
//   return ()
// }

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

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 rounded-xl w-full min-w-0 flex flex-col h-full"
    >
      <div className="aspect-[3/4] w-full min-h-[96px] max-h-[132px] sm:min-h-[112px] relative overflow-hidden rounded-xl bg-zinc-900 border border-white/5 shrink-0">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="mt-2 px-0.5 shrink-0 flex flex-col gap-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-300 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {product.title}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-0.5">
          {product.price > 0 ? `${product.price.toFixed(0)} ₽` : "—"}
        </p>
      </div>
    </button>
  );
}

export default function StudioSection({
  artsItems,
  productsItems,
  directions,
}: StudioSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("gallery");
  const [openedTheme, setOpenedTheme] = useState<ArtsTheme | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDirectionsPopupOpen, setIsDirectionsPopupOpen] = useState(false);
  const [isMapPinPopupOpen, setIsMapPinPopupOpen] = useState(false);
  const galleryMobileRef = useRef<HTMLDivElement>(null);
  const galleryDesktopRef = useRef<HTMLDivElement>(null);
  const productsMobileRef = useRef<HTMLDivElement>(null);
  const productsDesktopRef = useRef<HTMLDivElement>(null);
  const [galleryShowPrev, setGalleryShowPrev] = useState(false);
  const [galleryShowNext, setGalleryShowNext] = useState(true);
  const [productsShowPrev, setProductsShowPrev] = useState(false);
  const [productsShowNext, setProductsShowNext] = useState(true);
  const [pinPosition] = useState(() => ({
    left: 42 + Math.floor(Math.random() * 14),
    top: 48 + Math.floor(Math.random() * 14),
  }));

  const galleryItems = useMemo(
    () => [...artsItems, ...artsItems, ...artsItems, ...artsItems],
    [artsItems]
  );
  const mobileSlides = useMemo(() => chunk(galleryItems, 4), [galleryItems]);
  const desktopSlides = useMemo(() => chunk(galleryItems, 8), [galleryItems]);
  const mobileProductSlides = useMemo(
    () => chunk(productsItems, 4),
    [productsItems]
  );
  const desktopProductSlides = useMemo(
    () => chunk(productsItems, 8),
    [productsItems]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash === "directions") {
      setActiveTab("directions");
    } else if (hash === "studio" || hash === "gallery") {
      setActiveTab("gallery");
    } else if (hash === "products") {
      setActiveTab("products");
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
    if (activeTab === "gallery") {
      galleryMobileRef.current?.scrollTo({ left: 0 });
      galleryDesktopRef.current?.scrollTo({ left: 0 });
      updateGalleryArrows();
      window.addEventListener("resize", updateGalleryArrows);
      return () => window.removeEventListener("resize", updateGalleryArrows);
    }
    if (activeTab === "products") {
      productsMobileRef.current?.scrollTo({ left: 0 });
      productsDesktopRef.current?.scrollTo({ left: 0 });
      updateProductsArrows();
      window.addEventListener("resize", updateProductsArrows);
      return () => window.removeEventListener("resize", updateProductsArrows);
    }
  }, [activeTab]);

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

  const updateProductsArrows = () => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const el = (isDesktop ? productsDesktopRef : productsMobileRef).current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setProductsShowPrev(scrollLeft > 5);
    setProductsShowNext(scrollLeft < scrollWidth - clientWidth - 5);
  };

  const scrollProducts = (dir: "prev" | "next") => {
    const ref =
      typeof window !== "undefined" && window.innerWidth >= 768
        ? productsDesktopRef
        : productsMobileRef;
    const el = ref?.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    const delta = dir === "prev" ? -slideWidth : slideWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
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

            {/* Описание (только md+, на мобилке не показываем по желаемому порядку) */}
            <p className="hidden md:block text-gray-300 leading-relaxed text-sm font-light mb-5 shrink-0">
              Авторская керамика ручной работы в Санкт-Петербурге. В студии
              создаём ограниченные серии: от эскиза до обжига. Работаем с
              разными массами и глазурями, часть процесса снимаем на видео. Ниже
              — галерея артов и набросков, изделия из студии и подсказка, как
              нас найти.
            </p>

            {/* Табы */}
            <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar shrink-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-lg border transition-all text-[11px] uppercase tracking-wider whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white/20 border-white/30 text-white"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Контент табов: галерея — карусель (мобилка 2×2 по 4 айтема, десктоп 4×2 по 8) */}
            {activeTab === "gallery" && (
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
            )}

            {activeTab === "products" && (
              <div className="flex-1 max-h-[380px] flex flex-col overflow-hidden relative">
                {/* Мобильная карусель изделий */}
                <div
                  ref={productsMobileRef}
                  onScroll={updateProductsArrows}
                  className="carousel-scroll carousel-scroll-thin flex md:hidden overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex-1 min-h-0 w-full pb-2"
                >
                  {mobileProductSlides.map((slideProducts, slideIndex) => (
                    <div
                      key={`pm-${slideIndex}`}
                      className="shrink-0 w-full min-w-full grid grid-cols-2 grid-rows-2 gap-3 content-start auto-rows-fr snap-start px-2 first:pl-0 last:pr-0"
                      style={{ minHeight: "min(280px, 50vw)" }}
                    >
                      {slideProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpen={() => openProductModal(product)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {/* Десктопная карусель изделий */}
                <div
                  ref={productsDesktopRef}
                  onScroll={updateProductsArrows}
                  className="carousel-scroll carousel-scroll-thin hidden md:flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex-1 min-h-0 w-full pb-2"
                >
                  {desktopProductSlides.map((slideProducts, slideIndex) => (
                    <div
                      key={`pd-${slideIndex}`}
                      className="shrink-0 w-full min-w-full grid grid-cols-4 grid-rows-2 gap-3 content-start auto-rows-fr snap-start px-2 first:pl-0 last:pr-0"
                      style={{ minHeight: "240px" }}
                    >
                      {slideProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpen={() => openProductModal(product)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {/* Кнопки навигации */}
                {productsShowPrev && (
                  <button
                    type="button"
                    onClick={() => scrollProducts("prev")}
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
                {productsShowNext && (
                  <button
                    type="button"
                    onClick={() => scrollProducts("next")}
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
            )}

            {activeTab === "directions" && (
              <div
                id="directions"
                className="space-y-4 flex-1 min-h-0 flex flex-col overflow-auto max-h-[380px]"
              >
                <div className="relative rounded-xl overflow-hidden bg-stone-800 ring-1 ring-stone-700 w-full h-[318px]">
                  <iframe
                    src={directions.mapUrl}
                    title="Карта"
                    className="w-full h-full absolute inset-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Пин на карте */}
                  <button
                    type="button"
                    onClick={() => setIsMapPinPopupOpen(true)}
                    className="absolute z-10 w-10 h-10 -translate-x-1/2 -translate-y-full flex items-center justify-center text-primary hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-800 rounded-full"
                    style={{
                      left: `${pinPosition.left}%`,
                      top: `${pinPosition.top}%`,
                    }}
                    aria-label="Показать адрес"
                  >
                    <svg
                      className="w-10 h-10 drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </button>
                  {/* Попап пина при клике — на мобилке показывается внизу */}
                  {isMapPinPopupOpen && (
                    <>
                      <div
                        className="absolute inset-0 z-20"
                        onClick={() => setIsMapPinPopupOpen(false)}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute z-30 left-1/2 -translate-x-1/2 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 w-[calc(100%-2rem)] max-w-xs bg-white dark:bg-stone-800 text-stone-800 dark:text-white rounded-xl shadow-xl p-4 border border-stone-200 dark:border-stone-600"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Адрес студии"
                      >
                        <div className="flex items-start gap-3">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
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
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                            </svg>
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">
                              {directions.address}
                            </p>
                            <button
                              type="button"
                              onClick={() => setIsDirectionsPopupOpen(true)}
                              className="mt-2 text-xs text-primary hover:underline"
                            >
                              Подсказка как добраться
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsMapPinPopupOpen(false)}
                            className="shrink-0 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1"
                            aria-label="Закрыть"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsDirectionsPopupOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 text-white rounded-lg text-sm font-medium hover:bg-white/25 border border-white/20 transition-colors"
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Подсказка как добраться
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ArtsGalleryModal
        theme={openedTheme}
        isOpen={!!openedTheme}
        onClose={() => setOpenedTheme(null)}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={closeProductModal}
          variant="gallery"
          showPrice
        />
      )}

      {/* Попап «Как добраться» */}
      {isDirectionsPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="directions-popup-title"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDirectionsPopupOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white dark:bg-stone-800 rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 max-h-[80vh] overflow-y-auto">
            <h3
              id="directions-popup-title"
              className="text-xl font-serif text-stone-800 dark:text-white mb-2"
            >
              {directions.title}
            </h3>
            <p className="text-primary font-medium mb-4">
              {directions.address}
            </p>
            <div className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 whitespace-pre-line">
              {directions.text}
            </div>
            <button
              type="button"
              onClick={() => setIsDirectionsPopupOpen(false)}
              className="mt-6 w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
