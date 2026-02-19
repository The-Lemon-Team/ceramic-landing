"use client";

import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import type { ArtsTheme, ArtsMediaItem } from "@/data/artsThemes";
import { assetUrl } from "@/lib/assetUrl";

interface ArtsGalleryModalProps {
  theme: ArtsTheme | null;
  isOpen: boolean;
  onClose: () => void;
}

function MediaView({ item }: { item: ArtsMediaItem }) {
  if (item.type === "image") {
    return (
      <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center">
        <Image
          src={assetUrl(item.src)}
          alt={item.alt ?? ""}
          fill
          className="object-contain"
          sizes="100vw"
          unoptimized
        />
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black/50 rounded-lg overflow-hidden">
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
  const media = theme?.media ?? [];
  const current = media[index];
  const hasMultiple = media.length > 1;

  useEffect(() => {
    setIndex(0);
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
          <div className="fixed inset-0 bg-zinc-950/95" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex flex-col p-4 md:p-6">
          {/* Header: title + close */}
          <div className="flex items-center justify-between shrink-0 h-14">
            <h2 className="text-lg md:text-xl font-serif text-zinc-200 truncate pr-4">
              {theme?.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label="Закрыть"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Основная область: галерея, под выбранным изображением — текст */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0">
            {/* Галерея: медиа по центру, стрелки по бокам */}
            <div className="flex-1 flex items-center justify-center gap-2 min-h-0 relative">
              {hasMultiple && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
                  aria-label="Предыдущее"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              <div className="flex-1 flex items-center justify-center max-w-4xl w-full h-full min-h-[40vh]">
                {current && <MediaView item={current} />}
              </div>

              {hasMultiple && (
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
                  aria-label="Следующее"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Текст под выбранным изображением */}
            {theme?.description && (
              <div className="shrink-0 pt-4 text-center max-w-2xl mx-auto">
                <p className="font-serif text-zinc-400 text-sm md:text-base leading-relaxed">
                  {theme.description}
                </p>
              </div>
            )}
          </div>

          {/* Footer: счётчик + миниатюры */}
          <div className="shrink-0 pt-4 flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-zinc-500">
              {index + 1} / {media.length}
            </span>
            {media.length > 1 && media.length <= 24 && (
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar max-w-full justify-center">
                {media.map((item, i) => {
                  const rawSrc = item.type === "image" ? item.src : item.poster ?? item.src;
                  const src = assetUrl(rawSrc);
                  const isVideo = item.type === "video";
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === index
                          ? "border-amber-500/80 ring-1 ring-amber-400/50"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
                          <Image src={src} alt="" width={56} height={56} className="absolute inset-0 w-full h-full object-cover" unoptimized />
                          <svg className="w-6 h-6 text-white drop-shadow relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      ) : (
                        <Image src={src} alt="" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
