import Image from "next/image";
import type { AboutAuthorData } from "@/lib/cms";

type AboutSectionProps = {
  data: AboutAuthorData;
};

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative py-20 bg-pattern-charlie-brown dark:bg-[rgb(28_26_24)] overflow-hidden"
    >
      {/* Градиенты для мягкого перехода между секциями */}
      <div
        className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white dark:from-[rgb(28_26_24)] to-transparent pointer-events-none z-[1]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-[rgb(28_26_24)] to-transparent pointer-events-none z-[1]"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-12 items-start min-w-0">
          <div className="relative w-full max-w-[308px] md:max-w-[352px] mx-auto md:mx-0 min-w-0">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            {/* <div className="absolute -bottom-20 -right-20 z-0 w-48 h-48 bg-stone-200 rounded-full opacity-30"></div> */}
            <div
              className="relative w-full rounded-2xl overflow-hidden border-[10px] border-stone-50 dark:border-white/10 shadow-xl box-border"
              style={{ aspectRatio: "3/5" }}
            >
              <Image
                src={data.photo}
                alt={data.photoAlt}
                width={352}
                height={587}
                className="w-full aspect-[3/5] object-cover"
              />
            </div>
            {data.quote && (
              <div className="absolute -bottom-2 -left-10 bg-primary p-4 text-white rounded-lg shadow-xl hidden lg:flex items-center justify-center text-center">
                <p className="font-serif text-xl italic text-center">
                  &quot;{data.quote}&quot;
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="rounded-[5px] bg-white/50 dark:bg-white/5 px-6 py-8 md:px-10 md:py-10 border border-white/40 dark:border-white/10 shadow-sm">
              <span className="section-label-wrap">
                <span className="section-label text-stone-500 inline-flex items-center gap-1.5">
                  {data.sectionLabel}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-stone-600 dark:text-stone-300 shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-800 dark:text-stone-50 mb-4">
                {data.authorName}
              </h2>
              {data.bio && (
                <div className="space-y-4 text-stone-600 dark:text-stone-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {data.bio.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              {(data.closingText || data.signature) && (
                <div className="pt-6 border-t border-stone-100 dark:border-white/10">
                  {data.closingText && (
                    <p className="text-stone-400 dark:text-stone-400 text-xs md:text-sm mb-1.5">
                      {data.closingText}
                    </p>
                  )}
                  {data.signature && (
                    <p className="font-script text-2xl md:text-3xl text-stone-800 dark:text-stone-50">
                      {data.signature}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
