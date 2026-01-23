"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
              <Dialog.Panel className="relative w-full max-w-5xl bg-background-light shadow-2xl overflow-hidden rounded-lg flex flex-col md:flex-row">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 text-stone-500 hover:text-stone-800 transition-colors p-2"
                  aria-label="Close"
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
                <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col lg:flex-row gap-6">
                  {/* Thumbnails (Desktop) */}
                  <div className="hidden lg:flex flex-col gap-4 order-1">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-20 h-20 rounded overflow-hidden cursor-pointer transition-opacity ${
                          selectedImageIndex === index
                            ? "ring-1 ring-primary opacity-100"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1 order-2">
                    <div className="aspect-[4/5] md:aspect-square bg-stone-100 rounded-lg overflow-hidden">
                      <Image
                        src={product.images[selectedImageIndex]}
                        alt={product.title}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Thumbnails (Mobile) */}
                    <div className="flex lg:hidden gap-3 mt-4 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`min-w-[70px] h-[70px] rounded overflow-hidden transition-opacity ${
                            selectedImageIndex === index
                              ? "ring-1 ring-primary opacity-100"
                              : "opacity-60"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} ${index + 1}`}
                            width={70}
                            height={70}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col bg-white">
                  <div className="flex-grow">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-primary mb-2 block">
                      {product.category}
                    </span>
                    <Dialog.Title className="text-3xl md:text-4xl font-serif text-stone-800 mb-2">
                      {product.title}
                    </Dialog.Title>
                    <div className="text-xl text-stone-500 font-light mb-6">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="space-y-6 text-sm leading-relaxed text-stone-600">
                      <p>{product.description}</p>
                      <div className="pt-4 border-t border-stone-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-stone-800">
                            Finish:
                          </span>
                          <span className="text-stone-500">{product.finish}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-stone-800">
                            Dimensions:
                          </span>
                          <span className="text-stone-500">
                            {product.dimensions}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <label className="block text-[10px] tracking-widest uppercase font-semibold text-stone-400">
                        Quantity
                      </label>
                      <div className="flex items-center border border-stone-200 w-fit rounded">
                        <button
                          onClick={decreaseQuantity}
                          className="px-3 py-2 text-stone-500 hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="px-4 py-2 text-stone-800 font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={increaseQuantity}
                          className="px-3 py-2 text-stone-500 hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 space-y-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-primary hover:bg-orange-600 text-white py-4 px-6 rounded transition-all flex items-center justify-center gap-2 font-medium tracking-wide"
                    >
                      ADD TO CART
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
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                    <button className="w-full border border-stone-200 text-stone-700 hover:border-primary hover:text-primary py-4 px-6 rounded transition-all text-sm font-medium">
                      VIEW FULL DETAILS
                    </button>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4 text-[11px] text-stone-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
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
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                      Ships in 3-5 days
                    </div>
                    <div className="flex items-center gap-1.5">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Handmade in Oregon
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
