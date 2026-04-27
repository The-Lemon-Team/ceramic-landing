"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Titles from "./Titles";

type Props = {
  text?: string;
};

type ModalImage = {
  src: string;
  alt: string;
};

type InfoContent = {
  title: string;
  text: string;
  images: ModalImage[];
};

type BadgeData = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconSrc?: string;
  details: InfoContent;
};

type MasterClassData = {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  badges: BadgeData[];
  learnMore: InfoContent;
};

export default function MasterClassesSection({ text }: Props) {
  const masterClasses = useMemo(
    (): MasterClassData[] => [
      {
        id: "painting",
        tabLabel: "Роспись",
        title: "Мастер-класс по рисованию",
        description:
          text ||
          "Распишем фарфоровую заготовку под руководством мастера. Вы получите готовое изделие, которое пройдет обжиг и станет частью вашего дома.",
        image: "/images/masterclass-rosis.png",
        imageAlt: "Роспись фарфоровой заготовки",
        badges: [
          {
            id: "porcelain",
            title: "Фарфоровая основа",
            subtitle: "Готовая заготовка для росписи",
            icon: "porcelain",
            iconSrc: "/icons/pottery.svg",
            details: {
              title: "Фарфоровая основа",
              text: "Используем заранее подготовленную фарфоровую заготовку: она ровная, удобна для росписи и хорошо держит пигмент после обжига. Это дает аккуратный итог даже тем, кто впервые пробует себя в керамике.",
              images: [
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Фарфоровая заготовка перед росписью",
                },
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Фарфоровая основа в процессе работы",
                },
              ],
            },
          },
          {
            id: "paints",
            title: "Пигменты и краски",
            subtitle: "Безопасные, стойкие к обжигу",
            icon: "paint",
            details: {
              title: "Пигменты и краски",
              text: "Подбираем палитру под задачу: прозрачные и плотные пигменты, совместимые с керамикой и обжигом. Мастер помогает собрать гармоничные сочетания и показать техники нанесения.",
              images: [
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Набор красок для керамики",
                },
              ],
            },
          },
          {
            id: "glaze",
            title: "Финишная глазурь",
            subtitle: "Защита цвета и гладкая поверхность",
            icon: "glaze",
            details: {
              title: "Финишная глазурь",
              text: "После росписи покрываем изделие финишной глазурью, чтобы закрепить оттенки и придать поверхности прочность и деликатный блеск. После этого работа отправляется на обжиг.",
              images: [
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Покрытие изделия глазурью",
                },
              ],
            },
          },
        ],
        learnMore: {
          title: "Мастер-класс по рисованию: как проходит",
          text: "Встречаем вас в студии, знакомим с материалами и вместе выбираем эскиз. Далее вы расписываете фарфоровую заготовку под сопровождением мастера, а после мы подготавливаем работу к обжигу. Готовое изделие можно будет забрать после технологического цикла.",
          images: [
            {
              src: "/images/masterclass-rosis.png",
              alt: "Процесс мастер-класса по рисованию",
            },
            {
              src: "/images/masterclass-rosis.png",
              alt: "Готовые расписанные изделия",
            },
          ],
        },
      },
      {
        id: "handbuild",
        tabLabel: "Лепка",
        title: "Мастер-класс по лепке",
        description:
          "Работаем с пластичной глиной и создаем форму своими руками: чашу, кружку или тарелку. После сушки и обжига изделие можно забрать из студии.",
        image: "/images/masterclass-rosis.png",
        imageAlt: "Мастер-класс по лепке керамики",
        badges: [
          {
            id: "clay",
            title: "Керамическая масса",
            subtitle: "Податливая глина для ручной лепки",
            icon: "clay",
            details: {
              title: "Керамическая масса",
              text: "Работаем с пластичной керамической массой, которая комфортна для ручной лепки. Она позволяет легко формировать объем и прорабатывать детали даже новичкам.",
              images: [
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Подготовленная масса для лепки",
                },
              ],
            },
          },
          {
            id: "tools",
            title: "Инструменты мастера",
            subtitle: "Стеки, губки и формы для фактуры",
            icon: "tools",
            details: {
              title: "Инструменты мастера",
              text: "Используем набор стеков, губок и текстурных инструментов, чтобы создавать аккуратные края, рельеф и фактуру. Мастер показывает базовые техники по каждому инструменту.",
              images: [
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Инструменты для лепки керамики",
                },
              ],
            },
          },
          {
            id: "kiln",
            title: "Обжиг в печи",
            subtitle: "Закрепляем форму и прочность",
            icon: "kiln",
            details: {
              title: "Обжиг в печи",
              text: "Каждое изделие проходит сушку и обжиг в печи по температурному режиму мастерской. Это закрепляет форму и подготавливает работу к дальнейшему использованию.",
              images: [
                {
                  src: "/images/masterclass-rosis.png",
                  alt: "Керамические изделия перед обжигом",
                },
              ],
            },
          },
        ],
        learnMore: {
          title: "Мастер-класс по лепке: формат",
          text: "На занятии вы создаете предмет с нуля: от формы до финальных деталей. Мы помогаем на каждом этапе, объясняем технику и подсказываем, как улучшить изделие. После обжига работа будет готова к выдаче.",
          images: [
            {
              src: "/images/masterclass-rosis.png",
              alt: "Лепка изделий в студии",
            },
            {
              src: "/images/masterclass-rosis.png",
              alt: "Готовые работы после обжига",
            },
          ],
        },
      },
    ],
    [text],
  );
  const [activeTab, setActiveTab] = useState(masterClasses[0].id);
  const [openedBadge, setOpenedBadge] = useState<BadgeData | null>(null);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const activeClass =
    masterClasses.find((item) => item.id === activeTab) || masterClasses[0];

  return (
    <section
      id="master-classes"
      className="py-10 px-8 md:py-10 md:px-[8px] bg-pattern-charlie-brown dark:bg-[rgb(28_26_24)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start md:items-stretch">
          {/* Левая колонка — текст */}
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <div className="rounded-[5px] bg-white/50 dark:bg-white/5 px-6 py-8 md:px-10 md:py-10 border border-white/40 dark:border-white/10 shadow-md">
              <div className="mb-4">
                <Titles
                  overline="Мастер-классы"
                  title={activeClass.title}
                  overlineClassName="text-[0.75rem] uppercase tracking-[0.2em] font-bold text-stone-600 dark:text-stone-300 inline-flex items-center gap-1.5"
                  titleClassName="text-3xl md:text-4xl font-serif text-stone-900 dark:text-stone-50"
                  icon={
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0"
                      aria-hidden
                    >
                      <path
                        d="M12 14l9-5-9-5-9 5 9 5z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  }
                />
              </div>

              <div className="mb-6 inline-flex rounded-md border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 p-1">
                {masterClasses.map((item) => {
                  const isActive = item.id === activeTab;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>

              <p className="text-[0.875rem] leading-relaxed text-stone-700 dark:text-stone-300 mb-8">
                {activeClass.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeClass.badges.map((badge) => (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => setOpenedBadge(badge)}
                    className="rounded-md border border-stone-200 dark:border-white/10 bg-stone-100/80 dark:bg-white/5 p-3 text-left badge-info hover:bg-stone-200/70 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-8 h-8 rounded-md bg-white dark:bg-white/10 border border-stone-200 dark:border-white/10 flex items-center justify-center shrink-0">
                        {badge.iconSrc ? (
                          <Image
                            src={badge.iconSrc}
                            alt=""
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                            aria-hidden
                          />
                        ) : (
                          <FeatureIcon type={badge.icon} />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-50">
                          {badge.title}
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          {badge.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsLearnMoreOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md border border-stone-300 dark:border-white/15 text-stone-800 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors mb-3"
              >
                Узнать больше о мастер классе
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <a
                href="https://t.me/ceramic_loop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-orange-600 transition-colors"
              >
                Записаться на мастер-класс
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Правая колонка — изображение */}
          <div className="order-1 md:order-2 relative w-full h-[460px] md:h-auto md:min-h-[640px] rounded-md overflow-hidden shadow-md border border-stone-100 dark:border-white/10">
            <Image
              src={activeClass.image}
              alt={activeClass.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      <InfoModalBase
        isOpen={openedBadge !== null}
        onClose={() => setOpenedBadge(null)}
        title={openedBadge?.details.title || ""}
        text={openedBadge?.details.text || ""}
        images={openedBadge?.details.images || []}
      />
      <InfoModalBase
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
        title={activeClass.learnMore.title}
        text={activeClass.learnMore.text}
        images={activeClass.learnMore.images}
      />
    </section>
  );
}

function InfoModalBase({
  isOpen,
  onClose,
  title,
  text,
  images,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  images: ModalImage[];
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[rgb(28_26_24)] shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-stone-100 dark:border-white/10">
          <h3 className="text-lg md:text-xl font-serif text-stone-900 dark:text-stone-50">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 inline-flex items-center justify-center rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
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

        <div className="px-5 py-4 space-y-4">
          <p className="text-[0.875rem] leading-relaxed text-stone-700 dark:text-stone-300">
            {text}
          </p>

          {images.length > 0 && (
            <div
              className={`grid gap-3 ${
                images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {images.slice(0, 2).map((image) => (
                <div
                  key={`${image.src}-${image.alt}`}
                  className="relative rounded-md overflow-hidden border border-stone-200 dark:border-white/10 h-44"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureIcon({ type }: { type: string }) {
  if (type === "paint") {
    return (
      <svg
        className="w-4 h-4 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <path d="M14 4l6 6-8.5 8.5H5.5V13L14 4z" />
        <path d="M13 5l6 6" />
      </svg>
    );
  }

  if (type === "glaze") {
    return (
      <svg
        className="w-4 h-4 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <path d="M12 3l7 5v8l-7 5-7-5V8l7-5z" />
        <path d="M8 11h8M8 14h6" />
      </svg>
    );
  }

  if (type === "clay") {
    return (
      <svg
        className="w-4 h-4 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <path d="M5 15c0-3.5 2.5-6 7-6s7 2.5 7 6-2.5 5-7 5-7-1.5-7-5z" />
      </svg>
    );
  }

  if (type === "tools") {
    return (
      <svg
        className="w-4 h-4 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <path d="M4 20l7-7M3 14l7 7M14 4l6 6" />
      </svg>
    );
  }

  if (type === "kiln") {
    return (
      <svg
        className="w-4 h-4 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg
      className="w-4 h-4 text-primary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden
    >
      <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
      <path d="M8 11h8" />
    </svg>
  );
}
