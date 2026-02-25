"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductModal } from "@/ui-lib";
import { Product } from "@/types/product";

interface ProductGallerySectionProps {
  items: Product[];
}

export default function ProductGallerySection({
  items,
}: ProductGallerySectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="ceramics" className="py-10 md:py-12 px-6 bg-accent-earth overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <span className="section-label-wrap">
            <span className="section-label inline-flex items-center gap-1.5">
              Керамика
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary shrink-0"
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </span>
          </span>
          <h2 className="section-title mb-4">Купить керамику</h2>
          <p className="section-subtitle max-w-lg">
            Авторская керамика ручной работы. Ограниченные серии, доставка по
            России.
          </p>
        </div>
        <div className="carousel-scroll flex gap-4 md:gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 -mx-6 px-6 [scroll-padding-inline:1.5rem]">
          {items.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => openModal(product)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl shrink-0 snap-start w-[min(45vw,180px)] sm:w-[min(30vw,200px)] md:w-[min(22vw,220px)] lg:w-[min(18vw,240px)]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-2.5 relative">
                <Image
                  src={product.mainImage}
                  alt={product.title}
                  width={280}
                  height={373}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 240px"
                />
              </div>
              <h3 className="text-sm font-serif leading-tight mb-0.5 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-wide truncate">
                {product.finish}
              </p>
              {product.price > 0 && (
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {product.discountPercent != null && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/90 text-white">
                      −{product.discountPercent}%
                    </span>
                  )}
                  <p className="text-sm font-semibold text-primary">
                    {product.price.toFixed(0)} ₽
                  </p>
                  {product.originalPrice != null && (
                    <p className="text-xs text-stone-400 line-through">
                      {product.originalPrice.toFixed(0)} ₽
                    </p>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          variant="shop"
        />
      )}
    </section>
  );
}
