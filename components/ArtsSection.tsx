"use client";

import { useState } from "react";
import Image from "next/image";
import { artsThemes } from "@/data/artsThemes";
import type { ArtsTheme } from "@/data/artsThemes";
import ArtsGalleryModal from "./ArtsGalleryModal";
import { assetUrl } from "@/lib/assetUrl";

export default function ArtsSection() {
  const [openedTheme, setOpenedTheme] = useState<ArtsTheme | null>(null);

  return (
    <section
      id="arts"
      className="pt-14 md:pt-12 pb-8 md:pb-10 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 md:mb-8">
          <span className="section-label-wrap">
            <span className="section-label text-stone-400 inline-flex items-center gap-1.5">
              Арты
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-stone-500 shrink-0"
                aria-hidden
              >
                <path d="M4 20h16" />
                <path d="M6 20v-6l6-6 4 4 6-6v6" />
              </svg>
            </span>
          </span>
          <h2 className="section-title mb-4">Зарисовки и арты</h2>
          <p className="section-subtitle max-w-xl">
            Эскизы, наброски и то, чем хочется поделиться — не только керамика.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {artsThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setOpenedTheme(theme)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src={assetUrl(theme.cover)}
                  alt={theme.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
                {theme.media.some((m) => m.type === "video") && (
                  <span
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                    aria-hidden
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="mt-2 px-0.5">
                <p className="text-sm font-serif text-stone-700 line-clamp-1 group-hover:text-primary transition-colors">
                  {theme.title}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-0.5">
                  {theme.media.length}{" "}
                  {theme.media.length === 1
                    ? "файл"
                    : theme.media.length < 5
                    ? "файла"
                    : "файлов"}
                </p>
              </div>
            </button>
          ))}
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
