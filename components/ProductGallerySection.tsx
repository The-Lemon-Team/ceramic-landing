"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductModal } from "@/ui-lib";
import { Product } from "@/types/product";

interface ProductGallerySectionProps {
  items: Product[];
}

export default function ProductGallerySection({ items }: ProductGallerySectionProps) {
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
    <section id="ceramics" className="py-10 md:py-12 bg-accent-earth">
      <div className="max-w-7xl mx-auto px-6">
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
            Авторская керамика ручной работы. Ограниченные серии, доставка по России.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {items.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => openModal(product)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-2.5 relative">
                <Image
                  src={product.mainImage}
                  alt={product.title}
                  width={280}
                  height={373}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              <h3 className="text-sm font-serif leading-tight mb-0.5 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-wide truncate">
                {product.finish}
              </p>
              {product.price > 0 && (
                <p className="text-sm font-semibold text-primary mt-2">
                  {product.price.toFixed(0)} ₽
                </p>
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
