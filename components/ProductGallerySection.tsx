"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductModal } from "@/ui-lib";
import { Product } from "@/types/product";
import Titles from "./Titles";

const INITIAL_COUNT = 10; // 5 columns × 2 rows

interface ProductGallerySectionProps {
  items: Product[];
  showHeader?: boolean;
}

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
    >
      <div className="aspect-square overflow-hidden rounded-lg mb-2 relative bg-stone-100 dark:bg-white/10">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 160px"
        />
      </div>
      <h3 className="text-xs font-serif leading-tight mb-0.5 line-clamp-2 text-stone-900 dark:text-stone-50">
        {product.title}
      </h3>
      <p className="text-[9px] text-stone-400 dark:text-stone-400 uppercase tracking-wide truncate">
        {product.finish}
      </p>
      {product.price > 0 && (
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {product.discountPercent != null && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/90 text-white">
              −{product.discountPercent}%
            </span>
          )}
          <p className="text-xs font-semibold text-primary">
            {product.price.toFixed(0)} ₽
          </p>
          {product.originalPrice != null && (
            <p className="text-[10px] text-stone-400 line-through">
              {product.originalPrice.toFixed(0)} ₽
            </p>
          )}
        </div>
      )}
    </button>
  );
}

export default function ProductGallerySection({
  items,
  showHeader = true,
}: ProductGallerySectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section
      id="ceramics"
      className="py-10 md:py-10 px-8 md:px-[8px] bg-accent-earth dark:bg-accent-earth-dark overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="mb-6 md:mb-8">
            <Titles
              className="section-label-wrap"
              overline="Керамика"
              title="Купить керамику"
              overlineClassName="section-label inline-flex items-center gap-1.5"
              titleClassName="section-title mb-4"
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
                  className="text-primary shrink-0"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              }
            />
            <p className="section-subtitle max-w-lg">
              Авторская керамика ручной работы. Ограниченные серии, доставка по
              России.
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {visibleItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openModal(product)}
            />
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(items.length)}
              className="px-4 py-1.5 text-sm rounded-md border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Показать ещё
            </button>
          </div>
        )}
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
