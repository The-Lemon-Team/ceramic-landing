"use client";

import { useState } from "react";

export interface DirectionsData {
  title: string;
  address: string;
  mapUrl: string;
  text: string;
}

interface ContactsSectionProps {
  directions: DirectionsData;
}

const TELEGRAM_URL = "https://t.me/ceramic_loop";

export default function ContactsSection({
  directions,
}: ContactsSectionProps) {
  const [isDirectionsPopupOpen, setIsDirectionsPopupOpen] = useState(false);

  return (
    <section
      id="contacts"
      className="py-16 md:py-20 px-6 bg-white border-t border-stone-100 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <span className="section-label-wrap">
          <span className="section-label text-stone-500 inline-flex items-center gap-1.5">
            Контакты
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-stone-600 shrink-0"
              aria-hidden
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
        </span>
        <h2 className="section-title mb-2">Как добраться</h2>
        <p className="text-stone-600 text-base mb-6 max-w-lg">
          {directions.address}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Карта */}
          <div className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 h-[280px] md:h-[320px]">
            <iframe
              src={directions.mapUrl}
              title="Карта"
              className="w-full h-full absolute inset-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Кнопки связи */}
          <div className="flex flex-col justify-center gap-4">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#0088cc] text-white rounded-xl font-bold hover:bg-[#0077b5] transition-colors shadow-lg shadow-[#0088cc]/20"
            >
              <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.71-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.13.11.17.26.18.37 0 .09.01.19-.01.28z" />
              </svg>
              Написать в Telegram
            </a>
            <button
              type="button"
              onClick={() => setIsDirectionsPopupOpen(true)}
              className="inline-flex items-center gap-3 px-6 py-4 bg-stone-100 text-stone-800 rounded-xl font-medium hover:bg-stone-200 transition-colors border border-stone-200"
            >
              <svg
                className="w-6 h-6 shrink-0"
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
      </div>

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
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 max-h-[80vh] overflow-y-auto">
            <h3
              id="directions-popup-title"
              className="text-xl font-serif text-stone-800 mb-2"
            >
              {directions.title}
            </h3>
            <p className="text-primary font-medium mb-4">
              {directions.address}
            </p>
            <div className="text-sm leading-relaxed text-stone-600 whitespace-pre-line">
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
