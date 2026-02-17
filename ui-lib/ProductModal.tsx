"use client";

import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Product } from "@/types/product";

type ProductModalVariant = "shop" | "gallery";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  /** "shop" = полная версия с ценой, корзиной (для второй версии сайта). "gallery" = только просмотр описания и галереи */
  variant?: ProductModalVariant;
  /** Показывать цену в режиме gallery */
  showPrice?: boolean;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  variant = "shop",
  showPrice = false,
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const isGallery = variant === "gallery";
  const displayPrice = !isGallery || showPrice;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product.id]);

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log("Add to cart:", product, quantity);
    onClose();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="relative bg-white shadow-2xl overflow-y-auto rounded-2xl flex flex-col md:flex-row"
                style={{
                  width: "min(100%, 800px)",
                  maxHeight: "min(820px, 90vh)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
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

                {/* Gallery Section */}
                <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col lg:flex-row gap-4 bg-stone-50">
                  {/* Thumbnails (Desktop) */}
                  <div className="hidden lg:flex flex-col gap-2 order-1 shrink-0">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer transition-opacity shrink-0 border-2 border-transparent ${
                          selectedImageIndex === index
                            ? "border-primary opacity-100"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 order-2 min-w-0">
                    <div className="aspect-[4/5] max-h-[280px] md:max-h-[300px] bg-stone-200 rounded-xl overflow-hidden">
                      <Image
                        src={product.images[selectedImageIndex]}
                        alt={product.title}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>
                    {/* Thumbnails (Mobile) */}
                    <div className="flex lg:hidden gap-2 mt-3 overflow-x-auto pb-1">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`min-w-[56px] h-[56px] rounded-lg overflow-hidden transition-opacity shrink-0 border-2 ${
                            selectedImageIndex === index
                              ? "border-primary opacity-100"
                              : "border-transparent opacity-60"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col bg-white overflow-y-auto">
                  <div className="flex-grow space-y-5">
                    {!isGallery && (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-primary block">
                        {product.category}
                      </span>
                    )}
                    <Dialog.Title className="text-2xl md:text-3xl font-serif text-stone-800 leading-tight">
                      {product.title}
                    </Dialog.Title>

                    {/* Описание */}
                    <div>
                      <p className="text-sm leading-relaxed text-stone-600">
                        {product.description}
                      </p>
                    </div>

                    {/* Покрытие и размеры */}
                    {(product.finish !== "—" || product.dimensions !== "—") && (
                      <div className="py-4 border-t border-stone-100 space-y-2">
                        {product.finish !== "—" && (
                          <div className="flex gap-2 text-sm">
                            <span className="font-medium text-stone-800 shrink-0">
                              Покрытие:
                            </span>
                            <span className="text-stone-500">
                              {product.finish}
                            </span>
                          </div>
                        )}
                        {product.dimensions !== "—" && (
                          <div className="flex gap-2 text-sm">
                            <span className="font-medium text-stone-800 shrink-0">
                              Размеры:
                            </span>
                            <span className="text-stone-500">
                              {product.dimensions}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Цена — после описания */}
                    {displayPrice && product.price > 0 && (
                      <div className="pt-4 border-t border-stone-100">
                        <p className="text-xl font-semibold text-stone-800">
                          {product.price.toFixed(0)} ₽
                        </p>
                      </div>
                    )}
                    {!isGallery && (
                      <div className="mt-6 space-y-2">
                        <label className="block text-[9px] tracking-widest uppercase font-semibold text-stone-400">
                          Количество
                        </label>
                        <div className="flex items-center border border-stone-200 w-fit rounded-md">
                          <button
                            onClick={decreaseQuantity}
                            className="px-2 py-1.5 text-stone-500 hover:text-primary transition-colors"
                            aria-label="Уменьшить количество"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="px-3 py-1.5 text-sm text-stone-800 font-medium">
                            {quantity}
                          </span>
                          <button
                            onClick={increaseQuantity}
                            className="px-2 py-1.5 text-stone-500 hover:text-primary transition-colors"
                            aria-label="Увеличить количество"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {!isGallery && (
                    <>
                      <div className="mt-6 space-y-2">
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-primary hover:bg-orange-600 text-white py-3 px-5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                        >
                          В корзину
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
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </button>
                        <button className="w-full border border-stone-200 text-stone-700 hover:border-primary hover:text-primary py-3 px-5 rounded-lg text-xs font-medium transition-all">
                          Подробнее
                        </button>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3 text-[10px] text-stone-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                          Доставка 3–5 дней
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3.5 h-3.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Ручная работа в Санкт-Петербурге
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
