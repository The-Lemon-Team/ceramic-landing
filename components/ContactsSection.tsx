"use client";

import Image from "next/image";
import { Section } from "@/ui-lib";
import Titles from "./Titles";

export interface DirectionsData {
  title: string;
  address: string;
  mapUrl: string;
  hint?: string;
  parking?: string;
  yandexMapsUrl?: string;
  googleMapsUrl?: string;
}

interface ContactsSectionProps {
  directions: DirectionsData;
}

const TELEGRAM_URL = "https://t.me/ceramic_loop";
const VK_URL = "https://vk.ru/ceramic.loop";

/** Фото-ориентиры для карусели (из проекта, позже заменить на реальные) */
const ORIENTATION_PHOTOS = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEcKSfVsH7iGB-mhi7w7JAKeYKnvJHyHkiu7hhvFQY9t4V9OcwOHYHaOaG5V570RL4eOESCIRWecXf8FlKDpKSlWDcUUjNrK1wiK-RN8maFl35EpaE8415OQsRN98U7H8O4BZFEJ_NVD5gzEt-fRk7Iw08E3tAN3qX7TPwk-8DWXJcfNADEiaW2LjnmcfAD1qoXqiB6jvo5RmSSxCRSeRFRSowy4EzsPGjHjtv4b9vfWKtHhzRREP6xBVQx1tVOSMmiEwtNN6womg",
    alt: "Студия керамики",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCI_1NW9gyQvvZ7I7kk940Rgg4jCgsUcwQDzvYfwR6HKBkc_xJ8U76mfN8aZWXbT8KHZ2R4acWtyLUt59K0FwRSBhiTMD12pHKKssLCQCBixHkd0uNv6xx6hz766COUI6muoaviAiYmI0-3FK1N4Hv9HwtTqZ9KKVQWBgz0qiLI49_-jplixy832dySum_B_NYDvNfCA4itb_Bf7T3JB7AZuLEnYZjrmRhIAWb7RPflb44-retl_TfPVY9yJ5p9hJFL7bwDnmXcQ",
    alt: "Керамика в студии",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Wwmkkl62kGIKXDPRcx78zz0q6hvAqhyaVBleDpZwnWnmEoGDwRN5IzwEX26fIF9CVX8srHlpuFWWyyG5zv31Va6ip-kkrlL54qeBVb_SeubTFYoxRXTqHUaspoMae1djAZRkSbvAXqUUUmGkXK5rhZObNiwU1TDGJH3dfETChpquZLuF1zTiTlaesUgZwjGlj_vkdAFvIfJaXW7RMYm2qvM_imHFlJHtueyK0ikAQPs-qmoK_GWfT0Gs1m9iXmyMx3DHV425E5U",
    alt: "Интерьер студии",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-HgxXPcEg8h62pk-CuR7vg8jsiUiyDhWTZmXFInrQwEg9P5gXXGSYtpEmQ3d5rUh7HO0UcYe3plkB8PoyvtWzhHyezz_g5y3qQh5LcNZQD7eNmdSccjc-QjDQ6vFO-sIxwAPEQTbYIAPTYJ4eMk8AkPm4INgQ9bY0dNSv4M2ZVUs4JQvvVX7K5pz2pYn4tqgn6vfpWhfovCDZD2NZ85VmQOJb51uR69JWAdkCteAQM4HoTizQb1oIWhTGzqsQY6dgaS4VAaUcE4",
    alt: "Рабочее пространство",
  },
];

export default function ContactsSection({ directions }: ContactsSectionProps) {
  const hint =
    directions.hint ||
    `Петроградская набережная, 22.
7 минут пешком от м. Горьковская.
Вход через главный вестибюль, 4 этаж, студия 412.
Пожалуйста, возьмите с собой документ для прохода через пост охраны`;
  const parking =
    directions.parking || "Есть платная городская парковка прямо у входа";
  const yandexUrl =
    directions.yandexMapsUrl ||
    "https://yandex.ru/maps/?pt=30.311389,59.966389&z=17";
  const googleUrl =
    directions.googleMapsUrl ||
    "https://www.google.com/maps/search/?api=1&query=59.966389,30.311389";

  return (
    <Section
      id="contacts"
      variant="plain"
      size="M"
      className="border-t border-stone-100 scroll-mt-20 dark:border-white/10"
    >
      <Titles
        className="section-label-wrap"
        overline="Контакты"
        title="Адрес и контакты"
        overlineClassName="section-label text-stone-500 inline-flex items-center gap-1.5"
        titleClassName="text-3xl md:text-4xl font-serif text-[#0d191b] dark:text-white mb-6"
        icon={
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-600 dark:text-stone-300 shrink-0"
            aria-hidden
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <p className="text-stone-600 dark:text-stone-300 text-base mb-2 max-w-lg">
        {directions.address}
      </p>

      <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-50 mb-2">
        Как добраться:
      </h3>

      {/* Карта слева, подсказка справа — одинаковые по высоте */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 md:items-stretch">
          {/* Карта */}
          <div className="relative rounded-xl overflow-hidden bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 h-[280px] md:h-full">
            <iframe
              src={directions.mapUrl}
              title="Карта"
              className="w-full h-full absolute inset-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Правая колонка: подсказка + кнопки + парковка — высота как у карты */}
          <div className="flex flex-col gap-4 md:min-h-[320px] overflow-hidden">
            <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-50">
              Где нас найти
            </h4>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-line">
              {hint}
            </p>

            {/* Компактные кнопки в ряд */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={TELEGRAM_URL}
                id="telegram-address-link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-[#229ED9] text-white hover:bg-[#1E8FC3] transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.71-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.13.11.17.26.18.37 0 .09.01.19-.01.28z" />
                </svg>
                Telegram
              </a>
              <a
                href={VK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-[#0077ff] text-white hover:bg-[#0066d6] transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12.78 16.23h1.1s.34-.04.52-.23c.16-.16.15-.47.15-.47s-.02-1.44.64-1.66c.65-.22 1.49 1.39 2.38 2 .67.46 1.18.36 1.18.36l2.38-.03s1.25-.08.66-1.06c-.05-.08-.33-.73-1.7-2-1.43-1.33-1.24-1.12.48-3.44 1.05-1.43 1.47-2.3 1.33-2.68-.13-.36-.93-.26-.93-.26l-2.68.02s-.2-.03-.35.06c-.15.1-.25.3-.25.3s-.42 1.12-.98 2.07c-1.17 1.97-1.64 2.08-1.83 1.95-.44-.29-.33-1.17-.33-1.8 0-1.95.3-2.76-.58-2.97-.3-.07-.53-.11-1.3-.12-.99-.01-1.82 0-2.3.23-.32.15-.56.49-.41.51.18.03.58.11.8.4.28.38.27 1.24.27 1.24s.16 2.3-.37 2.58c-.37.2-.88-.21-1.97-1.98-.56-.91-.99-1.92-.99-1.92s-.08-.2-.23-.3c-.18-.12-.42-.16-.42-.16l-2.55.02s-.38.01-.52.17c-.12.14-.01.44-.01.44s2 4.67 4.27 7.03c2.08 2.15 4.46 2.01 4.46 2.01z" />
                </svg>
                ВКонтакте
              </a>
              <a
                href={yandexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-50 border border-stone-200 dark:border-white/10 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
                title="Открыть в Яндекс.Картах"
              >
                <svg
                  className="w-4 h-4 shrink-0 text-[#fc3f1d]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Открыть в Я
              </a>
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-50 border border-stone-200 dark:border-white/10 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
                title="Открыть в Google Maps"
              >
                <svg
                  className="w-4 h-4 shrink-0 text-[#4285f4]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Открыть в G
              </a>
            </div>

            {/* Парковка */}
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
              <svg
                className="w-5 h-5 shrink-0 text-stone-400 dark:text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17V7h4a3 3 0 013 3v4M9 17h6M9 17v-4"
                />
              </svg>
              <p className="leading-relaxed">{parking}</p>
            </div>

            {/* Галерея фото-ориентиров */}
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-white/10">
              <h3 className="text-xs uppercase tracking-wide text-stone-500 font-medium mb-2">
                Фото-ориентиры
              </h3>
              <div className="carousel-scroll flex gap-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar -mx-1 px-1">
                {ORIENTATION_PHOTOS.map((photo, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 snap-start w-[min(40vw,140px)] aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 dark:bg-white/5"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={140}
                      height={105}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 40vw, 140px"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </Section>
  );
}
