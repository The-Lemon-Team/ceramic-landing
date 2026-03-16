"use client";

import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import type { ArtsTheme, ArtsMediaItem } from "@/data/artsThemes";
import { assetUrl } from "@/lib/assetUrl";
import { useCart } from "@/components/CartProvider";

interface ArtsGalleryModalProps {
  theme: ArtsTheme | null;
  isOpen: boolean;
  onClose: () => void;
}

function MediaView({ item }: { item: ArtsMediaItem }) {
  if (item.type === "image") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={assetUrl(item.src)}
          alt={item.alt ?? ""}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 60vw"
          unoptimized
        />
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-video bg-stone-900/5 rounded-xl overflow-hidden">
      <video
        src={assetUrl(item.src)}
        poster={item.poster ? assetUrl(item.poster) : undefined}
        controls
        playsInline
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function ArtsGalleryModal({
  theme,
  isOpen,
  onClose,
}: ArtsGalleryModalProps) {
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const media = theme?.media ?? [];
  const current = media[index];
  const hasMultiple = media.length > 1;
  const price = 3000;

  useEffect(() => {
    setIndex(0);
    setQuantity(1);
  }, [theme?.id]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? media.length - 1 : i - 1));
  }, [media.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= media.length - 1 ? 0 : i + 1));
  }, [media.length]);

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

  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : q));
  const increaseQuantity = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    if (!theme) return;
    addItem(
      {
        id: `art:${theme.id}`,
        kind: "art",
        title: theme.title,
        price,
        image: assetUrl(theme.cover),
      },
      quantity,
    );
    onClose();
  };

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
            className="fixed inset-0 bg-white/80 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-5xl">
            <Dialog.Panel className="relative bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                {/* Left: media gallery */}
                <div className="p-4 md:p-6 bg-stone-50">
                  <div className="flex items-start justify-between gap-4 mb-4 pr-12">
                    <div className="min-w-0">
                      <Dialog.Title className="text-xl md:text-2xl font-serif text-stone-900 truncate">
                        {theme?.title}
                      </Dialog.Title>
                      <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">
                        {index + 1} / {media.length}
                      </p>
                    </div>
                  </div>

                  <div className="relative rounded-2xl border border-stone-200 bg-white overflow-hidden">
                    <div className="relative w-full aspect-[4/5]">
                      {current && <MediaView item={current} />}
                    </div>

                    {hasMultiple && (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow transition-colors"
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
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow transition-colors"
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

                  {media.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                      {media.map((item, i) => {
                        const rawSrc =
                          item.type === "image"
                            ? item.src
                            : (item.poster ?? item.src);
                        const src = assetUrl(rawSrc);
                        const isVideo = item.type === "video";
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                              i === index
                                ? "border-primary"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                            aria-label={`Открыть ${i + 1}`}
                          >
                            {isVideo ? (
                              <div className="w-full h-full bg-stone-200 flex items-center justify-center relative">
                                <Image
                                  src={src}
                                  alt=""
                                  width={64}
                                  height={64}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  unoptimized
                                />
                                <svg
                                  className="w-7 h-7 text-white drop-shadow relative z-10"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            ) : (
                              <Image
                                src={src}
                                alt=""
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right: description + selling block */}
                <div className="p-4 md:p-6 flex flex-col">
                  <div className="flex-1">
                    {theme?.description && (
                      <p className="text-stone-700 leading-relaxed">
                        {theme.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-widest text-stone-500">
                      Цена
                    </p>
                    <p className="text-2xl font-semibold text-stone-900 mt-1">
                      {price} ₽
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-xl border border-stone-200 overflow-hidden">
                        <button
                          type="button"
                          onClick={decreaseQuantity}
                          className="w-11 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
                          aria-label="Уменьшить количество"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-stone-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={increaseQuantity}
                          className="w-11 h-11 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
                          aria-label="Увеличить количество"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm text-stone-500">
                        Итого:{" "}
                        <span className="font-semibold text-stone-900">
                          {price * quantity} ₽
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="mt-4 w-full px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-orange-600 transition-colors"
                    >
                      В корзину
                    </button>

                    <p className="mt-3 text-xs text-stone-500">
                      После добавления вы сможете изменить количество в корзине.
                    </p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
