"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "@/components/CartProvider";
import Image from "next/image";

export default function AddedToCartModal() {
  const {
    addedModalOpen,
    addedModalSecondsLeft,
    closeAddedModal,
    lastAddedItem,
  } = useCart();

  return (
    <Transition show={addedModalOpen} as={Fragment}>
      <Dialog className="relative z-[70]" onClose={closeAddedModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-2 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white dark:bg-[rgb(28_26_24)] shadow-2xl border border-stone-200/70 dark:border-white/10 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Dialog.Title className="text-lg font-serif text-stone-900 dark:text-stone-50">
                    Товар добавлен
                  </Dialog.Title>
                  <div className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                    Закроется через :{Math.max(1, addedModalSecondsLeft)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAddedModal}
                  className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
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

              {lastAddedItem && (
                <div className="mt-5 rounded-xl border border-stone-200/70 dark:border-white/10 bg-stone-50/70 dark:bg-white/5 p-3">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-100 dark:bg-white/10">
                      {lastAddedItem.image ? (
                        <Image
                          src={lastAddedItem.image}
                          alt={lastAddedItem.title}
                          fill
                          className="object-cover object-center"
                          sizes="64px"
                        />
                      ) : (
                        <div className="absolute inset-0" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-serif leading-tight line-clamp-2 text-stone-900 dark:text-stone-50">
                        {lastAddedItem.title}
                      </div>
                      <div className="mt-1 text-[10px] text-stone-500 dark:text-stone-300 uppercase tracking-wide">
                        Кол-во: {lastAddedItem.quantity}
                      </div>
                      <div className="mt-1.5 text-sm font-semibold text-primary">
                        {lastAddedItem.price.toFixed(0)} ₽
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
